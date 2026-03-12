<template>
  <div class="dashboard-layout d-flex min-vh-100">
    <SidebarNav
      :companies="companies"
      :selected-company="selectedCompany"
      :user-name="userName"
      @logout="$emit('logout')"
      @add-company="$emit('add-company')"
      @edit-profile="$emit('edit-profile')"
      @select-company="$emit('select-company', $event)"
      @update-companies="$emit('update-companies', $event)"
    />

    <main class="main-content flex-grow-1 d-flex align-items-center justify-content-center">
      <div class="edit-card">
        <h5 class="edit-title">{{ $t("profileEdit.title") }}</h5>

        <div class="mb-3">
          <label class="form-label-sm">{{ $t("profileEdit.fullName") }}:</label>
          <input v-model="form.fullName" type="text" class="form-control form-control-sm" />
        </div>

        <div class="mb-3">
          <label class="form-label-sm">{{ $t("profileEdit.email") }}:</label>
          <input v-model="form.email" type="email" class="form-control form-control-sm" />
        </div>

        <div class="mb-3">
          <label class="form-label-sm">{{ $t("profileEdit.pw") }}:</label>
          <input v-model="form.password" type="password" class="form-control form-control-sm" :placeholder="$t('profileEdit.newPassword') || 'New password'" />
        </div>

        <div class="mb-4">
          <label class="form-label-sm">{{ $t("profileEdit.createdAt") }}:</label>
          <input v-model="form.createdAt" type="text" class="form-control form-control-sm" readonly />
        </div>

        <div class="d-flex flex-column gap-2">
          <button class="btn btn-action" @click="saveProfile">
            <span>{{ $t("profileEdit.saveChanges") }}</span>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" opacity="0.8">
              <path d="M2 1a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1H9.5a1 1 0 00-1 1v7.293l2.646-2.647a.5.5 0 01.708.708l-3.5 3.5a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L7.5 9.293V2a2 2 0 012-2H14a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V2a2 2 0 012-2h2.5a.5.5 0 010 1z" />
            </svg>
          </button>
          <button class="btn btn-action" @click="$emit('back')">
            <span>{{ $t("profileEdit.goBack") }}</span>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" opacity="0.8">
              <path d="M8.354 1.146a.5.5 0 00-.708 0l-6 6A.5.5 0 001.5 7.5v7a.5.5 0 00.5.5h4.5a.5.5 0 00.5-.5v-4h2v4a.5.5 0 00.5.5H14a.5.5 0 00.5-.5v-7a.5.5 0 00-.146-.354z" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import SidebarNav from "./SidebarNav.vue";
import api from "../api";

export default {
  name: "ProfileEditPage",
  components: { SidebarNav },
  props: {
    companies: { type: Array, default: () => [] },
    selectedCompany: { type: String, default: '' },
    userName: { type: String, default: '' },
    userId: { type: String, default: '' },
    userEmail: { type: String, default: '' },
  },
  emits: ["back", "logout", "select-company", "add-company", "update-companies", "edit-profile"],
  data() {
    return {
      form: {
        fullName: this.userName || "",
        email: this.userEmail || "",
        password: "",
        createdAt: "",
      },
    };
  },
  async created() {
    if (this.userId) {
      try {
        const { data } = await api.get(`/auth/me/${this.userId}`);
        this.form.fullName = data.fullName || "";
        this.form.email = data.email || "";
        this.form.createdAt = data.createdAt ? new Date(data.createdAt).toLocaleDateString("hr") : "";
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    }
  },
  methods: {
    async saveProfile() {
      if (!this.userId) return;
      const body = { fullName: this.form.fullName, email: this.form.email };
      if (this.form.password) body.password = this.form.password;
      try {
        await api.put(`/auth/me/${this.userId}`, body);
        this.form.password = "";
      } catch (err) {
        console.error("Failed to save profile:", err);
      }
    },
  },
};
</script>

<style scoped>
.main-content {
  background: #e8eaed;
  min-height: 100vh;
}
@media (max-width: 991.98px) {
  .main-content {
    padding-top: 50px;
  }
}

.edit-card {
  background: #f5f5f5;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 1.5rem 2rem;
  width: 100%;
  max-width: 420px;
}

.edit-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1.2rem;
}

.form-label-sm {
  font-size: 0.78rem;
  font-weight: 600;
  color: #444;
  margin-bottom: 0.2rem;
  display: block;
}

.form-control-sm {
  font-size: 0.82rem;
  border: 1.5px solid #bbb;
  border-radius: 4px;
  padding: 0.35rem 0.5rem;
}
.form-control-sm:focus {
  border-color: #2b579a;
  box-shadow: 0 0 0 2px rgba(43, 87, 154, 0.12);
}

.btn-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #2b579a;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.1rem;
  font-size: 0.9rem;
  font-weight: 600;
  transition: background 0.15s, transform 0.15s;
}
.btn-action:hover {
  background: #1e3f73;
  color: #fff;
  transform: translateX(3px);
}

@media (max-width: 767.98px) {
  .edit-card {
    max-width: 100%;
    margin: 1rem;
  }
  .btn-action {
    padding: 0.65rem 0.9rem;
    font-size: 0.85rem;
  }
}
</style>
