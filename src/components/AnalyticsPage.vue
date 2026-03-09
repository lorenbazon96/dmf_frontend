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
                <h5 class="panel-heading">{{ $t("analytics.title") }}</h5>

                <div class="stat-line">
                  <span class="stat-label">{{ $t("analytics.projects") }}</span>
                  <span class="stat-value text-primary">{{ statsProjects }}</span>
                </div>
                <div class="stat-line">
                  <span class="stat-label">{{
                    $t("analytics.completed")
                  }}</span>
                  <span class="stat-value text-primary">{{ statsCompleted }}</span>
                </div>
                <div class="stat-line">
                  <span class="stat-label">{{
                    $t("analytics.avgDuration")
                  }}</span>
                  <span class="stat-value text-primary">{{ statsAvgDuration }}</span>
                </div>
                <div class="stat-line">
                  <span class="stat-label">{{ $t("analytics.accuracy") }}</span>
                  <span class="stat-value text-primary">{{ statsAccuracy }}</span>
                </div>

                <div v-if="showBottleneck" class="mt-3">
                  <span class="stat-label"
                    >{{ $t("analytics.bottleneck") }}:</span
                  >
                  <div
                    class="bottleneck-alert mt-1 d-flex align-items-start gap-2"
                  >
                    <span class="bottleneck-icon">&#9888;</span>
                    <span class="bottleneck-text">{{
                      $t("analytics.bottleneckMsg")
                    }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="d-flex flex-column gap-2">
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
                <div class="analytics-tabs mb-3">
                  <button
                    class="tab-btn"
                    :class="{ active: activeTab === 'general' }"
                    @click="activeTab = 'general'"
                  >
                    {{ $t("analytics.general") }}
                  </button>
                  <button
                    class="tab-btn"
                    :class="{ active: activeTab === 'workers' }"
                    @click="activeTab = 'workers'"
                  >
                    {{ $t("analytics.workers") }}
                  </button>
                </div>

                <!-- General Tab -->
                <div v-if="activeTab === 'general'">
                  <div class="row g-3">
                    <!-- Pie chart -->
                    <div class="col-lg-6">
                      <h6 class="chart-title">
                        {{ $t("analytics.timeByOperation") }}
                      </h6>
                      <div class="chart-wrap">
                        <PieChart :data="pieData" :options="pieOptions" />
                      </div>
                    </div>

                    <div class="col-lg-6">
                      <h6 class="chart-title">
                        {{ $t("analytics.projectsTrend") }}
                      </h6>
                      <div class="chart-wrap-sm">
                        <LineChart :data="lineData" :options="lineOptions" />
                      </div>
                      <h6 class="chart-title mt-3">
                        {{ $t("analytics.estimatedVsReal") }}
                      </h6>
                      <div class="chart-wrap-sm">
                        <BarChart :data="estVsRealData" :options="barOptions" />
                      </div>
                    </div>
                  </div>

                  <div class="mt-3">
                    <h6 class="chart-title">{{ $t("analytics.insights") }}</h6>
                    <ul class="insights-list">
                      <li>&#10003; {{ $t("analytics.insight1") }}</li>
                      <li>&#10003; {{ $t("analytics.insight2") }}</li>
                      <li>&#10003; {{ $t("analytics.insight3") }}</li>
                    </ul>
                  </div>
                </div>

                <div v-if="activeTab === 'workers'">
                  <div class="row g-3">
                    <div class="col-lg-7">
                      <h6 class="chart-title">
                        {{ $t("analytics.workerComparison") }}
                      </h6>
                      <div class="chart-wrap">
                        <BarChart
                          :data="workerBarData"
                          :options="workerBarOptions"
                        />
                      </div>
                    </div>

                    <div class="col-lg-5">
                      <h6 class="chart-title">
                        {{ $t("analytics.insights") }}
                      </h6>
                      <div class="worker-insights">
                        <div
                          class="insight-block"
                          v-for="op in operationInsights"
                          :key="op.name"
                        >
                          <strong>{{ op.name }}</strong>
                          <div class="small">&#10003; Best: {{ op.best }}</div>
                          <div class="small">&#9888; Worst: {{ op.worst }}</div>
                          <div class="small text-muted">Avg: {{ op.avg }}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h6 class="chart-title mt-4">
                    {{ $t("analytics.workersPerformance") }}
                  </h6>
                  <div class="table-responsive">
                    <table class="table align-middle mb-0">
                      <thead>
                        <tr>
                          <th>{{ $t("dashboard.name") }}</th>
                          <th>{{ $t("analytics.value") }}</th>
                          <th>{{ $t("analytics.tasks") }}</th>
                          <th>{{ $t("analytics.avgTime") }}</th>
                          <th>{{ $t("analytics.efficiency") }}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="w in workerPerformance" :key="w.name">
                          <td class="fw-semibold">{{ w.name }}</td>
                          <td>{{ w.value }}</td>
                          <td>{{ w.tasks }}</td>
                          <td>{{ w.avgTime }}</td>
                          <td>{{ w.efficiency }}</td>
                        </tr>
                      </tbody>
                    </table>
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
import { Pie, Line, Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
);

export default {
  name: "AnalyticsPage",
  components: {
    SidebarNav,
    PieChart: Pie,
    LineChart: Line,
    BarChart: Bar,
  },
  props: {
    companies: { type: Array, default: () => [] },
    selectedCompany: { type: String, default: '' },
  },
  emits: ["back", "logout", "edit-profile", "select-company", "add-company", "update-companies"],
  data() {
    return {
      activeTab: "general",
      pieOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: { font: { size: 10 }, boxWidth: 12 },
          },
        },
      },
      lineOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: { font: { size: 10 }, boxWidth: 12 },
          },
        },
        scales: {
          y: { beginAtZero: false, ticks: { font: { size: 10 } } },
          x: { ticks: { font: { size: 10 } } },
        },
      },
      barOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: { font: { size: 10 }, boxWidth: 12 },
          },
        },
        scales: {
          y: { beginAtZero: true, ticks: { font: { size: 10 } } },
          x: { ticks: { font: { size: 10 } } },
        },
      },
      workerBarOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: { font: { size: 10 }, boxWidth: 12 },
          },
        },
        scales: {
          y: { beginAtZero: true, ticks: { font: { size: 10 } } },
          x: { ticks: { font: { size: 9 }, maxRotation: 45 } },
        },
      },
      allCompanyData: {
        "Company 1": {
          projects: 8, completed: 6, avgDuration: "5h 45m", accuracy: "89%",
          bottleneck: true,
          pie: [20, 15, 30, 15, 20],
          line: [5, 7, 8, 10, 12],
          est: [280, 300, 250, 350], real: [260, 310, 270, 330],
          workers: [
            { name: "Marko", value: 115, tasks: 25, avgTime: "60 min", efficiency: "115%" },
            { name: "Tomislav", value: 120, tasks: 22, avgTime: "58 min", efficiency: "120%" },
          ],
          workerEff: { labels: ["Marko", "Tomislav"], data: [115, 120] },
          insights: [
            { name: "WELDING", best: "Tomislav (+20%)", worst: "Marko (-5%)", avg: "107%" },
            { name: "CUTTING", best: "Marko (+10%)", worst: "Tomislav (-3%)", avg: "103%" },
          ],
        },
        "Company 2": {
          projects: 6, completed: 4, avgDuration: "6h 10m", accuracy: "85%",
          bottleneck: false,
          pie: [25, 10, 25, 20, 20],
          line: [3, 5, 6, 7, 9],
          est: [200, 260, 310, 290], real: [220, 250, 330, 280],
          workers: [
            { name: "Igor", value: 110, tasks: 20, avgTime: "55 min", efficiency: "110%" },
            { name: "Ivan", value: 90, tasks: 15, avgTime: "45 min", efficiency: "90%" },
          ],
          workerEff: { labels: ["Igor", "Ivan"], data: [110, 90] },
          insights: [
            { name: "WELDING", best: "Igor (+15%)", worst: "Ivan (-10%)", avg: "100%" },
            { name: "DRILLING", best: "Ivan (+5%)", worst: "Igor (-2%)", avg: "98%" },
          ],
        },
        "Company 3": {
          projects: 5, completed: 4, avgDuration: "4h 30m", accuracy: "92%",
          bottleneck: false,
          pie: [15, 20, 25, 25, 15],
          line: [2, 4, 5, 6, 8],
          est: [180, 220, 200, 260], real: [170, 230, 195, 250],
          workers: [
            { name: "Josip", value: 115, tasks: 22, avgTime: "58 min", efficiency: "115%" },
            { name: "Mate", value: 105, tasks: 18, avgTime: "53 min", efficiency: "105%" },
          ],
          workerEff: { labels: ["Josip", "Mate"], data: [115, 105] },
          insights: [
            { name: "GRINDING", best: "Josip (+12%)", worst: "Mate (-8%)", avg: "102%" },
            { name: "ASSEMBLY", best: "Mate (+6%)", worst: "Josip (-3%)", avg: "101%" },
          ],
        },
        "Company 4": {
          projects: 5, completed: 4, avgDuration: "5h 00m", accuracy: "88%",
          bottleneck: true,
          pie: [30, 10, 20, 15, 25],
          line: [4, 3, 6, 8, 7],
          est: [300, 250, 280, 320], real: [310, 240, 300, 310],
          workers: [
            { name: "Petar", value: 102, tasks: 16, avgTime: "51 min", efficiency: "102%" },
            { name: "Filip", value: 100, tasks: 12, avgTime: "50 min", efficiency: "100%" },
            { name: "Luka", value: 95, tasks: 14, avgTime: "48 min", efficiency: "95%" },
          ],
          workerEff: { labels: ["Petar", "Filip", "Luka"], data: [102, 100, 95] },
          insights: [
            { name: "WELDING", best: "Petar (+8%)", worst: "Luka (-15%)", avg: "95%" },
            { name: "CUTTING", best: "Filip (+4%)", worst: "Petar (-2%)", avg: "101%" },
          ],
        },
      },
    };
  },
  computed: {
    cd() {
      return this.allCompanyData[this.selectedCompany] || this.allCompanyData["Company 1"];
    },
    statsProjects() { return this.cd.projects; },
    statsCompleted() { return this.cd.completed; },
    statsAvgDuration() { return this.cd.avgDuration; },
    statsAccuracy() { return this.cd.accuracy; },
    showBottleneck() { return this.cd.bottleneck; },
    pieData() {
      return {
        labels: ["Cutting", "Drilling", "Welding", "Grinding", "Assembly"],
        datasets: [{ data: this.cd.pie, backgroundColor: ["#42a5f5", "#ec407a", "#ffa726", "#ffee58", "#66bb6a"], borderWidth: 0 }],
      };
    },
    lineData() {
      return {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [{ label: "Projects", data: this.cd.line, borderColor: "#42a5f5", backgroundColor: "rgba(66,165,245,0.1)", fill: true, tension: 0.3, pointRadius: 4, pointBackgroundColor: "#42a5f5" }],
      };
    },
    estVsRealData() {
      return {
        labels: ["P1", "P2", "P3", "P4"],
        datasets: [
          { label: "Estimated", data: this.cd.est, backgroundColor: "#90caf9" },
          { label: "Real", data: this.cd.real, backgroundColor: "#f48fb1" },
        ],
      };
    },
    workerBarData() {
      return {
        labels: this.cd.workerEff.labels,
        datasets: [{ label: "Efficiency %", data: this.cd.workerEff.data, backgroundColor: "#90caf9" }],
      };
    },
    operationInsights() { return this.cd.insights; },
    workerPerformance() { return this.cd.workers; },
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

.stat-line {
  margin-bottom: 0.3rem;
}
.stat-label {
  font-size: 0.82rem;
  font-weight: 700;
  color: #1a1a1a;
  display: block;
}
.stat-value {
  font-size: 0.9rem;
  font-weight: 700;
}
.text-primary {
  color: #2b579a !important;
}

.bottleneck-alert {
  background: #fff3cd;
  padding: 0.4rem 0.5rem;
  border-radius: 4px;
  border: 1px solid #ffc107;
}
.bottleneck-icon {
  color: #e65100;
  font-size: 1rem;
  flex-shrink: 0;
}
.bottleneck-text {
  font-size: 0.78rem;
  color: #6d4c00;
}

.analytics-tabs {
  display: flex;
  border-bottom: 2px solid #dcdcdc;
}
.tab-btn {
  background: none;
  border: none;
  padding: 0.5rem 1.5rem;
  font-size: 0.88rem;
  font-weight: 600;
  color: #666;
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
  cursor: pointer;
  transition: all 0.15s;
}
.tab-btn.active {
  color: #2b579a;
  border-bottom-color: #2b579a;
}
.tab-btn:hover {
  color: #2b579a;
}

.chart-title {
  font-size: 0.82rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.4rem;
}
.chart-wrap {
  height: 260px;
  position: relative;
}
.chart-wrap-sm {
  height: 160px;
  position: relative;
}

.insights-list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.82rem;
  color: #333;
}
.insights-list li {
  margin-bottom: 0.25rem;
}

.worker-insights {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.insight-block {
  font-size: 0.8rem;
  color: #333;
}
.insight-block strong {
  font-size: 0.82rem;
  display: block;
  margin-bottom: 0.1rem;
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
}
.table tbody td {
  padding: 0.4rem 0.7rem;
  border-bottom: 1px solid #e5e5e5;
  color: #444;
}
.table tbody tr:last-child td {
  border-bottom: none;
}
.table tbody tr:hover {
  background: rgba(0, 0, 0, 0.02);
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

@media (max-width: 767.98px) {
  .btn-action {
    padding: 0.65rem 0.9rem;
    font-size: 0.85rem;
  }
  .chart-wrap {
    height: 200px;
  }
  .chart-wrap-sm {
    height: 140px;
  }
  .tab-btn {
    padding: 0.4rem 1rem;
    font-size: 0.82rem;
  }
}
@media (max-width: 575.98px) {
  .content-wrap {
    padding: 0.75rem !important;
  }
}
</style>
