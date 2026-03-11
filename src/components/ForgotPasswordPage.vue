<template>
  <div class="login-page">
    <div
      class="lang-switcher position-fixed top-0 end-0 mt-3 me-4 d-flex align-items-center gap-1 z-3"
    >
      <button
        class="btn btn-sm lang-btn"
        :class="{ 'lang-active': $i18n.locale === 'hr' }"
        @click="switchLang('hr')"
      >
        HR
      </button>
      <span class="text-muted small">|</span>
      <button
        class="btn btn-sm lang-btn"
        :class="{ 'lang-active': $i18n.locale === 'en' }"
        @click="switchLang('en')"
      >
        EN
      </button>
    </div>

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

            <div class="divider-line d-none d-lg-block mb-4"></div>

            <ul class="features list-unstyled mb-0">
              <li class="d-flex align-items-start mb-3">
                <span class="feature-icon me-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="10" fill="#2b579a" opacity="0.1" />
                    <path d="M6 10l3 3 5-5" stroke="#2b579a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
                <span>{{ $t("branding.feature1") }}</span>
              </li>
              <li class="d-flex align-items-start mb-3">
                <span class="feature-icon me-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="10" fill="#2b579a" opacity="0.1" />
                    <path d="M6 10l3 3 5-5" stroke="#2b579a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
                <span>{{ $t("branding.feature2") }}</span>
              </li>
              <li class="d-flex align-items-start">
                <span class="feature-icon me-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="10" fill="#2b579a" opacity="0.1" />
                    <path d="M6 10l3 3 5-5" stroke="#2b579a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
                <span>{{ $t("branding.feature3") }}</span>
              </li>
            </ul>
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
              {{ $t("forgotPassword.title") }}
            </h1>
            <p class="text-muted text-center small mb-4">
              {{ $t("forgotPassword.subtitle") }}
            </p>

            <div v-if="sent" class="success-box text-center mb-4">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" class="mb-3">
                <circle cx="12" cy="12" r="11" stroke="#27ae60" stroke-width="2" />
                <path d="M7 12l3 3 7-7" stroke="#27ae60" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <p class="fw-semibold mb-1" style="color:#27ae60">{{ $t("forgotPassword.sentTitle") }}</p>
              <p class="text-muted small mb-0">{{ $t("forgotPassword.sentMessage") }}</p>
            </div>

            <form v-else @submit.prevent="handleSubmit">
              <div class="mb-4">
                <label
                  for="resetEmail"
                  class="form-label small fw-semibold text-uppercase letter-spacing"
                >
                  {{ $t("login.email") }}
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
                    <rect x="2" y="4" width="20" height="16" rx="3" />
                    <path d="M22 7l-10 7L2 7" />
                  </svg>
                  <input
                    id="resetEmail"
                    v-model="email"
                    type="email"
                    class="form-control form-input"
                    :placeholder="$t('login.emailPlaceholder')"
                    autocomplete="email"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                class="btn btn-primary w-100 fw-semibold py-2 btn-login mb-3"
              >
                {{ $t("forgotPassword.submit") }}
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
export default {
  name: "ForgotPasswordPage",
  emits: ["back"],
  data() {
    return {
      email: "",
      sent: false,
    };
  },
  methods: {
    handleSubmit() {
      this.sent = true;
    },
    switchLang(lang) {
      this.$i18n.locale = lang;
      localStorage.setItem("locale", lang);
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

.divider-line {
  width: 60px;
  height: 3px;
  background: linear-gradient(to right, #2b579a, #4a80c4);
  border-radius: 2px;
}

.features li {
  color: #4a5568;
  font-size: 0.92rem;
  line-height: 1.5;
}
.feature-icon {
  flex-shrink: 0;
  margin-top: 2px;
}

.lang-btn {
  color: #9ca3af;
  font-weight: 600;
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  transition: all 0.2s;
}
.lang-btn:hover {
  color: #2b579a;
}
.lang-active {
  color: #2b579a !important;
  background: rgba(43, 87, 154, 0.1) !important;
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

@media (max-width: 575.98px) {
  .login-card {
    margin: 1rem;
    padding: 1.5rem 1.25rem !important;
  }
}
</style>
