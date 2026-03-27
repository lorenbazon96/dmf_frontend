<template>
  <div class="login-page">
    <div class="container-fluid px-0">
      <div class="row g-0 min-vh-100">
        <div
          class="col-lg-7 d-flex align-items-center justify-content-center branding-side order-2 order-lg-1"
        >
          <div
            class="branding-content text-center text-lg-start px-4 px-md-5 py-5 py-lg-0"
          >
            <img
              src="@/assets/logo-dmf.png"
              alt="DMF Production"
              class="logo img-fluid mb-4"
            />
            <h2 class="tagline mb-4">{{ $t("branding.tagline") }}</h2>
          </div>
        </div>

        <div
          class="col-lg-5 d-flex align-items-center justify-content-center form-side order-1 order-lg-2"
        >
          <div class="login-card w-100 px-4 px-sm-5 py-5">
            <div class="text-center mb-4 d-lg-none">
              <img
                src="@/assets/logo-dmf.png"
                alt="DMF Production"
                class="logo-mobile img-fluid mb-2"
              />
            </div>

            <h1 class="login-title text-center mb-1">
              {{ $t("resetPassword.title") }}
            </h1>
            <p class="text-muted text-center small mb-4">
              {{ $t("resetPassword.subtitle") }}
            </p>

            <div v-if="error" class="alert alert-danger py-2 text-center small">{{ error }}</div>

            <div v-if="success" class="success-box text-center mb-4">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" class="mb-3">
                <circle cx="12" cy="12" r="11" stroke="#27ae60" stroke-width="2" />
                <path d="M7 12l3 3 7-7" stroke="#27ae60" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <p class="fw-semibold mb-1" style="color:#27ae60">{{ $t("resetPassword.successTitle") }}</p>
              <p class="text-muted small mb-0">{{ $t("resetPassword.successMessage") }}</p>
            </div>

            <form v-else @submit.prevent="handleReset">
              <div class="mb-3">
                <label
                  for="newPassword"
                  class="form-label small fw-semibold text-uppercase letter-spacing"
                >
                  {{ $t("resetPassword.newPassword") }}
                </label>
                <div class="input-icon-wrapper">
                  <svg
                    class="input-icon"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9ca3af"
                    stroke-width="2"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  <input
                    id="newPassword"
                    v-model="password"
                    type="password"
                    class="form-control form-input"
                    :placeholder="$t('resetPassword.newPasswordPlaceholder')"
                    required
                    minlength="6"
                  />
                </div>
              </div>

              <div class="mb-4">
                <label
                  for="confirmPassword"
                  class="form-label small fw-semibold text-uppercase letter-spacing"
                >
                  {{ $t("resetPassword.confirmPassword") }}
                </label>
                <div class="input-icon-wrapper">
                  <svg
                    class="input-icon"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9ca3af"
                    stroke-width="2"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  <input
                    id="confirmPassword"
                    v-model="confirmPassword"
                    type="password"
                    class="form-control form-input"
                    :placeholder="$t('resetPassword.confirmPasswordPlaceholder')"
                    required
                    minlength="6"
                  />
                </div>
              </div>

              <button
                type="submit"
                class="btn btn-primary w-100 fw-semibold py-2 btn-login mb-3"
              >
                {{ $t("resetPassword.submit") }}
              </button>
            </form>

            <div class="text-center mt-3">
              <a href="#" class="small text-decoration-none forgot-link" @click.prevent="$emit('back')">
                {{ $t("forgotPassword.backToLogin") }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api";

export default {
  name: "ResetPasswordPage",
  emits: ["back"],
  data() {
    return {
      password: "",
      confirmPassword: "",
      error: "",
      success: false,
    };
  },
  computed: {
    token() {
      const hash = window.location.hash;
      const match = hash.match(/token=([^&]+)/);
      return match ? match[1] : "";
    },
  },
  methods: {
    async handleReset() {
      this.error = "";
      if (this.password !== this.confirmPassword) {
        this.error = this.$t("resetPassword.mismatch");
        return;
      }
      try {
        await api.post("/auth/reset-password", {
          token: this.token,
          password: this.password,
        });
        this.success = true;
        window.location.hash = "";
      } catch (err) {
        this.error = err.response?.data?.error || "Greška";
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  background: #f0f2f5;
  min-height: 100vh;
}
.branding-side {
  background: linear-gradient(135deg, #f8f9fb 0%, #ebeef3 100%);
  position: relative;
}
.branding-side::after {
  content: "";
  position: absolute;
  right: 0;
  top: 10%;
  bottom: 10%;
  width: 1px;
  background: linear-gradient(to bottom, transparent, #d1d5db, transparent);
}
.form-side {
  background: #fff;
}
.branding-content {
  max-width: 520px;
}
.logo {
  max-width: 320px;
}
.logo-mobile {
  max-width: 200px;
}
.tagline {
  font-size: 1.05rem;
  font-weight: 600;
  color: #1a2a3a;
  line-height: 1.6;
}
.login-card {
  max-width: 420px;
  margin: 0 auto;
}
.login-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #1a2a3a;
}
.letter-spacing {
  letter-spacing: 0.05em;
  color: #6b7280;
}
.input-icon-wrapper {
  position: relative;
}
.input-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
.form-input {
  padding: 0.7rem 0.75rem 0.7rem 2.8rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  font-size: 0.92rem;
  background: #f9fafb;
  transition: all 0.2s;
}
.form-input:focus {
  border-color: #2b579a;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(43, 87, 154, 0.1);
}
.form-input::placeholder {
  color: #b0b7c3;
}
.btn-login {
  background: linear-gradient(135deg, #2b579a 0%, #1e3f73 100%);
  border: none;
  border-radius: 10px;
  font-size: 0.95rem;
  padding: 0.75rem;
  transition: all 0.25s;
  box-shadow: 0 2px 8px rgba(43, 87, 154, 0.3);
}
.btn-login:hover {
  background: linear-gradient(135deg, #1e3f73 0%, #162d54 100%);
  box-shadow: 0 4px 16px rgba(43, 87, 154, 0.4);
  transform: translateY(-1px);
}
.forgot-link {
  color: #2b579a;
  font-weight: 500;
}
.forgot-link:hover {
  text-decoration: underline !important;
}
.success-box {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 12px;
  padding: 1.5rem;
}
@media (max-width: 991.98px) {
  .branding-side {
    display: none !important;
  }
  .form-side {
    background: linear-gradient(135deg, #f8f9fb 0%, #ebeef3 100%);
    min-height: 100vh;
  }
  .login-card {
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08);
    padding: 2rem 1.5rem !important;
    max-width: 440px;
  }
}
@media (min-width: 992px) {
  .logo-mobile {
    display: none;
  }
}
</style>
