<script setup lang="ts">
import { ref } from 'vue'
import { router, Link } from '@inertiajs/vue3'

const form = ref({
  fullName: '',
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref<string | null>(null)

const submit = async () => {
  loading.value = true
  error.value = null
  router.post('/register', form.value, {
    onFinish: () => loading.value = false,
    onError: (e) => error.value = e.message || 'Register gagal'
  })
}
</script>

<template>
  <div class="register-bg-japan">
    <div class="register-glass">
      <h1 class="register-title">Register</h1>
      <p class="register-desc">
        Sudah punya akun?
        <Link href="/login" class="register-link-login">Login</Link>
      </p>
      <form class="register-form" @submit.prevent="submit">
        <input
          v-model="form.fullName"
          type="text"
          placeholder="Full Name"
          required
        />
        <input
          v-model="form.email"
          type="email"
          placeholder="Email"
          required
        />
        <input
          v-model="form.password"
          type="password"
          placeholder="Password"
          required
        />
        <div v-if="error" class="register-error">{{ error }}</div>
        <button
          type="submit"
          :disabled="loading"
          class="register-btn"
        >
          {{ loading ? 'Registering...' : 'Register' }}
        </button>
      </form>
    </div>
    <!-- Animated Japan background elements -->
    <div class="japan-sun"></div>
    <div class="japan-mountain"></div>
    <div class="japan-cloud cloud1"></div>
    <div class="japan-cloud cloud2"></div>
    <div class="japan-cloud cloud3"></div>
    <div class="japan-bird bird1"></div>
    <div class="japan-bird bird2"></div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

.register-bg-japan {
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(180deg, #f9fafb 0%, #e0e7ef 100%);
}

/* Japan Sun */
.japan-sun {
  position: absolute;
  top: 12vh;
  left: 50%;
  transform: translateX(-50%);
  width: 180px;
  height: 180px;
  background: radial-gradient(circle at 60% 40%, #ffb3b3 60%, #ff5252 100%);
  border-radius: 50%;
  z-index: 1;
  animation: sunMove 10s infinite alternate;
  opacity: 0.85;
}
@keyframes sunMove {
  0% { filter: brightness(1) blur(0px);}
  100% { filter: brightness(1.1) blur(2px);}
}

/* Japan Mountain */
.japan-mountain {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 700px;
  height: 220px;
  background: linear-gradient(180deg, #b0b7c6 60%, #6e7fa3 100%);
  clip-path: polygon(0 100%, 10% 60%, 20% 80%, 30% 55%, 40% 75%, 50% 50%, 60% 80%, 70% 60%, 80% 85%, 90% 65%, 100% 100%);
  z-index: 1;
  animation: mountainMove 12s infinite alternate;
  opacity: 0.95;
}
@keyframes mountainMove {
  0% { filter: brightness(1);}
  100% { filter: brightness(1.08);}
}

/* Japan Clouds */
.japan-cloud {
  position: absolute;
  background: #fff;
  border-radius: 50%;
  opacity: 0.7;
  z-index: 2;
}
.cloud1 {
  width: 120px; height: 40px;
  top: 90px; left: 18vw;
  animation: cloudMove1 18s linear infinite;
}
.cloud2 {
  width: 90px; height: 32px;
  top: 160px; right: 16vw;
  animation: cloudMove2 22s linear infinite;
}
.cloud3 {
  width: 60px; height: 22px;
  top: 60px; left: 60vw;
  animation: cloudMove3 15s linear infinite;
}
@keyframes cloudMove1 {
  0% { left: 18vw; }
  100% { left: 60vw; }
}
@keyframes cloudMove2 {
  0% { right: 16vw; }
  100% { right: 60vw; }
}
@keyframes cloudMove3 {
  0% { left: 60vw; }
  100% { left: 10vw; }
}

/* Japan Birds */
.japan-bird {
  position: absolute;
  width: 36px; height: 36px;
  background: none;
  z-index: 3;
}
.bird1, .bird2 {
  top: 120px;
  background: none;
}
.bird1 {
  left: 30vw;
  animation: birdFly1 12s linear infinite;
}
.bird2 {
  left: 60vw;
  animation: birdFly2 14s linear infinite;
}
.japan-bird::before, .japan-bird::after {
  content: '';
  position: absolute;
  width: 18px;
  height: 6px;
  border-radius: 50% 50% 0 0;
  background: #222;
  top: 16px;
}
.japan-bird::before {
  left: 0;
  transform: rotate(-20deg);
}
.japan-bird::after {
  right: 0;
  transform: rotate(20deg);
}
@keyframes birdFly1 {
  0% { left: 30vw; top: 120px;}
  50% { left: 50vw; top: 100px;}
  100% { left: 70vw; top: 140px;}
}
@keyframes birdFly2 {
  0% { left: 60vw; top: 140px;}
  50% { left: 40vw; top: 110px;}
  100% { left: 20vw; top: 130px;}
}

/* Register Card */
.register-glass {
  position: relative;
  z-index: 10;
  background: rgba(255,255,255,0.92);
  border-radius: 18px;
  box-shadow: 0 8px 32px #0003;
  padding: 2.5rem 2rem 2rem;
  width: 100%;
  max-width: 370px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1.5px solid #e0e7ef;
}

.register-title {
  font-size: 2rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 0.5rem;
  text-align: center;
  letter-spacing: 0.03em;
  text-shadow: 0 2px 16px #fff6;
}

.register-desc {
  color: #444;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.register-link-login {
  color: #06b6d4;
  text-decoration: underline;
  font-weight: 600;
  margin-left: 3px;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  width: 100%;
}

.register-form input {
  width: 100%;
  padding: 12px 14px;
  border: none;
  border-bottom: 2px solid #06b6d4;
  border-radius: 6px 6px 0 0;
  font-size: 1rem;
  background: rgba(255,255,255,0.18);
  color: #222;
  outline: none;
  transition: background 0.2s, border 0.2s;
}
.register-form input:focus {
  background: rgba(255,255,255,0.28);
  border-bottom: 2.5px solid #3b82f6;
}

.register-error {
  color: #e11d48;
  font-size: 0.97rem;
  margin-bottom: 0.2rem;
  text-align: center;
}

.register-btn {
  background: linear-gradient(90deg, #06b6d4 0%, #3b82f6 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 0.5rem;
  box-shadow: 0 2px 8px #06b6d422;
  transition: background 0.2s, box-shadow 0.2s;
}

.register-btn:disabled {
  background: #b6e0ef;
  cursor: not-allowed;
  color: #fff;
}

.register-btn:hover:not(:disabled) {
  background: linear-gradient(90deg, #0891b2 0%, #2563eb 100%);
  box-shadow: 0 4px 16px #06b6d433;
}

@media (max-width: 600px) {
  .register-glass {
    padding: 1.5rem 0.5rem 1.5rem;
    max-width: 98vw;
  }
  .japan-mountain {
    width: 110vw;
    height: 90px;
  }
  .japan-sun {
    width: 90px;
    height: 90px;
    top: 6vh;
  }
}
</style>