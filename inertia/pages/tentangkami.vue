<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Head, Link } from '@inertiajs/vue3';

const showScrollToTop = ref(false);

const openWhatsApp = () => {
  // Perbarui nomor telepon jika diperlukan
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
  <Head title="Tentang Kami - KOST" />

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
      <section class="bg-gradient-to-r from-green-700 to-green-500 text-white py-16 md:py-24 text-center">
        <div class="container mx-auto px-4">
          <h1 class="text-4xl md:text-5xl font-extrabold leading-tight mb-4" data-aos="fade-up">
            Tentang Kami
          </h1>
          <p class="text-lg md:text-xl mb-8 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Misi kami adalah membantu Anda menemukan kost idaman dengan mudah dan nyaman.
          </p>
        </div>
      </section>

      <section class="container mx-auto px-4 py-12 md:py-16">
        <div class="max-w-4xl mx-auto bg-white p-8 md:p-10 rounded-lg shadow-md">
          <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center" data-aos="fade-up">
            Selamat Datang di KOST
          </h2>
          <p class="text-gray-700 text-lg leading-relaxed mb-4" data-aos="fade-up" data-aos-delay="100">
            KOST adalah platform inovatif yang dirancang khusus untuk menyederhanakan proses pencarian kost di berbagai kota, khususnya di Cilacap. Kami memahami betapa menantangnya menemukan tempat tinggal yang sesuai dengan kebutuhan dan anggaran Anda. Oleh karena itu, kami hadir untuk menjadi solusi terdepan.
          </p>
          <p class="text-gray-700 text-lg leading-relaxed mb-4" data-aos="fade-up" data-aos-delay="200">
            Dengan ribuan daftar kost yang terverifikasi, mulai dari kost putra, putri, hingga campur, kami berkomitmen untuk menyediakan informasi yang akurat dan transparan. Setiap properti dilengkapi dengan detail fasilitas, foto terbaru, harga, dan informasi kontak pengelola agar Anda bisa membuat keputusan terbaik.
          </p>
          <p class="text-gray-700 text-lg leading-relaxed mb-4" data-aos="fade-up" data-aos-delay="300">
            Kami percaya bahwa menemukan tempat tinggal yang nyaman adalah kunci untuk pengalaman hidup yang menyenangkan. Dengan fitur pencarian yang canggih dan antarmuka yang ramah pengguna, KOST memudahkan Anda menyaring pilihan berdasarkan lokasi, harga, tipe, dan fasilitas yang diinginkan.
          </p>
          <p class="text-gray-700 text-lg leading-relaxed" data-aos="fade-up" data-aos-delay="400">
            Bergabunglah dengan ribuan pencari kost yang telah menemukan tempat tinggal impian mereka bersama KOST. Kami terus berinovasi untuk memberikan layanan terbaik dan menjadi sahabat terpercaya Anda dalam mencari kost.
          </p>
          <div class="text-center mt-10 space-x-4" data-aos="fade-up" data-aos-delay="500">
            <Link href="/hubungi-kami" class="inline-block bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg">
              Hubungi Kami
            </Link>
            <Link href="/" class="inline-block bg-gray-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-700 transition-colors shadow-lg">
              Kembali ke Beranda
            </Link>
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
            <li><Link href="/hubungi-kami" class="hover:text-white transition-colors">Hubungi Kami</Link></li>
            <li><Link href="/tentang-kami" class="hover:text-white transition-colors">Tentang Kami</Link></li>
          </ul>
        </div>

        <div class="md:col-span-2">
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

