<template>
  <Head title="Cari Kost Impianmu di Sini - KOST" />

  <div class="min-h-screen flex flex-col bg-gray-100">
    <header class="bg-green-600 py-3 md:py-4 shadow-md">
      <nav class="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" class="flex items-center space-x-2">
          <img src="/anime-frieren.gif" alt="Kost Logo" class="h-8 md:h-10" />
          <span class="text-xl md:text-2xl font-bold text-white hidden sm:block">KOST</span>
        </Link>
        <div class="flex items-center space-x-4 md:space-x-8 text-sm md:text-base">
          <Link href="/panduan" class="text-white hover:text-green-200">Panduan</Link>
          <Link href="/hubungi-kami" class="text-white hover:text-green-200">Hubungi Kami</Link>
          <Link href="/cari-kost" class="text-white hover:text-green-200">Cari Kost</Link>
          <Link href="/coba-gratis" class="bg-white text-green-600 px-3 py-1 md:px-4 md:py-2 rounded-full shadow hover:bg-gray-100 transition-colors">Coba Gratis</Link>
          <Link href="/login" class="text-white hover:text-green-200">Masuk</Link>
        </div>
      </nav>
    </header>

    <main class="flex-grow">
      <section class="relative bg-gradient-to-r from-green-700 to-green-500 text-white py-16 md:py-24">
        <img src="/images/hero-bg.jpg" alt="Hero Background" class="absolute inset-0 w-full h-full object-cover opacity-30">
        <div class="container mx-auto px-4 text-center relative z-10" data-aos="fade-up">
          <h1 class="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Temukan Kost Idamanmu di Seluruh Indonesia!
          </h1>
          <p class="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Ratusan pilihan kost terverifikasi dengan fasilitas lengkap dan harga terbaik.
          </p>

          <form @submit.prevent="performSearch" class="max-w-2xl mx-auto bg-white p-6 rounded-3xl shadow-xl space-y-4">
            <div class="w-full">
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Cari lokasi, kota, atau nama kost..."
                class="w-full py-3 px-4 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div class="w-full">
              <select
                v-model="selectedLocation"
                class="w-full py-3 px-4 rounded-lg border border-gray-300 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none pr-8"
              >
                <option value="">Semua Lokasi</option>
                <option v-for="location in availableLocations" :key="location" :value="location">
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
            <button
              type="submit"
              class="w-full bg-green-600 text-white py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 shadow-md"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <span>Cari Kost</span>
            </button>
          </form>
        </div>
      </section>

      <section class="container mx-auto px-4 py-12 md:py-16">
        <h2 class="text-3xl font-bold text-gray-800 text-center mb-8" data-aos="fade-up">
          Kost Pilihan Terbaik
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="kost in featuredKosts" :key="kost.id" class="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300" data-aos="fade-up">
            <Link :href="`/kost/${kost.slug || kost.id}`">
              <img :src="kost.mainImage || '/images/default-kost-image.jpg'" :alt="kost.name" class="w-full h-48 object-cover">
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
                <div class="flex justify-between items-center">
                  <span class="text-green-600 font-bold text-lg">
                    Rp. {{ kost.price.toLocaleString('id-ID') }} / bulan
                  </span>
                  <span class="text-gray-500 text-sm">Sisa {{ kost.remainingRooms }} kamar</span>
                </div>
              </div>
            </Link>
          </div>
          </div>
        <div class="text-center mt-10">
          <Link href="/cari-kost" class="inline-block bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg">
            Lihat Semua Kost
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
            <img src="/images/kost-logo.png" alt="Kost Logo" class="h-10" />
          </Link>
          <p class="font-bold text-lg mb-4">TETAP TERHUBUNG</p>
          <div class="flex space-x-4 mb-6">
            <a href="https://facebook.com/kostofficial" target="_blank" class="hover:text-white transition-colors">
              <i class="fab fa-facebook-f text-2xl"></i> <span class="ml-1">kostofficial</span>
            </a>
            <a href="https://youtube.com/kost" target="_blank" class="hover:text-white transition-colors">
              <i class="fab fa-youtube text-2xl"></i> <span class="ml-1">kost</span>
            </a>
          </div>
          <div class="mt-8">
            <img src="/images/dun-and-bradstreet.png" alt="Dun & Bradstreet Registered" class="h-20" />
          </div>
        </div>

        <div>
          <h3 class="font-bold text-lg mb-4 text-white">TENTANG KOST</h3>
          <ul class="space-y-2">
            <li><Link href="/cara-pesan" class="hover:text-white transition-colors">Cara Pesan</Link></li>
            <li><Link href="/panduan-penggunaan" class="hover:text-white transition-colors">Panduan Penggunaan</Link></li>
            <li><Link href="/fitur-kost" class="hover:text-white transition-colors">Fitur KOST</Link></li>
            <li><Link href="/hubungi-kami" class="hover:text-white transition-colors">Hubungi Kami</Link></li>
            <li><Link href="/karir" class="hover:text-white transition-colors">Karir</Link></li>
            <li><Link href="/franchise-bisnis-kost" class="hover:text-white transition-colors">Franchise Bisnis Kost</Link></li>
            <li><Link href="/tentang-kami" class="hover:text-white transition-colors">Tentang Kami</Link></li>
            <li><Link href="/press-room" class="hover:text-white transition-colors">Press Room</Link></li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold text-lg mb-4 text-white">PRODUK</h3>
          <ul class="space-y-2">
            <li><Link href="/sewa-kost" class="hover:text-white transition-colors">Sewa Kost</Link></li>
            <li><Link href="/sewa-apartemen" class="hover:text-white transition-colors">Sewa Apartemen</Link></li>
            <li><Link href="/booking-system" class="hover:text-white transition-colors">Booking System</Link></li>
            <li><Link href="/accounting-system" class="hover:text-white transition-colors">Accounting System</Link></li>
            <li><Link href="/payment-gateway" class="hover:text-white transition-colors">Payment Gateway</Link></li>
            <li><Link href="/harga" class="hover:text-white transition-colors">Harga</Link></li>
            <li><Link href="/jasa-autopilot-bisnis-kost" class="hover:text-white transition-colors">Jasa Autopilot Bisnis Kost</Link></li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold text-lg mb-4 text-white">LAINNYA</h3>
          <ul class="space-y-2">
            <li><Link href="/program-afiliasi" class="hover:text-white transition-colors">Program Afiliasi</Link></li>
            <li><Link href="/blog" class="hover:text-white transition-colors">Blog</Link></li>
            <li><Link href="/kebijakan-privasi" class="hover:text-white transition-colors">Kebijakan Privasi</Link></li>
            <li><Link href="/syarat-dan-ketentuan" class="hover:text-white transition-colors">Syarat dan Ketentuan</Link></li>
            <li><Link href="/partnership" class="hover:text-white transition-colors">Partnership</Link></li>
            <li><Link href="/kostmart" class="hover:text-white transition-colors">KOSTMart</Link></li>
            <li><Link href="/workshop-bisnis-kost" class="hover:text-white transition-colors">Workshop Bisnis Kost</Link></li>
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

<script setup>
import { ref, onMounted, onUnmounted, defineProps } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';

// If you are using AOS (Animate On Scroll) and it's installed, uncomment these:
// import AOS from 'aos';
// import 'aos/dist/aos.css';

const props = defineProps({
  featuredKosts: {
    type: Array,
    default: () => [
      // Placeholder data for featured kosts if no data is passed from the backend
      { id: 1, name: 'Kost Melati Indah', address: 'Jl. Contoh No. 10, Jakarta Pusat', type: 'Putri', isVerified: true, isRecommended: true, price: 1500000, remainingRooms: 3, mainImage: '/images/kost-example-1.jpg', slug: 'kost-melati-indah' },
      { id: 2, name: 'Kost Putra Jaya', address: 'Jl. Probolinggo No. 5, Surabaya Barat', type: 'Putra', isVerified: true, isRecommended: false, price: 1200000, remainingRooms: 1, mainImage: '/images/kost-example-2.jpg', slug: 'kost-putra-jaya' },
      { id: 3, name: 'Kost Campur Harmoni', address: 'Jl. Damai Sejahtera No. 20, Bandung Selatan', type: 'Campur', isVerified: false, isRecommended: true, price: 1800000, remainingRooms: 5, mainImage: '/images/kost-example-3.jpg', slug: 'kost-campur-harmoni' },
      { id: 4, name: 'Kost Family Residence', address: 'Jl. Kebun Raya No. 12, Bogor Tengah', type: 'Campur', isVerified: true, isRecommended: true, price: 2000000, remainingRooms: 2, mainImage: '/images/kost-example-4.jpg', slug: 'kost-family-residence' },
      { id: 5, name: 'Kost Mahasiswa Cerdas', address: 'Jl. Pendidikan No. 7, Yogyakarta Utara', type: 'Putra', isVerified: true, isRecommended: false, price: 900000, remainingRooms: 4, mainImage: '/images/kost-example-5.jpg', slug: 'kost-mahasiswa-cerdas' },
      { id: 6, name: 'Kost Putri Bahagia', address: 'Jl. Bunga Melati No. 8, Malang Kota', type: 'Putri', isVerified: true, isRecommended: true, price: 1100000, remainingRooms: 0, mainImage: '/images/kost-example-6.jpg', slug: 'kost-putri-bahagia' },
    ],
  },
});

const searchQuery = ref('');
const selectedLocation = ref('');
const selectedKostType = ref('');

// Updated list of locations, including 'Cilacap'
const availableLocations = ref([
  'Jakarta Pusat',
  'Surabaya Barat',
  'Bandung Selatan',
  'Bogor Tengah',
  'Yogyakarta Utara',
  'Malang Kota',
  'Cilacap', // Current location context added
  // You would ideally fetch this from your backend
]);

const performSearch = () => {
  const params = {};
  if (searchQuery.value.trim()) {
    params.q = searchQuery.value.trim();
  }
  if (selectedLocation.value) {
    params.location = selectedLocation.value;
  }
  if (selectedKostType.value) {
    params.type = selectedKostType.value;
  }

  const queryString = new URLSearchParams(params).toString();
  router.visit(`/cari-kost${queryString ? '?' + queryString : ''}`);
};

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
  if (typeof AOS !== 'undefined') {
    AOS.init({
      once: true,
    });
  } else {
    console.warn('AOS not loaded. Ensure it is imported and initialized in your app.js.');
  }
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style>
/* You might want to add some custom styles if Tailwind's appearance-none
   isn't sufficient for customizing the select dropdown arrows.
   For example:
*/
/*
  select {
    background-image: url('data:image/svg+xml;utf8,<svg fill="%234A5568" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/></svg>');
    background-repeat: no-repeat;
    background-position: right 0.7em top 50%;
    background-size: 0.65em auto;
  }
*/
</style>