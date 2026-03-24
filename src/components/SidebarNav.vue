<template>
  <div>
    <div
      class="mobile-topbar d-lg-none d-flex align-items-center justify-content-between px-3"
    >
      <img src="@/assets/logo-dmf.png" alt="DMF" class="mobile-logo" />
      <button class="btn btn-sm text-white" @click="sidebarOpen = !sidebarOpen">
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path
            d="M2.5 12a.5.5 0 01.5-.5h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5m0-4a.5.5 0 01.5-.5h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5m0-4a.5.5 0 01.5-.5h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5"
          />
        </svg>
      </button>
    </div>

    <div
      v-if="sidebarOpen"
      class="sidebar-overlay d-lg-none"
      @click="sidebarOpen = false"
    ></div>

    <aside class="sidebar d-flex flex-column" :class="{ open: sidebarOpen }">
      <div
        class="sidebar-logo-wrap px-3 pt-3 pb-2 d-none d-lg-block text-center"
      >
        <img
          src="@/assets/logo-dmf.png"
          alt="DMF Production"
          class="sidebar-logo"
        />
      </div>

      <div
        class="sidebar-user px-3 py-2 mt-2 d-flex align-items-center justify-content-between"
      >
        <div class="d-flex align-items-center gap-2">
          <svg
            class="user-icon"
            width="18"
            height="18"
            viewBox="0 0 16 16"
            fill="#c5d0dc"
          >
            <path
              d="M8 8a3 3 0 100-6 3 3 0 000 6m2-3a2 2 0 11-4 0 2 2 0 014 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"
            />
          </svg>
          <span class="text-white small fw-medium">{{ userName || 'Guest' }}</span>
        </div>
        <svg
          class="settings-icon"
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="#6b7d93"
          @click="$emit('edit-profile')"
        >
          <path
            d="M11.534 7h3.932a.25.25 0 01.192.41l-1.966 2.36a.25.25 0 01-.384 0l-1.966-2.36a.25.25 0 01.192-.41m-11 2h3.932a.25.25 0 00.192-.41L2.692 6.23a.25.25 0 00-.384 0L.342 8.59A.25.25 0 00.534 9"
          />
          <path
            fill-rule="evenodd"
            d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 11-.771-.636A6.002 6.002 0 0113.917 7H12.9A5 5 0 008 3M3.1 9a5.002 5.002 0 008.757 2.182.5.5 0 11.771.636A6.002 6.002 0 012.083 9z"
          />
        </svg>
      </div>

      <div class="sidebar-stats px-3 mt-1">
        <div class="stat-item d-flex align-items-center gap-2 py-1">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="#6b7d93">
            <path
              d="M5 4a.5.5 0 000 1h6a.5.5 0 000-1zm-1.5-.5A1.5 1.5 0 015 2h6a1.5 1.5 0 011.5 1.5v1A1.5 1.5 0 0111 6H5a1.5 1.5 0 01-1.5-1.5zm-2 5A1.5 1.5 0 013 7h10a1.5 1.5 0 011.5 1.5v1A1.5 1.5 0 0113 11H3a1.5 1.5 0 01-1.5-1.5zm0 5A1.5 1.5 0 013 12h10a1.5 1.5 0 011.5 1.5v1A1.5 1.5 0 0113 16H3a1.5 1.5 0 01-1.5-1.5z"
            />
          </svg>
          <span class="stat-text">{{
            $t("dashboard.projects", { n: stats.totalProjects })
          }}</span>
        </div>
        <div class="stat-item d-flex align-items-center gap-2 py-1">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="#6b7d93">
            <path
              d="M8 15A7 7 0 118 1a7 7 0 010 14m0 1A8 8 0 108 0a8 8 0 000 16"
            />
            <path
              d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3.5a.5.5 0 01-.5-.5v-3.5A.5.5 0 018 4"
            />
          </svg>
          <span class="stat-text">{{ stats.completedPercent }}%</span>
        </div>
        <div class="stat-item d-flex align-items-center gap-2 py-1">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="#6b7d93">
            <path
              d="M3.5 0a.5.5 0 01.5.5V1h8V.5a.5.5 0 011 0V1h1a2 2 0 012 2v11a2 2 0 01-2 2H2a2 2 0 01-2-2V3a2 2 0 012-2h1V.5a.5.5 0 01.5-.5M2 2a1 1 0 00-1 1v1h14V3a1 1 0 00-1-1zm13 3H1v9a1 1 0 001 1h12a1 1 0 001-1z"
            />
          </svg>
          <span class="stat-text">{{
            $t("dashboard.forToday", { n: stats.todayProjects })
          }}</span>
        </div>
      </div>

      <hr class="sidebar-hr mx-3 my-2" />

      <nav class="sidebar-nav flex-grow-1 px-3">
        <div
          class="nav-header d-flex align-items-center justify-content-between py-1"
          @click="prodOpen = !prodOpen"
        >
          <span class="nav-header-text">{{ $t("dashboard.productions") }}</span>
          <svg
            :class="{ rotated: prodOpen }"
            class="chevron-icon"
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="#6b7d93"
          >
            <path
              d="M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z"
            />
          </svg>
        </div>
        <ul v-show="prodOpen" class="list-unstyled mt-1 mb-0">
          <li
            v-for="(c, index) in companies"
            :key="index"
            class="company-item d-flex align-items-center justify-content-between"
            :class="{ 'company-active': c === selectedCompany }"
            @click="$emit('select-company', c)"
          >
            <div class="d-flex align-items-center gap-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                :fill="c === selectedCompany ? '#4caf50' : '#6b7d93'"
              >
                <path
                  d="M14.763.075A.5.5 0 0115 .5v15a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5V14h-1v1.5a.5.5 0 01-.5.5h-9a.5.5 0 01-.5-.5V10a.5.5 0 01.342-.474L6 7.64V4.5a.5.5 0 01.276-.447l8-4a.5.5 0 01.487.022M6 8.694L1 10.36V15h9V10.36zM7 15h2v-1.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5V15h2V1.309l-7 3.5z"
                />
              </svg>
              <span class="company-name">{{ c }}</span>
            </div>
            <svg
              class="edit-icon"
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="#4a5c6e"
              @click.stop="openEditModal(index)"
            >
              <path
                d="M12.146.146a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-10 10a.5.5 0 01-.168.11l-5 2a.5.5 0 01-.65-.65l2-5a.5.5 0 01.11-.168zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 01.5.5v.5h.5a.5.5 0 01.5.5v.5h.293z"
              />
            </svg>
          </li>
          <li
            class="company-item company-add d-flex align-items-center gap-2"
            @click="$emit('add-company')"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="#6b7d93">
              <path
                d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4"
              />
            </svg>
            <span>{{ $t("dashboard.newFactory") }}</span>
          </li>
        </ul>
      </nav>

      <div class="sidebar-bottom px-3 py-3 mt-auto">
        <div
          class="logout-item d-flex align-items-center gap-2"
          @click="$emit('logout')"
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="#6b7d93">
            <path
              fill-rule="evenodd"
              d="M10 12.5a.5.5 0 01-.5.5h-8a.5.5 0 01-.5-.5v-9a.5.5 0 01.5-.5h8a.5.5 0 01.5.5v2a.5.5 0 001 0v-2A1.5 1.5 0 009.5 2h-8A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h8a1.5 1.5 0 001.5-1.5v-2a.5.5 0 00-1 0z"
            />
            <path
              fill-rule="evenodd"
              d="M15.854 8.354a.5.5 0 000-.708l-3-3a.5.5 0 00-.708.708L14.293 7.5H5.5a.5.5 0 000 1h8.793l-2.147 2.146a.5.5 0 00.708.708z"
            />
          </svg>
          <span>{{ $t("dashboard.logout") }}</span>
        </div>
      </div>
    </aside>

    <Transition name="modal-fade">
      <div
        v-if="showEditModal"
        class="edit-modal-overlay"
        @click.self="closeEditModal"
        @keydown.esc="closeEditModal"
      >
        <div class="edit-modal-card">
          <h6 class="edit-modal-title">{{ $t("dashboard.editCompany") }}</h6>
          <label class="edit-modal-label">{{
            $t("dashboard.companyName")
          }}</label>
          <input
            v-model="editCompanyName"
            type="text"
            class="form-control form-control-sm edit-modal-input"
            ref="editInput"
            @keydown.esc="closeEditModal"
          />

          <label class="edit-modal-label mt-2">{{ $t("dashboard.workingHours") }}</label>
          <div class="d-flex gap-2 align-items-center mb-2">
            <input v-model="editWorkStart" type="time" class="form-control form-control-sm" style="width:auto" />
            <span>–</span>
            <input v-model="editWorkEnd" type="time" class="form-control form-control-sm" style="width:auto" />
          </div>

          <label class="edit-modal-label">{{ $t("dashboard.workDays") }}</label>
          <div class="d-flex gap-1 flex-wrap mb-2">
            <label v-for="(dayLabel, dayIdx) in dayLabels" :key="dayIdx" class="form-check-inline d-flex align-items-center gap-1" style="font-size:0.8rem;cursor:pointer">
              <input type="checkbox" class="form-check-input" :value="dayIdx" v-model="editWorkDays" style="margin:0" />
              {{ dayLabel }}
            </label>
          </div>

          <label class="edit-modal-label">{{ $t("dashboard.breaks") }}</label>
          <div v-for="(b, i) in editBreaks" :key="i" class="d-flex gap-2 align-items-center mb-1">
            <input v-model="b.from" type="time" class="form-control form-control-sm" style="width:auto" />
            <span>–</span>
            <input v-model="b.to" type="time" class="form-control form-control-sm" style="width:auto" />
            <button class="btn btn-sm p-0 text-danger" @click="editBreaks.splice(i, 1)">✕</button>
          </div>
          <button class="btn btn-sm btn-outline-secondary mb-2" @click="editBreaks.push({ from: '', to: '' })" style="font-size:0.75rem">
            + {{ $t("dashboard.addBreak") }}
          </button>

          <button
            class="btn btn-sm edit-modal-btn edit-modal-btn-save"
            @click="saveCompany"
          >
            {{ $t("dashboard.save") }}
          </button>
          <button
            class="btn btn-sm edit-modal-btn edit-modal-btn-delete"
            @click="deleteCompany"
          >
            {{ $t("dashboard.deleteCompany") }}
          </button>
          <button
            class="btn btn-sm edit-modal-btn edit-modal-btn-cancel"
            @click="closeEditModal"
          >
            {{ $t("dashboard.cancel") }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import api from "../api";

export default {
  name: "SidebarNav",
  props: {
    companies: {
      type: Array,
      default: () => [],
    },
    selectedCompany: {
      type: String,
      default: "",
    },
    userName: {
      type: String,
      default: "",
    },
  },
  emits: [
    "logout",
    "add-company",
    "edit-profile",
    "update-companies",
    "select-company",
  ],
  data() {
    return {
      sidebarOpen: false,
      prodOpen: true,
      showEditModal: false,
      editingCompany: null,
      editCompanyName: "",
      editWorkStart: "07:00",
      editWorkEnd: "15:00",
      editWorkDays: [1, 2, 3, 4, 5],
      editBreaks: [],
      stats: { totalProjects: 0, completedPercent: 0, todayProjects: 0 },
      companyObjects: [],
      dayLabels: [
        this.$t("dashboard.daySun"),
        this.$t("dashboard.dayMon"),
        this.$t("dashboard.dayTue"),
        this.$t("dashboard.dayWed"),
        this.$t("dashboard.dayThu"),
        this.$t("dashboard.dayFri"),
        this.$t("dashboard.daySat"),
      ],
    };
  },
  watch: {
    selectedCompany: {
      immediate: true,
      handler() { this.fetchStats(); },
    },
    companies: {
      immediate: true,
      async handler() { await this.fetchCompanyObjects(); },
    },
  },
  methods: {
    async fetchCompanyObjects() {
      try {
        const { data } = await api.get('/companies');
        this.companyObjects = data;
      } catch (e) {
        this.companyObjects = [];
      }
    },
    async fetchStats() {
      const params = this.selectedCompany ? { company: this.selectedCompany } : {};
      const [allRes, completedRes] = await Promise.all([
        api.get("/projects", { params }),
        api.get("/projects", { params: { ...params, status: "completed" } }),
      ]);
      const total = allRes.data.length;
      const completed = completedRes.data.length;
      const today = allRes.data.filter(p =>
        p.status === "active" || p.status === "in-progress"
      ).length;
      this.stats = {
        totalProjects: total,
        completedPercent: total > 0 ? Math.round((completed / total) * 100) : 0,
        todayProjects: today,
      };
    },
    openEditModal(index) {
      this.editingCompany = index;
      const name = this.companies[index];
      this.editCompanyName = name;
      const co = this.companyObjects.find(o => o.name === name) || {};
      this.editWorkStart = co.workStart || "07:00";
      this.editWorkEnd = co.workEnd || "15:00";
      this.editWorkDays = co.workDays ? [...co.workDays] : [1, 2, 3, 4, 5];
      this.editBreaks = (co.breaks || []).map(b => ({ from: b.from, to: b.to }));
      this.showEditModal = true;
      this.$nextTick(() => {
        this.$refs.editInput?.focus();
      });
      document.addEventListener(
        "keydown",
        (this._escHandler = (e) => {
          if (e.key === "Escape") this.closeEditModal();
        }),
      );
    },
    async saveCompany() {
      if (!this.editCompanyName.trim()) return;
      const oldName = this.companies[this.editingCompany];
      const co = this.companyObjects.find(o => o.name === oldName);
      if (co?._id) {
        await api.put(`/companies/${co._id}`, {
          name: this.editCompanyName.trim(),
          workStart: this.editWorkStart,
          workEnd: this.editWorkEnd,
          workDays: this.editWorkDays,
          breaks: this.editBreaks.filter(b => b.from && b.to),
        });
      }
      this.$emit("update-companies");
      this.closeEditModal();
    },
    async deleteCompany() {
      const oldName = this.companies[this.editingCompany];
      const co = this.companyObjects.find(o => o.name === oldName);
      if (co?._id) {
        await api.delete(`/companies/${co._id}`);
      }
      this.$emit("update-companies");
      this.closeEditModal();
    },
    closeEditModal() {
      this.showEditModal = false;
      this.editingCompany = null;
      this.editCompanyName = "";
      if (this._escHandler) {
        document.removeEventListener("keydown", this._escHandler);
        this._escHandler = null;
      }
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 240px;
  min-width: 240px;
  background: #1c2936;
  color: #b0bec5;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1040;
  transform: translateX(-100%);
  transition: transform 0.25s ease;
  overflow-y: auto;
  font-size: 0.85rem;
  height: 100vh;
}
.sidebar::-webkit-scrollbar {
  width: 4px;
}
.sidebar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}
@media (min-width: 992px) {
  .sidebar {
    position: sticky;
    transform: none;
  }
}
.sidebar.open {
  transform: translateX(0);
}
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1030;
}
.sidebar-logo {
  max-width: 170px;
}
.sidebar-user {
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.user-icon {
  flex-shrink: 0;
}
.settings-icon {
  cursor: pointer;
  transition: fill 0.15s;
}
.settings-icon:hover {
  fill: #fff;
}
.sidebar-stats {
  font-size: 0.82rem;
}
.stat-text {
  color: #b0bec5;
}
.sidebar-hr {
  border-color: rgba(255, 255, 255, 0.08);
}
.nav-header {
  cursor: pointer;
  user-select: none;
  padding: 0.35rem 0;
}
.nav-header-text {
  font-size: 0.82rem;
  font-weight: 600;
  color: #8fa4bf;
}
.chevron-icon {
  transition: transform 0.2s;
}
.chevron-icon.rotated {
  transform: rotate(180deg);
}
.company-item {
  padding: 0.4rem 0.55rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.12s;
  font-size: 0.82rem;
}
.company-item:hover {
  background: rgba(255, 255, 255, 0.06);
}
.company-name {
  color: #c5d0dc;
}
.edit-icon {
  opacity: 0;
  transition: opacity 0.15s;
  cursor: pointer;
}
.company-item:hover .edit-icon {
  opacity: 1;
}
.company-active {
  background: rgba(43, 87, 154, 0.25);
}
.company-active .company-name {
  color: #fff;
  font-weight: 600;
}
.company-add {
  color: #6b7d93;
}
.company-add:hover {
  color: #b0bec5;
}
.logout-item {
  cursor: pointer;
  padding: 0.4rem 0.3rem;
  border-radius: 5px;
  font-size: 0.82rem;
  transition: background 0.12s;
}
.logout-item:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
}
.mobile-topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #1c2936;
  z-index: 1020;
}
.mobile-logo {
  height: 60px;
}

.edit-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
}
.edit-modal-card {
  background: #fff;
  border-radius: 10px;
  padding: 1.5rem;
  width: 90%;
  max-width: 350px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}
.edit-modal-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #1c2936;
}
.edit-modal-label {
  font-size: 0.82rem;
  font-weight: 600;
  color: #4a5c6e;
  margin-bottom: 0.3rem;
  display: block;
}
.edit-modal-input {
  margin-bottom: 1rem;
}
.edit-modal-btn {
  width: 100%;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 0.45rem;
  border-radius: 6px;
  margin-bottom: 0.45rem;
}
.edit-modal-btn-save {
  background: #2b579a;
  color: #fff;
  border: none;
}
.edit-modal-btn-save:hover {
  background: #1e3f73;
  color: #fff;
}
.edit-modal-btn-delete {
  background: #c0392b;
  color: #fff;
  border: none;
}
.edit-modal-btn-delete:hover {
  background: #96281b;
  color: #fff;
}
.edit-modal-btn-cancel {
  background: transparent;
  color: #6b7d93;
  border: 1px solid #ccc;
}
.edit-modal-btn-cancel:hover {
  background: #f0f0f0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
