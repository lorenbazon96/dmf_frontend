<template>
  <LoginPage v-if="currentView === 'login'" @login="handleLogin" @guest="loggedInUser = null; currentView = 'dashboard'" @forgot-password="currentView = 'forgot-password'" />
  <ForgotPasswordPage v-else-if="currentView === 'forgot-password'" @back="currentView = 'login'" />
  <DashboardPage
    v-else-if="currentView === 'dashboard'"
    :companies="companies"
    :selected-company="selectedCompany"
    :user-name="loggedInUser?.fullName || ''"
    @logout="loggedInUser = null; currentView = 'login'"
    @view-project="openProject"
    @create-project="currentView = 'create-project'"
    @analytics="currentView = 'analytics'"
    @workers-clients="currentView = 'workers-clients'"
    @warehouse="currentView = 'warehouse'"
    @production-history="currentView = 'production-history'"
    @edit-profile="currentView = 'profile-edit'"
    @select-company="selectCompany"
    @add-company="addCompany"
    @update-companies="updateCompanies"
  />
  <ProjectDetailPage
    v-else-if="currentView === 'project'"
    :project="selectedProject"
    :companies="companies"
    :selected-company="selectedCompany"
    :user-name="loggedInUser?.fullName || ''"
    @back="currentView = 'dashboard'"
    @logout="loggedInUser = null; currentView = 'login'"
    @view-drawing="openDrawing"
    @edit-project="editProject"
    @edit-profile="currentView = 'profile-edit'"
    @select-company="selectCompany"
    @add-company="addCompany"
    @update-companies="updateCompanies"
  />
  <DrawingDetailPage
    v-else-if="currentView === 'drawing'"
    :project="selectedProject"
    :drawing="selectedDrawing"
    :companies="companies"
    :selected-company="selectedCompany"
    :user-name="loggedInUser?.fullName || ''"
    @back="currentView = 'project'"
    @home="currentView = 'dashboard'"
    @logout="loggedInUser = null; currentView = 'login'"
    @edit-profile="currentView = 'profile-edit'"
    @select-company="selectCompany"
    @add-company="addCompany"
    @update-companies="updateCompanies"
  />
  <CreateProjectPage
    v-else-if="currentView === 'create-project'"
    :companies="companies"
    :selected-company="selectedCompany"
    :user-name="loggedInUser?.fullName || ''"
    :edit-project="editingProject"
    @back="editingProject = null; currentView = 'dashboard'"
    @logout="loggedInUser = null; currentView = 'login'"
    @edit-profile="currentView = 'profile-edit'"
    @select-company="selectCompany"
    @add-company="addCompany"
    @update-companies="updateCompanies"
  />
  <AnalyticsPage
    v-else-if="currentView === 'analytics'"
    :companies="companies"
    :selected-company="selectedCompany"
    :user-name="loggedInUser?.fullName || ''"
    @back="currentView = 'dashboard'"
    @logout="loggedInUser = null; currentView = 'login'"
    @edit-profile="currentView = 'profile-edit'"
    @select-company="selectCompany"
    @add-company="addCompany"
    @update-companies="updateCompanies"
  />
  <WorkersClientsPage
    v-else-if="currentView === 'workers-clients'"
    :companies="companies"
    :selected-company="selectedCompany"
    :user-name="loggedInUser?.fullName || ''"
    @back="currentView = 'dashboard'"
    @logout="loggedInUser = null; currentView = 'login'"
    @view-worker="openWorker"
    @view-client="openClient"
    @add-worker="openWorker({ fullName: '', contact: '', email: '', createdAt: '' })"
    @add-client="openClient({ clientName: '', country: '', adressa: '' })"
    @edit-profile="currentView = 'profile-edit'"
    @select-company="selectCompany"
    @add-company="addCompany"
    @update-companies="updateCompanies"
  />
  <WorkerDetailPage
    v-else-if="currentView === 'worker-detail'"
    :worker="selectedWorker"
    :companies="companies"
    :selected-company="selectedCompany"
    :user-name="loggedInUser?.fullName || ''"
    @back="currentView = 'workers-clients'"
    @home="currentView = 'dashboard'"
    @logout="loggedInUser = null; currentView = 'login'"
    @edit-profile="currentView = 'profile-edit'"
    @select-company="selectCompany"
    @add-company="addCompany"
    @update-companies="updateCompanies"
  />
  <WarehousePage
    v-else-if="currentView === 'warehouse'"
    :companies="companies"
    :selected-company="selectedCompany"
    :user-name="loggedInUser?.fullName || ''"
    @back="currentView = 'dashboard'"
    @logout="loggedInUser = null; currentView = 'login'"
    @add-item="currentView = 'warehouse-add-item'"
    @edit-profile="currentView = 'profile-edit'"
    @select-company="selectCompany"
    @add-company="addCompany"
    @update-companies="updateCompanies"
  />
  <WarehouseAddItemPage
    v-else-if="currentView === 'warehouse-add-item'"
    :companies="companies"
    :selected-company="selectedCompany"
    :user-name="loggedInUser?.fullName || ''"
    @back="currentView = 'warehouse'"
    @home="currentView = 'dashboard'"
    @logout="loggedInUser = null; currentView = 'login'"
    @edit-profile="currentView = 'profile-edit'"
    @select-company="selectCompany"
    @add-company="addCompany"
    @update-companies="updateCompanies"
  />
  <ProductionHistoryPage
    v-else-if="currentView === 'production-history'"
    :companies="companies"
    :selected-company="selectedCompany"
    :user-name="loggedInUser?.fullName || ''"
    @back="currentView = 'dashboard'"
    @logout="loggedInUser = null; currentView = 'login'"
    @view-project="openHistoryProject"
    @edit-profile="currentView = 'profile-edit'"
    @select-company="selectCompany"
    @add-company="addCompany"
    @update-companies="updateCompanies"
  />
  <ProjectDetailPage
    v-else-if="currentView === 'history-project'"
    :project="selectedHistoryProject"
    :companies="companies"
    :selected-company="selectedCompany"
    :user-name="loggedInUser?.fullName || ''"
    @back="currentView = 'production-history'"
    @logout="loggedInUser = null; currentView = 'login'"
    @view-drawing="openDrawing"
    @edit-project="editProject"
    @edit-profile="currentView = 'profile-edit'"
    @select-company="selectCompany"
    @add-company="addCompany"
    @update-companies="updateCompanies"
  />
  <ClientDetailPage
    v-else-if="currentView === 'client-detail'"
    :client="selectedClient"
    :companies="companies"
    :selected-company="selectedCompany"
    :user-name="loggedInUser?.fullName || ''"
    @back="currentView = 'workers-clients'"
    @home="currentView = 'dashboard'"
    @logout="loggedInUser = null; currentView = 'login'"
    @edit-profile="currentView = 'profile-edit'"
    @select-company="selectCompany"
    @add-company="addCompany"
    @update-companies="updateCompanies"
  />
  <ProfileEditPage
    v-else-if="currentView === 'profile-edit'"
    :companies="companies"
    :selected-company="selectedCompany"
    :user-name="loggedInUser?.fullName || ''"
    :user-id="loggedInUser?._id || ''"
    :user-email="loggedInUser?.email || ''"
    @back="currentView = 'dashboard'"
    @logout="loggedInUser = null; currentView = 'login'"
    @select-company="selectCompany"
    @add-company="addCompany"
    @update-companies="updateCompanies"
  />
</template>

<script>
import LoginPage from './components/LoginPage.vue'
import ForgotPasswordPage from './components/ForgotPasswordPage.vue'
import DashboardPage from './components/DashboardPage.vue'
import ProjectDetailPage from './components/ProjectDetailPage.vue'
import DrawingDetailPage from './components/DrawingDetailPage.vue'
import CreateProjectPage from './components/CreateProjectPage.vue'
import AnalyticsPage from './components/AnalyticsPage.vue'
import WorkersClientsPage from './components/WorkersClientsPage.vue'
import WorkerDetailPage from './components/WorkerDetailPage.vue'
import ClientDetailPage from './components/ClientDetailPage.vue'
import WarehousePage from './components/WarehousePage.vue'
import WarehouseAddItemPage from './components/WarehouseAddItemPage.vue'
import ProductionHistoryPage from './components/ProductionHistoryPage.vue'
import ProfileEditPage from './components/ProfileEditPage.vue'
import api from './api'

export default {
  name: 'App',
  components: { LoginPage, ForgotPasswordPage, DashboardPage, ProjectDetailPage, DrawingDetailPage, CreateProjectPage, AnalyticsPage, WorkersClientsPage, WorkerDetailPage, ClientDetailPage, WarehousePage, WarehouseAddItemPage, ProductionHistoryPage, ProfileEditPage },
  data() {
    return {
      currentView: 'login',
      selectedProject: null,
      selectedDrawing: null,
      selectedWorker: null,
      selectedClient: null,
      selectedHistoryProject: null,
      editingProject: null,
      companies: [],
      companyObjects: [],
      selectedCompany: '',
      loggedInUser: null,
    }
  },
  async created() {
    await this.fetchCompanies()
  },
  methods: {
    handleLogin(user) {
      this.loggedInUser = user
      this.currentView = 'dashboard'
    },
    async fetchCompanies() {
      const { data } = await api.get('/companies')
      this.companyObjects = data
      this.companies = data.map(c => c.name)
      if (this.companies.length && !this.companies.includes(this.selectedCompany)) {
        this.selectedCompany = this.companies[0]
      }
    },
    openHistoryProject(project) {
      this.selectedHistoryProject = project
      this.currentView = 'history-project'
    },
    openProject(project) {
      this.selectedProject = project
      this.currentView = 'project'
    },
    editProject(project) {
      this.editingProject = project
      this.currentView = 'create-project'
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
    selectCompany(company) {
      this.selectedCompany = company
    },
    async addCompany() {
      const n = this.companies.length + 1
      try {
        await api.post('/companies', { name: 'New Factory ' + n })
        await this.fetchCompanies()
      } catch (err) {
        console.error('Failed to add company:', err)
      }
    },
    async updateCompanies() {
      await this.fetchCompanies()
    },
  },
}
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body, #app {
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.dashboard-layout {
  height: 100vh !important;
  max-height: 100vh !important;
  overflow: hidden !important;
}
.dashboard-layout > *:first-child {
  height: 100vh;
  overflow-y: auto;
  flex-shrink: 0;
}
.dashboard-layout > .main-content {
  height: 100vh;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.dashboard-layout > .main-content > .content-wrap {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
</style>
