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
        <div class="row g-3 g-lg-4">
          <div class="col-lg-4 col-md-5 col-12">
            <div class="panel mb-3">
              <div class="project-info">
                <div class="project-title d-flex align-items-center gap-2">
                  <span>RN {{ project.rn }} – {{ project.name }}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="#2b579a"
                  >
                    <path
                      d="M8.354 1.146a.5.5 0 00-.708 0l-6 6A.5.5 0 001.5 7.5v7a.5.5 0 00.5.5h4.5a.5.5 0 00.5-.5v-4h2v4a.5.5 0 00.5.5H14a.5.5 0 00.5-.5v-7a.5.5 0 00-.146-.354z"
                    />
                  </svg>
                </div>
                <div class="project-meta">
                  <strong>{{ $t("project.client") }}:</strong>
                  {{ project.client }}
                </div>
                <div class="project-meta">
                  <strong>{{ $t("project.phone") }}:</strong> {{ clientPhone }}
                </div>
                <div class="project-meta">
                  <strong>{{ $t("project.email") }}:</strong> {{ clientEmail }}
                </div>
                <div class="d-flex align-items-center gap-2 mt-2 mb-1">
                  <div class="progress-bar-wrap" style="width: 120px">
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
                  <span :class="'badge-' + (projectData.status || 'active')">{{
                    projectData.status || "active"
                  }}</span>
                </div>
                <div class="project-meta">
                  <strong>{{ $t("project.startedAt") }}:</strong>
                  {{ formatDate(projectData.startedAt || projectData.createdAt) }}
                </div>
                <div v-if="totalEstimatedMinutes > 0" class="project-meta">
                  <strong>{{ $t("project.estimatedTime") }}:</strong>
                  {{ formatMinutes(totalEstimatedMinutes) }}
                </div>
                <div
                  v-if="totalEstimatedMinutes > 0"
                  class="project-meta"
                >
                  <strong>{{ $t("project.estimatedEnd") }}:</strong>
                  {{ estimatedEndDate }}
                </div>
              </div>
            </div>

            <div class="d-flex flex-column gap-2">
              <button class="btn btn-action" @click="exportPdf">
                <span>{{ $t("drawing.exportPdf") }}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  opacity="0.8"
                >
                  <path
                    d="M14 14V4.5L9.5 0H4a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2M9.5 3A1.5 1.5 0 0011 4.5h2V14a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1h5.5z"
                  />
                </svg>
              </button>
              <button class="btn btn-action" @click="printPage">
                <span>{{ $t("drawing.print") }}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  opacity="0.8"
                >
                  <path d="M2.5 8a.5.5 0 100-1 .5.5 0 000 1" />
                  <path
                    d="M5 1a2 2 0 00-2 2v2H2a2 2 0 00-2 2v3a2 2 0 002 2h1v1a2 2 0 002 2h6a2 2 0 002-2v-1h1a2 2 0 002-2V7a2 2 0 00-2-2h-1V3a2 2 0 00-2-2zM4 3a1 1 0 011-1h6a1 1 0 011 1v2H4zm1 10a1 1 0 01-1-1V9h8v3a1 1 0 01-1 1z"
                  />
                </svg>
              </button>
              <button
                v-if="!projectData.startedAt"
                class="btn btn-action btn-action-start"
                @click="startProject"
              >
                <span>{{ $t("project.startProject") }}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  opacity="0.8"
                >
                  <path
                    d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 010 1.393z"
                  />
                </svg>
              </button>
              <button
                v-if="projectData.status === 'in-progress'"
                class="btn btn-action btn-action-pause"
                @click="pauseProject"
              >
                <span>{{ $t("project.pauseProject") }}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  opacity="0.8"
                >
                  <path
                    d="M5.5 3.5A1.5 1.5 0 017 5v6a1.5 1.5 0 01-3 0V5a1.5 1.5 0 011.5-1.5m5 0A1.5 1.5 0 0112 5v6a1.5 1.5 0 01-3 0V5a1.5 1.5 0 011.5-1.5"
                  />
                </svg>
              </button>
              <button
                v-if="projectData.status === 'paused'"
                class="btn btn-action btn-action-start"
                @click="resumeProject"
              >
                <span>{{ $t("project.resumeProject") }}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  opacity="0.8"
                >
                  <path
                    d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 010 1.393z"
                  />
                </svg>
              </button>
              <button
                class="btn btn-action"
                @click="$emit('edit-project', project)"
              >
                <span>{{ $t("project.editProject") }}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  opacity="0.8"
                >
                  <path
                    d="M12.146.146a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-10 10a.5.5 0 01-.168.11l-5 2a.5.5 0 01-.65-.65l2-5a.5.5 0 01.11-.168zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 01.5.5v.5h.5a.5.5 0 01.5.5v.5h.293z"
                  />
                </svg>
              </button>
              <button
                class="btn btn-action-danger"
                @click="showDeleteModal = true"
              >
                <span>{{ $t("project.deleteProject") }}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  opacity="0.8"
                >
                  <path
                    d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5m2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5m3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0z"
                  />
                  <path
                    d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                  />
                </svg>
              </button>
              <button class="btn btn-action" @click="$emit('back')">
                <span>{{ $t("project.goBack") }}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  opacity="0.8"
                >
                  <path
                    fill-rule="evenodd"
                    d="M15 8a.5.5 0 00-.5-.5H2.707l3.147-3.146a.5.5 0 10-.708-.708l-4 4a.5.5 0 000 .708l4 4a.5.5 0 00.708-.708L2.707 8.5H14.5A.5.5 0 0015 8"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div class="col-lg-8 col-md-7 col-12">
            <section class="panel">
              <h5 class="panel-title">{{ $t("project.drawings") }}</h5>
              <div class="table-responsive">
                <table class="table align-middle mb-0">
                  <thead>
                    <tr>
                      <th>{{ $t("project.drawingNo") }}</th>
                      <th>{{ $t("project.partName") }}</th>
                      <th class="d-none d-sm-table-cell">
                        {{ $t("project.assembly") }}
                      </th>
                      <th class="d-none d-md-table-cell">
                        {{ $t("project.weight") }}
                      </th>
                      <th>{{ $t("project.qty") }}</th>
                      <th class="text-end">{{ $t("dashboard.action") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="d in drawings" :key="d.no">
                      <td class="fw-semibold text-dark">{{ d.no }}</td>
                      <td>{{ d.partName }}</td>
                      <td class="d-none d-sm-table-cell text-muted">
                        {{ d.assembly }}
                      </td>
                      <td class="d-none d-md-table-cell text-muted">
                        {{ d.weight }}
                      </td>
                      <td>{{ d.qty }}</td>
                      <td class="text-end">
                        <button
                          class="btn btn-sm btn-view"
                          @click="$emit('view-drawing', d)"
                        >
                          {{ $t("dashboard.view") }}
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            class="ms-1"
                          >
                            <path
                              d="M10.5 8a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0"
                            />
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

            <section class="panel mt-4">
              <div class="d-flex align-items-center justify-content-between">
                <h5 class="panel-title">
                  {{ $t("project.productionPlan") }}
                </h5>
                <div class="panel-header-actions pe-2 pt-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="#c0392b"
                  >
                    <path
                      d="M14 14V4.5L9.5 0H4a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2M9.5 3A1.5 1.5 0 0011 4.5h2V14a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1h5.5z"
                    />
                    <path
                      d="M4.603 14.087a.8.8 0 01-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 011.482-.645 20 20 0 001.062-2.227 7.3 7.3 0 01-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 01.477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 00.98 1.686 5.8 5.8 0 011.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 01-.354.416.86.86 0 01-.51.138c-.331-.014-.654-.196-.933-.417a6.1 6.1 0 01-.911-.95 11.7 11.7 0 00-1.997.406 11.3 11.3 0 01-1.02 1.51c-.292.35-.609.656-.927.787a.8.8 0 01-.58.029z"
                    />
                  </svg>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table align-middle mb-0">
                  <thead>
                    <tr>
                      <th>{{ $t("project.drawingNo") }}</th>
                      <th>{{ $t("dashboard.operation") }}</th>
                      <th class="d-none d-sm-table-cell">
                        {{ $t("dashboard.worksOn") }}
                      </th>
                      <th>{{ $t("dashboard.process") }}</th>
                      <th class="d-none d-md-table-cell">
                        {{ $t("project.estimatedEnd") }}
                      </th>
                      <th class="d-none d-lg-table-cell">
                        {{ $t("project.actualEnd") }}
                      </th>
                      <th class="text-end">{{ $t("dashboard.action") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(p, i) in productionPlan"
                      :key="i"
                      :class="{ 'row-completed': p.status === 'completed' }"
                    >
                      <td class="fw-semibold text-dark">{{ p.drawingNo }}</td>
                      <td>{{ p.operation }}</td>
                      <td class="d-none d-sm-table-cell text-muted">
                        {{ p.worksOn }}
                      </td>
                      <td>
                        <div class="d-flex align-items-center gap-2">
                          <div class="progress-bar-wrap">
                            <div
                              class="progress-fill"
                              :class="'fill-' + getTaskColor(p)"
                              :style="{ width: getTaskProgress(p) + '%' }"
                            ></div>
                          </div>
                          <span style="font-size: 0.72rem; white-space: nowrap"
                            >{{ getTaskProgress(p) }}%</span
                          >
                        </div>
                      </td>
                      <td
                        class="d-none d-md-table-cell text-muted"
                        style="font-size: 0.75rem"
                      >
                        {{ getTaskEstimatedEndDate(p) }}
                      </td>
                      <td
                        class="d-none d-lg-table-cell"
                        style="font-size: 0.75rem"
                      >
                        <span
                          v-if="p.status === 'completed' && p.completedAt"
                          class="text-success fw-semibold"
                          >{{ formatDate(p.completedAt) }}</span
                        >
                        <span
                          v-else-if="getTaskProgress(p) >= 100"
                          class="text-danger fw-semibold"
                          >{{ $t("project.awaitingConfirm") }}</span
                        >
                        <span v-else class="text-muted">–</span>
                      </td>
                      <td class="text-end">
                        <div class="d-flex gap-1 justify-content-end">
                          <button
                            v-if="
                              p.status !== 'completed' && projectData.startedAt
                            "
                            class="btn btn-sm btn-complete"
                            :disabled="!canCompleteTask(p)"
                            :title="!canCompleteTask(p) ? $t('project.prerequisiteNotDone') : ''"
                            @click="canCompleteTask(p) && openCompleteModal(p)"
                          >
                            ✓
                          </button>
                          <button
                            v-if="p.status !== 'completed'"
                            class="btn btn-sm btn-remove-worker"
                            @click="removeWorker(p.drawingIdx, p.workerIdx)"
                          >
                            ✕
                          </button>
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

    <div
      v-if="showCompleteModal"
      class="modal-overlay"
      @click.self="showCompleteModal = false"
    >
      <div class="modal-box" style="max-width: 400px">
        <div class="modal-header-custom">
          <h6 class="mb-0 fw-bold">{{ $t("project.completeTask") }}</h6>
          <button class="btn btn-sm p-0" @click="showCompleteModal = false">
            ✕
          </button>
        </div>
        <div class="modal-body-custom">
          <p style="font-size: 0.85rem">
            <strong>{{ completeTarget.worksOn }}</strong> –
            {{ completeTarget.operation }}
          </p>
          <label class="form-label-sm"
            >{{ $t("project.actualFinishTime") }}:</label
          >
          <input
            v-model="completeDateTime"
            type="datetime-local"
            class="form-control form-control-sm"
          />
        </div>
        <div class="modal-footer-custom">
          <button
            class="btn btn-sm btn-secondary"
            @click="showCompleteModal = false"
          >
            {{ $t("project.cancel") }}
          </button>
          <button
            class="btn btn-sm btn-primary-action"
            @click="confirmComplete"
          >
            {{ $t("project.confirmComplete") }}
          </button>
        </div>
      </div>
    </div>

    <Transition name="modal-fade">
      <div
        v-if="showDeleteModal"
        class="save-modal-overlay"
        @click.self="showDeleteModal = false"
      >
        <div class="save-modal-card">
          <div class="save-modal-icon delete-icon">!</div>
          <h6 class="save-modal-title">
            {{ $t("project.confirmDeleteTitle") }}
          </h6>
          <p class="save-modal-text">
            {{ $t("project.confirmDeleteMsg") }}
            <strong>{{ project.rn }} {{ project.name }}</strong
            >?
          </p>
          <div class="d-flex gap-2 justify-content-center">
            <button
              class="btn btn-sm save-modal-btn-cancel"
              @click="showDeleteModal = false"
            >
              {{ $t("project.cancel") }}
            </button>
            <button
              class="btn btn-sm save-modal-btn-delete"
              @click="deleteProject"
            >
              {{ $t("project.deleteProject") }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import SidebarNav from "./SidebarNav.vue";
import { exportProjectDetailPdf, printProjectDetail } from "../utils/pdf";
import { calcTimePerOperation } from "../utils/calculations";
import { addWorkingMinutes, getWorkingMinutesBetween } from "../utils/workingTime";
import api from "../api";

export default {
  name: "ProjectDetailPage",
  components: { SidebarNav },
  props: {
    project: {
      type: Object,
      required: true,
    },
    companies: { type: Array, default: () => [] },
    selectedCompany: { type: String, default: "" },
    userName: { type: String, default: "" },
    companySchedule: { type: Object, default: null },
  },
  emits: [
    "back",
    "logout",
    "view-drawing",
    "edit-project",
    "edit-profile",
    "select-company",
    "add-company",
    "update-companies",
  ],
  data() {
    return {
      showDeleteModal: false,
      showCompleteModal: false,
      completeTarget: {},
      completeDateTime: "",
      projectData: { ...this.project },
      clientData: null,
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
  watch: {
    project: {
      immediate: true,
      deep: true,
      handler(val) {
        this.projectData = { ...val };
        this.recalcMissingEstimates();
        this.fetchClientData();
      },
    },
  },
  computed: {
    drawings() {
      const d = this.projectData.drawings;
      if (!d) return [];
      return d.map((dr) => ({
        no: dr.drawingNo,
        partName: dr.partName,
        assembly: dr.assemblyName || "–",
        weight: dr.weight ? dr.weight + " kg" : "–",
        qty: dr.quantity || 1,
        pdfFile: dr.pdfFile || "",
        dwgFile: dr.dwgFile || "",
      }));
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
    productionPlan() {
      const d = this.projectData.drawings;
      if (!d) return [];
      const plan = [];
      const opCumulativeOffset = {};
      d.forEach((dr, dIdx) => {
        if (dr.isAssemblyDrawing || !dr.assignedWorkers) return;
        const opMaxInDrawing = {};
        dr.assignedWorkers.forEach((aw, wIdx) => {
          const op = aw.operation || "";
          const phaseStart = this.opPhaseTotals[op] || 0;
          const withinOpOffset = opCumulativeOffset[op] || 0;
          plan.push({
            drawingNo: dr.drawingNo,
            operation: aw.operation,
            worksOn: aw.workerName,
            status: aw.status || "pending",
            workerId: aw.workerId,
            estimatedMinutes: aw.estimatedMinutes || 0,
            completedAt: aw.completedAt,
            drawingIdx: dIdx,
            workerIdx: wIdx,
            startOffset: phaseStart + withinOpOffset,
          });
          const est = aw.estimatedMinutes || 0;
          if (!opMaxInDrawing[op] || est > opMaxInDrawing[op]) {
            opMaxInDrawing[op] = est;
          }
        });
        for (const [op, maxEst] of Object.entries(opMaxInDrawing)) {
          opCumulativeOffset[op] = (opCumulativeOffset[op] || 0) + maxEst;
        }
      });
      return plan;
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
      const plan = this.productionPlan;
      if (!plan.length) return 0;
      if (plan.every((p) => p.status === "completed")) return 100;
      if (!this.totalEstimatedMinutes || !this.projectData.startedAt) {
        const completed = plan.filter((p) => p.status === "completed").length;
        return Math.round((completed / plan.length) * 100);
      }
      return Math.min(
        100,
        Math.round((this.effectiveElapsedMinutes / this.totalEstimatedMinutes) * 100),
      );
    },
    progressColor() {
      const p = this.overallProgress;
      if (p >= 100) return "green";
      if (p >= 50) return "yellow";
      if (p > 0) return "blue";
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
    recalcMissingEstimates() {
      const drawings = this.projectData.drawings;
      if (!drawings) return;
      let changed = false;
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
          const key = aw.operation || "";
          workerCountPerOp[key] = (workerCountPerOp[key] || 0) + 1;
        }
        for (const aw of dr.assignedWorkers) {
          if (aw.estimatedMinutes) continue;
          const opKey = opLabelToKey[aw.operation];
          if (opKey && opTimes[opKey]) {
            const count = workerCountPerOp[aw.operation] || 1;
            aw.estimatedMinutes = Math.round(opTimes[opKey] / count);
            changed = true;
          }
        }
      }
      if (changed) {
        this.projectData = { ...this.projectData };
      }
    },
    async fetchClientData() {
      if (!this.projectData.client) return;
      try {
        const params = {};
        if (this.selectedCompany) params.company = this.selectedCompany;
        const { data } = await api.get("/clients", { params });
        this.clientData =
          data.find((c) => c.clientName === this.projectData.client) || null;
      } catch (e) { console.error("Failed to load client data", e); }
    },
    async refreshProject() {
      try {
        const { data } = await api.get("/projects/" + this.projectData._id);
        this.projectData = data;
        this.recalcMissingEstimates();
      } catch (e) { console.error("Failed to refresh project", e); }
    },
    formatDate(d) {
      if (!d) return "–";
      return new Date(d).toLocaleString("hr-HR");
    },
    formatMinutes(min) {
      if (!min || min <= 0) return "–";
      const h = Math.floor(min / 60);
      const m = Math.round(min % 60);
      if (h > 0) return `${h}h ${m}min`;
      return `${m}min`;
    },
    getTaskProgress(task) {
      if (task.status === "completed") return 100;
      if (!this.projectData.startedAt || !task.estimatedMinutes) return 0;
      const taskElapsed = this.effectiveElapsedMinutes - (task.startOffset || 0);
      if (taskElapsed <= 0) return 0;
      return Math.min(
        100,
        Math.round((taskElapsed / task.estimatedMinutes) * 100),
      );
    },
    getTaskEstimatedEndDate(task) {
      const start = this.projectData.startedAt || this.projectData.createdAt;
      if (!start || !task.estimatedMinutes) return "–";
      const adjustedStart = new Date(new Date(start).getTime() + this.totalPausedMinutes * 60000);
      const totalMinutes = (task.startOffset || 0) + task.estimatedMinutes;
      const end = addWorkingMinutes(adjustedStart, totalMinutes, this.companySchedule);
      return end.toLocaleString("hr-HR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    getTaskColor(task) {
      const p = this.getTaskProgress(task);
      if (p >= 100) return "green";
      if (p >= 50) return "yellow";
      if (p > 0) return "blue";
      return "blue";
    },
    async exportPdf() {
      const planWithProgress = this.productionPlan.map((p) => ({
        ...p,
        progress: this.getTaskProgress(p),
        estimatedEndDate: this.getTaskEstimatedEndDate(p),
        actualEndDate:
          p.status === "completed" && p.completedAt
            ? this.formatDate(p.completedAt)
            : "",
      }));
      await exportProjectDetailPdf(
        this.projectData,
        this.drawings,
        planWithProgress,
        this.userName,
        this.selectedCompany,
        this.overallProgress,
        this.estimatedEndDate,
        this.clientPhone,
        this.clientEmail,
      );
    },
    printPage() {
      const planWithProgress = this.productionPlan.map((p) => ({
        ...p,
        progress: this.getTaskProgress(p),
        estimatedEndDate: this.getTaskEstimatedEndDate(p),
        actualEndDate:
          p.status === "completed" && p.completedAt
            ? this.formatDate(p.completedAt)
            : "",
      }));
      printProjectDetail(
        this.projectData,
        this.drawings,
        planWithProgress,
        this.userName,
        this.selectedCompany,
        this.overallProgress,
        this.estimatedEndDate,
        this.clientPhone,
        this.clientEmail,
      );
    },
    async startProject() {
      try {
        const { data } = await api.put(
          "/projects/" + this.projectData._id + "/start",
        );
        this.projectData = data;
      } catch (err) {
        console.error("Failed to start project:", err);
      }
    },
    async pauseProject() {
      try {
        const { data } = await api.put(
          "/projects/" + this.projectData._id + "/pause",
        );
        this.projectData = data;
      } catch (err) {
        console.error("Failed to pause project:", err);
      }
    },
    async resumeProject() {
      try {
        const { data } = await api.put(
          "/projects/" + this.projectData._id + "/resume",
        );
        this.projectData = data;
      } catch (err) {
        console.error("Failed to resume project:", err);
      }
    },
    toLocalDateTimeString(date) {
      const d = new Date(date);
      const pad = (n) => String(n).padStart(2, "0");
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    },
    canCompleteTask(task) {
      const phases = this.operationPhases;
      const taskOp = task.operation || "";
      let taskPhaseIdx = -1;
      for (let i = 0; i < phases.length; i++) {
        if (phases[i].includes(taskOp)) { taskPhaseIdx = i; break; }
      }
      if (taskPhaseIdx <= 0) return true;
      const drawing = this.projectData.drawings[task.drawingIdx];
      if (!drawing || !drawing.assignedWorkers) return true;
      for (let pi = 0; pi < taskPhaseIdx; pi++) {
        const phaseOps = phases[pi];
        const tasksInPhase = drawing.assignedWorkers.filter(aw => phaseOps.includes(aw.operation));
        if (tasksInPhase.length > 0 && !tasksInPhase.every(aw => aw.status === "completed")) {
          return false;
        }
      }
      return true;
    },
    openCompleteModal(task) {
      this.completeTarget = task;
      if (this.projectData.startedAt && task.estimatedMinutes) {
        const adjustedStart = new Date(new Date(this.projectData.startedAt).getTime() + this.totalPausedMinutes * 60000);
        const suggested = addWorkingMinutes(adjustedStart, (task.startOffset || 0) + task.estimatedMinutes, this.companySchedule);
        const capped = new Date(Math.min(suggested.getTime(), Date.now()));
        this.completeDateTime = this.toLocalDateTimeString(capped);
      } else {
        this.completeDateTime = this.toLocalDateTimeString(new Date());
      }
      this.showCompleteModal = true;
    },
    async confirmComplete() {
      const t = this.completeTarget;
      const estMinutes = t.estimatedMinutes || 0;
      try {
        const { data } = await api.put(
          "/projects/" + this.projectData._id + "/complete-task",
          {
            drawingIndex: t.drawingIdx,
            workerIndex: t.workerIdx,
            completedAt: this.completeDateTime,
          },
        );
        this.projectData = data;
        this.recalcMissingEstimates();

        if (t.workerId && this.projectData.startedAt && estMinutes > 0) {
          const taskStartMs =
            new Date(this.projectData.startedAt).getTime() +
            (t.startOffset || 0) * 60000;
          const actualMinutes =
            (new Date(this.completeDateTime).getTime() - taskStartMs) / 60000;
          const ratio = Math.min(
            100,
            Math.round((estMinutes / Math.max(actualMinutes, 1)) * 100),
          );
          const opKeyMap = {
            "Rezanje cijevi": "pipeCutting",
            "Rezanje lima": "sheetCutting",
            Bušenje: "drilling",
            Zavarivanje: "welding",
            Brušenje: "grinding",
            Savijanje: "bending",
            Montaža: "assembly",
          };
          const opKey = opKeyMap[t.operation];
          if (opKey) {
            await api.put("/workers/" + t.workerId + "/rating", {
              operation: opKey,
              rating: ratio,
            });
          }
        }
      } catch (err) {
        console.error("Failed to complete task:", err);
      }
      this.showCompleteModal = false;
    },
    async removeWorker(drawingIdx, workerIdx) {
      try {
        const { data } = await api.put(
          "/projects/" + this.projectData._id + "/remove-worker",
          {
            drawingIndex: drawingIdx,
            workerIndex: workerIdx,
          },
        );
        this.projectData = data;
      } catch (err) {
        console.error("Failed to remove worker:", err);
      }
    },
    async deleteProject() {
      const id = this.projectData._id;
      if (!id) return;
      try {
        await api.delete("/projects/" + id);
      } catch (err) {
        console.error("Failed to delete project:", err);
      }
      this.showDeleteModal = false;
      this.$emit("back");
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

.project-info {
  padding: 1rem;
}

.project-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.project-meta {
  font-size: 0.82rem;
  color: #555;
  margin-bottom: 0.25rem;
}

.btn-action-danger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #c0392b;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.1rem;
  font-size: 0.9rem;
  font-weight: 600;
  transition: background 0.15s, transform 0.15s;
}

.btn-action-danger:hover {
  background: #962d22;
  color: #fff;
  transform: translateX(3px);
}

.panel-header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.panel-header-actions svg {
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.15s;
}

.panel-header-actions svg:hover {
  opacity: 1;
}

@media (max-width: 767.98px) {
  .btn-action,
  .btn-action-danger {
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

.save-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}
.save-modal-card {
  background: #fff;
  border-radius: 12px;
  padding: 2rem 2.5rem;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 90%;
}
.save-modal-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #27ae60;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 auto 0.75rem;
}
.save-modal-icon.delete-icon {
  background: #c0392b;
}
.save-modal-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.3rem;
}
.save-modal-text {
  font-size: 0.85rem;
  color: #555;
  margin-bottom: 1rem;
}
.save-modal-btn-cancel {
  background: #6c757d;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.4rem 1.2rem;
  font-weight: 600;
}
.save-modal-btn-cancel:hover {
  background: #5a6268;
  color: #fff;
}
.save-modal-btn-delete {
  background: #c0392b;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.4rem 1.2rem;
  font-weight: 600;
}
.save-modal-btn-delete:hover {
  background: #962d22;
  color: #fff;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.btn-action-start {
  background: #27ae60;
}
.btn-action-start:hover {
  background: #1e8449;
}

.btn-complete {
  background: #27ae60;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: 700;
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
}
.btn-complete:hover:not(:disabled) {
  background: #1e8449;
  color: #fff;
}
.btn-complete:disabled {
  background: #a0a0a0;
  cursor: not-allowed;
  opacity: 0.6;
}
.btn-remove-worker {
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: 700;
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
}
.btn-remove-worker:hover {
  background: #c0392b;
  color: #fff;
}

.row-completed {
  opacity: 0.6;
}
.row-completed td {
  text-decoration: line-through;
}

.badge-pending {
  background: #95a5a6;
  color: #fff;
  border-radius: 4px;
  padding: 0.15rem 0.5rem;
  font-size: 0.72rem;
  font-weight: 600;
}
.badge-in-progress {
  background: #e67e22;
  color: #fff;
  border-radius: 4px;
  padding: 0.15rem 0.5rem;
  font-size: 0.72rem;
  font-weight: 600;
}
.badge-completed {
  background: #27ae60;
  color: #fff;
  border-radius: 4px;
  padding: 0.15rem 0.5rem;
  font-size: 0.72rem;
  font-weight: 600;
}
.badge-active {
  background: #2b579a;
  color: #fff;
  border-radius: 4px;
  padding: 0.15rem 0.5rem;
  font-size: 0.72rem;
  font-weight: 600;
}
.badge-paused {
  background: #95a5a6;
  color: #fff;
  border-radius: 4px;
  padding: 0.15rem 0.5rem;
  font-size: 0.72rem;
  font-weight: 600;
}
.btn-action-pause {
  border-color: #e67e22;
  color: #e67e22;
}
.btn-action-pause:hover {
  background: #e67e22;
  color: #fff;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.modal-box {
  background: #fff;
  border-radius: 8px;
  width: 90%;
  max-width: 750px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}
.modal-header-custom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #ddd;
}
.modal-body-custom {
  padding: 1rem;
  overflow-y: auto;
  flex: 1;
}
.modal-footer-custom {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-top: 1px solid #ddd;
}
.form-label-sm {
  font-size: 0.78rem;
  font-weight: 600;
  color: #444;
  margin-bottom: 0.2rem;
  display: block;
}
.btn-primary-action {
  background: #2b579a;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.3rem 0.75rem;
}
.btn-primary-action:hover {
  background: #1e3f73;
  color: #fff;
}
</style>
