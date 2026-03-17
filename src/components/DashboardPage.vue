<template>
  <div class="dashboard-layout d-flex">
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
          <h5 class="panel-title">{{ $t("dashboard.activeProjects") }}</h5>
          <div class="table-responsive">
            <table class="table align-middle mb-0">
              <thead>
                <tr>
                  <th>RN</th>
                  <th>{{ $t("dashboard.name") }}</th>
                  <th class="d-none d-md-table-cell">
                    {{ $t("dashboard.client") }}
                  </th>
                  <th class="d-none d-sm-table-cell">
                    {{ $t("project.status") }}
                  </th>
                  <th>{{ $t("dashboard.process") }}</th>
                  <th class="d-none d-lg-table-cell">%</th>
                  <th class="text-end">{{ $t("dashboard.action") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in filteredProjects" :key="p.rn">
                  <td class="fw-semibold text-dark">{{ p.rn }}</td>
                  <td>{{ p.name }}</td>
                  <td class="d-none d-md-table-cell text-muted">
                    {{ p.client }}
                  </td>
                  <td class="d-none d-sm-table-cell text-muted">
                    <span :class="'badge-' + (p.status || 'active')">{{
                      p.status || "active"
                    }}</span>
                  </td>
                  <td>
                    <div class="progress-bar-wrap">
                      <div
                        class="progress-fill"
                        :class="'fill-' + getProjectColor(p)"
                        :style="{ width: getProjectProgress(p) + '%' }"
                      ></div>
                    </div>
                  </td>
                  <td class="d-none d-lg-table-cell text-muted">
                    {{ getProjectProgress(p) }}%
                  </td>
                  <td class="text-end">
                    <button
                      class="btn btn-sm btn-view"
                      @click="$emit('view-project', p)"
                    >
                      {{ $t("dashboard.view") }}
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
            <div class="d-flex flex-column gap-2">
              <button class="btn btn-action" @click="$emit('create-project')">
                <span>{{ $t("dashboard.createProject") }}</span>
                <span class="action-icon">+</span>
              </button>
              <button class="btn btn-action" @click="$emit('workers-clients')">
                <span>{{ $t("dashboard.allWorkers") }}</span>
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
              <button class="btn btn-action" @click="$emit('warehouse')">
                <span>{{ $t("dashboard.warehouse") }}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  opacity="0.8"
                >
                  <path
                    d="M8.186 1.113a.5.5 0 00-.372 0L1.846 3.5 8 5.961 14.154 3.5zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 011.114 0l7.129 2.852A.5.5 0 0116 3.5v8.662a1 1 0 01-.629.928l-7.185 2.874a.5.5 0 01-.372 0L.63 13.09a1 1 0 01-.63-.928V3.5a.5.5 0 01.314-.464z"
                  />
                </svg>
              </button>
              <button class="btn btn-action" @click="$emit('analytics')">
                <span>{{ $t("dashboard.analytics") }}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  opacity="0.8"
                >
                  <path
                    d="M4 11H2v3h2zm5-4H7v7h2zm5-5h-2v12h2zm-2-1a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V2a1 1 0 00-1-1zM6 7a1 1 0 011-1h2a1 1 0 011 1v7a1 1 0 01-1 1H7a1 1 0 01-1-1zm-5 4a1 1 0 011-1h2a1 1 0 011 1v3a1 1 0 01-1 1H2a1 1 0 01-1-1z"
                  />
                </svg>
              </button>
              <button
                class="btn btn-action"
                @click="$emit('production-history')"
              >
                <span>{{ $t("dashboard.productionHistory") }}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  opacity="0.8"
                >
                  <path
                    d="M8.515 1.019A7 7 0 008 1V0a8 8 0 01.589.022zm2.004.45a7 7 0 00-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 00-.439-.27l.493-.87a8 8 0 01.979.654l-.615.789a7 7 0 00-.418-.302zm1.834 1.79a7 7 0 00-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 00-.214-.468l.893-.45a8 8 0 01.45 1.088l-.95.313a7 7 0 00-.179-.483m.53 2.507a7 7 0 00-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 01-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.253.573-.585 1.1zM8 1a7 7 0 104.95 11.95l.707.707A8 8 0 118 0z"
                  />
                  <path
                    d="M7.5 3a.5.5 0 01.5.5v5.21l3.248 1.856a.5.5 0 01-.496.868l-3.5-2A.5.5 0 017 9V3.5a.5.5 0 01.5-.5"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div class="col-lg-9 col-md-8 col-12">
            <section class="panel">
              <h5 class="panel-title">{{ $t("dashboard.assemblies") }}</h5>
              <div class="table-responsive">
                <table class="table align-middle mb-0">
                  <thead>
                    <tr>
                      <th>RN</th>
                      <th>{{ $t("dashboard.operation") }}</th>
                      <th class="d-none d-sm-table-cell">
                        {{ $t("dashboard.worksOn") }}
                      </th>
                      <th class="d-none d-md-table-cell">EST</th>
                      <th>{{ $t("dashboard.process") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(a, i) in filteredAssemblies" :key="i">
                      <td class="fw-semibold text-dark">{{ a.rn }}</td>
                      <td>{{ a.operation }}</td>
                      <td class="d-none d-sm-table-cell text-muted">
                        {{ a.worksOn }}
                      </td>
                      <td class="d-none d-md-table-cell text-muted">
                        {{ a.est }}
                      </td>
                      <td>
                        <div class="progress-bar-wrap">
                          <div
                            class="progress-fill"
                            :class="'fill-' + a.color"
                            :style="{ width: a.progress + '%' }"
                          ></div>
                        </div>
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
import { calcTimePerOperation } from "../utils/calculations";
import api from "../api";

export default {
  name: "DashboardPage",
  components: { SidebarNav },
  props: {
    companies: { type: Array, default: () => [] },
    selectedCompany: { type: String, default: "" },
    userName: { type: String, default: "" },
  },
  emits: [
    "logout",
    "view-project",
    "create-project",
    "analytics",
    "workers-clients",
    "warehouse",
    "production-history",
    "edit-profile",
    "select-company",
    "add-company",
    "update-companies",
  ],
  data() {
    return {
      projects: [],
      assemblies: [],
      now: Date.now(),
      timer: null,
    };
  },
  created() {
    this.timer = setInterval(() => {
      this.now = Date.now();
    }, 30000);
  },
  beforeUnmount() {
    if (this.timer) clearInterval(this.timer);
  },
  computed: {
    filteredProjects() {
      return this.projects;
    },
    filteredAssemblies() {
      return this.assemblies;
    },
  },
  watch: {
    selectedCompany: {
      immediate: true,
      handler() {
        this.fetchProjects();
      },
    },
  },
  methods: {
    async fetchProjects() {
      try {
        const params = {};
        if (this.selectedCompany) {
          params.company = this.selectedCompany;
        }
        const { data } = await api.get("/projects", { params });
        this.projects = data
          .filter((p) => p.status !== "completed")
          .map((p) => {
            const proj = {
              _id: p._id,
              rn: p.rn,
              name: p.name,
              client: p.client,
              responsible: p.responsible,
              drawings: p.drawings || [],
              status: p.status,
              startedAt: p.startedAt,
              company: p.company,
            };
            this.recalcMissingEstimates(proj);
            return proj;
          });
      } catch (e) {
        console.error("Failed to fetch projects:", e);
      }
    },
    recalcMissingEstimates(proj) {
      const drawings = proj.drawings;
      if (!drawings) return;
      for (const dr of drawings) {
        if (dr.isAssemblyDrawing || !dr.assignedWorkers || !dr.treatments)
          continue;
        const hasZeroEst = dr.assignedWorkers.some(
          (aw) => !aw.estimatedMinutes,
        );
        if (!hasZeroEst) continue;
        const opTimes = calcTimePerOperation(dr.treatments);
        const opLabelToKey = {
          "Rezanje cijevi": "pipeCutting",
          "Rezanje lima": "sheetCutting",
          Bušenje: "drilling",
          Zavarivanje: "welding",
          Brušenje: "grinding",
          Savijanje: "bending",
          Montaža: "assembly",
        };
        const workerCountPerOp = {};
        for (const aw of dr.assignedWorkers) {
          workerCountPerOp[aw.operation || ""] =
            (workerCountPerOp[aw.operation || ""] || 0) + 1;
        }
        for (const aw of dr.assignedWorkers) {
          if (aw.estimatedMinutes) continue;
          const opKey = opLabelToKey[aw.operation];
          if (opKey && opTimes[opKey]) {
            const count = workerCountPerOp[aw.operation] || 1;
            aw.estimatedMinutes = Math.round(opTimes[opKey] / count);
          }
        }
      }
    },
    getProjectProgress(p) {
      if (!p.drawings || !p.drawings.length) return 0;
      const opTotals = {};
      let taskCount = 0,
        completedCount = 0;
      for (const d of p.drawings) {
        if (d.isAssemblyDrawing || !d.assignedWorkers) continue;
        const opMaxInDrawing = {};
        for (const aw of d.assignedWorkers) {
          taskCount++;
          if (aw.status === "completed") completedCount++;
          const op = aw.operation || "";
          const est = aw.estimatedMinutes || 0;
          if (!opMaxInDrawing[op] || est > opMaxInDrawing[op])
            opMaxInDrawing[op] = est;
        }
        for (const [op, maxEst] of Object.entries(opMaxInDrawing)) {
          opTotals[op] = (opTotals[op] || 0) + maxEst;
        }
      }
      if (!taskCount) return 0;
      if (completedCount === taskCount) return 100;
      const totalEst = Math.max(0, ...Object.values(opTotals));
      if (!p.startedAt || !totalEst) {
        return Math.round((completedCount / taskCount) * 100);
      }
      const elapsed = (this.now - new Date(p.startedAt).getTime()) / 60000;
      return Math.min(100, Math.round((elapsed / totalEst) * 100));
    },
    getProjectColor(p) {
      const progress = this.getProjectProgress(p);
      if (progress >= 100) return "green";
      if (progress >= 50) return "yellow";
      if (progress > 0) return "blue";
      return "blue";
    },
  },
};
</script>

<style scoped>
.main-content {
  background: #e8eaed;
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
  color: #333;
  border-bottom: 2px solid #ccc;
  padding: 0.45rem 0.7rem;
  white-space: nowrap;
  font-size: 0.8rem;
  background: transparent;
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

.progress-bar-wrap {
  width: 90px;
  height: 14px;
  background: #ddd;
  border-radius: 2px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.4s ease;
}
.fill-green {
  background: linear-gradient(90deg, #4caf50, #66bb6a);
}
.fill-blue {
  background: linear-gradient(90deg, #2196f3, #42a5f5);
}
.fill-yellow {
  background: linear-gradient(90deg, #fbc02d, #ffca28);
}
.fill-red {
  background: linear-gradient(90deg, #e53935, #ef5350);
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
.action-icon {
  font-size: 1.2rem;
  font-weight: 700;
  opacity: 0.85;
}

@media (max-width: 767.98px) {
  .btn-action {
    padding: 0.65rem 0.9rem;
    font-size: 0.85rem;
  }
  .progress-bar-wrap {
    width: 60px;
    height: 12px;
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
  .progress-bar-wrap {
    width: 50px;
  }
}

.badge-active {
  display: inline-block;
  background: #2b579a;
  color: #fff;
  border-radius: 4px;
  padding: 0.15rem 0.5rem;
  font-size: 0.72rem;
  font-weight: 600;
}
.badge-in-progress {
  display: inline-block;
  background: #e67e22;
  color: #fff;
  border-radius: 4px;
  padding: 0.15rem 0.5rem;
  font-size: 0.72rem;
  font-weight: 600;
}
</style>
