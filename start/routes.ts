// start/routes.ts

import router from '@adonisjs/core/services/router'
//import AuthController from '../app/controllers/auth_controller.js'
// Impor controller secara lazy (lazy loading)
const OrdersController = () => import('../app/controllers/orders_controller.js') // Impor OrdersController

router.on('/').renderInertia('home')

// --- Rute Autentikasi ---
// Perhatikan penggunaan tipe 'typeof AuthController' pada elemen pertama array
// Ini membantu TypeScript memahami bahwa elemen kedua adalah nama metode dari controller tersebut.
// Menggunakan `middleware.guest()` untuk rute yang hanya bisa diakses oleh tamu (belum login)
router.get('/login', 'auth_controller.showLogin')
router.post('/login', 'auth_controller.login')
router.get('/register', 'auth_controller.showRegister')
router.post('/register', 'auth_controller.register')
router.get('/logout', 'auth_controller.logout')
// --- Rute untuk Pemesanan Kost ---
router.get('/pesan/:kostId', [OrdersController, 'create'] as const)
router.post('/pesan', [OrdersController, 'store'] as const)

// --- Rute navigasi statis lainnya ---
router.on('/tentang-kami').renderInertia('tentangkami')
router.on('/cari-kost').renderInertia('CariKost')
router.on('/hubungi-kami').renderInertia('HubungiKami')
