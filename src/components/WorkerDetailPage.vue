<template>
  <div class="dashboard-layout d-flex min-vh-100">
    <SidebarNav
      :companies="companies"
      :selected-company="selectedCompany"
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
              <div class="panel-body">
                <h5 class="panel-heading">
                  {{ $t("workerDetail.worker") }}
                </h5>
                <div class="worker-name">{{ worker.fullName }}</div>
                <div class="worker-meta">
                  <strong>{{ $t("workerDetail.phone") }}:</strong>
                  {{ worker.contact }}
                </div>
                <div class="worker-meta">
                  <strong>{{ $t("workerDetail.email") }}:</strong>
                  {{ worker.email }}
                </div>
                <div class="worker-meta mt-2">
                  <span class="text-muted"
                    >{{ $t("workerDetail.createdAt") }}:</span
                  >
                  {{ worker.createdAt }}
                </div>
              </div>
            </div>

            <div class="d-flex flex-column gap-2">
              <button class="btn btn-action" @click="$emit('back')">
                <span>{{ $t("workerDetail.goBack") }}</span>
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
              <button class="btn btn-action">
                <span>{{ $t("workerDetail.saveChanges") }}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  opacity="0.8"
                >
                  <path
                    d="M2 1a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1H9.5a1 1 0 00-1 1v7.293l2.646-2.647a.5.5 0 01.708.708l-3.5 3.5a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L7.5 9.293V2a2 2 0 012-2H14a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V2a2 2 0 012-2h2.5a.5.5 0 010 1z"
                  />
                </svg>
              </button>
              <button class="btn btn-action">
                <span>{{ $t("workerDetail.exportPdf") }}</span>
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
                  <path
                    d="M4.603 14.087a.8.8 0 01-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 011.482-.645 20 20 0 001.062-2.227 7.3 7.3 0 01-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 01.477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 00.98 1.686 5.8 5.8 0 011.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 01-.354.416.86.86 0 01-.51.138c-.331-.014-.654-.196-.933-.417a6.1 6.1 0 01-.911-.95 11.7 11.7 0 00-1.997.406 11.3 11.3 0 01-1.02 1.51c-.292.35-.609.656-.927.787a.8.8 0 01-.58.029z"
                  />
                </svg>
              </button>
              <button class="btn btn-action">
                <span>{{ $t("workerDetail.print") }}</span>
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
              <button class="btn btn-action-danger">
                <span>{{ $t("workerDetail.deleteWorker") }}</span>
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
              <button class="btn btn-action" @click="$emit('home')">
                <span>{{ $t("workerDetail.goBackHome") }}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  opacity="0.8"
                >
                  <path
                    d="M8.354 1.146a.5.5 0 00-.708 0l-6 6A.5.5 0 001.5 7.5v7a.5.5 0 00.5.5h4.5a.5.5 0 00.5-.5v-4h2v4a.5.5 0 00.5.5H14a.5.5 0 00.5-.5v-7a.5.5 0 00-.146-.354z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div class="col-lg-9 col-md-8 col-12">
            <section class="panel">
              <div class="panel-body">
                <h5 class="panel-heading">
                  {{ $t("workerDetail.workerData") }}
                </h5>

                <div class="row g-2 mb-3">
                  <div class="col-md-6">
                    <label class="form-label-sm"
                      >{{ $t("workerDetail.fullName") }}:</label
                    >
                    <input
                      v-model="form.fullName"
                      type="text"
                      class="form-control form-control-sm"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label-sm"
                      >{{ $t("workerDetail.email") }}:</label
                    >
                    <input
                      v-model="form.email"
                      type="email"
                      class="form-control form-control-sm"
                    />
                  </div>
                </div>

                <div class="row g-2 mb-3">
                  <div class="col-md-6">
                    <label class="form-label-sm"
                      >{{ $t("workerDetail.address") }}:</label
                    >
                    <input
                      v-model="form.address"
                      type="text"
                      class="form-control form-control-sm"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label-sm"
                      >{{ $t("workerDetail.contact") }}:</label
                    >
                    <input
                      v-model="form.contact"
                      type="text"
                      class="form-control form-control-sm"
                    />
                  </div>
                </div>

                <div class="row g-2 mb-3">
                  <div class="col-md-6">
                    <label class="form-label-sm"
                      >{{ $t("workerDetail.jobPosition") }}:</label
                    >
                    <input
                      v-model="form.jobPosition"
                      type="text"
                      class="form-control form-control-sm"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label-sm"
                      >{{ $t("workerDetail.totalRating") }}:</label
                    >
                    <input
                      v-model="form.totalRating"
                      type="text"
                      class="form-control form-control-sm"
                    />
                  </div>
                </div>

                <div class="row g-2 mb-3">
                  <div class="col-md-6">
                    <label class="form-label-sm"
                      >{{ $t("workerDetail.pipeCuttingRating") }}:</label
                    >
                    <input
                      v-model="form.pipeCuttingRating"
                      type="text"
                      class="form-control form-control-sm"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label-sm"
                      >{{ $t("workerDetail.assemblyRating") }}:</label
                    >
                    <input
                      v-model="form.assemblyRating"
                      type="text"
                      class="form-control form-control-sm"
                    />
                  </div>
                </div>

                <div class="row g-2 mb-3">
                  <div class="col-md-6">
                    <label class="form-label-sm"
                      >{{ $t("workerDetail.sheetCuttingRating") }}:</label
                    >
                    <input
                      v-model="form.sheetCuttingRating"
                      type="text"
                      class="form-control form-control-sm"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label-sm"
                      >{{ $t("workerDetail.weldingRating") }}:</label
                    >
                    <input
                      v-model="form.weldingRating"
                      type="text"
                      class="form-control form-control-sm"
                    />
                  </div>
                </div>

                <div class="row g-2 mb-3">
                  <div class="col-md-6">
                    <label class="form-label-sm"
                      >{{ $t("workerDetail.drillingRating") }}:</label
                    >
                    <input
                      v-model="form.drillingRating"
                      type="text"
                      class="form-control form-control-sm"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label-sm"
                      >{{ $t("workerDetail.grindingRating") }}:</label
                    >
                    <input
                      v-model="form.grindingRating"
                      type="text"
                      class="form-control form-control-sm"
                    />
                  </div>
                </div>

                <div class="row g-2 mb-3">
                  <div class="col-md-6">
                    <label class="form-label-sm"
                      >{{ $t("workerDetail.bendingRating") }}:</label
                    >
                    <input
                      v-model="form.bendingRating"
                      type="text"
                      class="form-control form-control-sm"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label-sm"
                      >{{ $t("workerDetail.projectsCompleted") }}:</label
                    >
                    <input
                      v-model="form.projectsCompleted"
                      type="text"
                      class="form-control form-control-sm"
                    />
                  </div>
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

export default {
  name: "WorkerDetailPage",
  components: { SidebarNav },
  props: {
    worker: { type: Object, required: true },
    companies: { type: Array, default: () => [] },
    selectedCompany: { type: String, default: '' },
  },
  emits: ["back", "home", "logout", "edit-profile", "select-company", "add-company", "update-companies"],
  data() {
    return {
      form: {
        fullName: this.worker.fullName || "",
        email: this.worker.email || "",
        address: this.worker.address || "",
        contact: this.worker.contact || "",
        jobPosition: this.worker.jobPosition || "",
        totalRating: this.worker.totalRating || "",
        pipeCuttingRating: this.worker.pipeCuttingRating || "",
        assemblyRating: this.worker.assemblyRating || "",
        sheetCuttingRating: this.worker.sheetCuttingRating || "",
        weldingRating: this.worker.weldingRating || "",
        drillingRating: this.worker.drillingRating || "",
        grindingRating: this.worker.grindingRating || "",
        bendingRating: this.worker.bendingRating || "",
        projectsCompleted: this.worker.projectsCompleted || "",
      },
    };
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
  overflow: hidden;
}
.panel-body {
  padding: 1rem;
}
.panel-heading {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.75rem;
}

.worker-name {
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}
.worker-meta {
  font-size: 0.82rem;
  color: #555;
  margin-bottom: 0.25rem;
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

@media (max-width: 767.98px) {
  .btn-action,
  .btn-action-danger {
    padding: 0.65rem 0.9rem;
    font-size: 0.85rem;
  }
}
@media (max-width: 575.98px) {
  .content-wrap {
    padding: 0.75rem !important;
  }
}
</style>
