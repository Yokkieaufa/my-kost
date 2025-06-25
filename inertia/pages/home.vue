<script setup>
import { ref, onMounted, onUnmounted, defineProps, computed, watch } from 'vue';
import { Head, Link } from '@inertiajs/vue3';

const props = defineProps({
  featuredKosts: {
    type: Array,
    default: () => [
      { id: 1, name: 'KOST PUTRA CILACAP KOTA', address: 'Jalan Kalimas No.17, Cilacap Tengah', type: 'Putra', isVerified: true, isRecommended: true, price: 500000, remainingRooms: 2, mainImage: 'https://www.sewakost.com/files/01-2023/ad109903/kos-putra-cilacap-kota-1339313874_large.jpg', slug: 'Kost Putra Cilacap Kota' },
      { id: 2, name: 'KOST Pandawa', address: 'Jl. Sawo, Kandang Macan, Tegalreja, Kec. Cilacap Sel., Kabupaten Cilacap, Jawa Tengah, Cilacap, 53214 Cilacap, Indonesia', type: 'Campur', isVerified: true, isRecommended: false, price: 550000, remainingRooms: 4, mainImage: 'https://infocilacap.net/wp-content/uploads/2020/07/kost-pandawa.jpg', slug: 'kost pandawa' },
      { id: 3, name: 'KOST Zhafran Sindoro', address: 'Jl. Sindoro (belakang kabupaten) Cilacap', type: 'Campur', isVerified: true, isRecommended: true, price: 1300000, remainingRooms: 3, mainImage: 'https://infocilacap.net/hotel/wp-content/uploads/2019/12/zhafran-kost.jpg', slug: 'Kost Zhafran' },
      { id: 4, name: 'Kost putra 25 Cilacap Utara Cilacap', address: 'Jl. Abiyasa No.25 Cilacap', type: 'Putra', isVerified: false, isRecommended: true, price: 500000, remainingRooms: 5, mainImage: 'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=-G0xtxB_av7cVKF_p9ixzQ&cb_client=search.gws-prod.gps&w=408&h=240&yaw=358.83594&pitch=0&thumbfov=100', slug: 'kost puta 25' },
      { id: 5, name: 'Emerald Kost', address: 'Perum Bumi Rawakeong Cilacap', type: 'Campur', isVerified: true, isRecommended: false, price: 1300000, remainingRooms: 1, mainImage: 'https://www.sewakost.com/files/07-2024/ad174105/emerald-kost-eksklusif-2057557019_large.jpg', slug: 'emerald kost' },
      { id: 6, name: 'Rufindo Kost', address: 'JL Savita, Sidanegara, Cilacap Tengah ( depan pintu masuk Holcim. Tepatnya depan mushola)', type: 'Campur', isVerified: true, isRecommended: true, price: 850000, remainingRooms: 2, mainImage: 'https://www.sewakost.com/files/01-2021/ad48440/rufindo-kos-paviliun-rumah-petak-959202489_large.jpg', slug: 'Rufindo Kos' },
    ],
  },
});

const searchQuery = ref('');
const selectedLocation = ref(''); 
const selectedKostType = ref('');

const availableLocations = ref([
  'Cilacap Tengah',
  'Cilacap Utara',
  'Cilacap Selatan',
]);

const filteredKosts = computed(() => {
  let filtered = props.featuredKosts;

  if (searchQuery.value.trim()) {
    const searchLower = searchQuery.value.trim().toLowerCase();
    filtered = filtered.filter(kost =>
      kost.name.toLowerCase().includes(searchLower) ||
      kost.address.toLowerCase().includes(searchLower)
    );
  }

  if (selectedLocation.value) { // Only filter if a specific location is selected
    const locationLower = selectedLocation.value.toLowerCase();
    filtered = filtered.filter(kost =>
      kost.address.toLowerCase().includes(locationLower)
    );
  }

  if (selectedKostType.value) {
    const typeLower = selectedKostType.value.toLowerCase();
    filtered = filtered.filter(kost =>
      kost.type.toLowerCase() === typeLower
    );
  }
  return filtered;
});

const performSearch = () => { }; 

const showScrollToTop = ref(false);

const openWhatsApp = () => {
  window.open('https://wa.me/6281xxxxxxxx?text=Halo%2C%20saya%20ingin%20bertanya%20tentang%20kost%20secara%20umum.', '_blank');
};

const handleScroll = () => {
  showScrollToTop.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <Head title="Cari Kost Impianmu di Sini - KOST" />

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

    <main class="flex-grow">
      <section class="relative bg-gradient-to-r from-green-700 to-green-500 text-white py-16 md:py-24">
        <img src="/public/background.png" alt="Hero Background" class="absolute inset-0 w-full h-full object-cover opacity-30">
        <div class="container mx-auto px-4 text-center relative z-10" data-aos="fade-up">
          <h1 class="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Temukan Kost Idamanmu di Cilacap!
          </h1>
          <p class="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Ratusan pilihan kost terverifikasi di Cilacap dengan fasilitas lengkap dan harga terbaik.
          </p>

          <form @submit.prevent="performSearch" class="max-w-2xl mx-auto bg-white p-6 rounded-3xl shadow-xl space-y-4">
            <div class="w-full">
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Cari nama kost atau jalan di Cilacap..."
                class="w-full py-3 px-4 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div class="w-full">
              <select
                v-model="selectedLocation"
                class="w-full py-3 px-4 rounded-lg border border-gray-300 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none pr-8"
              >
                <option value="">Semua Lokasi</option> <option v-for="location in availableLocations" :key="location" :value="location">
                  {{ location }}
                </option>
              </select>
            </div>
            <div class="w-full">
              <select
                v-model="selectedKostType"
                class="w-full py-3 px-4 rounded-lg border border-gray-300 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none pr-8"
              >
                <option value="">Semua Tipe</option>
                <option value="Putra">Putra</option>
                <option value="Putri">Putri</option>
                <option value="Campur">Campur</option>
              </select>
            </div>
            </form>
        </div>
      </section>

      <section class="container mx-auto px-4 py-12 md:py-16">
        <h2 class="text-3xl font-bold text-gray-800 text-center mb-8" data-aos="fade-up">
          Kost Pilihan Terbaik di Cilacap
        </h2>
        <div class="grid grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="kost in filteredKosts" :key="kost.id" class="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300" data-aos="fade-up">
            <Link :href="`/kost/${kost.slug || kost.id}`">
              <img :src="kost.mainImage || 'https://via.placeholder.com/600x400/CCCCCC/888888?text=No+Image'" :alt="kost.name" class="w-full h-48 object-cover">
              <div class="p-4">
                <h3 class="text-xl font-semibold text-gray-800 truncate mb-1">{{ kost.name }}</h3>
                <p class="text-gray-600 text-sm mb-2">{{ kost.address }}</p>
                <div class="flex items-center space-x-2 mb-3">
                  <span
                    class="px-2 py-0.5 rounded-full text-xs font-semibold"
                    :class="{
                      'bg-yellow-200 text-yellow-800': kost.type === 'Campur',
                      'bg-blue-200 text-blue-800': kost.type === 'Putra',
                      'bg-pink-200 text-pink-800': kost.type === 'Putri',
                    }"
                  >
                    {{ kost.type.toUpperCase() }}
                  </span>
                  <span v-if="kost.isVerified" class="px-2 py-0.5 rounded-full bg-green-200 text-green-800 text-xs">Verified</span>
                </div>
                <div class="flex justify-between items-center mb-3">
                  <span class="text-green-600 font-bold text-lg">
                    Rp. {{ kost.price.toLocaleString('id-ID') }} / bulan
                  </span>
                  <span class="text-gray-500 text-sm">Sisa {{ kost.remainingRooms }} kamar</span>
                </div>
                <Link :href="`/pesan/${kost.id}`" class="block w-full bg-blue-500 text-white py-2 rounded-md text-center hover:bg-blue-600 transition-colors mt-2">
                    Pesan Sekarang
                </Link>
              </div>
            </Link>
          </div>
        </div>
        <div v-if="filteredKosts.length === 0" class="text-center text-gray-600 mt-8 text-lg">
            Tidak ditemukan kost yang sesuai dengan kriteria pencarian Anda di Cilacap.
        </div>
        <div class="text-center mt-10">
          <Link href="/cari-kost" class="inline-block bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg">
            Lihat Semua Kost di Cilacap
          </Link>
        </div>
      </section>

      <section class="bg-white py-12 md:py-16">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-gray-800 text-center mb-10" data-aos="fade-up">
            Mudahnya Cari Kost di KOST
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm" data-aos="fade-up" data-aos-delay="100">
              <div class="bg-green-100 p-4 rounded-full mb-4">
                <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.243M12 12a3 3 0 100-6 3 3 0 000 6zM7 20h10a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">1. Cari Kost Pilihanmu</h3>
              <p class="text-gray-600">Gunakan fitur pencarian canggih kami untuk menemukan kost berdasarkan lokasi, harga, jenis, dan fasilitas.</p>
            </div>
            <div class="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm" data-aos="fade-up" data-aos-delay="200">
              <div class="bg-green-100 p-4 rounded-full mb-4">
                <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">2. Lihat Detail & Hubungi</h3>
              <p class="text-gray-600">Jelajahi foto, deskripsi lengkap, fasilitas, dan hubungi pengelola langsung via WhatsApp.</p>
            </div>
            <div class="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm" data-aos="fade-up" data-aos-delay="300">
              <div class="bg-green-100 p-4 rounded-full mb-4">
                <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.001 12.001 0 002.928 12c.708 3.978 3.868 7.214 7.632 8.799a12.004 12.004 0 001.442.202h.001a12.004 12.004 0 001.442-.202c3.764-1.585 6.924-4.821 7.632-8.799a12.001 12.001 0 00-.584-6.056z"></path></svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">3. Aman & Terpercaya</h3>
              <p class="text-gray-600">Semua properti terverifikasi, memberikan Anda ketenangan dalam mencari kost.</p>
            </div>
          </div>
        </div>
      </section>
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
            <li class="hover:text-white transition-colors"><Link href="/hubungi-kami">Hubungi Kami</Link></li>
            <li><Link href="/tentang-kami" class="hover:text-white transition-colors">Tentang Kami</Link></li>
          </ul>
        </div>
      </div>
      <div class="bg-green-600 py-3 text-center mt-12 text-white text-sm md:text-base">
        <p>Copyright © 2025 kost.com - Satu Aplikasi untuk Semua Kebutuhan Kost</p>
      </div>
    </footer>

    <div class="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-3">
      <button @click="openWhatsApp" class="bg-green-500 text-white p-3 rounded-full shadow-lg flex items-center space-x-2 text-base hover:bg-green-600 transition-colors">
        <i class="fab fa-whatsapp text-xl"></i>
        <span>Chat Whatsapp</span>
      </button>

      <button v-if="showScrollToTop" @click="scrollToTop" class="bg-gray-700 text-white p-3 rounded-full shadow-lg hover:bg-gray-600 transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
      </button>
    </div>
  </div>
</template>