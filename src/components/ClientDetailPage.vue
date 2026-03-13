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
                <h5 class="panel-heading">{{ $t("clientDetail.client") }}</h5>
                <div class="client-name">{{ form.clientName }}</div>
                <div class="client-meta">
                  <strong>{{ $t("clientDetail.phone") }}:</strong>
                  {{ form.contact }}
                </div>
                <div class="client-meta">
                  <strong>{{ $t("clientDetail.email") }}:</strong>
                  {{ form.email }}
                </div>
                <div class="client-meta mt-2">
                  <span class="text-muted"
                    >{{ $t("clientDetail.createdAt") }}:</span
                  >
                  {{ formattedCreatedAt }}
                </div>
              </div>
            </div>

            <div class="d-flex flex-column gap-2">
              <button class="btn btn-action" @click="$emit('back')">
                <span>{{ $t("clientDetail.goBack") }}</span>
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
              <button class="btn btn-action" @click="saveClient">
                <span>{{ $t("clientDetail.saveChanges") }}</span>
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
              <button class="btn btn-action" @click="exportPdf">
                <span>{{ $t("clientDetail.exportPdf") }}</span>
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
              <button class="btn btn-action" @click="printClient">
                <span>{{ $t("clientDetail.print") }}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  opacity="0.8"
                >
                  <path
                    d="M2.5 8a.5.5 0 100-1 .5.5 0 000 1"
                  />
                  <path
                    d="M5 1a2 2 0 00-2 2v2H2a2 2 0 00-2 2v3a2 2 0 002 2h1v1a2 2 0 002 2h6a2 2 0 002-2v-1h1a2 2 0 002-2V7a2 2 0 00-2-2h-1V3a2 2 0 00-2-2zM4 3a1 1 0 011-1h6a1 1 0 011 1v2H4zm8 7H4v3a1 1 0 001 1h6a1 1 0 001-1zm1-3.5a.5.5 0 11-1 0 .5.5 0 011 0"
                  />
                </svg>
              </button>
              <button class="btn btn-action-danger" @click="showDeleteModal = true">
                <span>{{ $t("clientDetail.deleteClient") }}</span>
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
                <span>{{ $t("clientDetail.goBackHome") }}</span>
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
           <section class="panel mb-3">
             <div class="panel-body">
               <h5 class="panel-heading">
                 {{ $t("clientDetail.clientData") }}
               </h5>

               <div class="row g-2 mb-3">
                 <div class="col-md-6">
                   <label class="form-label-sm">{{ $t("clientDetail.clientType") }}:</label>
                   <div class="d-flex gap-2">
                     <button
                       class="btn btn-sm flex-fill"
                       :class="form.clientType === 'company' ? 'btn-type-active' : 'btn-type'"
                       @click="form.clientType = 'company'"
                     >
                       {{ $t("clientDetail.companyType") }}
                     </button>
                     <button
                       class="btn btn-sm flex-fill"
                       :class="form.clientType === 'person' ? 'btn-type-active' : 'btn-type'"
                       @click="form.clientType = 'person'"
                     >
                       {{ $t("clientDetail.personType") }}
                     </button>
                   </div>
                 </div>
                 <div class="col-md-6">
                   <label class="form-label-sm">
                     {{ form.clientType === 'company' ? $t("clientDetail.companyName") : $t("clientDetail.personName") }}:
                   </label>
                   <input
                     v-model="form.clientName"
                     type="text"
                     class="form-control form-control-sm"
                   />
                 </div>
               </div>

               <div class="row g-2 mb-3">
                 <div class="col-md-6">
                   <label class="form-label-sm">{{ $t("clientDetail.oib") }}:</label>
                   <input
                     v-model="form.oib"
                     type="text"
                     class="form-control form-control-sm"
                   />
                 </div>
                 <div class="col-md-6">
                   <label class="form-label-sm">{{ $t("clientDetail.country") }}:</label>
                   <input
                     v-model="form.country"
                     type="text"
                     class="form-control form-control-sm"
                   />
                 </div>
               </div>

               <div class="row g-2 mb-3">
                 <div class="col-md-6">
                   <label class="form-label-sm">{{ $t("clientDetail.adressa") }}:</label>
                   <input
                     v-model="form.adressa"
                     type="text"
                     class="form-control form-control-sm"
                   />
                 </div>
                 <div v-if="form.clientType === 'company'" class="col-md-6">
                   <label class="form-label-sm">{{ $t("clientDetail.owner") }}:</label>
                   <input
                     v-model="form.owner"
                     type="text"
                     class="form-control form-control-sm"
                   />
                 </div>
               </div>

               <div class="row g-2">
                 <div class="col-md-6">
                   <label class="form-label-sm">{{ $t("clientDetail.contact") }}:</label>
                   <input
                     v-model="form.contact"
                     type="text"
                     class="form-control form-control-sm"
                   />
                 </div>
                 <div class="col-md-6">
                   <label class="form-label-sm">{{ $t("clientDetail.email") }}:</label>
                   <input
                     v-model="form.email"
                     type="text"
                     class="form-control form-control-sm"
                   />
                 </div>
               </div>
             </div>
           </section>

           <section v-if="form.clientType === 'company'" class="panel">
             <div class="panel-body">
               <h5 class="panel-heading">
                 {{ $t("clientDetail.responsiblePersons") }}
               </h5>

               <div
                 v-for="(person, index) in responsiblePersons"
                 :key="index"
                 class="responsible-block"
                 :class="{ 'mb-3': index < responsiblePersons.length - 1 }"
               >
                 <div class="row g-2 mb-2">
                   <div class="col-md-6">
                     <label class="form-label-sm">{{ $t("clientDetail.fullName") }}:</label>
                     <input
                       v-model="person.fullName"
                       type="text"
                       class="form-control form-control-sm"
                     />
                   </div>
                   <div class="col-md-6">
                     <label class="form-label-sm">{{ $t("clientDetail.email") }}:</label>
                     <input
                       v-model="person.email"
                       type="text"
                       class="form-control form-control-sm"
                     />
                   </div>
                 </div>
                 <div class="row g-2">
                   <div class="col-md-6">
                     <label class="form-label-sm">{{ $t("clientDetail.contact") }}:</label>
                     <input
                       v-model="person.contact"
                       type="text"
                       class="form-control form-control-sm"
                     />
                   </div>
                   <div class="col-md-6">
                     <label class="form-label-sm">{{ $t("clientDetail.note") }}:</label>
                     <input
                       v-model="person.note"
                       type="text"
                       class="form-control form-control-sm"
                     />
                   </div>
                 </div>
               </div>
             </div>
           </section>
          </div>
        </div>
      </div>
    </main>

    <Transition name="modal-fade">
      <div v-if="showSuccessModal" class="save-modal-overlay" @click.self="showSuccessModal = false">
        <div class="save-modal-card">
          <div class="save-modal-icon">✓</div>
          <h6 class="save-modal-title">{{ isEditing ? $t("clientDetail.clientUpdated") : $t("clientDetail.clientCreated") }}</h6>
          <p class="save-modal-text">{{ form.clientName }}</p>
          <button class="btn btn-sm save-modal-btn" @click="showSuccessModal = false">OK</button>
        </div>
      </div>
    </Transition>

    <Transition name="modal-fade">
      <div v-if="showDeleteModal" class="save-modal-overlay" @click.self="showDeleteModal = false">
        <div class="save-modal-card">
          <div class="save-modal-icon delete-icon">!</div>
          <h6 class="save-modal-title">{{ $t("clientDetail.confirmDeleteTitle") }}</h6>
          <p class="save-modal-text">{{ $t("clientDetail.confirmDeleteMsg") }} <strong>{{ form.clientName }}</strong>?</p>
          <div class="d-flex gap-2 justify-content-center">
            <button class="btn btn-sm save-modal-btn-cancel" @click="showDeleteModal = false">{{ $t("clientDetail.cancel") }}</button>
            <button class="btn btn-sm save-modal-btn-delete" @click="deleteClient">{{ $t("clientDetail.deleteClient") }}</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import SidebarNav from "./SidebarNav.vue";
import api from "../api";
import { exportSingleClientPdf, printSingleClient } from "../utils/pdf";

export default {
  name: "ClientDetailPage",
  components: { SidebarNav },
  props: {
    client: {
      type: Object,
      default: () => ({}),
    },
    companies: { type: Array, default: () => [] },
    selectedCompany: { type: String, default: '' },
    userName: { type: String, default: '' },
  },
  emits: ["back", "home", "logout", "edit-profile", "select-company", "add-company", "update-companies"],
  data() {
    return {
      form: {
        clientType: this.client?.clientType || "company",
        clientName: this.client?.clientName || "",
        country: this.client?.country || "",
        adressa: this.client?.adressa || "",
        owner: this.client?.owner || "",
        contact: this.client?.contact || "",
        email: this.client?.email || "",
        oib: this.client?.oib || "",
      },
      responsiblePersons: this.client?.responsiblePersons?.length
        ? this.client.responsiblePersons.map(p => ({ ...p }))
        : [{ fullName: "", email: "", contact: "", note: "" }],
      showSuccessModal: false,
      showDeleteModal: false,
    };
  },
  computed: {
    isEditing() {
      return !!(this.client?._id || this.client?.id);
    },
    formattedCreatedAt() {
      const raw = this.client?.createdAt || this.client?.created_at;
      if (!raw) return "";
      const d = new Date(raw);
      return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}.`;
    },
  },
  methods: {
    async saveClient() {
      const payload = {
        ...this.form,
        company: this.selectedCompany,
        responsiblePersons: this.form.clientType === "company" ? this.responsiblePersons : [],
      };
      const clientId = this.client?._id || this.client?.id;
      if (clientId) {
        await api.put(`/clients/${clientId}`, payload);
      } else {
        await api.post("/clients", payload);
      }
      this.showSuccessModal = true;
    },
    async exportPdf() {
      await exportSingleClientPdf(this.form, this.responsiblePersons, this.userName, this.selectedCompany);
    },
    printClient() {
      printSingleClient(this.form, this.responsiblePersons, this.userName, this.selectedCompany);
    },
    async deleteClient() {
      const clientId = this.client?._id || this.client?.id;
      if (clientId) {
        await api.delete(`/clients/${clientId}`);
      }
      this.showDeleteModal = false;
      this.$emit('back');
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

.client-name {
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}
.client-meta {
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

.responsible-block {
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e5e5e5;
}
.responsible-block:last-child {
  border-bottom: none;
  padding-bottom: 0;
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

.action-icon {
  font-size: 1.2rem;
  font-weight: 700;
  opacity: 0.85;
}

.btn-type {
  background: #e8eaed;
  color: #444;
  border: 1.5px solid #bbb;
  font-weight: 600;
  font-size: 0.82rem;
}
.btn-type:hover {
  background: #d5d8dc;
  color: #333;
}
.btn-type-active {
  background: #2b579a;
  color: #fff;
  border: 1.5px solid #2b579a;
  font-weight: 600;
  font-size: 0.82rem;
}
.btn-type-active:hover {
  background: #1e3f73;
  color: #fff;
}

.save-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
}
.save-modal-card {
  background: #fff;
  border-radius: 10px;
  padding: 2rem 1.5rem;
  width: 90%;
  max-width: 350px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  text-align: center;
}
.save-modal-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 1rem;
  background: #27ae60;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
}
.save-modal-title {
  font-weight: 700;
  font-size: 1rem;
  color: #1c2936;
  margin-bottom: 0.3rem;
}
.save-modal-text {
  font-size: 0.85rem;
  color: #555;
  margin-bottom: 1rem;
}
.save-modal-btn {
  background: #2b579a;
  color: #fff;
  border: none;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 0.45rem 2rem;
  border-radius: 6px;
}
.save-modal-btn:hover {
  background: #1e3f73;
  color: #fff;
}
.delete-icon {
  background: #e74c3c;
}
.save-modal-btn-cancel {
  background: #e8eaed;
  color: #333;
  border: none;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 0.45rem 1.5rem;
  border-radius: 6px;
}
.save-modal-btn-cancel:hover {
  background: #ddd;
}
.save-modal-btn-delete {
  background: #c0392b;
  color: #fff;
  border: none;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 0.45rem 1.5rem;
  border-radius: 6px;
}
.save-modal-btn-delete:hover {
  background: #962d22;
  color: #fff;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
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
