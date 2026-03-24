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
        <div class="row g-3 g-lg-4 align-items-start">
          <div class="col-lg-3 col-md-4 col-12">
            <div class="panel mb-3">
              <div class="project-info">
                <div class="project-title">RN {{ projectData.rn }} – {{ projectData.name }}</div>
                <div class="project-meta">
                  <strong>{{ $t("project.client") }}:</strong>
                  {{ projectData.client }}
                </div>
                <div class="project-meta">
                  <strong>{{ $t("project.phone") }}:</strong> {{ clientPhone }}
                </div>
                <div class="project-meta">
                  <strong>{{ $t("project.email") }}:</strong> {{ clientEmail }}
                </div>
                <div class="d-flex align-items-center gap-2 mt-2 mb-1">
                  <div class="progress-bar-wrap" style="width:120px">
                    <div
                      class="progress-fill"
                      :class="'fill-' + progressColor"
                      :style="{ width: overallProgress + '%' }"
                    ></div>
                  </div>
                  <span class="project-meta mb-0">{{ overallProgress }}%</span>
                </div>
                <div class="project-meta">
                  <strong>{{ $t("project.status") }}:</strong>
                  <span :class="'badge-' + (projectData.status || 'active')">{{ projectData.status || 'active' }}</span>
                </div>
                <div class="project-meta">
                  <strong>{{ $t("project.startedAt") }}:</strong>
                  {{ formatDate(projectData.startedAt || projectData.createdAt) }}
                </div>
                <div v-if="totalEstimatedMinutes > 0" class="project-meta">
                  <strong>{{ $t("project.estimatedTime") }}:</strong>
                  {{ formatMinutes(totalEstimatedMinutes) }}
                </div>
                <div v-if="totalEstimatedMinutes > 0" class="project-meta">
                  <strong>{{ $t("project.estimatedEnd") }}:</strong>
                  {{ estimatedEndDate }}
                </div>
                <hr class="my-2" />
                <div class="project-meta">
                  <strong>{{ $t("project.drawingNo") }}:</strong> {{ drawing.no }}
                </div>
                <div class="project-meta">
                  <strong>{{ $t("project.partName") }}:</strong> {{ drawing.partName }}
                </div>
                <div v-if="drawing.assembly && drawing.assembly !== '–'" class="project-meta">
                  <strong>{{ $t("project.assembly") }}:</strong> {{ drawing.assembly }}
                </div>
                <div v-if="drawing.weight && drawing.weight !== '–'" class="project-meta">
                  <strong>{{ $t("project.weight") }}:</strong> {{ drawing.weight }}
                </div>
                <div class="project-meta">
                  <strong>{{ $t("project.qty") }}:</strong> {{ drawing.qty }}
                </div>
              </div>
            </div>

            <div class="d-flex flex-column gap-2">
              <button class="btn btn-action" @click="$emit('back')">
                <span>{{ $t("drawing.goBackProject") }}</span>
                <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" opacity="0.8">
                  <path fill-rule="evenodd" d="M15 8a.5.5 0 00-.5-.5H2.707l3.147-3.146a.5.5 0 10-.708-.708l-4 4a.5.5 0 000 .708l4 4a.5.5 0 00.708-.708L2.707 8.5H14.5A.5.5 0 0015 8" />
                </svg>
              </button>
              <a v-if="drawing.pdfFile" class="btn btn-action" :href="backendBase + drawing.pdfFile" target="_blank">
                <span>{{ $t("drawing.exportPdf") }}</span>
                <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" opacity="0.8">
                  <path d="M14 14V4.5L9.5 0H4a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2M9.5 3A1.5 1.5 0 0011 4.5h2V14a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1h5.5z" />
                </svg>
              </a>
              <a
                class="btn btn-action"
                :href="drawing.dwgFile ? backendBase + drawing.dwgFile : undefined"
                :download="drawing.dwgFile ? '' : undefined"
                :class="{ 'btn-action-disabled': !drawing.dwgFile }"
                @click="!drawing.dwgFile && $event.preventDefault()"
              >
                <span>{{ $t("drawing.exportDwg") }}</span>
                <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" opacity="0.8">
                  <path d="M14 4.5V14a2 2 0 01-2 2H4a2 2 0 01-2-2V2a2 2 0 012-2h5.5zm-3 0A1.5 1.5 0 019.5 3V1H4a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V4.5z" />
                  <path d="M4.5 12.5A.5.5 0 015 12h3a.5.5 0 010 1H5a.5.5 0 01-.5-.5m0-2A.5.5 0 015 10h6a.5.5 0 010 1H5a.5.5 0 01-.5-.5m0-2A.5.5 0 015 8h6a.5.5 0 010 1H5a.5.5 0 01-.5-.5" />
                </svg>
              </a>
              <button class="btn btn-action" @click="$emit('home')">
                <span>{{ $t("drawing.goBackHome") }}</span>
                <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" opacity="0.8">
                  <path d="M8.354 1.146a.5.5 0 00-.708 0l-6 6A.5.5 0 001.5 7.5v7a.5.5 0 00.5.5h4.5a.5.5 0 00.5-.5v-4h2v4a.5.5 0 00.5.5H14a.5.5 0 00.5-.5v-7a.5.5 0 00-.146-.354z" />
                </svg>
              </button>
            </div>
          </div>

          <div class="col-lg-9 col-md-8 col-12">
            <section class="panel">
              <h5 class="panel-title">
                {{ $t("drawing.drawingNo") }} {{ drawing.no }}
              </h5>
              <div class="drawing-viewer">
                <iframe
                  v-if="pdfUrl"
                  :src="pdfUrl"
                  class="drawing-pdf"
                ></iframe>
                <div v-else class="no-pdf text-muted">
                  PDF nije dostupan
                </div>
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
import { addWorkingMinutes, getWorkingMinutesBetween } from "../utils/workingTime";
import { calcTimePerOperation } from "../utils/calculations";
import api from "../api";

export default {
  name: "DrawingDetailPage",
  components: { SidebarNav },
  props: {
    project: { type: Object, required: true },
    drawing: { type: Object, required: true },
    companies: { type: Array, default: () => [] },
    selectedCompany: { type: String, default: "" },
    userName: { type: String, default: "" },
    companySchedule: { type: Object, default: null },
  },
  emits: ["back", "home", "logout", "edit-profile", "select-company", "add-company", "update-companies"],
  data() {
    return {
      projectData: {},
      clientData: null,
      now: Date.now(),
      timer: null,
      backendBase: "http://localhost:3000",
    };
  },
  created() {
    this.fetchProject();
    this.timer = setInterval(() => { this.now = Date.now(); }, 30000);
  },
  beforeUnmount() {
    if (this.timer) clearInterval(this.timer);
  },
  computed: {
    pdfUrl() {
      if (!this.drawing.pdfFile) return "";
      return this.backendBase + this.drawing.pdfFile;
    },
    operationPhases() {
      return [
        ["Rezanje cijevi", "Rezanje lima"],
        ["Savijanje", "Bušenje"],
        ["Montaža"],
        ["Zavarivanje"],
        ["Brušenje"],
      ];
    },
    opPhaseTotals() {
      const d = this.projectData.drawings;
      if (!d) return {};
      const opTotals = {};
      for (const dr of d) {
        if (dr.isAssemblyDrawing || !dr.assignedWorkers) continue;
        const opMaxInDrawing = {};
        for (const aw of dr.assignedWorkers) {
          const op = aw.operation || "";
          const est = aw.estimatedMinutes || 0;
          if (!opMaxInDrawing[op] || est > opMaxInDrawing[op])
            opMaxInDrawing[op] = est;
        }
        for (const [op, maxEst] of Object.entries(opMaxInDrawing)) {
          opTotals[op] = (opTotals[op] || 0) + maxEst;
        }
      }
      const phaseStarts = {};
      let prevPhaseEnd = 0;
      for (let pi = 0; pi < this.operationPhases.length; pi++) {
        const phaseOps = this.operationPhases[pi];
        const phaseStart = pi === 0 ? 0 : prevPhaseEnd;
        const phaseMaxDuration = Math.max(0, ...phaseOps.map(op => opTotals[op] || 0));
        for (const op of phaseOps) {
          phaseStarts[op] = phaseStart;
        }
        prevPhaseEnd = phaseStart + Math.round(phaseMaxDuration * 0.15);
      }
      return phaseStarts;
    },
    totalEstimatedMinutes() {
      const d = this.projectData.drawings;
      if (!d) return 0;
      const opTotals = {};
      for (const dr of d) {
        if (dr.isAssemblyDrawing || !dr.assignedWorkers) continue;
        const opMaxInDrawing = {};
        for (const aw of dr.assignedWorkers) {
          const op = aw.operation || "";
          const est = aw.estimatedMinutes || 0;
          if (!opMaxInDrawing[op] || est > opMaxInDrawing[op])
            opMaxInDrawing[op] = est;
        }
        for (const [op, maxEst] of Object.entries(opMaxInDrawing)) {
          opTotals[op] = (opTotals[op] || 0) + maxEst;
        }
      }
      let maxEnd = 0;
      for (const [op, total] of Object.entries(opTotals)) {
        const phaseStart = this.opPhaseTotals[op] || 0;
        const end = phaseStart + total;
        if (end > maxEnd) maxEnd = end;
      }
      return maxEnd;
    },
    totalPausedMinutes() {
      let ms = this.projectData.totalPausedMs || 0;
      if (this.projectData.pausedAt) {
        ms += this.now - new Date(this.projectData.pausedAt).getTime();
      }
      return ms / 60000;
    },
    effectiveElapsedMinutes() {
      if (!this.projectData.startedAt) return 0;
      const workingMins = getWorkingMinutesBetween(
        this.projectData.startedAt,
        new Date(this.now),
        this.companySchedule,
      );
      return Math.max(0, workingMins - this.totalPausedMinutes);
    },
    overallProgress() {
      const d = this.projectData.drawings;
      if (!d || !d.length) return 0;
      let taskCount = 0, completedCount = 0;
      for (const dr of d) {
        if (dr.isAssemblyDrawing || !dr.assignedWorkers) continue;
        for (const aw of dr.assignedWorkers) {
          taskCount++;
          if (aw.status === "completed") completedCount++;
        }
      }
      if (!taskCount) return 0;
      if (completedCount === taskCount) return 100;
      if (!this.totalEstimatedMinutes || !this.projectData.startedAt) {
        return Math.round((completedCount / taskCount) * 100);
      }
      return Math.min(100, Math.round((this.effectiveElapsedMinutes / this.totalEstimatedMinutes) * 100));
    },
    progressColor() {
      const p = this.overallProgress;
      if (p >= 100) return "green";
      if (p >= 50) return "yellow";
      return "blue";
    },
    estimatedEndDate() {
      const start = this.projectData.startedAt || this.projectData.createdAt;
      if (!start || !this.totalEstimatedMinutes) return "–";
      const adjustedStart = new Date(new Date(start).getTime() + this.totalPausedMinutes * 60000);
      const end = addWorkingMinutes(adjustedStart, this.totalEstimatedMinutes, this.companySchedule);
      return end.toLocaleString("hr-HR");
    },
    clientPhone() {
      if (!this.clientData) return "–";
      const rp = this.clientData.responsiblePersons?.find(
        (r) => r.fullName === this.projectData.responsible,
      );
      return rp?.contact || this.clientData.contact || "–";
    },
    clientEmail() {
      if (!this.clientData) return "–";
      const rp = this.clientData.responsiblePersons?.find(
        (r) => r.fullName === this.projectData.responsible,
      );
      return rp?.email || this.clientData.email || "–";
    },
  },
  methods: {
    async fetchProject() {
      try {
        const { data } = await api.get("/projects/" + this.project._id);
        this.projectData = data;
        this.recalcMissingEstimates();
        if (data.client) {
          try {
            const params = {};
            if (this.selectedCompany) params.company = this.selectedCompany;
            const { data: clients } = await api.get("/clients", { params });
            this.clientData = clients.find((c) => c.clientName === data.client) || null;
          } catch (e) { /* ignore */ }
        }
      } catch (e) {
        this.projectData = this.project;
      }
    },
    recalcMissingEstimates() {
      const drawings = this.projectData.drawings;
      if (!drawings) return;
      for (const dr of drawings) {
        if (dr.isAssemblyDrawing || !dr.assignedWorkers || !dr.treatments) continue;
        const hasZeroEst = dr.assignedWorkers.some((aw) => !aw.estimatedMinutes);
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
          workerCountPerOp[aw.operation || ""] = (workerCountPerOp[aw.operation || ""] || 0) + 1;
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
    formatDate(d) {
      if (!d) return "–";
      return new Date(d).toLocaleString("hr-HR");
    },
    formatMinutes(m) {
      if (!m) return "–";
      const h = Math.floor(m / 60);
      const min = Math.round(m % 60);
      return h > 0 ? `${h}h ${min}min` : `${min}min`;
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

.project-info {
  padding: 1rem;
}
.project-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.3rem;
}
.project-meta {
  font-size: 0.82rem;
  color: #555;
  margin-bottom: 0.2rem;
}

.progress-bar-wrap {
  height: 14px;
  background: #ddd;
  border-radius: 2px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  border-radius: 2px;
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
.badge-paused {
  display: inline-block;
  background: #6c757d;
  color: #fff;
  border-radius: 4px;
  padding: 0.15rem 0.5rem;
  font-size: 0.72rem;
  font-weight: 600;
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
  text-decoration: none;
}
.btn-action:hover:not(.btn-action-disabled) {
  background: #1e3f73;
  color: #fff;
  transform: translateX(3px);
}
.btn-action-disabled {
  background: #8a9bb5;
  cursor: not-allowed;
  opacity: 0.6;
}

.drawing-viewer {
  padding: 0;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
}
.drawing-pdf {
  width: 100%;
  height: 80vh;
  border: none;
}
.no-pdf {
  padding: 3rem;
  font-size: 0.9rem;
}

@media (max-width: 767.98px) {
  .btn-action {
    padding: 0.65rem 0.9rem;
    font-size: 0.85rem;
  }
  .drawing-viewer {
    min-height: 300px;
  }
  .drawing-pdf {
    height: 60vh;
  }
}
@media (max-width: 575.98px) {
  .content-wrap {
    padding: 0.75rem !important;
  }
}
</style>
