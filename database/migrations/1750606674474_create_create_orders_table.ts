// database/migrations/xxxx_create_orders_table.ts (nama file sebenarnya akan ada timestamp)

import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable() // Kolom ID utama
      table.integer('kost_id').notNullable() // ID kost yang dipesan
      table.string('kost_name', 255).nullable() // Nama kost (disimpan langsung, tidak perlu join jika tidak ada tabel kost)
      table.string('full_name', 255).notNullable() // Nama lengkap pemesan
      table.string('phone_number', 50).notNullable() // Nomor HP/WhatsApp pemesan
      table.string('order_date_str', 50).notNullable() // Tanggal & bulan pesanan (misal: "15 Januari")
      table.text('notes').nullable() // Catatan tambahan dari pemesan

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
