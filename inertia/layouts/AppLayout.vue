<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navbar atau Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ title }}
        </h1>
      </div>
    </header>

    <!-- Konten Halaman -->
    <main class="py-6 px-4 sm:px-6 lg:px-8">
      <slot />
    </main>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'My App'
  }
})
</script>
