import { HttpContext } from '@adonisjs/core/http'
import Order from '#models/order' // Pastikan model Order sudah dibuat

export default class OrdersController {
  // Menampilkan halaman form pemesanan
  async create({ inertia, params }: HttpContext) {
    const kostId = Number(params.kostId)

    // Simulasi data kost (jika belum terhubung ke database Kost)
    const allKosts = [
      {
        id: 1,
        name: 'KOST PUTRA CILACAP KOTA',
        address: 'Jalan Kalimas No.17, Cilacap Tengah',
        price: 500000,
      },
      {
        id: 2,
        name: 'KOST Pandawa',
        address: 'Jl. Sawo, Kandang Macan, Cilacap',
        price: 550000,
      },
      {
        id: 3,
        name: 'KOST Zhafran Sindoro',
        address: 'Jl. Sindoro, belakang kabupaten, Cilacap',
        price: 1300000,
      },
      // ... tambah lainnya sesuai kebutuhan
    ]

    const selectedKost = allKosts.find((kost) => kost.id === kostId)

    return inertia.render('Pesan', {
      kostId,
      kostName: selectedKost?.name || 'Kost Tidak Ditemukan',
      kostAddress: selectedKost?.address || '',
      kostPrice: selectedKost?.price || 0,
    })
  }

  // Menyimpan data pesanan dari form
  async store({ request, response, session }: HttpContext) {
    const {
      kostId,
      kostName,
      fullName,
      phoneNumber,
      orderDate, // format: '2025-06-22'
      notes,
    } = request.only(['kostId', 'kostName', 'fullName', 'phoneNumber', 'orderDate', 'notes'])

    try {
      const order = await Order.create({
        kostId,
        kostName,
        fullName,
        phoneNumber,
        orderDateStr: orderDate,

        notes,
      })

      console.log('✅ Pesanan berhasil disimpan:', order.toJSON())

      session.flash('success', 'Pesanan Anda berhasil dikirim!')
      return response.redirect().toPath('/')
    } catch (error) {
      console.error('❌ Gagal menyimpan pesanan:', error)
      session.flash('form', request.all()) // simpan input user
      return response.redirect().back()
    }
  }
}
