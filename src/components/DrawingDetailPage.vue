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
              <div class="project-info">
                <div class="project-title">{{ project.rn }}</div>
                <div class="project-subtitle">{{ project.name }}</div>
                <hr class="my-2" />
                <div class="project-meta">{{ project.client }}</div>
                <div class="project-meta">David Mallys</div>
                <div class="project-meta">+385911234567</div>
                <div class="project-meta">david.montana@city.com</div>
                <div class="d-flex align-items-center gap-2 mt-2 mb-1">
                  <div class="progress-bar-wrap">
                    <div
                      class="progress-fill"
                      :class="'fill-' + project.color"
                      :style="{ width: project.progress + '%' }"
                    ></div>
                  </div>
                </div>
                <div class="project-meta text-muted">{{ project.est }}</div>
              </div>
            </div>

            <div class="d-flex flex-column gap-2">
              <button class="btn btn-action" @click="$emit('back')">
                <span>{{ $t("drawing.goBackProject") }}</span>
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
                  <path
                    d="M4.603 14.087a.8.8 0 01-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 011.482-.645 20 20 0 001.062-2.227 7.3 7.3 0 01-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 01.477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 00.98 1.686 5.8 5.8 0 011.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 01-.354.416.86.86 0 01-.51.138c-.331-.014-.654-.196-.933-.417a6.1 6.1 0 01-.911-.95 11.7 11.7 0 00-1.997.406 11.3 11.3 0 01-1.02 1.51c-.292.35-.609.656-.927.787a.8.8 0 01-.58.029z"
                  />
                </svg>
              </button>
              <button class="btn btn-action">
                <span>{{ $t("drawing.exportDwg") }}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  opacity="0.8"
                >
                  <path
                    d="M14 4.5V14a2 2 0 01-2 2H4a2 2 0 01-2-2V2a2 2 0 012-2h5.5zm-3 0A1.5 1.5 0 019.5 3V1H4a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V4.5z"
                  />
                  <path
                    d="M4.5 12.5A.5.5 0 015 12h3a.5.5 0 010 1H5a.5.5 0 01-.5-.5m0-2A.5.5 0 015 10h6a.5.5 0 010 1H5a.5.5 0 01-.5-.5m0-2A.5.5 0 015 8h6a.5.5 0 010 1H5a.5.5 0 01-.5-.5"
                  />
                </svg>
              </button>
              <button class="btn btn-action">
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
              <button class="btn btn-action" @click="$emit('home')">
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
              <h5 class="panel-title">
                {{ $t("drawing.drawingNo") }} {{ drawing.no }}
              </h5>
              <div class="drawing-viewer">
                <img
                  src="@/assets/nacrt.png"
                  :alt="'Drawing ' + drawing.no"
                  class="drawing-img"
                />
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
  name: "DrawingDetailPage",
  components: { SidebarNav },
  props: {
    project: { type: Object, required: true },
    drawing: { type: Object, required: true },
    companies: { type: Array, default: () => [] },
    selectedCompany: { type: String, default: '' },
  },
  emits: ["back", "home", "logout", "edit-profile", "select-company", "add-company", "update-companies"],
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
}
.project-subtitle {
  font-size: 0.95rem;
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
  width: 90px;
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

.drawing-viewer {
  padding: 0.5rem;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.drawing-img {
  max-width: 100%;
  max-height: 75vh;
  object-fit: contain;
}

@media (max-width: 767.98px) {
  .btn-action {
    padding: 0.65rem 0.9rem;
    font-size: 0.85rem;
  }
  .drawing-viewer {
    min-height: 250px;
  }
}
@media (max-width: 575.98px) {
  .content-wrap {
    padding: 0.75rem !important;
  }
}
</style>
