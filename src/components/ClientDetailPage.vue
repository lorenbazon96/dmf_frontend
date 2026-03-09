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
                <h5 class="panel-heading">{{ $t("clientDetail.client") }}</h5>
                <div class="client-name">{{ form.clientName }}</div>
                <div class="client-meta">
                  <strong>{{ $t("clientDetail.phone") }}:</strong>
                  +385911234567
                </div>
                <div class="client-meta">
                  <strong>{{ $t("clientDetail.email") }}:</strong>
                  info@metalconstruct.com
                </div>
                <div class="client-meta mt-2">
                  <span class="text-muted"
                    >{{ $t("clientDetail.createdAt") }}:</span
                  >
                  20.03.2025.
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
              <button class="btn btn-action">
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
              <button class="btn btn-action">
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
              <button class="btn btn-action">
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
              <button class="btn btn-action-danger">
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
                    <label class="form-label-sm"
                      >{{ $t("clientDetail.clientName") }}:</label
                    >
                    <input
                      v-model="form.clientName"
                      type="text"
                      class="form-control form-control-sm"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label-sm"
                      >{{ $t("clientDetail.country") }}:</label
                    >
                    <input
                      v-model="form.country"
                      type="text"
                      class="form-control form-control-sm"
                    />
                  </div>
                </div>

                <div class="row g-2 mb-3">
                  <div class="col-md-6">
                    <label class="form-label-sm"
                      >{{ $t("clientDetail.adressa") }}:</label
                    >
                    <input
                      v-model="form.adressa"
                      type="text"
                      class="form-control form-control-sm"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label-sm"
                      >{{ $t("clientDetail.owner") }}:</label
                    >
                    <input
                      v-model="form.owner"
                      type="text"
                      class="form-control form-control-sm"
                    />
                  </div>
                </div>

                <div class="row g-2">
                  <div class="col-md-6">
                    <label class="form-label-sm"
                      >{{ $t("clientDetail.contact") }}:</label
                    >
                    <input
                      v-model="form.contact"
                      type="text"
                      class="form-control form-control-sm"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label-sm"
                      >{{ $t("clientDetail.email") }}:</label
                    >
                    <input
                      v-model="form.email"
                      type="text"
                      class="form-control form-control-sm"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section class="panel">
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
                      <label class="form-label-sm"
                        >{{ $t("clientDetail.fullName") }}:</label
                      >
                      <input
                        v-model="person.fullName"
                        type="text"
                        class="form-control form-control-sm"
                      />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label-sm"
                        >{{ $t("clientDetail.email") }}:</label
                      >
                      <input
                        v-model="person.email"
                        type="text"
                        class="form-control form-control-sm"
                      />
                    </div>
                  </div>
                  <div class="row g-2">
                    <div class="col-md-6">
                      <label class="form-label-sm"
                        >{{ $t("clientDetail.contact") }}:</label
                      >
                      <input
                        v-model="person.contact"
                        type="text"
                        class="form-control form-control-sm"
                      />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label-sm"
                        >{{ $t("clientDetail.note") }}:</label
                      >
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
  </div>
</template>

<script>
import SidebarNav from "./SidebarNav.vue";

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
  },
  emits: ["back", "home", "logout", "edit-profile", "select-company", "add-company", "update-companies"],
  data() {
    return {
      form: {
        clientName: this.client?.clientName || "",
        country: this.client?.country || "",
        adressa: this.client?.adressa || "",
        owner: this.client?.owner || "",
        contact: this.client?.contact || "",
        email: this.client?.email || "",
      },
      responsiblePersons: [
        { fullName: "", email: "", contact: "", note: "" },
        { fullName: "", email: "", contact: "", note: "" },
      ],
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
