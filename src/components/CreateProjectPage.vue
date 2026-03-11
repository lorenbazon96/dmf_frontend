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

                <div class="mb-3">
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

                <div class="mb-0">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="assemblyDrawingCheck"
                      v-model="form.isAssemblyDrawing"
                    />
                    <label class="form-check-label form-label-sm mb-0" for="assemblyDrawingCheck">
                      {{ $t("createProject.assemblyDrawingOnly") }}
                    </label>
                  </div>
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

                <template v-if="!form.isAssemblyDrawing">
                  <div class="row g-2 mb-4">
                    <div class="col-md-6">
                      <h6 class="section-label">
                        {{ $t("createProject.whoWorks") }}:
                      </h6>
                      <div class="d-flex gap-2 flex-wrap">
                        <button class="btn btn-sm btn-primary-action" @click="openAutoModal">
                          {{ $t("createProject.automatic") }} +
                        </button>
                        <button class="btn btn-sm btn-primary-action" @click="openManualModal">
                          {{ $t("createProject.manual") }} +
                        </button>
                      </div>
                      <div v-if="assignedWorkers.length" class="mt-2">
                        <div v-for="(group, op) in groupedAssignedWorkers" :key="op" class="mb-2">
                          <div class="assigned-op-label">{{ op }}</div>
                          <div
                            v-for="aw in group"
                            :key="aw._idx"
                            class="assigned-worker-chip"
                          >
                            <span class="assigned-type-badge" :class="aw.type === 'auto' ? 'badge-auto' : 'badge-manual'">{{ aw.type === 'auto' ? 'A' : 'R' }}</span>
                            <strong>{{ aw.name }}</strong>
                            <span v-if="aw.note" class="text-muted ms-1">– {{ aw.note }}</span>
                            <button class="btn btn-sm p-0 ms-2" @click="removeAssignedWorker(aw._idx)">✕</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <h6 class="section-label">
                        {{ $t("createProject.materialUsed") }}:
                      </h6>
                      <button class="btn btn-sm btn-outline-action" @click="showMaterialModal = true">
                        {{ $t("createProject.addMaterial") }} +
                      </button>
                      <div v-if="assignedMaterials.length" class="mt-2">
                        <div
                          v-for="(am, idx) in assignedMaterials"
                          :key="idx"
                          class="assigned-worker-chip"
                        >
                          <strong>{{ am.name }}</strong>
                          <span class="text-muted ms-1">({{ am.specs }})</span>
                          <span class="ms-1">× {{ am.useQty }}</span>
                          <button class="btn btn-sm p-0 ms-2" @click="assignedMaterials.splice(idx, 1)">✕</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h6 class="section-label mb-3">
                    {{ $t("createProject.treatments") }}:
                  </h6>

                  <div
                    v-for="(section, sIdx) in treatmentSections"
                    :key="sIdx"
                    class="treatments-grid mb-3"
                  >
                    <div v-if="sIdx > 0" class="treatment-section-divider mb-2">
                      <span class="section-label">{{ $t("createProject.treatments") }} #{{ sIdx + 1 }}</span>
                      <button class="btn btn-sm p-0 ms-2 text-danger" @click="treatmentSections.splice(sIdx, 1)">✕</button>
                    </div>
                    <div class="row g-2 mb-2 align-items-end">
                      <div class="col-auto treatment-label">
                        {{ $t("createProject.pipeCutting") }}:
                      </div>
                      <div class="col">
                        <input
                          v-model="section.pipeCutting.qty"
                          type="text"
                          class="form-control form-control-sm"
                          placeholder="qty"
                        />
                      </div>
                      <div class="col">
                        <input
                          v-model="section.pipeCutting.m"
                          type="text"
                          class="form-control form-control-sm"
                          placeholder="m"
                        />
                      </div>
                      <div class="col">
                        <input
                          v-model="section.pipeCutting.thickness"
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
                          v-model="section.welding.m"
                          type="text"
                          class="form-control form-control-sm"
                          placeholder="m"
                        />
                      </div>
                      <div class="col">
                        <input
                          v-model="section.welding.size"
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
                          v-model="section.bending.qty"
                          type="text"
                          class="form-control form-control-sm"
                          placeholder="qty"
                        />
                      </div>
                      <div class="col">
                        <input
                          v-model="section.bending.thickness"
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
                          v-model="section.sheetCutting.qty"
                          type="text"
                          class="form-control form-control-sm"
                          placeholder="qty"
                        />
                      </div>
                      <div class="col">
                        <input
                          v-model="section.sheetCutting.m"
                          type="text"
                          class="form-control form-control-sm"
                          placeholder="m"
                        />
                      </div>
                      <div class="col">
                        <input
                          v-model="section.sheetCutting.thickness"
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
                          v-model="section.grinding.m"
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
                          v-model="section.assembly.qty"
                          type="text"
                          class="form-control form-control-sm"
                          placeholder="qty"
                        />
                      </div>
                      <div class="col">
                        <input
                          v-model="section.assembly.kg"
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
                          v-model="section.drilling.qty"
                          type="text"
                          class="form-control form-control-sm"
                          placeholder="qty"
                        />
                      </div>
                      <div class="col">
                        <input
                          v-model="section.drilling.dia"
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
                    <button class="btn btn-sm btn-primary-action" @click="addTreatmentSection">
                      {{ $t("createProject.addMoreTreatments") }} +
                    </button>
                  </div>
                </template>

                <div v-else class="text-muted fst-italic mt-2" style="font-size:0.85rem">
                  {{ $t("createProject.assemblyDrawingOnly") }}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>

    <!-- Manual Worker Modal -->
    <div v-if="showManualModal" class="modal-overlay" @click.self="showManualModal = false">
      <div class="modal-box">
        <div class="modal-header-custom">
          <h6 class="mb-0 fw-bold">{{ $t("createProject.selectWorkers") }} – {{ $t("createProject.manual") }}</h6>
          <button class="btn btn-sm p-0" @click="showManualModal = false">✕</button>
        </div>
        <div class="modal-body-custom">
          <div class="table-responsive">
            <table class="table table-sm align-middle mb-0">
              <thead>
                <tr>
                  <th></th>
                  <th>{{ $t("createProject.workerName") }}</th>
                  <th>{{ $t("createProject.status") }}</th>
                  <th>{{ $t("createProject.freeTime") }}</th>
                  <th>{{ $t("createProject.operation") }}</th>
                  <th>{{ $t("createProject.noteForWorker") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="w in workers" :key="w.id" :class="{ 'table-active': manualSelected.some(s => s.id === w.id) }">
                  <td>
                    <input
                      type="checkbox"
                      class="form-check-input"
                      :checked="manualSelected.some(s => s.id === w.id)"
                      @change="toggleManualWorker(w)"
                    />
                  </td>
                  <td class="fw-semibold">{{ w.name }}</td>
                  <td>
                    <span :class="w.busy ? 'badge-busy' : 'badge-free'">
                      {{ w.busy ? $t("createProject.busy") : $t("createProject.free") }}
                    </span>
                  </td>
                  <td>{{ w.busy ? w.freeIn : '–' }}</td>
                  <td>
                    <div class="d-flex flex-column gap-1">
                      <div
                        v-for="op in activeOperationLabels"
                        :key="op"
                        class="form-check form-check-sm"
                      >
                        <input
                          class="form-check-input"
                          type="checkbox"
                          :id="'mw-' + w.id + '-' + op"
                          :checked="isManualWorkerOpChecked(w.id, op)"
                          @change="toggleManualWorkerOp(w.id, op)"
                        />
                        <label class="form-check-label op-check-label" :for="'mw-' + w.id + '-' + op">{{ op }}</label>
                      </div>
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      :placeholder="$t('createProject.noteForWorker')"
                      :value="getManualWorkerNote(w.id)"
                      @input="setManualWorkerNote(w.id, $event.target.value)"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="mt-3">
            <label class="form-label-sm">{{ $t("createProject.noteForJob") }}:</label>
            <input v-model="manualJobNote" type="text" class="form-control form-control-sm" />
          </div>
          <div v-if="manualSelected.length" class="estimated-time-box mt-3">
            <strong>{{ $t("createProject.estimatedCompletion") }}:</strong> {{ manualEstimatedTime }}
          </div>
        </div>
        <div class="modal-footer-custom">
          <button class="btn btn-sm btn-secondary" @click="showManualModal = false">{{ $t("createProject.close") }}</button>
          <button class="btn btn-sm btn-primary-action" @click="confirmManual">{{ $t("createProject.confirm") }}</button>
        </div>
      </div>
    </div>

    <!-- Auto Worker Modal -->
    <div v-if="showAutoModal" class="modal-overlay" @click.self="showAutoModal = false">
      <div class="modal-box">
        <div class="modal-header-custom">
          <h6 class="mb-0 fw-bold">{{ $t("createProject.autoSchedule") }}</h6>
          <button class="btn btn-sm p-0" @click="showAutoModal = false">✕</button>
        </div>
        <div class="modal-body-custom">
          <p class="text-muted mb-2" style="font-size:0.82rem">{{ $t("createProject.autoScheduleDesc") }}</p>
          <div class="estimated-time-box mb-3">
            <strong>{{ $t("createProject.estimatedCompletion") }}:</strong> {{ autoEstimatedTime }}
          </div>
          <div class="table-responsive">
            <table class="table table-sm align-middle mb-0">
              <thead>
                <tr>
                  <th>{{ $t("createProject.operation") }}</th>
                  <th>{{ $t("createProject.assignedWorker") }}</th>
                  <th>{{ $t("createProject.rating") }}</th>
                  <th>{{ $t("createProject.status") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, sIdx) in autoSchedule" :key="item.operation">
                  <td class="fw-semibold">{{ item.operation }}</td>
                  <td>
                    <select
                      class="form-select form-select-sm"
                      :value="item.workerId"
                      @change="changeAutoWorker(sIdx, $event.target.value)"
                    >
                      <option
                        v-for="ew in item.eligibleWorkers"
                        :key="ew.id"
                        :value="ew.id"
                      >{{ ew.name }} ({{ ew.ratings[item.opKey] }})</option>
                    </select>
                  </td>
                  <td>{{ item.rating }}</td>
                  <td>
                    <span :class="item.busy ? 'badge-busy' : 'badge-free'">
                      {{ item.busy ? $t("createProject.busy") + ' (' + item.freeIn + ')' : $t("createProject.free") }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer-custom">
          <button class="btn btn-sm btn-secondary" @click="showAutoModal = false">{{ $t("createProject.close") }}</button>
          <button class="btn btn-sm btn-primary-action" @click="confirmAuto">{{ $t("createProject.confirm") }}</button>
        </div>
      </div>
    </div>

    <!-- Material Modal -->
    <div v-if="showMaterialModal" class="modal-overlay" @click.self="showMaterialModal = false">
      <div class="modal-box">
        <div class="modal-header-custom">
          <h6 class="mb-0 fw-bold">{{ $t("createProject.selectMaterial") }}</h6>
          <button class="btn btn-sm p-0" @click="showMaterialModal = false">✕</button>
        </div>
        <div class="modal-body-custom">
          <div class="table-responsive">
            <table class="table table-sm align-middle mb-0">
              <thead>
                <tr>
                  <th></th>
                  <th>{{ $t("createProject.materialName") }}</th>
                  <th>{{ $t("warehouse.specs") }}</th>
                  <th>{{ $t("createProject.availableQty") }}</th>
                  <th>{{ $t("createProject.useQty") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="m in warehouseItems" :key="m.id">
                  <td>
                    <input
                      type="checkbox"
                      class="form-check-input"
                      :checked="materialSelected.some(s => s.id === m.id)"
                      @change="toggleMaterial(m)"
                    />
                  </td>
                  <td class="fw-semibold">{{ m.type }} – {{ m.name }}</td>
                  <td class="text-muted">{{ m.specs }}</td>
                  <td>{{ m.qty }}</td>
                  <td>
                    <input
                      type="number"
                      class="form-control form-control-sm"
                      min="1"
                      :max="m.qty"
                      :value="getMaterialQty(m.id)"
                      @input="setMaterialQty(m.id, $event.target.value)"
                      style="width:80px"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer-custom">
          <button class="btn btn-sm btn-secondary" @click="showMaterialModal = false">{{ $t("createProject.close") }}</button>
          <button class="btn btn-sm btn-primary-action" @click="confirmMaterial">{{ $t("createProject.confirm") }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarNav from "./SidebarNav.vue";

export default {
  name: "CreateProjectPage",
  components: { SidebarNav },
  props: {
    companies: { type: Array, default: () => [] },
    selectedCompany: { type: String, default: '' },
  },
  emits: ["back", "logout", "edit-profile", "select-company", "add-company", "update-companies"],
  data() {
    return {
      form: { rn: "", name: "", client: "", responsible: "", isAssemblyDrawing: false },
      part: {
        drawingNo: "",
        partName: "",
        assemblyName: "",
        weight: "",
        quantity: "",
      },
      treatmentSections: [this.createEmptyTreatment()],
      assignedWorkers: [],
      assignedMaterials: [],

      // Manual modal
      showManualModal: false,
      manualSelected: [],
      manualJobNote: "",

      // Auto modal
      showAutoModal: false,
      autoSchedule: [],

      // Material modal
      showMaterialModal: false,
      materialSelected: [],

      allWorkers: [
        { id: 1, name: 'Marko Marković', busy: false, freeIn: '', company: 'Company 1', ratings: { pipeCutting: 100, sheetCutting: 100, welding: 100, bending: 100, grinding: 100, drilling: 100, assembly: 100 }, operations: { pipeCutting: true, sheetCutting: true, welding: true, bending: true, grinding: true, drilling: true, assembly: true } },
        { id: 2, name: 'Elvis Elvisić', busy: true, freeIn: '2h 30min', company: 'Company 1', ratings: { pipeCutting: 100, sheetCutting: 20, welding: 100, bending: 20, grinding: 100, drilling: 95, assembly: 10 }, operations: { pipeCutting: true, sheetCutting: true, welding: true, bending: true, grinding: true, drilling: true, assembly: true } },
        { id: 3, name: 'Tomislav Tomić', busy: false, freeIn: '', company: 'Company 2', ratings: { pipeCutting: 20, sheetCutting: 95, welding: 10, bending: 100, grinding: 20, drilling: 100, assembly: 0 }, operations: { pipeCutting: true, sheetCutting: true, welding: true, bending: true, grinding: true, drilling: true, assembly: false } },
        { id: 4, name: 'Igor Iggy', busy: true, freeIn: '45min', company: 'Company 2', ratings: { pipeCutting: 95, sheetCutting: 100, welding: 0, bending: 10, grinding: 100, drilling: 20, assembly: 100 }, operations: { pipeCutting: true, sheetCutting: true, welding: false, bending: true, grinding: true, drilling: true, assembly: true } },
        { id: 5, name: 'Curt Mall', busy: false, freeIn: '', company: 'Company 3', ratings: { pipeCutting: 100, sheetCutting: 20, welding: 100, bending: 0, grinding: 10, drilling: 100, assembly: 20 }, operations: { pipeCutting: true, sheetCutting: true, welding: true, bending: false, grinding: true, drilling: true, assembly: true } },
        { id: 6, name: 'Johnn Marić', busy: true, freeIn: '1h 15min', company: 'Company 3', ratings: { pipeCutting: 20, sheetCutting: 100, welding: 20, bending: 100, grinding: 0, drilling: 10, assembly: 95 }, operations: { pipeCutting: true, sheetCutting: true, welding: true, bending: true, grinding: false, drilling: true, assembly: true } },
        { id: 7, name: 'Ivica Ivanković', busy: false, freeIn: '', company: 'Company 4', ratings: { pipeCutting: 10, sheetCutting: 10, welding: 10, bending: 10, grinding: 10, drilling: 50, assembly: 10 }, operations: { pipeCutting: true, sheetCutting: true, welding: true, bending: true, grinding: true, drilling: true, assembly: true } },
        { id: 8, name: 'Mirko Slavek', busy: false, freeIn: '', company: 'Company 4', ratings: { pipeCutting: 10, sheetCutting: 50, welding: 100, bending: 10, grinding: 10, drilling: 50, assembly: 31 }, operations: { pipeCutting: true, sheetCutting: true, welding: true, bending: true, grinding: true, drilling: true, assembly: true } },
      ],

      allWarehouseItems: [
        { id: 1, type: "Sheet", name: "3000 x 1500 x 10", specs: "AISI304", qty: 1250, company: "Company 1" },
        { id: 2, type: "Sheet", name: "3000 x 1500 x 8", specs: "AISI304", qty: 870, company: "Company 1" },
        { id: 3, type: "Sheet", name: "2500 x 1250 x 6", specs: "S275JR", qty: 1540, company: "Company 1" },
        { id: 4, type: "Screw", name: "M16 x 150", specs: "Fischer anchor", qty: 3200, company: "Company 1" },
        { id: 5, type: "Screw", name: "M12 x 80", specs: "Fischer anchor", qty: 4100, company: "Company 2" },
        { id: 6, type: "Pipe", name: "114.3 x 3.6 x 6000", specs: "S275JR", qty: 620, company: "Company 2" },
        { id: 7, type: "Pipe", name: "88.9 x 3.2 x 6000", specs: "AISI304", qty: 980, company: "Company 2" },
        { id: 8, type: "Sheet", name: "2000 x 1000 x 12", specs: "S355JR", qty: 450, company: "Company 2" },
        { id: 9, type: "Screw", name: "M20 x 200", specs: "Fischer anchor", qty: 1800, company: "Company 3" },
        { id: 10, type: "Pipe", name: "60.3 x 2.9 x 6000", specs: "S275JR", qty: 740, company: "Company 3" },
        { id: 11, type: "Sheet", name: "3000 x 1500 x 5", specs: "AISI316", qty: 560, company: "Company 3" },
        { id: 12, type: "Screw", name: "M10 x 60", specs: "Fischer anchor", qty: 2800, company: "Company 3" },
        { id: 13, type: "Pipe", name: "168.3 x 4.0 x 6000", specs: "S355JR", qty: 310, company: "Company 4" },
        { id: 14, type: "Sheet", name: "2500 x 1250 x 3", specs: "S275JR", qty: 920, company: "Company 4" },
        { id: 15, type: "Screw", name: "M8 x 40", specs: "Fischer anchor", qty: 5200, company: "Company 4" },
        { id: 16, type: "Pipe", name: "48.3 x 2.6 x 6000", specs: "AISI304", qty: 1100, company: "Company 4" },
      ],

      autoEstimatedTime: "",
    };
  },
  computed: {
    workers() {
      if (!this.selectedCompany) return this.allWorkers;
      return this.allWorkers.filter(w => w.company === this.selectedCompany);
    },
    warehouseItems() {
      if (!this.selectedCompany) return this.allWarehouseItems;
      return this.allWarehouseItems.filter(i => i.company === this.selectedCompany);
    },
    activeOperations() {
      const opMap = {
        pipeCutting: "Rezanje cijevi",
        sheetCutting: "Rezanje lima",
        welding: "Zavarivanje",
        bending: "Savijanje",
        grinding: "Brušenje",
        drilling: "Bušenje",
        assembly: "Montaža",
      };
      const active = [];
      for (const key of Object.keys(opMap)) {
        const hasValue = this.treatmentSections.some(s => {
          return Object.values(s[key] || {}).some(v => v !== "");
        });
        if (hasValue) active.push({ key, label: opMap[key] });
      }
      return active;
    },
    activeOperationLabels() {
      return this.activeOperations.map(o => o.label);
    },
    groupedAssignedWorkers() {
      const groups = {};
      this.assignedWorkers.forEach((aw, idx) => {
        if (!groups[aw.operation]) groups[aw.operation] = [];
        groups[aw.operation].push({ ...aw, _idx: idx });
      });
      return groups;
    },
    manualEstimatedTime() {
      const opKeyByLabel = {};
      for (const { key, label } of this.activeOperations) {
        opKeyByLabel[label] = key;
      }
      let totalHours = 0;
      const opWorkerCounts = {};
      for (const s of this.manualSelected) {
        const w = this.allWorkers.find(aw => aw.id === s.id);
        if (!w) continue;
        for (const op of s.operations) {
          const opKey = opKeyByLabel[op];
          if (!opKey) continue;
          if (!opWorkerCounts[op]) opWorkerCounts[op] = [];
          opWorkerCounts[op].push({ rating: w.ratings[opKey], busy: w.busy, freeIn: w.freeIn });
        }
      }
      for (const op of Object.keys(opWorkerCounts)) {
        const workers = opWorkerCounts[op];
        const avgRating = workers.reduce((sum, w) => sum + w.rating, 0) / workers.length;
        const efficiencyFactor = avgRating > 0 ? avgRating / 100 : 0.33;
        const baseHours = 2;
        const taskHours = baseHours / (efficiencyFactor * workers.length);
        const maxWait = Math.max(...workers.map(w => w.busy ? this.parseFreeIn(w.freeIn) : 0));
        totalHours += taskHours + maxWait;
      }
      if (totalHours === 0) return "–";
      const days = Math.floor(totalHours / 8);
      const hours = Math.round(totalHours % 8);
      return days > 0 ? `${days}d ${hours}h` : `${hours}h`;
    },
  },
  methods: {
    createEmptyTreatment() {
      return {
        pipeCutting: { qty: "", m: "", thickness: "" },
        welding: { m: "", size: "" },
        bending: { qty: "", thickness: "" },
        sheetCutting: { qty: "", m: "", thickness: "" },
        grinding: { m: "" },
        assembly: { qty: "", kg: "" },
        drilling: { qty: "", dia: "" },
      };
    },
    addTreatmentSection() {
      this.treatmentSections.push(this.createEmptyTreatment());
    },

    // Manual modal
    openManualModal() {
      this.manualSelected = [];
      this.manualJobNote = "";
      this.showManualModal = true;
    },
    toggleManualWorker(w) {
      const idx = this.manualSelected.findIndex(s => s.id === w.id);
      if (idx >= 0) {
        this.manualSelected.splice(idx, 1);
      } else {
        this.manualSelected.push({ id: w.id, name: w.name, operations: [], note: "" });
      }
    },
    isManualWorkerOpChecked(id, op) {
      const found = this.manualSelected.find(s => s.id === id);
      return found ? found.operations.includes(op) : false;
    },
    toggleManualWorkerOp(id, op) {
      let found = this.manualSelected.find(s => s.id === id);
      if (!found) {
        const w = this.workers.find(w => w.id === id);
        found = { id, name: w.name, operations: [], note: "" };
        this.manualSelected.push(found);
      }
      const idx = found.operations.indexOf(op);
      if (idx >= 0) {
        found.operations.splice(idx, 1);
        if (!found.operations.length) {
          const sIdx = this.manualSelected.findIndex(s => s.id === id);
          this.manualSelected.splice(sIdx, 1);
        }
      } else {
        found.operations.push(op);
      }
    },
    getManualWorkerNote(id) {
      const found = this.manualSelected.find(s => s.id === id);
      return found ? found.note : "";
    },
    setManualWorkerNote(id, val) {
      const found = this.manualSelected.find(s => s.id === id);
      if (found) found.note = val;
    },
    confirmManual() {
      for (const s of this.manualSelected) {
        for (const op of s.operations) {
          this.assignedWorkers.push({
            name: s.name,
            operation: op,
            note: s.note || this.manualJobNote || "",
            type: "manual",
          });
        }
      }
      this.showManualModal = false;
    },
    removeAssignedWorker(idx) {
      this.assignedWorkers.splice(idx, 1);
    },

    // Auto modal – greedy algorithm
    openAutoModal() {
      this.autoSchedule = this.computeGreedySchedule();
      this.computeEstimatedTime();
      this.showAutoModal = true;
    },
    computeGreedySchedule() {
      const schedule = [];
      for (const { key: op, label } of this.activeOperations) {
        const eligible = this.workers.filter(w => w.operations[op]);
        if (!eligible.length) continue;
        eligible.sort((a, b) => b.ratings[op] - a.ratings[op]);
        const best = eligible[0];
        schedule.push({
          opKey: op,
          operation: label,
          workerId: best.id,
          workerName: best.name,
          rating: best.ratings[op],
          busy: best.busy,
          freeIn: best.freeIn,
          eligibleWorkers: eligible,
        });
      }
      return schedule;
    },
    changeAutoWorker(sIdx, workerId) {
      const item = this.autoSchedule[sIdx];
      const worker = this.workers.find(w => w.id === parseInt(workerId));
      if (!worker) return;
      item.workerId = worker.id;
      item.workerName = worker.name;
      item.rating = worker.ratings[item.opKey];
      item.busy = worker.busy;
      item.freeIn = worker.freeIn;
      this.computeEstimatedTime();
    },
    computeEstimatedTime() {
      let totalHours = 0;
      for (const item of this.autoSchedule) {
        const baseHours = 2;
        const efficiencyFactor = item.rating / 100;
        const taskHours = efficiencyFactor > 0 ? baseHours / efficiencyFactor : baseHours * 3;
        const waitHours = item.busy ? this.parseFreeIn(item.freeIn) : 0;
        totalHours = Math.max(totalHours, waitHours) + taskHours;
      }
      const days = Math.floor(totalHours / 8);
      const hours = Math.round(totalHours % 8);
      this.autoEstimatedTime = days > 0 ? `${days}d ${hours}h` : `${hours}h`;
    },
    parseFreeIn(freeIn) {
      if (!freeIn) return 0;
      let hours = 0;
      const hMatch = freeIn.match(/(\d+)\s*h/);
      const mMatch = freeIn.match(/(\d+)\s*min/);
      if (hMatch) hours += parseInt(hMatch[1]);
      if (mMatch) hours += parseInt(mMatch[1]) / 60;
      return hours;
    },
    confirmAuto() {
      for (const item of this.autoSchedule) {
        this.assignedWorkers.push({
          name: item.workerName,
          operation: item.operation,
          note: "",
          type: "auto",
        });
      }
      this.showAutoModal = false;
    },

    // Material modal
    toggleMaterial(m) {
      const idx = this.materialSelected.findIndex(s => s.id === m.id);
      if (idx >= 0) {
        this.materialSelected.splice(idx, 1);
      } else {
        this.materialSelected.push({ id: m.id, name: m.type + " – " + m.name, specs: m.specs, useQty: 1 });
      }
    },
    getMaterialQty(id) {
      const found = this.materialSelected.find(s => s.id === id);
      return found ? found.useQty : 1;
    },
    setMaterialQty(id, val) {
      const found = this.materialSelected.find(s => s.id === id);
      if (found) found.useQty = parseInt(val) || 1;
    },
    confirmMaterial() {
      for (const s of this.materialSelected) {
        this.assignedMaterials.push({ name: s.name, specs: s.specs, useQty: s.useQty });
        const item = this.allWarehouseItems.find(i => i.id === s.id);
        if (item) {
          item.qty = Math.max(0, item.qty - s.useQty);
        }
      }
      this.materialSelected = [];
      this.showMaterialModal = false;
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

.treatment-section-divider {
  display: flex;
  align-items: center;
  border-top: 1px dashed #bbb;
  padding-top: 0.5rem;
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

.assigned-op-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #2b579a;
  margin-bottom: 0.2rem;
}
.assigned-worker-chip {
  display: inline-flex;
  align-items: center;
  background: #e3e8f0;
  border-radius: 4px;
  padding: 0.2rem 0.5rem;
  font-size: 0.78rem;
  margin: 0.15rem 0.25rem 0.15rem 0;
}
.assigned-type-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  font-size: 0.6rem;
  font-weight: 700;
  color: #fff;
  margin-right: 0.3rem;
  flex-shrink: 0;
}
.badge-auto {
  background: #27ae60;
}
.badge-manual {
  background: #2b579a;
}

/* Modal styles */
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

.badge-free {
  display: inline-block;
  background: #27ae60;
  color: #fff;
  border-radius: 4px;
  padding: 0.15rem 0.5rem;
  font-size: 0.72rem;
  font-weight: 600;
}
.badge-busy {
  display: inline-block;
  background: #e67e22;
  color: #fff;
  border-radius: 4px;
  padding: 0.15rem 0.5rem;
  font-size: 0.72rem;
  font-weight: 600;
}

.form-check-input:checked {
  background-color: #2b579a;
  border-color: #2b579a;
}
.op-check-label {
  font-size: 0.75rem;
  color: #444;
}
.form-check-sm {
  min-height: auto;
  margin-bottom: 0;
}

.estimated-time-box {
  background: #e3f2fd;
  border: 1px solid #90caf9;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
  color: #1a1a1a;
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
  .modal-box {
    width: 95%;
    max-height: 90vh;
  }
}
@media (max-width: 575.98px) {
  .content-wrap {
    padding: 0.75rem !important;
  }
}
</style>
