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
        <div class="row g-3 g-lg-4">
          <div class="col-lg-4 col-md-5 col-12">
            <div class="panel mb-3">
              <div class="project-info">
                <div class="project-title d-flex align-items-center gap-2">
                  <span>{{ project.rn }} {{ project.name }}</span>
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
                  <strong>{{ $t("project.contact") }}:</strong> David Mallys
                </div>
                <div class="project-meta">
                  <strong>Phone:</strong> +385911234567
                </div>
                <div class="project-meta">
                  <strong>Email:</strong> david.montana@city.com
                </div>
                <div class="d-flex align-items-center gap-2 mt-2 mb-1">
                  <div class="progress-bar-wrap">
                    <div
                      class="progress-fill"
                      :class="'fill-' + project.color"
                      :style="{ width: project.progress + '%' }"
                    ></div>
                  </div>
                  <span class="project-meta mb-0">{{ project.progress }}%</span>
                </div>
                <div class="project-meta">
                  <strong>EST:</strong> {{ project.est }}
                </div>
              </div>
            </div>

            <div class="d-flex flex-column gap-2">
              <button class="btn btn-action">
                <span>{{ $t("dashboard.createProject") }}</span>
                <span class="action-icon">+</span>
              </button>
              <button class="btn btn-action">
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
              <button class="btn btn-action">
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
              <button class="btn btn-action">
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
              <button class="btn btn-action-danger">
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
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="#555">
                    <path
                      d="M12.146.146a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-10 10a.5.5 0 01-.168.11l-5 2a.5.5 0 01-.65-.65l2-5a.5.5 0 01.11-.168zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 01.5.5v.5h.5a.5.5 0 01.5.5v.5h.293z"
                    />
                  </svg>
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
                      <th class="d-none d-md-table-cell">EST</th>
                      <th>{{ $t("dashboard.process") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(p, i) in productionPlan" :key="i">
                      <td class="fw-semibold text-dark">{{ p.drawingNo }}</td>
                      <td>{{ p.operation }}</td>
                      <td class="d-none d-sm-table-cell text-muted">
                        {{ p.worksOn }}
                      </td>
                      <td class="d-none d-md-table-cell text-muted">
                        {{ p.est }}
                      </td>
                      <td>
                        <div class="progress-bar-wrap">
                          <div
                            class="progress-fill"
                            :class="'fill-' + p.color"
                            :style="{ width: p.progress + '%' }"
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

export default {
  name: "ProjectDetailPage",
  components: { SidebarNav },
  props: {
    project: {
      type: Object,
      required: true,
    },
    companies: { type: Array, default: () => [] },
    selectedCompany: { type: String, default: '' },
  },
  emits: ["back", "logout", "view-drawing", "edit-profile", "select-company", "add-company", "update-companies"],
  data() {
    return {
      drawings: [
        {
          no: "0",
          partName: "Mini house for water",
          assembly: "-",
          weight: "1542,5 kg",
          qty: 1,
        },
        {
          no: "1",
          partName: "Frame",
          assembly: "Mini house for water",
          weight: "342,5 kg",
          qty: 1,
        },
        {
          no: "1.1",
          partName: "Leg",
          assembly: "Frame",
          weight: "50,0 kg",
          qty: 4,
        },
        {
          no: "1.2",
          partName: "Horizontal frame pipe",
          assembly: "Frame",
          weight: "50,0 kg",
          qty: 4,
        },
        {
          no: "2",
          partName: "Frame side",
          assembly: "Mini house for water",
          weight: "400,0 kg",
          qty: 2,
        },
        {
          no: "2.1",
          partName: "Side vertical",
          assembly: "Frame side",
          weight: "25,0 kg",
          qty: 2,
        },
        {
          no: "2.2",
          partName: "Side horizontal",
          assembly: "Frame side",
          weight: "50,0 kg",
          qty: 4,
        },
        {
          no: "3",
          partName: "Roof",
          assembly: "Mini house for water",
          weight: "200,0 kg",
          qty: 2,
        },
      ],
      productionPlan: [
        {
          drawingNo: "1",
          operation: "Pipe cutting",
          worksOn: "Elvis Elvisić",
          est: "Done",
          progress: 100,
          color: "green",
        },
        {
          drawingNo: "1",
          operation: "Sheet cutting",
          worksOn: "Tomislav Tomić",
          est: "Done",
          progress: 100,
          color: "green",
        },
        {
          drawingNo: "1",
          operation: "Drilling",
          worksOn: "Elvis Elvisić",
          est: "Done",
          progress: 100,
          color: "green",
        },
        {
          drawingNo: "1",
          operation: "Bending",
          worksOn: "Marko Marković",
          est: "Done",
          progress: 100,
          color: "green",
        },
        {
          drawingNo: "1",
          operation: "Assembly",
          worksOn: "Marko Marković",
          est: "10.01.2026. 13:30",
          progress: 50,
          color: "yellow",
        },
        {
          drawingNo: "1",
          operation: "Welding",
          worksOn: "Tomislav Tomić",
          est: "10.01.2026. 14:40",
          progress: 45,
          color: "yellow",
        },
        {
          drawingNo: "1",
          operation: "Grinding",
          worksOn: "Elvis Elvisić",
          est: "10.01.2026. 16:00",
          progress: 30,
          color: "blue",
        },
        {
          drawingNo: "2",
          operation: "Assembly",
          worksOn: "Marko Marković",
          est: "-",
          progress: 20,
          color: "yellow",
        },
        {
          drawingNo: "2",
          operation: "Welding",
          worksOn: "Tomislav Tomić",
          est: "-",
          progress: 10,
          color: "red",
        },
        {
          drawingNo: "2",
          operation: "Grinding",
          worksOn: "Elvis Elvisić",
          est: "-",
          progress: 5,
          color: "red",
        },
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
</style>
