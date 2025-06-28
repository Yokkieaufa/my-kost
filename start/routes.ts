import Route from '@adonisjs/core/services/router'
const AuthController = () => import('#controllers/auth_controller')

// Home Route
Route.get('/', async ({ inertia }) => {
  return inertia.render('home')
})

// Register
Route.get('/register', async ({ inertia }) => {
  return inertia.render('auth/register')
})
Route.post('/register', [AuthController, 'register']) // ✅ ganti jadi panggil controller

// Login
Route.get('/login', async ({ inertia }) => {
  return inertia.render('auth/login')
})
Route.post('/login', [AuthController, 'login']) // ✅ ganti jadi panggil controller

// Logout
Route.post('/logout', [AuthController, 'logout']) // ✅ panggil controller

// Login
Route.get('/dashboard', async ({ inertia }) => {
  return inertia.render('auth/dashboard')
})
Route.get('/tentang-kami', async ({ inertia }) => {
  return inertia.render('tentangkami')
})
