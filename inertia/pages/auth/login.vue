<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3'
import { router } from '@inertiajs/vue3'

const loginForm = useForm({
  email: '',
  password: '',
})

function goHome() {
  router.visit('/')
}
</script>

<template>
  <div class="login-bg-frieren">
    <Head title="Login" />
    <div class="login-glass">
      <h2 class="login-title">Login</h2>
      <form @submit.prevent="loginForm.post('/login')" class="login-form">
        <input
          type="email"
          name="email"
          v-model="loginForm.email"
          placeholder="Enter your email"
          required
        >
        <input
          type="password"
          name="password"
          v-model="loginForm.password"
          placeholder="Enter your password"
          required
        >
        <button
          type="submit"
          :disabled="loginForm.processing"
          class="login-btn"
        >
          {{ loginForm.processing ? 'Loading...' : 'Log In' }}
        </button>
      </form>
      <div class="register-link">
        Don't have an account?
        <Link href="/register">Register</Link>
      </div>
      <button class="home-btn" @click="goHome">Back to Home</button>
    </div>
  </div>
</template>

<style scoped>
.login-bg-frieren {
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  background: url('/public/anime.gif') center center no-repeat;
  background-size: cover;
}
.login-glass {
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
.login-title {
  font-size: 2rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 1.5rem;
  text-align: center;
  letter-spacing: 0.03em;
  text-shadow: 0 2px 16px #fff6;
}
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  width: 100%;
}
.login-form input {
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
.login-form input:focus {
  background: rgba(255,255,255,0.28);
  border-bottom: 2.5px solid #3b82f6;
}
.login-btn {
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
.login-btn:disabled {
  background: #b6e0ef;
  cursor: not-allowed;
  color: #fff;
}
.login-btn:hover:not(:disabled) {
  background: linear-gradient(90deg, #0891b2 0%, #2563eb 100%);
  box-shadow: 0 4px 16px #06b6d433;
}
.register-link {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.97rem;
  color: #222;
}
.register-link a {
  color: #06b6d4;
  text-decoration: underline;
  font-weight: 600;
  margin-left: 3px;
}
.home-btn {
  margin-top: 1.2rem;
  background: #fff;
  color: #06b6d4;
  border: 1.5px solid #06b6d4;
  border-radius: 8px;
  padding: 8px 28px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border 0.2s;
}
.home-btn:hover {
  background: #06b6d4;
  color: #fff;
  border-color: #3b82f6;
}
@media (max-width: 600px) {
  .login-glass {
    padding: 1.5rem 0.5rem 1.5rem;
    max-width: 98vw;
  }
}
</style>