<template>
  <div class="dashboard-layout d-flex min-vh-100">
    <SidebarNav
      :companies="companies"
      @logout="$emit('logout')"
      @add-company="addCompany"
    />

    <main class="main-content flex-grow-1">
      <div class="content-wrap p-3 p-lg-4">
        <div class="row g-3 g-lg-4 align-items-start">
          <div class="col-lg-3 col-md-4 col-12">
            <div class="panel mb-3">
              <div class="panel-body">
                <h5 class="panel-heading">{{ $t("createProject.title") }}</h5>

                <div class="mb-3">
                  <label class="form-label-sm"
                    >{{ $t("createProject.rnNumber") }}:</label
                  >
                  <input
                    v-model="form.rn"
                    type="text"
                    class="form-control form-control-sm"
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label-sm"
                    >{{ $t("createProject.name") }}:</label
                  >
                  <input
                    v-model="form.name"
                    type="text"
                    class="form-control form-control-sm"
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label-sm"
                    >{{ $t("createProject.selectClient") }}:</label
                  >
                  <select
                    v-model="form.client"
                    class="form-select form-select-sm"
                  >
                    <option value=""></option>
                    <option>City Montana</option>
                    <option>Bridge Mont II</option>
                    <option>Telekom Com</option>
                  </select>
                </div>

                <div class="mb-0">
                  <label class="form-label-sm"
                    >{{ $t("createProject.selectResponsible") }}:</label
                  >
                  <select
                    v-model="form.responsible"
                    class="form-select form-select-sm"
                  >
                    <option value=""></option>
                    <option>David Mallys</option>
                    <option>Marko Marković</option>
                    <option>Ivo Ivić</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="d-flex flex-column gap-2">
              <button class="btn btn-action">
                <span>{{ $t("createProject.previewProcess") }}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  opacity="0.8"
                >
                  <path d="M10.5 8a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0" />
                  <path
                    d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7"
                  />
                </svg>
              </button>
              <button class="btn btn-action">
                <span>{{ $t("createProject.saveAndInsertNew") }}</span>
                <span class="action-icon">+</span>
              </button>
              <button class="btn btn-action">
                <span>{{ $t("createProject.saveAndFinish") }}</span>
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
              <button class="btn btn-action" @click="$emit('back')">
                <span>{{ $t("drawing.goBackHome") }}</span>
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
                  {{ $t("createProject.basicData") }}
                </h5>

                <div class="row g-2 mb-3">
                  <div class="col-md-4 col-sm-6">
                    <label class="form-label-sm"
                      >{{ $t("project.drawingNo") }}:</label
                    >
                    <input
                      v-model="part.drawingNo"
                      type="text"
                      class="form-control form-control-sm"
                    />
                  </div>
                  <div class="col-md-4 col-sm-6">
                    <label class="form-label-sm"
                      >{{ $t("project.partName") }}:</label
                    >
                    <input
                      v-model="part.partName"
                      type="text"
                      class="form-control form-control-sm"
                    />
                  </div>
                  <div class="col-md-4 col-sm-6">
                    <label class="form-label-sm"
                      >{{ $t("createProject.assemblyName") }}:</label
                    >
                    <input
                      v-model="part.assemblyName"
                      type="text"
                      class="form-control form-control-sm"
                    />
                  </div>
                </div>

                <div class="row g-2 mb-3">
                  <div class="col-md-4 col-sm-6">
                    <label class="form-label-sm"
                      >{{ $t("createProject.weightKg") }}:</label
                    >
                    <input
                      v-model="part.weight"
                      type="text"
                      class="form-control form-control-sm"
                    />
                  </div>
                  <div class="col-md-2 col-sm-6">
                    <label class="form-label-sm"
                      >{{ $t("createProject.quantity") }}:</label
                    >
                    <input
                      v-model="part.quantity"
                      type="number"
                      class="form-control form-control-sm"
                    />
                  </div>
                </div>

                <div class="row g-2 mb-4">
                  <div class="col-md-6">
                    <label class="form-label-sm"
                      >{{ $t("createProject.importPdf") }}:</label
                    >
                    <div class="d-flex gap-2">
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        readonly
                      />
                      <button class="btn btn-sm btn-primary-action text-nowrap">
                        {{ $t("createProject.importPdf") }}
                        <span class="ms-1">+</span>
                      </button>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label-sm"
                      >{{ $t("createProject.importDwg") }}:</label
                    >
                    <div class="d-flex gap-2">
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        readonly
                      />
                      <button class="btn btn-sm btn-primary-action text-nowrap">
                        {{ $t("createProject.importDwg") }}
                        <span class="ms-1">+</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="row g-2 mb-4">
                  <div class="col-md-6">
                    <h6 class="section-label">
                      {{ $t("createProject.whoWorks") }}:
                    </h6>
                    <div class="d-flex gap-2 flex-wrap">
                      <button class="btn btn-sm btn-primary-action">
                        {{ $t("createProject.automatic") }} +
                      </button>
                      <button class="btn btn-sm btn-primary-action">
                        {{ $t("createProject.manual") }} +
                      </button>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <h6 class="section-label">
                      {{ $t("createProject.materialUsed") }}:
                    </h6>
                    <button class="btn btn-sm btn-outline-action">
                      {{ $t("createProject.addMaterial") }} +
                    </button>
                  </div>
                </div>

                <h6 class="section-label mb-3">
                  {{ $t("createProject.treatments") }}:
                </h6>
                <div class="treatments-grid mb-3">
                  <div class="row g-2 mb-2 align-items-end">
                    <div class="col-auto treatment-label">
                      {{ $t("createProject.pipeCutting") }}:
                    </div>
                    <div class="col">
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="qty"
                      />
                    </div>
                    <div class="col">
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="m"
                      />
                    </div>
                    <div class="col">
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="thickness"
                      />
                    </div>
                    <div class="col-auto treatment-label">
                      {{ $t("createProject.welding") }}:
                    </div>
                    <div class="col">
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="m"
                      />
                    </div>
                    <div class="col">
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="size"
                      />
                    </div>
                    <div class="col-auto treatment-label">
                      {{ $t("createProject.bending") }}:
                    </div>
                    <div class="col">
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="qty"
                      />
                    </div>
                    <div class="col">
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="thickness"
                      />
                    </div>
                  </div>

                  <div class="row g-2 mb-2 align-items-end">
                    <div class="col-auto treatment-label">
                      {{ $t("createProject.sheetCutting") }}:
                    </div>
                    <div class="col">
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="qty"
                      />
                    </div>
                    <div class="col">
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="m"
                      />
                    </div>
                    <div class="col">
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="thickness"
                      />
                    </div>
                    <div class="col-auto treatment-label">
                      {{ $t("createProject.grinding") }}:
                    </div>
                    <div class="col">
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="m"
                      />
                    </div>
                    <div class="col d-none d-md-block"></div>
                    <div class="col-auto treatment-label">
                      {{ $t("createProject.assembly") }}:
                    </div>
                    <div class="col">
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="qty"
                      />
                    </div>
                    <div class="col">
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="kg"
                      />
                    </div>
                  </div>

                  <div class="row g-2 mb-2 align-items-end">
                    <div class="col-auto treatment-label">
                      {{ $t("createProject.drilling") }}:
                    </div>
                    <div class="col">
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="qty"
                      />
                    </div>
                    <div class="col">
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="dia"
                      />
                    </div>
                  </div>
                </div>

                <div class="d-flex align-items-center gap-3 flex-wrap">
                  <span class="section-label mb-0">{{
                    $t("createProject.moreTreatments")
                  }}</span>
                  <button class="btn btn-sm btn-primary-action">
                    {{ $t("createProject.addMoreTreatments") }} +
                  </button>
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
  name: "CreateProjectPage",
  components: { SidebarNav },
  emits: ["back", "logout"],
  data() {
    return {
      companies: ["Company 1", "Company 2", "Company 3", "Company 4"],
      form: { rn: "", name: "", client: "", responsible: "" },
      part: {
        drawingNo: "",
        partName: "",
        assemblyName: "",
        weight: "",
        quantity: "",
      },
    };
  },
  methods: {
    addCompany() {
      this.companies.push("New Factory " + (this.companies.length + 1));
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

.form-label-sm {
  font-size: 0.78rem;
  font-weight: 600;
  color: #444;
  margin-bottom: 0.2rem;
  display: block;
}

.form-control-sm,
.form-select-sm {
  font-size: 0.82rem;
  border: 1.5px solid #bbb;
  border-radius: 4px;
  padding: 0.35rem 0.5rem;
}
.form-control-sm:focus,
.form-select-sm:focus {
  border-color: #2b579a;
  box-shadow: 0 0 0 2px rgba(43, 87, 154, 0.12);
}

.section-label {
  font-size: 0.82rem;
  font-weight: 700;
  color: #1a1a1a;
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

.btn-outline-action {
  background: transparent;
  color: #2b579a;
  border: 1.5px solid #2b579a;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.3rem 0.75rem;
}
.btn-outline-action:hover {
  background: rgba(43, 87, 154, 0.08);
  color: #1e3f73;
}

.treatment-label {
  font-size: 0.78rem;
  font-weight: 600;
  color: #444;
  white-space: nowrap;
  min-width: fit-content;
}

.treatments-grid .form-control-sm {
  min-width: 50px;
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
  .treatments-grid .row {
    flex-direction: column;
  }
  .treatments-grid .row .col-auto {
    margin-top: 0.5rem;
  }
}
@media (max-width: 575.98px) {
  .content-wrap {
    padding: 0.75rem !important;
  }
}
</style>
