<template>
  <div class="dashboard-layout d-flex min-vh-100">
    <div
      class="mobile-topbar d-lg-none d-flex align-items-center justify-content-between px-3"
    >
      <img src="@/assets/logo-dmf.png" alt="DMF" class="mobile-logo" />
      <button class="btn btn-sm text-white" @click="sidebarOpen = !sidebarOpen">
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path
            d="M2.5 12a.5.5 0 01.5-.5h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5m0-4a.5.5 0 01.5-.5h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5m0-4a.5.5 0 01.5-.5h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5"
          />
        </svg>
      </button>
    </div>

    <div
      v-if="sidebarOpen"
      class="sidebar-overlay d-lg-none"
      @click="sidebarOpen = false"
    ></div>

    <aside class="sidebar d-flex flex-column" :class="{ open: sidebarOpen }">
      <div
        class="sidebar-logo-wrap px-3 pt-3 pb-2 d-none d-lg-block text-center"
      >
        <img
          src="@/assets/logo-dmf.png"
          alt="DMF Production"
          class="sidebar-logo"
        />
      </div>

      <div
        class="sidebar-user px-3 py-2 mt-2 d-flex align-items-center justify-content-between"
      >
        <div class="d-flex align-items-center gap-2">
          <svg
            class="user-icon"
            width="18"
            height="18"
            viewBox="0 0 16 16"
            fill="#c5d0dc"
          >
            <path
              d="M8 8a3 3 0 100-6 3 3 0 000 6m2-3a2 2 0 11-4 0 2 2 0 014 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"
            />
          </svg>
          <span class="text-white small fw-medium">Johnny Doe</span>
        </div>
        <svg
          class="settings-icon"
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="#6b7d93"
        >
          <path
            d="M11.534 7h3.932a.25.25 0 01.192.41l-1.966 2.36a.25.25 0 01-.384 0l-1.966-2.36a.25.25 0 01.192-.41m-11 2h3.932a.25.25 0 00.192-.41L2.692 6.23a.25.25 0 00-.384 0L.342 8.59A.25.25 0 00.534 9"
          />
          <path
            fill-rule="evenodd"
            d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 11-.771-.636A6.002 6.002 0 0113.917 7H12.9A5 5 0 008 3M3.1 9a5.002 5.002 0 008.757 2.182.5.5 0 11.771.636A6.002 6.002 0 012.083 9z"
          />
        </svg>
      </div>

      <div class="sidebar-stats px-3 mt-1">
        <div class="stat-item d-flex align-items-center gap-2 py-1">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="#6b7d93">
            <path
              d="M5 4a.5.5 0 000 1h6a.5.5 0 000-1zm-1.5-.5A1.5 1.5 0 015 2h6a1.5 1.5 0 011.5 1.5v1A1.5 1.5 0 0111 6H5a1.5 1.5 0 01-1.5-1.5zm-2 5A1.5 1.5 0 013 7h10a1.5 1.5 0 011.5 1.5v1A1.5 1.5 0 0113 11H3a1.5 1.5 0 01-1.5-1.5zm0 5A1.5 1.5 0 013 12h10a1.5 1.5 0 011.5 1.5v1A1.5 1.5 0 0113 16H3a1.5 1.5 0 01-1.5-1.5z"
            />
          </svg>
          <span class="stat-text">{{
            $t("dashboard.projects", { n: 4 })
          }}</span>
        </div>
        <div class="stat-item d-flex align-items-center gap-2 py-1">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="#6b7d93">
            <path
              d="M8 15A7 7 0 118 1a7 7 0 010 14m0 1A8 8 0 108 0a8 8 0 000 16"
            />
            <path
              d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3.5a.5.5 0 01-.5-.5v-3.5A.5.5 0 018 4"
            />
          </svg>
          <span class="stat-text">66%</span>
        </div>
        <div class="stat-item d-flex align-items-center gap-2 py-1">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="#6b7d93">
            <path
              d="M3.5 0a.5.5 0 01.5.5V1h8V.5a.5.5 0 011 0V1h1a2 2 0 012 2v11a2 2 0 01-2 2H2a2 2 0 01-2-2V3a2 2 0 012-2h1V.5a.5.5 0 01.5-.5M2 2a1 1 0 00-1 1v1h14V3a1 1 0 00-1-1zm13 3H1v9a1 1 0 001 1h12a1 1 0 001-1z"
            />
          </svg>
          <span class="stat-text">{{
            $t("dashboard.forToday", { n: 3 })
          }}</span>
        </div>
      </div>

      <hr class="sidebar-hr mx-3 my-2" />

      <nav class="sidebar-nav flex-grow-1 px-3">
        <div
          class="nav-header d-flex align-items-center justify-content-between py-1"
          @click="prodOpen = !prodOpen"
        >
          <span class="nav-header-text">{{ $t("dashboard.productions") }}</span>
          <svg
            :class="{ rotated: prodOpen }"
            class="chevron-icon"
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="#6b7d93"
          >
            <path
              d="M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z"
            />
          </svg>
        </div>
        <ul v-show="prodOpen" class="list-unstyled mt-1 mb-0">
          <li
            v-for="c in companies"
            :key="c"
            class="company-item d-flex align-items-center justify-content-between"
          >
            <div class="d-flex align-items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="#6b7d93">
                <path
                  d="M14.763.075A.5.5 0 0115 .5v15a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5V14h-1v1.5a.5.5 0 01-.5.5h-9a.5.5 0 01-.5-.5V10a.5.5 0 01.342-.474L6 7.64V4.5a.5.5 0 01.276-.447l8-4a.5.5 0 01.487.022M6 8.694L1 10.36V15h9V10.36zM7 15h2v-1.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5V15h2V1.309l-7 3.5z"
                />
              </svg>
              <span class="company-name">{{ c }}</span>
            </div>
            <svg
              class="edit-icon"
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="#4a5c6e"
            >
              <path
                d="M12.146.146a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-10 10a.5.5 0 01-.168.11l-5 2a.5.5 0 01-.65-.65l2-5a.5.5 0 01.11-.168zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 01.5.5v.5h.5a.5.5 0 01.5.5v.5h.293z"
              />
            </svg>
          </li>
          <li
            class="company-item company-add d-flex align-items-center gap-2"
            @click="addCompany"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="#6b7d93">
              <path
                d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4"
              />
            </svg>
            <span>{{ $t("dashboard.newFactory") }}</span>
          </li>
        </ul>
      </nav>

      <div class="sidebar-bottom px-3 py-3 mt-auto">
        <div
          class="logout-item d-flex align-items-center gap-2"
          @click="$emit('logout')"
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="#6b7d93">
            <path
              fill-rule="evenodd"
              d="M10 12.5a.5.5 0 01-.5.5h-8a.5.5 0 01-.5-.5v-9a.5.5 0 01.5-.5h8a.5.5 0 01.5.5v2a.5.5 0 001 0v-2A1.5 1.5 0 009.5 2h-8A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h8a1.5 1.5 0 001.5-1.5v-2a.5.5 0 00-1 0z"
            />
            <path
              fill-rule="evenodd"
              d="M15.854 8.354a.5.5 0 000-.708l-3-3a.5.5 0 00-.708.708L14.293 7.5H5.5a.5.5 0 000 1h8.793l-2.147 2.146a.5.5 0 00.708.708z"
            />
          </svg>
          <span>{{ $t("dashboard.logout") }}</span>
        </div>
      </div>
    </aside>

    <main class="main-content flex-grow-1">
      <div class="content-wrap p-3 p-lg-4">
        <section class="panel mb-4">
          <h5 class="panel-title">{{ $t("dashboard.activeProjects") }}</h5>
          <div class="table-responsive">
            <table class="table align-middle mb-0">
              <thead>
                <tr>
                  <th>RN</th>
                  <th>{{ $t("dashboard.name") }}</th>
                  <th class="d-none d-md-table-cell">
                    {{ $t("dashboard.client") }}
                  </th>
                  <th class="d-none d-sm-table-cell">
                    {{ $t("dashboard.worksOn") }}
                  </th>
                  <th>{{ $t("dashboard.process") }}</th>
                  <th class="d-none d-lg-table-cell">EST</th>
                  <th class="text-end">{{ $t("dashboard.action") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in projects" :key="p.rn">
                  <td class="fw-semibold text-dark">{{ p.rn }}</td>
                  <td>{{ p.name }}</td>
                  <td class="d-none d-md-table-cell text-muted">
                    {{ p.client }}
                  </td>
                  <td class="d-none d-sm-table-cell text-muted">
                    {{ p.worksOn }}
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
                  <td class="d-none d-lg-table-cell text-muted">{{ p.est }}</td>
                  <td class="text-end">
                    <button class="btn btn-sm btn-view">
                      {{ $t("dashboard.view") }}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        class="ms-1"
                      >
                        <path d="M10.5 8a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0" />
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

        <div class="row g-3 g-lg-4">
          <div class="col-lg-4 col-md-4 col-12">
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
                <span>{{ $t("dashboard.analytics") }}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  opacity="0.8"
                >
                  <path
                    d="M4 11H2v3h2zm5-4H7v7h2zm5-5h-2v12h2zm-2-1a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V2a1 1 0 00-1-1zM6 7a1 1 0 011-1h2a1 1 0 011 1v7a1 1 0 01-1 1H7a1 1 0 01-1-1zm-5 4a1 1 0 011-1h2a1 1 0 011 1v3a1 1 0 01-1 1H2a1 1 0 01-1-1z"
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
            </div>
          </div>

          <div class="col-lg-8 col-md-8 col-12">
            <section class="panel">
              <h5 class="panel-title">{{ $t("dashboard.assemblies") }}</h5>
              <div class="table-responsive">
                <table class="table align-middle mb-0">
                  <thead>
                    <tr>
                      <th>RN</th>
                      <th>{{ $t("dashboard.operation") }}</th>
                      <th class="d-none d-sm-table-cell">
                        {{ $t("dashboard.worksOn") }}
                      </th>
                      <th class="d-none d-md-table-cell">EST</th>
                      <th>{{ $t("dashboard.process") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(a, i) in assemblies" :key="i">
                      <td class="fw-semibold text-dark">{{ a.rn }}</td>
                      <td>{{ a.operation }}</td>
                      <td class="d-none d-sm-table-cell text-muted">
                        {{ a.worksOn }}
                      </td>
                      <td class="d-none d-md-table-cell text-muted">
                        {{ a.est }}
                      </td>
                      <td>
                        <div class="progress-bar-wrap">
                          <div
                            class="progress-fill"
                            :class="'fill-' + a.color"
                            :style="{ width: a.progress + '%' }"
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
export default {
  name: "DashboardPage",
  emits: ["logout"],
  data() {
    return {
      sidebarOpen: false,
      prodOpen: true,
      companies: ["Company 1", "Company 2", "Company 3", "Company 4"],
      projects: [
        {
          rn: "RN-12",
          name: "Mini house for water",
          client: "City Montana",
          worksOn: "M. Marković and 2 more",
          progress: 75,
          color: "green",
          est: "10.01.2026. 12:30",
        },
        {
          rn: "RN-15",
          name: "Bridge River Sava",
          client: "Bridge Mont II",
          worksOn: "Ivo Ivić",
          progress: 40,
          color: "blue",
          est: "11.01.2026. 09:00",
        },
        {
          rn: "RN-13",
          name: "Anthen Mobile v2",
          client: "Telekom Com",
          worksOn: "I. Iggy and 2 more",
          progress: 60,
          color: "green",
          est: "10.01.2026. 16:00",
        },
        {
          rn: "RN-16",
          name: "Anthen Mobile v3",
          client: "Telekom Com",
          worksOn: "I. Iggy and 2 more",
          progress: 25,
          color: "yellow",
          est: "-",
        },
      ],
      assemblies: [
        {
          rn: "RN-12",
          operation: "Assembly",
          worksOn: "Marko Marković",
          est: "10.01.2026. 10:30",
          progress: 100,
          color: "green",
        },
        {
          rn: "RN-12",
          operation: "Welding",
          worksOn: "Tomislav Tomić",
          est: "10.01.2026. 11:20",
          progress: 90,
          color: "green",
        },
        {
          rn: "RN-12",
          operation: "Grinding",
          worksOn: "Elvis Elvisić",
          est: "10.01.2026. 12:30",
          progress: 80,
          color: "green",
        },
        {
          rn: "RN-15",
          operation: "Grinding",
          worksOn: "Ivo Ivić",
          est: "11.01.2026. 09:00",
          progress: 70,
          color: "green",
        },
        {
          rn: "RN-13",
          operation: "Assembly",
          worksOn: "Igor Iggy",
          est: "10.01.2026. 13:30",
          progress: 50,
          color: "yellow",
        },
        {
          rn: "RN-13",
          operation: "Welding",
          worksOn: "Jože Jožić",
          est: "10.01.2026. 14:40",
          progress: 45,
          color: "yellow",
        },
        {
          rn: "RN-13",
          operation: "Grinding",
          worksOn: "Mate Matić",
          est: "10.01.2026. 16:00",
          progress: 30,
          color: "blue",
        },
        {
          rn: "RN-16",
          operation: "Assembly",
          worksOn: "Igor Iggy",
          est: "-",
          progress: 20,
          color: "yellow",
        },
        {
          rn: "RN-16",
          operation: "Welding",
          worksOn: "Jože Jožić",
          est: "-",
          progress: 10,
          color: "red",
        },
        {
          rn: "RN-16",
          operation: "Grinding",
          worksOn: "Mate Matić",
          est: "-",
          progress: 5,
          color: "red",
        },
      ],
    };
  },
  methods: {
    addCompany() {
      const n = this.companies.length + 1;
      this.companies.push("New Factory " + n);
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 240px;
  min-width: 240px;
  background: #1c2936;
  color: #b0bec5;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1040;
  transform: translateX(-100%);
  transition: transform 0.25s ease;
  overflow-y: auto;
  font-size: 0.85rem;
}

.sidebar::-webkit-scrollbar {
  width: 4px;
}
.sidebar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

@media (min-width: 992px) {
  .sidebar {
    position: sticky;
    transform: none;
  }
}

.sidebar.open {
  transform: translateX(0);
}

.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1030;
}

.sidebar-logo {
  max-width: 170px;
}

.sidebar-user {
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.user-icon {
  flex-shrink: 0;
}

.settings-icon {
  cursor: pointer;
  transition: fill 0.15s;
}

.settings-icon:hover {
  fill: #fff;
}

.sidebar-stats {
  font-size: 0.82rem;
}
.stat-text {
  color: #b0bec5;
}

.sidebar-hr {
  border-color: rgba(255, 255, 255, 0.08);
}

.nav-header {
  cursor: pointer;
  user-select: none;
  padding: 0.35rem 0;
}

.nav-header-text {
  font-size: 0.82rem;
  font-weight: 600;
  color: #8fa4bf;
}

.chevron-icon {
  transition: transform 0.2s;
}
.chevron-icon.rotated {
  transform: rotate(180deg);
}

.company-item {
  padding: 0.4rem 0.55rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.12s;
  font-size: 0.82rem;
}

.company-item:hover {
  background: rgba(255, 255, 255, 0.06);
}

.company-name {
  color: #c5d0dc;
}

.edit-icon {
  opacity: 0;
  transition: opacity 0.15s;
  cursor: pointer;
}

.company-item:hover .edit-icon {
  opacity: 1;
}

.company-add {
  color: #6b7d93;
}
.company-add:hover {
  color: #b0bec5;
}

.logout-item {
  cursor: pointer;
  padding: 0.4rem 0.3rem;
  border-radius: 5px;
  font-size: 0.82rem;
  transition: background 0.12s;
}

.logout-item:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
}

.mobile-topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #1c2936;
  z-index: 1020;
}

.mobile-logo {
  height: 60px;
}

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

@media (max-width: 767.98px) {
  .btn-action {
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
