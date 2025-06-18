/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.on('/').renderInertia('home')

// Login Page
router.on('/login').renderInertia('auth/login')

// Register Page
router.on('/register').renderInertia('auth/register')
