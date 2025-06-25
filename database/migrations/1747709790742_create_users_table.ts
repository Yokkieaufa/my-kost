// database/migrations/xxxx_create_users_table.ts (nama file sebenarnya akan ada timestamp)

import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable() // Kolom ID utama
      table.string('full_name', 255).notNullable() // Nama lengkap pengguna
      table.string('email', 255).notNullable().unique() // Email pengguna, harus unik
      table.string('password', 180).notNullable() // Password (akan di-hash)
      table.string('remember_me_token').nullable() // Token untuk "ingat saya" saat login

      table.timestamp('created_at', { useTz: true }).notNullable() // Waktu pembuatan record
      table.timestamp('updated_at', { useTz: true }).nullable() // Waktu pembaruan record
    })
  }

  async down() {
    this.schema.dropTable(this.tableName) // Untuk membatalkan migrasi (menghapus tabel)
  }
}
