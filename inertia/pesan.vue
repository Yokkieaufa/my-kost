<script setup>
import { ref, onMounted, computed } from 'vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

// Props yang diterima dari URL /pesan/{kostId}
const props = defineProps({
  kostId: {
    type: [String, Number],
    required: true,
  },
  // Data tambahan kost yang bisa dilewatkan dari controller
  kostName: {
    type: String,
    default: 'Kost Pilihan Anda',
  },
  kostAddress: {
    type: String,
    default: '',
  },
  kostPrice: {
    type: Number,
    default: 0,
  }
});

// State form menggunakan Inertia's useForm
const form = useForm({
  fullName: '',
  phoneNumber: '',
  orderDate: '', // Tanggal (angka 1-31)
  orderMonth: '', // Bulan (angka 1-12)
  notes: '',
  kost_id: props.kostId, // Mengirim ID kost yang dipesan
});

// Ref untuk menyimpan detail kost (akan diisi dari props atau fetch)
const kostDetails = ref(null);

onMounted(() => {
  // --- TANPA DATABASE: Simulasi pencarian data kost ---
  // Ini mengambil data kost dari daftar statis yang sama dengan home.vue
  const allKosts = [
    { id: 1, name: 'KOST PUTRA CILACAP KOTA', address: 'Jalan Kalimas No.17, Cilacap Tengah', type: 'Campur', isVerified: true, isRecommended: true, price: 500000, remainingRooms: 2, mainImage: 'https://www.sewakost.com/files/01-2023/ad109903/kos-putra-cilacap-kota-1339313874_large.jpg', slug: 'Kost Putra Cilacap Kota' },
    { id: 2, name: 'KOST Pandawa', address: 'Jl. Sawo, Kandang Macan, Tegalreja, Kec. Cilacap Sel., Kabupaten Cilacap, Jawa Tengah, Cilacap, 53214 Cilacap, Indonesia', type: 'Campur', isVerified: true, isRecommended: false, price: 550000, remainingRooms: 4, mainImage: 'https://infocilacap.net/wp-content/uploads/2020/07/kost-pandawa.jpg', slug: 'kost pandawa' },
    { id: 3, name: 'KOST Zhafran Sindoro', address: 'Jl. Sindoro (belakang kabupaten) Cilacap', type: 'Campur', isVerified: true, isRecommended: true, price: 1300000, remainingRooms: 3, mainImage: 'https://infocilacap.net/hotel/wp-content/uploads/2019/12/zhafran-kost.jpg', slug: 'Kost Zhafran' },
    { id: 4, name: 'Kost putra 25 Cilacap Utara Cilacap', address: 'Jl. Abiyasa No.25 Cilacap', type: 'Putra', isVerified: false, isRecommended: true, price: 500000, remainingRooms: 5, mainImage: 'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=-G0xtxB_av7cVKF_p9ixzQ&cb_client=search.gws-prod.gps&w=408&h=240&yaw=358.83594&pitch=0&thumbfov=100', slug: 'kost puta 25' },
    { id: 5, name: 'Emerald Kost', address: 'Perum Bumi Rawakeong Cilacap', type: 'Campur', isVerified: true, isRecommended: false, price: 1300000, remainingRooms: 1, mainImage: 'https://www.sewakost.com/files/07-2024/ad174105/emerald-kost-eksklusif-2057557019_large.jpg', slug: 'emerald kost' },
    { id: 6, name: 'Rufindo Kost', address: 'JL Savita, Sidanegara, Cilacap Tengah ( depan pintu masuk Holcim. Tepatnya depan mushola)', type: 'Campur', isVerified: true, isRecommended: true, price: 850000, remainingRooms: 2, mainImage: 'https://www.sewakost.com/files/01-2021/ad48440/rufindo-kos-paviliun-rumah-petak-959202489_large.jpg', slug: 'Rufindo Kos' },
  ];
  kostDetails.value = allKosts.find(kost => kost.id == props.kostId);

  // Set default tanggal dan bulan saat ini
  const today = new Date();
  form.orderDate = today.getDate().toString();
  form.orderMonth = (today.getMonth() + 1).toString(); // getMonth() 0-indexed
});

const submitOrder = () => {
  // Menggunakan URL statis untuk POST request
  // Data akan dikirim ke AdonisJS, tapi tidak disimpan ke database di contoh ini
  form.post('/pesan', {
    onSuccess: () => {
      alert('Pesanan Anda telah berhasil dikirim! Silakan tunggu konfirmasi dari pengelola kost.');
      form.reset(); // Mengosongkan form setelah sukses
    },
    onError: (errors) => {
      console.error('Error submitting order:', errors);
      alert('Terjadi kesalahan saat mengirim pesanan. Silakan periksa kembali data Anda.');
    },
  });
};

const availableDates = computed(() => {
  const dates = [];
  for (let i = 1; i <= 31; i++) {
    dates.push(i.toString());
  }
  return dates;
});

const availableMonths = [
  { value: '1', name: 'Januari' }, { value: '2', name: 'Februari' },
  { value: '3', name: 'Maret' }, { value: '4', name: 'April' },
  { value: '5', name: 'Mei' }, { value: '6', name: 'Juni' },
  { value: '7', name: 'Juli' }, { value: '8', name: 'Agustus' },
  { value: '9', name: 'September' }, { value: '10', name: 'Oktober' },
  { value: '11', name: 'November' }, { value: '12', name: 'Desember' },
];
</script>

<template>
  <Head :title="`Pesan Kost ${kostDetails ? kostDetails.name : kostName}`" />

  <div class="min-h-screen flex flex-col bg-gray-100">
    <header class="bg-green-600 py-3 md:py-4 shadow-md">
      <nav class="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" class="flex items-center space-x-2">
          <img src="/public/logo.png" alt="Kost Logo" class="h-8 md:h-10" />
          <span class="text-xl md:text-2xl font-bold text-white hidden sm:block">KOST</span>
        </Link>
        <div class="flex items-center space-x-4 md:space-x-8 text-sm md:text-base">
          <Link href="/tentang-kami" class="text-white hover:text-green-200">Tentang Kami</Link>
          <Link href="/login" class="text-white hover:text-green-200">Masuk</Link>
        </div>
      </nav>
    </header>

    <main class="flex-grow container mx-auto px-4 py-8 md:py-12">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8">
        Form Pemesanan Kost
      </h1>

      <div class="bg-white rounded-lg shadow-md p-6 md:p-8 max-w-2xl mx-auto">
        <div v-if="kostDetails" class="mb-6 border-b pb-4">
          <h2 class="text-2xl font-semibold text-gray-800 mb-2">{{ kostDetails.name }}</h2>
          <p class="text-gray-600 mb-1">Alamat: {{ kostDetails.address }}</p>
          <p class="text-green-600 font-bold text-xl">Harga: Rp. {{ kostDetails.price.toLocaleString('id-ID') }} / bulan</p>
        </div>
        <div v-else class="mb-6 border-b pb-4">
            <h2 class="text-2xl font-semibold text-gray-800 mb-2">{{ kostName }}</h2>
            <p class="text-gray-600 mb-1" v-if="kostAddress">Alamat: {{ kostAddress }}</p>
            <p class="text-green-600 font-bold text-xl" v-if="kostPrice">Harga: Rp. {{ kostPrice.toLocaleString('id-ID') }} / bulan</p>
            <p v-else class="text-gray-500">Detail kost tidak tersedia. ID Kost: {{ kostId }}</p>
        </div>

        <form @submit.prevent="submitOrder" class="space-y-6">
          <div>
            <label for="fullName" class="block text-gray-700 text-sm font-bold mb-2">Nama Lengkap:</label>
            <input
              type="text"
              id="fullName"
              v-model="form.fullName"
              class="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-green-400 focus:border-green-400"
              required
            />
            <div v-if="form.errors.fullName" class="text-red-500 text-xs mt-1">{{ form.errors.fullName }}</div>
          </div>

          <div>
            <label for="phoneNumber" class="block text-gray-700 text-sm font-bold mb-2">Nomor Telepon (WhatsApp):</label>
            <input
              type="tel"
              id="phoneNumber"
              v-model="form.phoneNumber"
              class="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-green-400 focus:border-green-400"
              placeholder="Contoh: 081234567890"
              required
            />
            <div v-if="form.errors.phoneNumber" class="text-red-500 text-xs mt-1">{{ form.errors.phoneNumber }}</div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="orderDate" class="block text-gray-700 text-sm font-bold mb-2">Tanggal Masuk (Tanggal):</label>
              <select
                id="orderDate"
                v-model="form.orderDate"
                class="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-green-400 focus:border-green-400 bg-white appearance-none pr-8"
                required
              >
                <option value="">Pilih Tanggal</option>
                <option v-for="date in availableDates" :key="date" :value="date">{{ date }}</option>
              </select>
              <div v-if="form.errors.orderDate" class="text-red-500 text-xs mt-1">{{ form.errors.orderDate }}</div>
            </div>
            <div>
              <label for="orderMonth" class="block text-gray-700 text-sm font-bold mb-2">Tanggal Masuk (Bulan):</label>
              <select
                id="orderMonth"
                v-model="form.orderMonth"
                class="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-green-400 focus:border-green-400 bg-white appearance-none pr-8"
                required
              >
                <option value="">Pilih Bulan</option>
                <option v-for="month in availableMonths" :key="month.value" :value="month.value">{{ month.name }}</option>
              </select>
              <div v-if="form.errors.orderMonth" class="text-red-500 text-xs mt-1">{{ form.errors.orderMonth }}</div>
            </div>
          </div>

          <div>
            <label for="notes" class="block text-gray-700 text-sm font-bold mb-2">Catatan Tambahan (Opsional):</label>
            <textarea
              id="notes"
              v-model="form.notes"
              rows="4"
              class="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-green-400 focus:border-green-400"
            ></textarea>
            <div v-if="form.errors.notes" class="text-red-500 text-xs mt-1">{{ form.errors.notes }}</div>
          </div>

          <button
            type="submit"
            class="w-full bg-green-600 text-white py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 shadow-md"
            :disabled="form.processing"
          >
            <svg v-if="form.processing" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Kirim Pesanan</span>
          </button>
        </form>
      </div>
    </main>

    <footer class="bg-gray-800 text-gray-300 py-12 md:py-16">
      <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 text-sm md:text-base">
        <div>
          <Link href="/" class="mb-4 inline-block">
            <img src="/public/logo.png" alt="Kost Logo" class="h-10" />
          </Link>
          <p class="font-bold text-lg mb-4">TETAP TERHUBUNG</p>
          <div class="flex space-x-4 mb-6">
            <a href="https://facebook.com/kostofficial" target="_blank" class="hover:text-white transition-colors">
              <i class="fab fa-facebook-f text-2xl"></i> <span class="ml-1">kostofficial</span>
            </a>
            <a href="https://youtube.com/kostofficial" target="_blank" class="hover:text-white transition-colors">
              <i class="fab fa-youtube text-2xl"></i> <span class="ml-1">kost</span>
            </a>
          </div>
        </div>

        <div>
          <h3 class="font-bold text-lg mb-4 text-white">TENTANG KOST</h3>
          <ul class="space-y-2">
            <li><Link href="/hubungi-kami" class="hover:text-white transition-colors">Hubungi Kami</Link></li>
            <li><Link href="/tentang-kami" class="hover:text-white transition-colors">Tentang Kami</Link></li>
          </ul>
        </div>
      </div>
      <div class="bg-green-600 py-3 text-center mt-12 text-white text-sm md:text-base">
        <p>Copyright © 2025 kost.com - Satu Aplikasi untuk Semua Kebutuhan Kost</p>
      </div>
    </footer>
  </div>
</template>