package user

import (
	"fmt"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/daos"
	"github.com/pocketbase/pocketbase/mails"
	"github.com/pocketbase/pocketbase/models"
)

var app *pocketbase.PocketBase

func RegisterHooks(a *pocketbase.PocketBase) {
    app = a
	app.OnRecordAfterCreateRequest("users").Add(afterUserCreateHook)
    app.OnRecordBeforeDeleteRequest("users").Add(beforeUserDeleteHook)
}

func afterUserCreateHook(e *core.RecordCreateEvent) error {
    defaultUsername := "default"
    newUserId := e.Record.Id
    newUserRecord := e.Record

    e.Record.Set("emailVisibility", true);
    // Save the updated record
    err := app.Dao().SaveRecord(e.Record)
    if err != nil {
        return err // Return error if saving fails
    }

    err = app.Dao().RunInTransaction(func(txDao *daos.Dao) error {

        // Get the user with username "default"
        defaultUser, err := txDao.FindFirstRecordByData("users","username", defaultUsername)
        if err != nil {
            return nil
        }
        defaultUserId := defaultUser.Id

        // Step 1: Get all food_directories and food_brands that belong to the default user
        foodDirectories, err := txDao.FindRecordsByExpr("food_directories",
        dbx.NewExp("user = {:user}", dbx.Params{"user": defaultUserId}))
        if err != nil {
            return err
        }

        foodBrands, err := txDao.FindRecordsByExpr("food_brands", 
        dbx.NewExp("user = {:user}", dbx.Params{"user": defaultUserId}))
        if err != nil {
            return err
        }

        // Step 2: Create new food_directories and food_brands for the new user
        newFoodDirectories := make(map[string]string)
        foodDirectoryCollection, err := txDao.FindCollectionByNameOrId("food_directories")
        if err != nil {
            return err
        }
        for _, dir := range foodDirectories {
            copiedDir := models.NewRecord(foodDirectoryCollection)
            copiedDir.Set("name", dir.GetString("name"))
            copiedDir.Set("user", newUserId)
            copiedDir.Set("food_directory", dir.GetString("food_directory"))
            if err := txDao.SaveRecord(copiedDir); err != nil {
                return err
            }
            newFoodDirectories[dir.Id] = copiedDir.Id // Map old directory ID to new directory ID
        }

        newFoodBrands := make(map[string]string)
        foodBrandCollection, err := txDao.FindCollectionByNameOrId("food_brands")
        if err != nil {
            return err
        }
        for _, brand := range foodBrands {
            copiedBrand := models.NewRecord(foodBrandCollection)
            copiedBrand.Set("name", brand.GetString("name"))
            copiedBrand.Set("user", newUserId)
            if err := txDao.SaveRecord(copiedBrand); err != nil {
                return err
            }
            newFoodBrands[brand.Id] = copiedBrand.Id // Map old brand ID to new brand ID
        }

        // Step 3: Get all foods that belong to the default user's food_directories
        foods := []struct {
            Id          string `db:"id" json:"id"`
            Name        string `db:"name" json:"name"`
            Directory   string `db:"food_directory" json:"food_directory"`
            Brand       string `db:"food_brand" json:"food_brand"`
        }{}

        err = txDao.DB().
        Select("foods.*"). // or "foods.id", "foods.name" etc.
        From("foods").
        InnerJoin("food_directories", dbx.NewExp("foods.food_directory = food_directories.id")).
        InnerJoin("users", dbx.NewExp("food_directories.user = users.id")).
        Where(dbx.NewExp("users.username = {:username}", dbx.Params{ "username": defaultUsername })).
        All(&foods)
        if err != nil {
            return err
        }

        // Step 4: Copy each food and link to the new food_directory and optional food_brand
        foodCollection, err := txDao.FindCollectionByNameOrId("foods")
        if err != nil {
            return err
        }
        for _, food := range foods {
            copiedFood := models.NewRecord(foodCollection)
            copiedFood.Set("name", food.Name)
            copiedFood.Set("food_directory", newFoodDirectories[food.Directory])

            // If the food has a brand, link it to the new brand
            oldBrandId := food.Brand
            if newBrandId, exists := newFoodBrands[oldBrandId]; exists {
                copiedFood.Set("food_brand", newBrandId)
            }

            if err := txDao.SaveRecord(copiedFood); err != nil {
                return err
            }
        }

        

        return nil
    })

    // If an error occurred during the transaction, return it
    if err != nil {
        //return err
        return fmt.Errorf("failed to create default records for user: %w", err)
    }

    // Send email verification.
    if err := mails.SendRecordVerification(app, newUserRecord); err != nil {
        return err
    }

    return nil
}

func beforeUserDeleteHook(e *core.RecordDeleteEvent) error {
	userId := e.Record.Id

    err := app.Dao().RunInTransaction(func(txDao *daos.Dao) error {

        // Delete foods linked to user's food_directories
        foodDirectories, err := txDao.FindRecordsByExpr("food_directories", dbx.NewExp("user = {:userId}", dbx.Params{"userId": userId}))
        if err != nil {
            return err
        }
        for _, directory := range foodDirectories {
            foods, err := txDao.FindRecordsByExpr("foods", dbx.NewExp("food_directory = {:directoryId}", dbx.Params{"directoryId": directory.Id}))
            if err != nil {
                return err
            }
            for _, food := range foods {
                if err := txDao.DeleteRecord(food); err != nil {
                    return err
                }
            }
        }

        // Delete food_directories linked to the user
        for _, directory := range foodDirectories {
            if err := txDao.DeleteRecord(directory); err != nil {
                return err
            }
        }

        // Delete food_brands linked to the user
        foodBrands, err := txDao.FindRecordsByExpr("food_brands", dbx.NewExp("user = {:userId}", dbx.Params{"userId": userId}))
        if err != nil {
            return err
        }
        for _, brand := range foodBrands {
            if err := txDao.DeleteRecord(brand); err != nil {
                return err
            }
        }

        return nil
    })

    // If an error occurred during the transaction, return it
    if err != nil {
        //return err
        return fmt.Errorf("failed to delete user: %w", err)
    }

    return nil
	
}