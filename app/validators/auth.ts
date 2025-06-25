import vine from '@vinejs/vine'

// Validator untuk form pendaftaran pengguna (Register)
export const registerValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3), // Nama lengkap: string, tanpa spasi awal/akhir, minimal 3 karakter
    email: vine.string().trim().email(), // Email: string, tanpa spasi awal/akhir, format email valid
    password: vine.string().minLength(6), // Password: string, minimal 6 karakter
  })
)

// Validator untuk form login
export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(), // Email: string, tanpa spasi awal/akhir, format email valid
    password: vine.string().trim().minLength(1), // Password: string, tanpa spasi awal/akhir, minimal 1 karakter (karena sudah di-hash di backend)
    rememberMe: vine.boolean().optional(), // Checkbox "ingat saya": boolean, opsional (bisa ada atau tidak)
  })
)
