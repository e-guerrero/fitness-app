package middleware

import (
	"github.com/pocketbase/pocketbase"
)

// Register registers all middleware used in the application.
func Register(app *pocketbase.PocketBase) {
	RegisterCreateUserMiddleware(app)
	// RegisterAnotherMiddleware(app)
}
