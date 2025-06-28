import User from '#models/user'
import Hash from '@adonisjs/core/services/hash'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async register({ request, response, auth, session }: HttpContext) {
    const { fullName, email, password } = request.only(['fullName', 'email', 'password'])

    // ✅ Cek apakah email sudah terdaftar
    const existingUser = await User.findBy('email', email)
    if (existingUser) {
      session.flash('errors', {
        email: 'Email sudah digunakan. Silakan gunakan email lain.',
      })
      return response.redirect().back()
    }

    // ✅ Buat user baru
    const user = await User.create({ fullName, email, password })
    await auth.use('web').login(user)
    return response.redirect('/')
  }

  async login({ request, response, auth, session }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.findBy('email', email)
    if (!user || !(await Hash.verify(user.password, password))) {
      session.flash('errors', { email: 'Email atau password salah' })
      return response.redirect().back()
    }

    await auth.use('web').login(user)
    return response.redirect('/')
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/')
  }
}
