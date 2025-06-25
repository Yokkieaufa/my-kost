import { HttpContext } from '@adonisjs/core/http'
import { loginValidator } from '#validators/auth'

export default class AuthController {
  async login({ request, auth, response, session }: HttpContext) {
    const { email, password, rememberMe } = await request.validateUsing(loginValidator)

    try {
      // @ts-expect-error: method attempt tidak dikenali TypeScript padahal tersedia di runtime
      await auth.use('web').attempt(email, password, rememberMe)
      session.flash('success', 'Berhasil login!')
      return response.redirect().toPath('/')
    } catch {
      session.flash('errors', { message: 'Email atau password salah.' })
      return response.redirect().back()
    }
  }

  // ...fungsi lain
}
