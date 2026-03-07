<template>
  <LoginPage v-if="currentView === 'login'" @guest="currentView = 'dashboard'" />
  <DashboardPage
    v-else-if="currentView === 'dashboard'"
    @logout="currentView = 'login'"
    @view-project="openProject"
    @create-project="currentView = 'create-project'"
    @analytics="currentView = 'analytics'"
    @workers-clients="currentView = 'workers-clients'"
  />
  <ProjectDetailPage
    v-else-if="currentView === 'project'"
    :project="selectedProject"
    @back="currentView = 'dashboard'"
    @logout="currentView = 'login'"
    @view-drawing="openDrawing"
  />
  <DrawingDetailPage
    v-else-if="currentView === 'drawing'"
    :project="selectedProject"
    :drawing="selectedDrawing"
    @back="currentView = 'project'"
    @home="currentView = 'dashboard'"
    @logout="currentView = 'login'"
  />
  <CreateProjectPage
    v-else-if="currentView === 'create-project'"
    @back="currentView = 'dashboard'"
    @logout="currentView = 'login'"
  />
  <AnalyticsPage
    v-else-if="currentView === 'analytics'"
    @back="currentView = 'dashboard'"
    @logout="currentView = 'login'"
  />
  <WorkersClientsPage
    v-else-if="currentView === 'workers-clients'"
    @back="currentView = 'dashboard'"
    @logout="currentView = 'login'"
    @view-worker="openWorker"
    @view-client="openClient"
    @add-worker="openWorker({ fullName: '', contact: '', email: '', createdAt: '' })"
    @add-client="openClient({ clientName: '', country: '', adressa: '' })"
  />
  <WorkerDetailPage
    v-else-if="currentView === 'worker-detail'"
    :worker="selectedWorker"
    @back="currentView = 'workers-clients'"
    @home="currentView = 'dashboard'"
    @logout="currentView = 'login'"
  />
  <ClientDetailPage
    v-else-if="currentView === 'client-detail'"
    :client="selectedClient"
    @back="currentView = 'workers-clients'"
    @home="currentView = 'dashboard'"
    @logout="currentView = 'login'"
  />
</template>

<script>
import LoginPage from './components/LoginPage.vue'
import DashboardPage from './components/DashboardPage.vue'
import ProjectDetailPage from './components/ProjectDetailPage.vue'
import DrawingDetailPage from './components/DrawingDetailPage.vue'
import CreateProjectPage from './components/CreateProjectPage.vue'
import AnalyticsPage from './components/AnalyticsPage.vue'
import WorkersClientsPage from './components/WorkersClientsPage.vue'
import WorkerDetailPage from './components/WorkerDetailPage.vue'
import ClientDetailPage from './components/ClientDetailPage.vue'

export default {
  name: 'App',
  components: { LoginPage, DashboardPage, ProjectDetailPage, DrawingDetailPage, CreateProjectPage, AnalyticsPage, WorkersClientsPage, WorkerDetailPage, ClientDetailPage },
  data() {
    return {
      currentView: 'login',
      selectedProject: null,
      selectedDrawing: null,
      selectedWorker: null,
      selectedClient: null,
    }
  },
  methods: {
    openProject(project) {
      this.selectedProject = project
      this.currentView = 'project'
    },
    openDrawing(drawing) {
      this.selectedDrawing = drawing
      this.currentView = 'drawing'
    },
    openWorker(worker) {
      this.selectedWorker = worker
      this.currentView = 'worker-detail'
    },
    openClient(client) {
      this.selectedClient = client
      this.currentView = 'client-detail'
    },
  },
}
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
