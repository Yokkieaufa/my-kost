import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
// HAPUS BARIS INI: import { Hash } from '@adonisjs/core/hash'

// --- TAMBAHKAN BARIS INI UNTUK MENGIMPOR SERVICE HASH ---
import hash from '@adonisjs/core/services/hash'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string

  @column({
    serializeAs: null,
  })
  declare password: string

  @column()
  declare email: string

  @column()
  declare rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  static async hashPassword(user: User) {
    if (user.$dirty.password) {
      // --- UBAH BARIS INI DARI Hash.make() MENJADI hash.make() ---
      user.password = await hash.make(user.password)
    }
  }
}
