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
              <div class="panel-body">
                <h5 class="panel-heading">
                  {{
                    editProject
                      ? $t("project.editProject")
                      : $t("createProject.title")
                  }}
                </h5>

                <div class="mb-3">
                  <label class="form-label-sm"
                    >{{ $t("createProject.rnNumber") }}:</label
                  >
                  <input
                    v-model="form.rn"
                    type="text"
                    class="form-control form-control-sm"
                    :class="{ 'is-invalid': formErrors.rn }"
                    @input="formErrors.rn = ''"
                  />
                  <div v-if="formErrors.rn" class="invalid-feedback">
                    {{ formErrors.rn }}
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label-sm"
                    >{{ $t("createProject.name") }}:</label
                  >
                  <input
                    v-model="form.name"
                    type="text"
                    class="form-control form-control-sm"
                    :class="{ 'is-invalid': formErrors.name }"
                    @input="formErrors.name = ''"
                  />
                  <div v-if="formErrors.name" class="invalid-feedback">
                    {{ formErrors.name }}
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label-sm"
                    >{{ $t("createProject.selectClient") }}:</label
                  >
                  <select
                    v-model="form.client"
                    class="form-select form-select-sm"
                    :class="{ 'is-invalid': formErrors.client }"
                    @change="formErrors.client = ''"
                  >
                    <option value=""></option>
                    <option
                      v-for="c in clients"
                      :key="c._id"
                      :value="c.clientName"
                    >
                      {{ c.clientName }}
                    </option>
                  </select>
                  <div v-if="formErrors.client" class="invalid-feedback">
                    {{ formErrors.client }}
                  </div>
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
                    <option
                      v-for="rp in responsiblePersons"
                      :key="rp"
                      :value="rp"
                    >
                      {{ rp }}
                    </option>
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
                    <label
                      class="form-check-label form-label-sm mb-0"
                      for="assemblyDrawingCheck"
                    >
                      {{ $t("createProject.assemblyDrawingOnly") }}
                    </label>
                  </div>
                </div>

                <div
                  v-if="
                    editProject &&
                    editProject.drawings &&
                    editProject.drawings.length > 1
                  "
                  class="mt-3"
                >
                  <label class="form-label-sm"
                    >{{ $t("project.drawings") }}:</label
                  >
                  <select
                    class="form-select form-select-sm"
                    :value="editingDrawingIndex"
                    @change="selectEditDrawing(Number($event.target.value))"
                  >
                    <option
                      v-for="(d, i) in editProject.drawings"
                      :key="i"
                      :value="i"
                    >
                      {{ d.drawingNo || i + 1 }} – {{ d.partName || "–" }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="d-flex flex-column gap-2">
              <button class="btn btn-action" @click="showPreviewModal = true">
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
              <button class="btn btn-action" @click="saveAndInsertNew">
                <span>{{ $t("createProject.saveAndInsertNew") }}</span>
                <span class="action-icon">+</span>
              </button>
              <button class="btn btn-action" @click="saveAndFinish">
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
                      :class="{ 'is-invalid': formErrors.weight }"
                      @input="formErrors.weight = ''"
                    />
                    <div v-if="formErrors.weight" class="invalid-feedback">
                      {{ formErrors.weight }}
                    </div>
                  </div>
                  <div class="col-md-2 col-sm-6">
                    <label class="form-label-sm"
                      >{{ $t("createProject.quantity") }}:</label
                    >
                    <input
                      v-model="part.quantity"
                      type="text"
                      class="form-control form-control-sm"
                      :class="{ 'is-invalid': formErrors.quantity }"
                      @input="formErrors.quantity = ''"
                    />
                    <div v-if="formErrors.quantity" class="invalid-feedback">
                      {{ formErrors.quantity }}
                    </div>
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
                        :value="pdfFileName"
                        readonly
                      />
                      <button
                        class="btn btn-sm btn-primary-action text-nowrap"
                        @click="$refs.pdfInput.click()"
                      >
                        {{ $t("createProject.importPdf") }}
                        <span class="ms-1">+</span>
                      </button>
                      <input
                        ref="pdfInput"
                        type="file"
                        accept=".pdf"
                        style="display: none"
                        @change="onPdfSelected"
                      />
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
                        :value="dwgFileName"
                        readonly
                      />
                      <button
                        class="btn btn-sm btn-primary-action text-nowrap"
                        @click="$refs.dwgInput.click()"
                      >
                        {{ $t("createProject.importDwg") }}
                        <span class="ms-1">+</span>
                      </button>
                      <input
                        ref="dwgInput"
                        type="file"
                        accept=".dwg"
                        style="display: none"
                        @change="onDwgSelected"
                      />
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
                        <button
                          class="btn btn-sm btn-primary-action"
                          @click="openAutoModal"
                        >
                          {{ $t("createProject.automatic") }} +
                        </button>
                        <button
                          class="btn btn-sm btn-primary-action"
                          @click="openManualModal"
                        >
                          {{ $t("createProject.manual") }} +
                        </button>
                      </div>
                      <div v-if="assignedWorkers.length" class="mt-2">
                        <div
                          v-for="(group, op) in groupedAssignedWorkers"
                          :key="op"
                          class="mb-2"
                        >
                          <div class="assigned-op-label">{{ op }}</div>
                          <div
                            v-for="aw in group"
                            :key="aw._idx"
                            class="assigned-worker-chip"
                          >
                            <span
                              class="assigned-type-badge"
                              :class="
                                aw.type === 'auto'
                                  ? 'badge-auto'
                                  : 'badge-manual'
                              "
                              >{{ aw.type === "auto" ? "A" : "R" }}</span
                            >
                            <strong>{{ aw.name }}</strong>
                            <span v-if="aw.note" class="text-muted ms-1"
                              >– {{ aw.note }}</span
                            >
                            <button
                              class="btn btn-sm p-0 ms-2"
                              @click="removeAssignedWorker(aw._idx)"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <h6 class="section-label">
                        {{ $t("createProject.materialUsed") }}:
                      </h6>
                      <button
                        class="btn btn-sm btn-outline-action"
                        @click="showMaterialModal = true"
                      >
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
                          <button
                            class="btn btn-sm p-0 ms-2"
                            @click="assignedMaterials.splice(idx, 1)"
                          >
                            ✕
                          </button>
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
                      <span class="section-label"
                        >{{ $t("createProject.treatments") }} #{{
                          sIdx + 1
                        }}</span
                      >
                      <button
                        class="btn btn-sm p-0 ms-2 text-danger"
                        @click="treatmentSections.splice(sIdx, 1)"
                      >
                        ✕
                      </button>
                    </div>

                    <div class="treatment-op-block mb-3">
                      <div class="treatment-op-title">
                        {{ $t("createProject.pipeCutting") }}
                      </div>
                      <div class="row g-2 align-items-end">
                        <div class="col">
                          <input
                            v-model="section.pipeCutting.qty"
                            type="text"
                            class="form-control form-control-sm"
                            :class="{
                              'is-invalid': treatmentError(
                                sIdx,
                                'pipeCutting',
                                'qty',
                              ),
                            }"
                            :placeholder="$t('createProject.quantity')"
                            @input="
                              clearTreatmentError(sIdx, 'pipeCutting', 'qty')
                            "
                          />
                        </div>
                        <div class="col">
                          <input
                            v-model="section.pipeCutting.m"
                            type="text"
                            class="form-control form-control-sm"
                            :class="{
                              'is-invalid': treatmentError(
                                sIdx,
                                'pipeCutting',
                                'm',
                              ),
                            }"
                            placeholder="m"
                            @input="
                              clearTreatmentError(sIdx, 'pipeCutting', 'm')
                            "
                          />
                        </div>
                        <div class="col">
                          <input
                            v-model="section.pipeCutting.thickness"
                            type="text"
                            class="form-control form-control-sm"
                            :class="{
                              'is-invalid': treatmentError(
                                sIdx,
                                'pipeCutting',
                                'thickness',
                              ),
                            }"
                            placeholder="mm"
                            @input="
                              clearTreatmentError(
                                sIdx,
                                'pipeCutting',
                                'thickness',
                              )
                            "
                          />
                        </div>
                        <div class="col">
                          <input
                            v-model="section.pipeCutting.cuts"
                            type="text"
                            class="form-control form-control-sm"
                            :class="{
                              'is-invalid': treatmentError(
                                sIdx,
                                'pipeCutting',
                                'cuts',
                              ),
                            }"
                            :placeholder="$t('createProject.cutsPerPiece')"
                            @input="
                              clearTreatmentError(sIdx, 'pipeCutting', 'cuts')
                            "
                          />
                        </div>
                        <div class="col">
                          <select
                            v-model="section.pipeCutting.cutType"
                            class="form-select form-select-sm"
                          >
                            <option value="">
                              {{ $t("createProject.cutType") }}
                            </option>
                            <option value="ravni">
                              {{ $t("createProject.cutStraight") }}
                            </option>
                            <option value="kutni">
                              {{ $t("createProject.cutAngle") }}
                            </option>
                          </select>
                        </div>
                        <div class="col">
                          <select
                            v-model="section.pipeCutting.profile"
                            class="form-select form-select-sm"
                          >
                            <option value="">
                              {{ $t("createProject.profileType") }}
                            </option>
                            <option value="okrugla">
                              {{ $t("createProject.profileRound") }}
                            </option>
                            <option value="kvadratna">
                              {{ $t("createProject.profileSquare") }}
                            </option>
                            <option value="pravokutna">
                              {{ $t("createProject.profileRect") }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div class="treatment-op-block mb-3">
                      <div class="treatment-op-title">
                        {{ $t("createProject.sheetCutting") }}
                      </div>
                      <div class="row g-2 align-items-end">
                        <div class="col">
                          <input
                            v-model="section.sheetCutting.m"
                            type="text"
                            class="form-control form-control-sm"
                            :class="{
                              'is-invalid': treatmentError(
                                sIdx,
                                'sheetCutting',
                                'm',
                              ),
                            }"
                            placeholder="m"
                            @input="
                              clearTreatmentError(sIdx, 'sheetCutting', 'm')
                            "
                          />
                        </div>
                        <div class="col">
                          <input
                            v-model="section.sheetCutting.thickness"
                            type="text"
                            class="form-control form-control-sm"
                            :class="{
                              'is-invalid': treatmentError(
                                sIdx,
                                'sheetCutting',
                                'thickness',
                              ),
                            }"
                            placeholder="mm"
                            @input="
                              clearTreatmentError(
                                sIdx,
                                'sheetCutting',
                                'thickness',
                              )
                            "
                          />
                        </div>
                        <div class="col">
                          <select
                            v-model="section.sheetCutting.complexity"
                            class="form-select form-select-sm"
                          >
                            <option value="">
                              {{ $t("createProject.complexityLabel") }}
                            </option>
                            <option value="ravno">
                              {{ $t("createProject.straight") }}
                            </option>
                            <option value="konture">
                              {{ $t("createProject.contour") }}
                            </option>
                          </select>
                        </div>
                        <div class="col">
                          <select
                            v-model="section.sheetCutting.method"
                            class="form-select form-select-sm"
                          >
                            <option value="">
                              {{ $t("createProject.cuttingMethod") }}
                            </option>
                            <option value="škare">
                              {{ $t("createProject.shears") }}
                            </option>
                            <option value="plazma">
                              {{ $t("createProject.plasma") }}
                            </option>
                            <option value="laser">
                              {{ $t("createProject.laser") }}
                            </option>
                            <option value="brusilica">
                              {{ $t("createProject.grinder") }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div class="treatment-op-block mb-3">
                      <div class="treatment-op-title">
                        {{ $t("createProject.drilling") }}
                      </div>
                      <div class="row g-2 align-items-end">
                        <div class="col">
                          <input
                            v-model="section.drilling.qty"
                            type="text"
                            class="form-control form-control-sm"
                            :class="{
                              'is-invalid': treatmentError(
                                sIdx,
                                'drilling',
                                'qty',
                              ),
                            }"
                            :placeholder="$t('createProject.quantity')"
                            @input="
                              clearTreatmentError(sIdx, 'drilling', 'qty')
                            "
                          />
                        </div>
                        <div class="col">
                          <input
                            v-model="section.drilling.dia"
                            type="text"
                            class="form-control form-control-sm"
                            :class="{
                              'is-invalid': treatmentError(
                                sIdx,
                                'drilling',
                                'dia',
                              ),
                            }"
                            placeholder="Ø mm"
                            @input="
                              clearTreatmentError(sIdx, 'drilling', 'dia')
                            "
                          />
                        </div>
                        <div class="col">
                          <input
                            v-model="section.drilling.thickness"
                            type="text"
                            class="form-control form-control-sm"
                            :class="{
                              'is-invalid': treatmentError(
                                sIdx,
                                'drilling',
                                'thickness',
                              ),
                            }"
                            placeholder="mm"
                            @input="
                              clearTreatmentError(sIdx, 'drilling', 'thickness')
                            "
                          />
                        </div>
                        <div class="col">
                          <select
                            v-model="section.drilling.machine"
                            class="form-select form-select-sm"
                          >
                            <option value="">
                              {{ $t("createProject.machineType") }}
                            </option>
                            <option value="stupna">
                              {{ $t("createProject.drillPress") }}
                            </option>
                            <option value="magnetna">
                              {{ $t("createProject.magnetic") }}
                            </option>
                            <option value="ručno">
                              {{ $t("createProject.handheld") }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div class="treatment-op-block mb-3">
                      <div class="treatment-op-title">
                        {{ $t("createProject.welding") }}
                      </div>
                      <div class="row g-2 align-items-end">
                        <div class="col">
                          <input
                            v-model="section.welding.m"
                            type="text"
                            class="form-control form-control-sm"
                            :class="{
                              'is-invalid': treatmentError(
                                sIdx,
                                'welding',
                                'm',
                              ),
                            }"
                            placeholder="m"
                            @input="clearTreatmentError(sIdx, 'welding', 'm')"
                          />
                        </div>
                        <div class="col">
                          <input
                            v-model="section.welding.size"
                            type="text"
                            class="form-control form-control-sm"
                            :class="{
                              'is-invalid': treatmentError(
                                sIdx,
                                'welding',
                                'size',
                              ),
                            }"
                            placeholder="mm"
                            @input="
                              clearTreatmentError(sIdx, 'welding', 'size')
                            "
                          />
                        </div>
                        <div class="col">
                          <select
                            v-model="section.welding.weldType"
                            class="form-select form-select-sm"
                          >
                            <option value="">
                              {{ $t("createProject.weldType") }}
                            </option>
                            <option value="kutni">
                              {{ $t("createProject.weldFillet") }}
                            </option>
                            <option value="sučelni">
                              {{ $t("createProject.weldButt") }}
                            </option>
                          </select>
                        </div>
                        <div class="col">
                          <select
                            v-model="section.welding.position"
                            class="form-select form-select-sm"
                          >
                            <option value="">
                              {{ $t("createProject.weldPosition") }}
                            </option>
                            <option value="ravno">
                              {{ $t("createProject.posFlat") }}
                            </option>
                            <option value="vertikalno">
                              {{ $t("createProject.posVertical") }}
                            </option>
                            <option value="iznad glave">
                              {{ $t("createProject.posOverhead") }}
                            </option>
                          </select>
                        </div>
                        <div class="col">
                          <select
                            v-model="section.welding.passes"
                            class="form-select form-select-sm"
                          >
                            <option value="">
                              {{ $t("createProject.passes") }}
                            </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div class="treatment-op-block mb-3">
                      <div class="treatment-op-title">
                        {{ $t("createProject.grinding") }}
                      </div>
                      <div class="row g-2 align-items-end">
                        <div class="col">
                          <input
                            v-model="section.grinding.m"
                            type="text"
                            class="form-control form-control-sm"
                            :class="{
                              'is-invalid': treatmentError(
                                sIdx,
                                'grinding',
                                'm',
                              ),
                            }"
                            placeholder="m"
                            @input="clearTreatmentError(sIdx, 'grinding', 'm')"
                          />
                        </div>
                        <div class="col">
                          <select
                            v-model="section.grinding.grindType"
                            class="form-select form-select-sm"
                          >
                            <option value="">
                              {{ $t("createProject.grindType") }}
                            </option>
                            <option value="čišćenje">
                              {{ $t("createProject.grindCleaning") }}
                            </option>
                            <option value="standard">
                              {{ $t("createProject.grindStandard") }}
                            </option>
                            <option value="estetsko">
                              {{ $t("createProject.grindAesthetic") }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div class="treatment-op-block mb-3">
                      <div class="treatment-op-title">
                        {{ $t("createProject.bending") }}
                      </div>
                      <div class="row g-2 align-items-end">
                        <div class="col">
                          <input
                            v-model="section.bending.qty"
                            type="text"
                            class="form-control form-control-sm"
                            :class="{
                              'is-invalid': treatmentError(
                                sIdx,
                                'bending',
                                'qty',
                              ),
                            }"
                            :placeholder="$t('createProject.quantity')"
                            @input="clearTreatmentError(sIdx, 'bending', 'qty')"
                          />
                        </div>
                        <div class="col">
                          <input
                            v-model="section.bending.bends"
                            type="text"
                            class="form-control form-control-sm"
                            :class="{
                              'is-invalid': treatmentError(
                                sIdx,
                                'bending',
                                'bends',
                              ),
                            }"
                            :placeholder="$t('createProject.bendsPerPiece')"
                            @input="
                              clearTreatmentError(sIdx, 'bending', 'bends')
                            "
                          />
                        </div>
                        <div class="col">
                          <input
                            v-model="section.bending.length"
                            type="text"
                            class="form-control form-control-sm"
                            :class="{
                              'is-invalid': treatmentError(
                                sIdx,
                                'bending',
                                'length',
                              ),
                            }"
                            placeholder="mm"
                            @input="
                              clearTreatmentError(sIdx, 'bending', 'length')
                            "
                          />
                        </div>
                        <div class="col">
                          <input
                            v-model="section.bending.thickness"
                            type="text"
                            class="form-control form-control-sm"
                            :class="{
                              'is-invalid': treatmentError(
                                sIdx,
                                'bending',
                                'thickness',
                              ),
                            }"
                            placeholder="mm"
                            @input="
                              clearTreatmentError(sIdx, 'bending', 'thickness')
                            "
                          />
                        </div>
                      </div>
                    </div>

                    <div class="treatment-op-block mb-3">
                      <div class="treatment-op-title">
                        {{ $t("createProject.assembly") }}
                      </div>
                      <div class="row g-2 align-items-end">
                        <div class="col">
                          <input
                            v-model="section.assembly.qty"
                            type="text"
                            class="form-control form-control-sm"
                            :class="{
                              'is-invalid': treatmentError(
                                sIdx,
                                'assembly',
                                'qty',
                              ),
                            }"
                            :placeholder="$t('createProject.quantity')"
                            @input="
                              clearTreatmentError(sIdx, 'assembly', 'qty')
                            "
                          />
                        </div>
                        <div class="col">
                          <input
                            v-model="section.assembly.kg"
                            type="text"
                            class="form-control form-control-sm"
                            :class="{
                              'is-invalid': treatmentError(
                                sIdx,
                                'assembly',
                                'kg',
                              ),
                            }"
                            placeholder="kg"
                            @input="clearTreatmentError(sIdx, 'assembly', 'kg')"
                          />
                        </div>
                        <div class="col">
                          <select
                            v-model="section.assembly.complexity"
                            class="form-select form-select-sm"
                          >
                            <option value="">
                              {{ $t("createProject.complexityLabel") }}
                            </option>
                            <option value="jednostavna">
                              {{ $t("createProject.compSimple") }}
                            </option>
                            <option value="srednja">
                              {{ $t("createProject.compMedium") }}
                            </option>
                            <option value="složena">
                              {{ $t("createProject.compComplex") }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div class="estimated-time-box">
                      <strong>{{ $t("createProject.estimatedTime") }}:</strong>
                      {{ getSectionTime(section) }}
                    </div>
                  </div>

                  <div class="d-flex align-items-center gap-3 flex-wrap">
                    <span class="section-label mb-0">{{
                      $t("createProject.moreTreatments")
                    }}</span>
                    <button
                      class="btn btn-sm btn-primary-action"
                      @click="addTreatmentSection"
                    >
                      {{ $t("createProject.addMoreTreatments") }} +
                    </button>
                  </div>
                </template>

                <div
                  v-else
                  class="text-muted fst-italic mt-2"
                  style="font-size: 0.85rem"
                >
                  {{ $t("createProject.assemblyDrawingOnly") }}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>

    <div
      v-if="showManualModal"
      class="modal-overlay"
      @click.self="showManualModal = false"
    >
      <div class="modal-box">
        <div class="modal-header-custom">
          <h6 class="mb-0 fw-bold">
            {{ $t("createProject.selectWorkers") }} –
            {{ $t("createProject.manual") }}
          </h6>
          <button class="btn btn-sm p-0" @click="showManualModal = false">
            ✕
          </button>
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
                <tr
                  v-for="w in workers"
                  :key="w.id"
                  :class="{
                    'table-active': manualSelected.some((s) => s.id === w.id),
                  }"
                >
                  <td>
                    <input
                      type="checkbox"
                      class="form-check-input"
                      :checked="manualSelected.some((s) => s.id === w.id)"
                      @change="toggleManualWorker(w)"
                    />
                  </td>
                  <td class="fw-semibold">{{ w.name }}</td>
                  <td>
                    <span :class="w.busy ? 'badge-busy' : 'badge-free'">
                      {{
                        w.busy
                          ? $t("createProject.busy")
                          : $t("createProject.free")
                      }}
                    </span>
                  </td>
                  <td>{{ w.busy ? w.freeIn : "–" }}</td>
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
                        <label
                          class="form-check-label op-check-label"
                          :for="'mw-' + w.id + '-' + op"
                          >{{ op }}</label
                        >
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
            <label class="form-label-sm"
              >{{ $t("createProject.noteForJob") }}:</label
            >
            <input
              v-model="manualJobNote"
              type="text"
              class="form-control form-control-sm"
            />
          </div>
          <div v-if="manualSelected.length" class="estimated-time-box mt-3">
            <strong>{{ $t("createProject.estimatedCompletion") }}:</strong>
            {{ manualEstimatedTime }}
          </div>
        </div>
        <div class="modal-footer-custom">
          <button
            class="btn btn-sm btn-secondary"
            @click="showManualModal = false"
          >
            {{ $t("createProject.close") }}
          </button>
          <button class="btn btn-sm btn-primary-action" @click="confirmManual">
            {{ $t("createProject.confirm") }}
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showAutoModal"
      class="modal-overlay"
      @click.self="showAutoModal = false"
    >
      <div class="modal-box">
        <div class="modal-header-custom">
          <h6 class="mb-0 fw-bold">{{ $t("createProject.autoSchedule") }}</h6>
          <button class="btn btn-sm p-0" @click="showAutoModal = false">
            ✕
          </button>
        </div>
        <div class="modal-body-custom">
          <p class="text-muted mb-2" style="font-size: 0.82rem">
            {{ $t("createProject.autoScheduleDesc") }}
          </p>
          <div class="estimated-time-box mb-3">
            <strong>{{ $t("createProject.estimatedCompletion") }}:</strong>
            {{ autoEstimatedTime }}
          </div>
          <div
            v-for="(item, sIdx) in autoSchedule"
            :key="sIdx"
            class="auto-op-card mb-3"
          >
            <div class="d-flex align-items-center justify-content-between mb-2">
              <div>
                <span class="auto-op-order">{{ sIdx + 1 }}.</span>
                <span class="auto-op-name">{{ item.operation }}</span>
              </div>
              <div class="d-flex gap-3 align-items-center">
                <span class="text-muted" style="font-size: 0.75rem"
                  >{{ $t("createProject.baseTime") }}:
                  {{ formatTimeDisplay(item.baseMinutes) }}</span
                >
                <span class="auto-op-adjusted">{{
                  formatTimeDisplay(item.adjustedMinutes)
                }}</span>
              </div>
            </div>
            <div
              v-for="(aw, wIdx) in item.assignedWorkers"
              :key="wIdx"
              class="auto-worker-row d-flex align-items-center gap-2 mb-1"
            >
              <select
                class="form-select form-select-sm flex-grow-1"
                :value="aw.id"
                @change="changeAutoWorkerAt(sIdx, wIdx, $event.target.value)"
              >
                <option
                  v-for="ew in item.eligibleWorkers"
                  :key="ew.id"
                  :value="ew.id"
                >
                  {{ ew.name }}
                </option>
              </select>
              <span class="auto-worker-rating">{{ aw.rating }}/100</span>
              <span :class="aw.busy ? 'badge-busy' : 'badge-free'">
                {{
                  aw.busy ? $t("createProject.busy") : $t("createProject.free")
                }}
              </span>
              <button
                v-if="item.assignedWorkers.length > 1"
                class="btn btn-sm p-0 text-danger"
                @click="removeAutoWorkerAt(sIdx, wIdx)"
              >
                ✕
              </button>
            </div>
            <button
              v-if="item.eligibleWorkers.length > item.assignedWorkers.length"
              class="btn btn-sm btn-outline-action mt-1"
              @click="addAutoWorker(sIdx)"
            >
              + {{ $t("createProject.addWorker") }}
            </button>
          </div>
        </div>
        <div class="modal-footer-custom">
          <button
            class="btn btn-sm btn-secondary"
            @click="showAutoModal = false"
          >
            {{ $t("createProject.close") }}
          </button>
          <button class="btn btn-sm btn-primary-action" @click="confirmAuto">
            {{ $t("createProject.confirm") }}
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showMaterialModal"
      class="modal-overlay"
      @click.self="showMaterialModal = false"
    >
      <div class="modal-box">
        <div class="modal-header-custom">
          <h6 class="mb-0 fw-bold">{{ $t("createProject.selectMaterial") }}</h6>
          <button class="btn btn-sm p-0" @click="showMaterialModal = false">
            ✕
          </button>
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
                      :checked="materialSelected.some((s) => s.id === m.id)"
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
                      style="width: 80px"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer-custom">
          <button
            class="btn btn-sm btn-secondary"
            @click="showMaterialModal = false"
          >
            {{ $t("createProject.close") }}
          </button>
          <button
            class="btn btn-sm btn-primary-action"
            @click="confirmMaterial"
          >
            {{ $t("createProject.confirm") }}
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showPreviewModal"
      class="modal-overlay"
      @click.self="showPreviewModal = false"
    >
      <div class="modal-box" style="max-width: 900px">
        <div class="modal-header-custom">
          <h6 class="mb-0 fw-bold">{{ $t("createProject.previewProcess") }}</h6>
          <button class="btn btn-sm p-0" @click="showPreviewModal = false">
            ✕
          </button>
        </div>
        <div class="modal-body-custom" ref="previewContent">
          <div class="mb-3">
            <strong>{{ $t("createProject.rnNumber") }}:</strong> {{ form.rn }}
            <span class="ms-3"
              ><strong>{{ $t("createProject.name") }}:</strong>
              {{ form.name }}</span
            >
          </div>
          <div class="mb-3">
            <strong>{{ $t("createProject.selectClient") }}:</strong>
            {{ form.client || "–" }}
            <span class="ms-3"
              ><strong>{{ $t("createProject.selectResponsible") }}:</strong>
              {{ form.responsible || "–" }}</span
            >
          </div>
          <hr />
          <div class="mb-3">
            <strong>{{ $t("project.drawingNo") }}:</strong> {{ part.drawingNo }}
            <span class="ms-3"
              ><strong>{{ $t("project.partName") }}:</strong>
              {{ part.partName }}</span
            >
            <span class="ms-3"
              ><strong>{{ $t("createProject.assemblyName") }}:</strong>
              {{ part.assemblyName || "–" }}</span
            >
          </div>
          <div class="mb-3">
            <strong>{{ $t("createProject.weightKg") }}:</strong>
            {{ part.weight || "–" }}
            <span class="ms-3"
              ><strong>{{ $t("createProject.quantity") }}:</strong>
              {{ part.quantity || "–" }}</span
            >
          </div>
          <div v-if="pdfFileName" class="mb-2">
            <strong>PDF:</strong> {{ pdfFileName }}
          </div>
          <div v-if="dwgFileName" class="mb-2">
            <strong>DWG:</strong> {{ dwgFileName }}
          </div>
          <hr />
          <div v-if="assignedWorkers.length" class="mb-3">
            <strong>{{ $t("createProject.whoWorks") }}:</strong>
            <div
              v-for="(group, op) in groupedAssignedWorkers"
              :key="op"
              class="ms-2 mt-1"
            >
              <span class="fw-semibold">{{ op }}:</span>
              <span v-for="aw in group" :key="aw._idx" class="ms-2">{{
                aw.name
              }}</span>
            </div>
          </div>
          <div v-if="assignedMaterials.length" class="mb-3">
            <strong>{{ $t("createProject.materialUsed") }}:</strong>
            <div v-for="(am, idx) in assignedMaterials" :key="idx" class="ms-2">
              {{ am.name }} ({{ am.specs }}) × {{ am.useQty }}
            </div>
          </div>
          <div v-if="!form.isAssemblyDrawing">
            <strong>{{ $t("createProject.treatments") }}:</strong>
            <div
              v-for="(section, sIdx) in treatmentSections"
              :key="sIdx"
              class="ms-2 mt-2 mb-2 p-2"
              style="background: #f0f0f0; border-radius: 4px"
            >
              <div v-if="treatmentSections.length > 1" class="fw-bold mb-1">
                {{ $t("createProject.treatments") }} #{{ sIdx + 1 }}
              </div>
              <div v-if="section.pipeCutting.qty" class="mb-1">
                {{ $t("createProject.pipeCutting") }}:
                {{ section.pipeCutting.qty }} kom, {{ section.pipeCutting.m }}m,
                {{ section.pipeCutting.thickness }}mm
              </div>
              <div v-if="section.sheetCutting.m" class="mb-1">
                {{ $t("createProject.sheetCutting") }}:
                {{ section.sheetCutting.m }}m,
                {{ section.sheetCutting.thickness }}mm
              </div>
              <div v-if="section.drilling.qty" class="mb-1">
                {{ $t("createProject.drilling") }}:
                {{ section.drilling.qty }} kom, Ø{{ section.drilling.dia }}mm
              </div>
              <div v-if="section.welding.m" class="mb-1">
                {{ $t("createProject.welding") }}: {{ section.welding.m }}m,
                {{ section.welding.size }}mm
              </div>
              <div v-if="section.grinding.m" class="mb-1">
                {{ $t("createProject.grinding") }}: {{ section.grinding.m }}m
              </div>
              <div v-if="section.bending.qty" class="mb-1">
                {{ $t("createProject.bending") }}: {{ section.bending.qty }} kom
              </div>
              <div v-if="section.assembly.qty" class="mb-1">
                {{ $t("createProject.assembly") }}:
                {{ section.assembly.qty }} kom, {{ section.assembly.kg }}kg
              </div>
              <div class="estimated-time-box mt-1">
                <strong>{{ $t("createProject.estimatedTime") }}:</strong>
                {{ getSectionTime(section) }}
              </div>
            </div>
            <div class="estimated-time-box mt-2">
              <strong>{{ $t("createProject.totalEstimatedTime") }}:</strong>
              {{ totalEstimatedTime }}
            </div>
          </div>
        </div>
        <div class="modal-footer-custom">
          <button
            class="btn btn-sm btn-secondary"
            @click="showPreviewModal = false"
          >
            {{ $t("createProject.close") }}
          </button>
          <button class="btn btn-sm btn-primary-action" @click="printPreview">
            {{ $t("drawing.print") }}
          </button>
          <button
            class="btn btn-sm btn-primary-action"
            @click="exportPreviewPdf"
          >
            {{ $t("drawing.exportPdf") }}
          </button>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div
        v-if="showSuccessModal"
        class="save-modal-overlay"
        @click.self="showSuccessModal = false"
      >
        <div class="save-modal-card">
          <div class="save-modal-icon">✓</div>
          <h5 class="save-modal-title">
            {{ $t("createProject.successTitle") }}
          </h5>
          <p class="save-modal-msg">{{ $t("createProject.successMsg") }}</p>
          <button
            class="btn btn-sm btn-primary-action px-4"
            @click="showSuccessModal = false"
          >
            OK
          </button>
        </div>
      </div>
    </Transition>

    <Transition name="fade">
      <div
        v-if="showErrorModal"
        class="save-modal-overlay"
        @click.self="showErrorModal = false"
      >
        <div class="save-modal-card">
          <div class="save-modal-icon delete-icon">!</div>
          <h5 class="save-modal-title">{{ $t("createProject.errorTitle") }}</h5>
          <p class="save-modal-msg">{{ errorMessage }}</p>
          <button
            class="btn btn-sm btn-primary-action px-4"
            @click="showErrorModal = false"
          >
            OK
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import SidebarNav from "./SidebarNav.vue";
import api from "../api";
import {
  calcTotalTime,
  calcTimePerOperation,
  formatTime,
} from "../utils/calculations";

export default {
  name: "CreateProjectPage",
  components: { SidebarNav },
  props: {
    companies: { type: Array, default: () => [] },
    selectedCompany: { type: String, default: "" },
    userName: { type: String, default: "" },
    editProject: { type: Object, default: null },
  },
  emits: [
    "back",
    "logout",
    "edit-profile",
    "select-company",
    "add-company",
    "update-companies",
    "saved",
  ],
  data() {
    return {
      form: {
        rn: "",
        name: "",
        client: "",
        responsible: "",
        isAssemblyDrawing: false,
      },
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

      pdfFile: null,
      pdfFileName: "",
      dwgFile: null,
      dwgFileName: "",

      showManualModal: false,
      manualSelected: [],
      manualJobNote: "",

      showAutoModal: false,
      autoSchedule: [],

      showMaterialModal: false,
      materialSelected: [],

      showPreviewModal: false,

      showSuccessModal: false,
      showErrorModal: false,
      errorMessage: "",
      formErrors: {},

      currentProjectId: null,
      editingDrawingIndex: -1,

      allWorkers: [],
      allWarehouseItems: [],
      clients: [],

      autoEstimatedTime: "",
      saving: false,
    };
  },
  watch: {
    selectedCompany: {
      immediate: true,
      handler() {
        this.fetchData();
      },
    },
    "form.client"() {
      this.form.responsible = "";
    },
    editProject: {
      immediate: true,
      handler(project) {
        if (!project) return;
        this.loadProjectForEditing(project);
      },
    },
  },
  computed: {
    responsiblePersons() {
      const selected = this.clients.find(
        (c) => c.clientName === this.form.client,
      );
      if (!selected || !selected.responsiblePersons) return [];
      return selected.responsiblePersons
        .map((rp) => rp.fullName)
        .filter(Boolean);
    },
    totalEstimatedTime() {
      let total = 0;
      for (const section of this.treatmentSections) {
        total += calcTotalTime(section);
      }
      return formatTime(total);
    },
    workers() {
      if (!this.selectedCompany) return this.allWorkers;
      return this.allWorkers.filter((w) => w.company === this.selectedCompany);
    },
    warehouseItems() {
      if (!this.selectedCompany) return this.allWarehouseItems;
      return this.allWarehouseItems.filter(
        (i) => i.company === this.selectedCompany,
      );
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
        const hasValue = this.treatmentSections.some((s) => {
          return Object.values(s[key] || {}).some((v) => v !== "");
        });
        if (hasValue) active.push({ key, label: opMap[key] });
      }
      return active;
    },
    activeOperationLabels() {
      return this.activeOperations.map((o) => o.label);
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
      const opTimes = calcTimePerOperation(this.treatmentSections);
      let totalMinutes = 0;
      const opWorkerCounts = {};
      for (const s of this.manualSelected) {
        const w = this.allWorkers.find((aw) => aw.id === s.id);
        if (!w) continue;
        for (const op of s.operations) {
          const opKey = opKeyByLabel[op];
          if (!opKey) continue;
          if (!opWorkerCounts[opKey]) opWorkerCounts[opKey] = [];
          opWorkerCounts[opKey].push({
            rating: w.ratings[opKey],
            busy: w.busy,
            freeIn: w.freeIn,
          });
        }
      }
      for (const opKey of Object.keys(opWorkerCounts)) {
        const workers = opWorkerCounts[opKey];
        const avgRating =
          workers.reduce((sum, w) => sum + w.rating, 0) / workers.length;
        const efficiency = avgRating > 0 ? avgRating / 100 : 0.33;
        const baseMinutes = opTimes[opKey] || 0;
        const taskMinutes = baseMinutes / (efficiency * workers.length);
        const maxWait = Math.max(
          0,
          ...workers.map((w) =>
            w.busy ? this.parseFreeInMinutes(w.freeIn) : 0,
          ),
        );
        totalMinutes += taskMinutes + maxWait;
      }
      return formatTime(totalMinutes);
    },
  },
  methods: {
    async fetchData() {
      const params = this.selectedCompany
        ? { company: this.selectedCompany }
        : {};
      const [workersRes, warehouseRes, clientsRes] = await Promise.all([
        api.get("/workers", { params }),
        api.get("/warehouse", { params }),
        api.get("/clients", { params }),
      ]);
      this.clients = clientsRes.data;
      this.allWorkers = workersRes.data.map((w) => ({
        id: w._id,
        name: w.fullName,
        busy: w.busy,
        freeIn: w.freeIn,
        company: w.company,
        ratings: w.ratings,
        operations: w.operations,
      }));
      this.allWarehouseItems = warehouseRes.data.map((i) => ({
        id: i._id,
        type: i.type,
        name: i.name,
        specs: i.specs,
        qty: i.qty,
        company: i.company,
      }));
    },
    createEmptyTreatment() {
      return {
        pipeCutting: {
          qty: "",
          m: "",
          thickness: "",
          cuts: "",
          cutType: "",
          profile: "",
        },
        sheetCutting: { m: "", thickness: "", complexity: "", method: "" },
        drilling: { qty: "", dia: "", thickness: "", machine: "" },
        welding: { m: "", size: "", weldType: "", position: "", passes: "" },
        grinding: { m: "", grindType: "" },
        bending: { qty: "", thickness: "", bends: "", length: "" },
        assembly: { qty: "", kg: "", complexity: "" },
      };
    },
    getSectionTime(section) {
      return formatTime(calcTotalTime(section));
    },
    addTreatmentSection() {
      this.treatmentSections.push(this.createEmptyTreatment());
    },

    openManualModal() {
      this.manualSelected = [];
      this.manualJobNote = "";
      this.showManualModal = true;
    },
    toggleManualWorker(w) {
      const idx = this.manualSelected.findIndex((s) => s.id === w.id);
      if (idx >= 0) {
        this.manualSelected.splice(idx, 1);
      } else {
        this.manualSelected.push({
          id: w.id,
          name: w.name,
          operations: [],
          note: "",
        });
      }
    },
    isManualWorkerOpChecked(id, op) {
      const found = this.manualSelected.find((s) => s.id === id);
      return found ? found.operations.includes(op) : false;
    },
    toggleManualWorkerOp(id, op) {
      let found = this.manualSelected.find((s) => s.id === id);
      if (!found) {
        const w = this.workers.find((w) => w.id === id);
        found = { id, name: w.name, operations: [], note: "" };
        this.manualSelected.push(found);
      }
      const idx = found.operations.indexOf(op);
      if (idx >= 0) {
        found.operations.splice(idx, 1);
        if (!found.operations.length) {
          const sIdx = this.manualSelected.findIndex((s) => s.id === id);
          this.manualSelected.splice(sIdx, 1);
        }
      } else {
        found.operations.push(op);
      }
    },
    getManualWorkerNote(id) {
      const found = this.manualSelected.find((s) => s.id === id);
      return found ? found.note : "";
    },
    setManualWorkerNote(id, val) {
      const found = this.manualSelected.find((s) => s.id === id);
      if (found) found.note = val;
    },
    confirmManual() {
      const opTimes = calcTimePerOperation(this.treatmentSections);
      const opKeyByLabel = {};
      for (const { key, label } of this.activeOperations)
        opKeyByLabel[label] = key;

      for (const s of this.manualSelected) {
        for (const op of s.operations) {
          const opKey = opKeyByLabel[op] || "";
          this.assignedWorkers.push({
            id: s.id,
            name: s.name,
            operation: op,
            opKey,
            note: s.note || this.manualJobNote || "",
            type: "manual",
            estimatedMinutes: opTimes[opKey] || 0,
          });
        }
      }
      this.showManualModal = false;
    },
    removeAssignedWorker(idx) {
      this.assignedWorkers.splice(idx, 1);
    },

    openAutoModal() {
      this.autoSchedule = this.computeGreedySchedule();
      this.computeEstimatedTime();
      this.showAutoModal = true;
    },
    computeGreedySchedule() {
      const opTimes = calcTimePerOperation(this.treatmentSections);
      const schedule = [];
      const usedWorkerIds = new Set();

      const opOrder = {
        sheetCutting: 1,
        pipeCutting: 1,
        drilling: 2,
        bending: 2,
        assembly: 3,
        welding: 4,
        grinding: 5,
      };

      const ops = this.activeOperations
        .filter((o) => opTimes[o.key] > 0)
        .sort((a, b) => (opOrder[a.key] || 99) - (opOrder[b.key] || 99));

      for (const { key: op, label } of ops) {
        const eligible = this.workers
          .filter((w) => w.operations[op])
          .sort((a, b) => {
            if (a.busy !== b.busy) return a.busy ? 1 : -1;
            return b.ratings[op] - a.ratings[op];
          });
        if (!eligible.length) continue;

        let best =
          eligible.find((w) => !usedWorkerIds.has(w.id)) || eligible[0];
        usedWorkerIds.add(best.id);

        const baseMinutes = opTimes[op] || 0;
        const item = {
          opKey: op,
          operation: label,
          baseMinutes,
          assignedWorkers: [
            {
              id: best.id,
              name: best.name,
              rating: best.ratings[op],
              busy: best.busy,
              freeIn: best.freeIn,
            },
          ],
          eligibleWorkers: eligible,
          adjustedMinutes: 0,
        };
        this.recalcItemTime(item);
        schedule.push(item);
      }

      const freeWorkers = this.workers.filter(
        (w) => !w.busy && !usedWorkerIds.has(w.id),
      );
      for (const fw of freeWorkers) {
        let bestItem = null;
        let bestTime = 0;
        for (const item of schedule) {
          if (!fw.operations[item.opKey]) continue;
          const alreadyAssigned = item.assignedWorkers.some(
            (aw) => aw.id === fw.id,
          );
          if (alreadyAssigned) continue;
          if (item.adjustedMinutes > bestTime) {
            bestTime = item.adjustedMinutes;
            bestItem = item;
          }
        }
        if (bestItem) {
          bestItem.assignedWorkers.push({
            id: fw.id,
            name: fw.name,
            rating: fw.ratings[bestItem.opKey],
            busy: fw.busy,
            freeIn: fw.freeIn,
          });
          usedWorkerIds.add(fw.id);
          this.recalcItemTime(bestItem);
        }
      }

      return schedule;
    },
    recalcItemTime(item) {
      const workers = item.assignedWorkers;
      const avgRating =
        workers.reduce((s, w) => s + w.rating, 0) / workers.length;
      const efficiency = avgRating > 0 ? avgRating / 100 : 0.33;
      const adjusted = item.baseMinutes / (efficiency * workers.length);
      const maxWait = Math.max(
        0,
        ...workers.map((w) => (w.busy ? this.parseFreeInMinutes(w.freeIn) : 0)),
      );
      item.adjustedMinutes = adjusted + maxWait;
    },
    changeAutoWorkerAt(sIdx, wIdx, workerId) {
      const item = this.autoSchedule[sIdx];
      const worker = this.workers.find((w) => w.id === workerId);
      if (!worker) return;
      item.assignedWorkers[wIdx] = {
        id: worker.id,
        name: worker.name,
        rating: worker.ratings[item.opKey],
        busy: worker.busy,
        freeIn: worker.freeIn,
      };
      this.recalcItemTime(item);
      this.computeEstimatedTime();
    },
    addAutoWorker(sIdx) {
      const item = this.autoSchedule[sIdx];
      const usedIds = new Set(item.assignedWorkers.map((w) => w.id));
      const next = item.eligibleWorkers.find((w) => !usedIds.has(w.id));
      if (!next) return;
      item.assignedWorkers.push({
        id: next.id,
        name: next.name,
        rating: next.ratings[item.opKey],
        busy: next.busy,
        freeIn: next.freeIn,
      });
      this.recalcItemTime(item);
      this.computeEstimatedTime();
    },
    removeAutoWorkerAt(sIdx, wIdx) {
      const item = this.autoSchedule[sIdx];
      if (item.assignedWorkers.length > 1) {
        item.assignedWorkers.splice(wIdx, 1);
        this.recalcItemTime(item);
        this.computeEstimatedTime();
      }
    },
    computeEstimatedTime() {
      let totalMinutes = 0;
      for (const item of this.autoSchedule) {
        totalMinutes += item.adjustedMinutes;
      }
      this.autoEstimatedTime = formatTime(totalMinutes);
    },
    formatTimeDisplay(minutes) {
      return formatTime(minutes);
    },
    parseFreeInMinutes(freeIn) {
      if (!freeIn) return 0;
      let minutes = 0;
      const hMatch = freeIn.match(/(\d+)\s*h/);
      const mMatch = freeIn.match(/(\d+)\s*min/);
      if (hMatch) minutes += parseInt(hMatch[1]) * 60;
      if (mMatch) minutes += parseInt(mMatch[1]);
      return minutes;
    },
    confirmAuto() {
      for (const item of this.autoSchedule) {
        const perWorkerMinutes =
          item.assignedWorkers.length > 1
            ? Math.round(item.baseMinutes / item.assignedWorkers.length)
            : item.baseMinutes;
        for (const aw of item.assignedWorkers) {
          this.assignedWorkers.push({
            id: aw.id,
            name: aw.name,
            operation: item.operation,
            opKey: item.opKey,
            note: "",
            type: "auto",
            estimatedMinutes: perWorkerMinutes,
          });
        }
      }
      this.showAutoModal = false;
    },

    toggleMaterial(m) {
      const idx = this.materialSelected.findIndex((s) => s.id === m.id);
      if (idx >= 0) {
        this.materialSelected.splice(idx, 1);
      } else {
        this.materialSelected.push({
          id: m.id,
          name: m.type + " – " + m.name,
          specs: m.specs,
          useQty: 1,
        });
      }
    },
    getMaterialQty(id) {
      const found = this.materialSelected.find((s) => s.id === id);
      return found ? found.useQty : 1;
    },
    setMaterialQty(id, val) {
      const found = this.materialSelected.find((s) => s.id === id);
      if (found) found.useQty = parseInt(val) || 1;
    },
    confirmMaterial() {
      for (const s of this.materialSelected) {
        this.assignedMaterials.push({
          id: s.id,
          name: s.name,
          specs: s.specs,
          useQty: s.useQty,
        });
      }
      this.materialSelected = [];
      this.showMaterialModal = false;
    },

    onPdfSelected(e) {
      const file = e.target.files[0];
      if (file) {
        this.pdfFile = file;
        this.pdfFileName = file.name;
      }
    },
    onDwgSelected(e) {
      const file = e.target.files[0];
      if (file) {
        this.dwgFile = file;
        this.dwgFileName = file.name;
      }
    },
    async uploadFile(file) {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.path;
    },

    async buildDrawingPayload() {
      let pdfPath = "";
      let dwgPath = "";
      if (this.editProject && this.editingDrawingIndex >= 0) {
        const existingDrawing =
          this.editProject.drawings[this.editingDrawingIndex];
        if (existingDrawing) {
          pdfPath = existingDrawing.pdfFile || "";
          dwgPath = existingDrawing.dwgFile || "";
        }
      }
      if (this.pdfFile) pdfPath = await this.uploadFile(this.pdfFile);
      if (this.dwgFile) dwgPath = await this.uploadFile(this.dwgFile);

      return {
        drawingNo: this.part.drawingNo,
        partName: this.part.partName,
        assemblyName: this.part.assemblyName,
        weight: this.part.weight,
        quantity: parseInt(this.part.quantity) || 1,
        pdfFile: pdfPath,
        dwgFile: dwgPath,
        isAssemblyDrawing: this.form.isAssemblyDrawing,
        treatments: this.form.isAssemblyDrawing ? [] : this.treatmentSections,
        assignedWorkers: this.assignedWorkers.map((aw) => ({
          workerName: aw.name,
          workerId: aw.id || "",
          operation: aw.operation,
          note: aw.note,
          type: aw.type,
          estimatedMinutes: aw.estimatedMinutes || 0,
        })),
        assignedMaterials: this.assignedMaterials.map((am) => ({
          name: am.name,
          specs: am.specs,
          useQty: am.useQty,
        })),
      };
    },

    async deductMaterials() {
      for (const am of this.assignedMaterials) {
        if (!am.id) continue;
        const item = this.allWarehouseItems.find((i) => i.id === am.id);
        if (item) {
          const newQty = Math.max(0, item.qty - am.useQty);
          await api.put(`/warehouse/${am.id}`, { qty: newQty });
          item.qty = newQty;
        }
      }
    },

    async saveDrawingToProject(drawing) {
      if (this.currentProjectId) {
        const { data: project } = await api.get(
          `/projects/${this.currentProjectId}`,
        );
        project.rn = this.form.rn;
        project.name = this.form.name;
        project.client = this.form.client;
        project.responsible = this.form.responsible;

        if (
          this.editingDrawingIndex >= 0 &&
          this.editingDrawingIndex < project.drawings.length
        ) {
          project.drawings[this.editingDrawingIndex] = drawing;
        } else {
          project.drawings.push(drawing);
        }
        await api.put(`/projects/${this.currentProjectId}`, {
          rn: project.rn,
          name: project.name,
          client: project.client,
          responsible: project.responsible,
          drawings: project.drawings,
        });
      } else {
        const payload = {
          rn: this.form.rn,
          name: this.form.name,
          client: this.form.client,
          responsible: this.form.responsible,
          company: this.selectedCompany,
          drawings: [drawing],
        };
        const { data: created } = await api.post("/projects", payload);
        this.currentProjectId = created._id;
      }
    },

    treatmentError(sIdx, op, field) {
      return this.formErrors.treatments?.[sIdx]?.[op]?.[field] || "";
    },
    clearTreatmentError(sIdx, op, field) {
      if (this.formErrors.treatments?.[sIdx]?.[op]?.[field]) {
        delete this.formErrors.treatments[sIdx][op][field];
      }
    },
    isNumeric(val) {
      if (val === "" || val == null) return true;
      return !isNaN(val) && val.toString().trim() !== "";
    },

    async validateForm() {
      const errors = {};
      const req = this.$t("createProject.validationRequired");
      const num = this.$t("createProject.validationNumeric");
      const dup = this.$t("createProject.validationRnDuplicate");

      if (!this.form.rn.trim()) {
        errors.rn = req;
      } else if (
        !this.currentProjectId ||
        (this.editProject && this.editProject.rn !== this.form.rn)
      ) {
        try {
          const params = {};
          if (this.selectedCompany) params.company = this.selectedCompany;
          const { data } = await api.get("/projects", { params });
          if (
            data.some(
              (p) =>
                p.rn === this.form.rn.trim() && p._id !== this.currentProjectId,
            )
          ) {
            errors.rn = dup;
          }
        } catch (e) {
          console.error("Failed to check RN duplicates", e);
        }
      }
      if (!this.form.name.trim()) errors.name = req;
      if (!this.form.client) errors.client = req;

      if (this.part.weight !== "" && !this.isNumeric(this.part.weight))
        errors.weight = num;
      if (this.part.quantity !== "" && !this.isNumeric(this.part.quantity))
        errors.quantity = num;

      const numericFields = {
        pipeCutting: ["qty", "m", "thickness", "cuts"],
        sheetCutting: ["m", "thickness"],
        drilling: ["qty", "dia", "thickness"],
        welding: ["m", "size"],
        grinding: ["m"],
        bending: ["qty", "thickness", "bends", "length"],
        assembly: ["qty", "kg"],
      };
      const treatmentErrors = [];
      for (const section of this.treatmentSections) {
        const sErr = {};
        for (const [op, fields] of Object.entries(numericFields)) {
          for (const f of fields) {
            if (!this.isNumeric(section[op][f])) {
              if (!sErr[op]) sErr[op] = {};
              sErr[op][f] = num;
            }
          }
        }
        treatmentErrors.push(sErr);
      }
      if (treatmentErrors.some((s) => Object.keys(s).length > 0)) {
        errors.treatments = treatmentErrors;
      }

      this.formErrors = errors;
      return Object.keys(errors).length === 0;
    },

    async saveAndInsertNew() {
      if (this.saving) return;
      if (!(await this.validateForm())) return;
      this.saving = true;
      try {
        const drawing = await this.buildDrawingPayload();
        await this.deductMaterials();
        await this.saveDrawingToProject(drawing);

        this.editingDrawingIndex = -1;
        this.resetPartForm();
        this.showSuccessModal = true;
      } catch (err) {
        this.errorMessage = err.response?.data?.error || err.message;
        this.showErrorModal = true;
      } finally {
        this.saving = false;
      }
    },

    async saveAndFinish() {
      if (this.saving) return;
      if (!(await this.validateForm())) return;
      this.saving = true;
      try {
        const drawing = await this.buildDrawingPayload();
        await this.deductMaterials();
        await this.saveDrawingToProject(drawing);

        this.showSuccessModal = true;
        setTimeout(() => {
          this.$emit("back");
        }, 1500);
      } catch (err) {
        this.errorMessage = err.response?.data?.error || err.message;
        this.showErrorModal = true;
      } finally {
        this.saving = false;
      }
    },

    loadProjectForEditing(project) {
      this.currentProjectId = project._id;
      this.form.rn = project.rn || "";
      this.form.name = project.name || "";
      this.form.client = project.client || "";
      this.form.responsible = project.responsible || "";

      const drawings = project.drawings || [];
      if (drawings.length > 0) {
        this.loadDrawingForEditing(0, drawings[0]);
      }
      this.editingDrawingIndex = drawings.length > 0 ? 0 : -1;
    },
    loadDrawingForEditing(idx, drawing) {
      this.editingDrawingIndex = idx;
      this.part.drawingNo = drawing.drawingNo || "";
      this.part.partName = drawing.partName || "";
      this.part.assemblyName = drawing.assemblyName || "";
      this.part.weight = drawing.weight || "";
      this.part.quantity = drawing.quantity || "";
      this.form.isAssemblyDrawing = !!drawing.isAssemblyDrawing;

      if (drawing.pdfFile) {
        this.pdfFileName = drawing.pdfFile.split("/").pop();
      }
      if (drawing.dwgFile) {
        this.dwgFileName = drawing.dwgFile.split("/").pop();
      }

      if (drawing.treatments && drawing.treatments.length > 0) {
        this.treatmentSections = drawing.treatments.map((t) => {
          const empty = this.createEmptyTreatment();
          for (const key of Object.keys(empty)) {
            if (t[key]) {
              for (const field of Object.keys(empty[key])) {
                empty[key][field] = t[key][field] || "";
              }
            }
          }
          return empty;
        });
      } else {
        this.treatmentSections = [this.createEmptyTreatment()];
      }

      this.assignedWorkers = (drawing.assignedWorkers || []).map((aw) => ({
        id: aw.workerId || "",
        name: aw.workerName || "",
        operation: aw.operation || "",
        opKey: this.getOpKeyFromLabel(aw.operation),
        note: aw.note || "",
        type: aw.type || "manual",
        estimatedMinutes: aw.estimatedMinutes || 0,
      }));

      this.assignedMaterials = (drawing.assignedMaterials || []).map((am) => ({
        id: am._id || "",
        name: am.name || "",
        specs: am.specs || "",
        useQty: am.useQty || 1,
      }));
    },
    getOpKeyFromLabel(label) {
      const map = {
        "Rezanje cijevi": "pipeCutting",
        "Rezanje lima": "sheetCutting",
        Bušenje: "drilling",
        Zavarivanje: "welding",
        Brušenje: "grinding",
        Savijanje: "bending",
        Montaža: "assembly",
      };
      return map[label] || "";
    },
    selectEditDrawing(idx) {
      const drawings = this.editProject?.drawings || [];
      if (drawings[idx]) {
        this.loadDrawingForEditing(idx, drawings[idx]);
      }
    },
    resetPartForm() {
      this.part = {
        drawingNo: "",
        partName: "",
        assemblyName: "",
        weight: "",
        quantity: "",
      };
      this.treatmentSections = [this.createEmptyTreatment()];
      this.assignedWorkers = [];
      this.assignedMaterials = [];
      this.pdfFile = null;
      this.pdfFileName = "";
      this.dwgFile = null;
      this.dwgFileName = "";
    },

    printPreview() {
      const content = this.$refs.previewContent;
      if (!content) return;
      const win = window.open("", "_blank");
      win.document
        .write(`<html><head><title>${this.form.rn} ${this.form.name}</title>
        <style>body{font-family:'Segoe UI',sans-serif;padding:20px;font-size:14px}
        .estimated-time-box{background:#e3f2fd;border:1px solid #90caf9;border-radius:6px;padding:8px 12px;font-size:14px}
        hr{margin:12px 0}</style></head><body>${content.innerHTML}</body></html>`);
      win.document.close();
      win.print();
    },

    exportPreviewPdf() {
      this.printPreview();
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

.auto-op-card {
  background: #f5f5f5;
  border: 1px solid #dcdcdc;
  border-left: 3px solid #2b579a;
  border-radius: 6px;
  padding: 0.75rem 1rem;
}
.auto-op-order {
  font-size: 0.85rem;
  font-weight: 700;
  color: #2b579a;
  margin-right: 0.3rem;
}
.auto-op-name {
  font-size: 0.85rem;
  font-weight: 700;
  color: #1a1a1a;
}
.auto-op-adjusted {
  font-size: 0.85rem;
  font-weight: 700;
  color: #2b579a;
  background: #e3f2fd;
  border-radius: 4px;
  padding: 0.15rem 0.5rem;
}
.auto-worker-row {
  font-size: 0.82rem;
}
.auto-worker-rating {
  font-size: 0.75rem;
  font-weight: 700;
  color: #2b579a;
  white-space: nowrap;
  min-width: 50px;
  text-align: center;
}

.treatment-op-block {
  border-left: 3px solid #2b579a;
  padding-left: 0.75rem;
}
.treatment-op-title {
  font-size: 0.78rem;
  font-weight: 700;
  color: #2b579a;
  margin-bottom: 0.3rem;
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
  max-width: 360px;
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
.save-modal-msg {
  font-size: 0.85rem;
  color: #555;
  margin-bottom: 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
