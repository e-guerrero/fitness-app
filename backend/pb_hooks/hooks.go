package pb_hooks

import (
	"spaceship/pocketbase-module/pb_hooks/user"

	"github.com/pocketbase/pocketbase"
)

func Register(app *pocketbase.PocketBase) {

	user.RegisterHooks(app)
	// register another hook
}












































// import (
//     "github.com/pocketbase/pocketbase/core"
//     "log"
// )

// func RegisterHooks(app *core.App) {
//     app.OnRecordAfterCreateRequest("users", func(e *core.RecordCreateEvent) error {
//         log.Println("Custom user hook triggered!")
//         return nil
//     })
// }

// import (
// 	"github.com/labstack/echo/v5"
// 	// "github.com/pocketbase/pocketbase/models"
// 	// "github.com/pocketbase/pocketbase/tools/security"
// )

// func CustomCreateUserHandler(next echo.HandlerFunc) echo.HandlerFunc {
// 	return func(c echo.Context) error {
// 		// username := c.FormValue("username")
// 		// password := c.FormValue("password")

// 		// // Check if the username already exists
// 		// // retrieve a single auth collection record by its username (case insensitive)
// 		// existingUser, err := app.Dao().FindAuthRecordByUsername("users", username)
// 		// if existingUser != nil {
// 		// 	return c.JSON(http.StatusBadRequest, map[string]string{
// 		// 		"error": "Username already exists",
// 		// 	})
// 		// }

// 		// // Create new user
// 		// user := &models.User{}
// 		// user.Username = username
// 		// hashPassword, _ := security.HashPassword(password)
// 		// user.PasswordHash = hashPassword

// 		// if err := app.Dao().SaveUser(user); err != nil {
// 		// 	return c.JSON(http.StatusInternalServerError, map[string]string{
// 		// 		"error": "Failed to create user",
// 		// 	})
// 		// }

// 		// // Copy food items from the 'default' user
// 		// defaultUser, _ := app.Dao().FindUserByUsername("default")
// 		// if defaultUser != nil {
// 		// 	defaultFoodItems, _ := app.Dao().FindRecordsByExpr("food", "user", defaultUser.Id)
// 		// 	for _, item := range defaultFoodItems {
// 		// 		newItem := item
// 		// 		newItem.Set("user", user.Id) // Assign new user id to the food item
// 		// 		app.Dao().SaveRecord(newItem)
// 		// 	}
// 		// }

// 		// // Auto login the user by creating a new token
// 		// authToken, err := app.Dao().CreateUserAuthToken(user)
// 		// if err != nil {
// 		// 	return c.JSON(http.StatusInternalServerError, map[string]string{
// 		// 		"error": "Failed to log in user",
// 		// 	})
// 		// }

// 		// Return the auth token to the frontend
// 		return next(c)
// 		// return c.JSON(http.StatusOK, map[string]interface{}{
// 		// 	// "token": authToken,
// 		// 	// "user":  user,
// 		// })
// 	}
// }
