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

    <main class="main-content flex-grow-1">
      <div class="content-wrap p-3 p-lg-4">
        <section class="panel mb-4">
          <div class="panel-header d-flex align-items-center justify-content-between">
            <h5 class="panel-title">{{ $t("workersClients.workers") }}</h5>
            <button class="btn btn-link p-0 me-3" aria-label="PDF">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="#c62828">
                <path
                  d="M14 14V4.5L9.5 0H4a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2M9.5 3A1.5 1.5 0 0011 4.5h2V14a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1h5.5z"
                />
                <path
                  d="M4.603 14.087a.8.8 0 01-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 011.482-.645 20 20 0 001.062-2.227 7.3 7.3 0 01-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 01.477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 00.98 1.686 5.8 5.8 0 011.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 01-.354.416.86.86 0 01-.51.138c-.331-.014-.654-.196-.933-.417a6.1 6.1 0 01-.911-.95 11.7 11.7 0 00-1.997.406 11.3 11.3 0 01-1.02 1.51c-.292.35-.609.656-.927.787a.8.8 0 01-.58.029z"
                />
              </svg>
            </button>
          </div>
          <div class="table-responsive">
            <table class="table align-middle mb-0">
              <thead class="dark-header">
                <tr>
                  <th>ID</th>
                  <th>{{ $t("workersClients.fullName") }}</th>
                  <th>{{ $t("workersClients.contact") }}</th>
                  <th>CP</th>
                  <th>CS</th>
                  <th>D</th>
                  <th>G</th>
                  <th>B</th>
                  <th>W</th>
                  <th>A</th>
                  <th>{{ $t("workersClients.rating") }}</th>
                  <th class="text-end">{{ $t("workersClients.action") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="w in filteredWorkers" :key="w.id">
                  <td class="fw-semibold text-dark">{{ w.id }}</td>
                  <td>{{ w.fullName }}</td>
                  <td class="text-muted">{{ w.contact }}</td>
                  <td>{{ w.cp }}</td>
                  <td>{{ w.cs }}</td>
                  <td>{{ w.d }}</td>
                  <td>{{ w.g }}</td>
                  <td>{{ w.b }}</td>
                  <td>{{ w.w }}</td>
                  <td>{{ w.a }}</td>
                  <td>{{ w.rating }}</td>
                  <td class="text-end">
                    <button
                      class="btn btn-sm btn-view"
                      @click="$emit('view-worker', w)"
                    >
                      {{ $t("workersClients.view") }}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        class="ms-1"
                      >
                        <path d="M10.5 8a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0" />
                        <path
                          d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div class="row g-3 g-lg-4 align-items-start">
          <div class="col-lg-3 col-md-4 col-12">
            <div class="summary-box mb-3">
              <div class="summary-row">
                <span>{{ $t("workersClients.workers") }}:</span>
                <span class="fw-bold">{{ filteredWorkers.length }}</span>
              </div>
              <div class="summary-row">
                <span>{{ $t("workersClients.clients") }}:</span>
                <span class="fw-bold">{{ filteredClients.length }}</span>
              </div>
            </div>
            <div class="d-flex flex-column gap-2">
              <button class="btn btn-action" @click="$emit('back')">
                <span>{{ $t("workersClients.goBackToHome") }}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  opacity="0.8"
                >
                  <path
                    d="M8.354 1.146a.5.5 0 00-.708 0l-6 6A.5.5 0 001.5 7.5v7a.5.5 0 00.5.5h4.5a.5.5 0 00.5-.5v-4h2v4a.5.5 0 00.5.5H14a.5.5 0 00.5-.5v-7a.5.5 0 00-.146-.354L13 5.793V2.5a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 00-.5-.5h-3a.5.5 0 00-.5.5v4z"
                  />
                </svg>
              </button>
              <button class="btn btn-action" @click="$emit('add-client')">
                <span>{{ $t("workersClients.addNewClient") }}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  opacity="0.8"
                >
                  <path
                    d="M8.354 1.146a.5.5 0 00-.708 0l-6 6A.5.5 0 001.5 7.5v7a.5.5 0 00.5.5h4.5a.5.5 0 00.5-.5v-4h2v4a.5.5 0 00.5.5H14a.5.5 0 00.5-.5v-7a.5.5 0 00-.146-.354L13 5.793V2.5a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 00-.5-.5h-3a.5.5 0 00-.5.5v4z"
                  />
                </svg>
              </button>
              <button class="btn btn-action" @click="$emit('add-worker')">
                <span>{{ $t("workersClients.addNewWorker") }}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  opacity="0.8"
                >
                  <path
                    d="M8 8a3 3 0 100-6 3 3 0 000 6m2-3a2 2 0 11-4 0 2 2 0 014 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div class="col-lg-9 col-md-8 col-12">
            <section class="panel">
              <h5 class="panel-title">{{ $t("workersClients.clients") }}</h5>
              <div class="table-responsive">
                <table class="table align-middle mb-0">
                  <thead class="dark-header">
                    <tr>
                      <th>ID</th>
                      <th>{{ $t("workersClients.clientName") }}</th>
                      <th>{{ $t("workersClients.country") }}</th>
                      <th>{{ $t("workersClients.adressa") }}</th>
                      <th class="text-end">{{ $t("workersClients.action") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="c in filteredClients" :key="c.id">
                      <td class="fw-semibold text-dark">{{ c.id }}</td>
                      <td>{{ c.clientName }}</td>
                      <td class="text-muted">{{ c.country }}</td>
                      <td class="text-muted">{{ c.adressa }}</td>
                      <td class="text-end">
                        <button
                          class="btn btn-sm btn-view"
                          @click="$emit('view-client', c)"
                        >
                          {{ $t("workersClients.view") }}
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            class="ms-1"
                          >
                            <path d="M10.5 8a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0" />
                            <path
                              d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import SidebarNav from "./SidebarNav.vue";
import api from "../api";

export default {
  name: "WorkersClientsPage",
  components: { SidebarNav },
  props: {
    companies: { type: Array, default: () => [] },
    selectedCompany: { type: String, default: '' },
    userName: { type: String, default: '' },
  },
  emits: ["back", "logout", "add-client", "add-worker", "view-worker", "view-client", "edit-profile", "select-company", "add-company", "update-companies"],
  data() {
    return {
      workers: [],
      clients: [],
    };
  },
  watch: {
    selectedCompany: {
      immediate: true,
      handler() { this.fetchData(); },
    },
  },
  methods: {
    async fetchData() {
      const params = this.selectedCompany ? { company: this.selectedCompany } : {};
      const [workersRes, clientsRes] = await Promise.all([
        api.get("/workers", { params }),
        api.get("/clients", { params }),
      ]);
      this.workers = workersRes.data.map(w => ({
        id: w._id,
        fullName: w.fullName,
        contact: w.contact,
        cp: w.ratings.pipeCutting,
        cs: w.ratings.sheetCutting,
        d: w.ratings.drilling,
        g: w.ratings.grinding,
        b: w.ratings.bending,
        w: w.ratings.welding,
        a: w.ratings.assembly,
        rating: Math.round(Object.values(w.ratings).reduce((s, v) => s + v, 0) / 7),
        company: w.company,
      }));
      this.clients = clientsRes.data.map(c => ({
        id: c._id,
        clientName: c.clientName,
        country: c.country,
        adressa: c.adressa,
        company: c.company,
      }));
    },
  },
  computed: {
    filteredWorkers() {
      return this.workers;
    },
    filteredClients() {
      return this.clients;
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

.content-wrap {
  max-width: 100%;
}

.panel {
  background: #f5f5f5;
  border: 1px solid #dcdcdc;
  border-radius: 6px;
  padding: 0;
  overflow: hidden;
}
.panel-header {
  padding: 0;
}
.panel-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a1a1a;
  padding: 0.7rem 1rem 0.4rem;
  margin: 0;
}

.table {
  font-size: 0.82rem;
  margin: 0;
}
.table thead th {
  font-weight: 700;
  padding: 0.45rem 0.7rem;
  white-space: nowrap;
  font-size: 0.8rem;
}
.dark-header th {
  background: #4a6785;
  color: #fff;
  border-bottom: none;
}
.table tbody td {
  padding: 0.4rem 0.7rem;
  border-bottom: 1px solid #e5e5e5;
  color: #444;
  vertical-align: middle;
}
.table tbody tr:last-child td {
  border-bottom: none;
}
.table tbody tr:hover {
  background: rgba(0, 0, 0, 0.02);
}

.btn-view {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.7rem;
  border-radius: 4px;
  border: none;
  color: #fff;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  background: #2b579a;
}
.btn-view:hover {
  background: #1e3f73;
  color: #fff;
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
.summary-box {
  background: #f5f5f5;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 1rem 1.1rem;
}
.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #444;
  padding: 0.15rem 0;
}

@media (max-width: 767.98px) {
  .btn-action {
    padding: 0.65rem 0.9rem;
    font-size: 0.85rem;
  }
  .table thead th,
  .table tbody td {
    padding: 0.35rem 0.45rem;
    font-size: 0.78rem;
  }
  .panel-title {
    font-size: 0.88rem;
  }
}
@media (max-width: 575.98px) {
  .content-wrap {
    padding: 0.75rem !important;
  }
}
</style>
