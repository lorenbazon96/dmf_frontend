<template>
  <LoginPage v-if="currentView === 'login'" @login="handleLogin" @guest="handleGuest" @forgot-password="currentView = 'forgot-password'" />
  <ForgotPasswordPage v-else-if="currentView === 'forgot-password'" @back="currentView = 'login'" />
  <ResetPasswordPage v-else-if="currentView === 'reset-password'" @back="currentView = 'login'" />
  <DashboardPage
    v-else-if="currentView === 'dashboard'"
    :companies="companies"
    :selected-company="selectedCompany"
    :user-name="displayUserName"
    :company-schedule="selectedCompanyObject"
    @logout="handleLogout"
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
    :user-name="displayUserName"
    :company-schedule="companyScheduleFor(selectedProject?.company)"
    @back="currentView = 'dashboard'"
    @logout="handleLogout"
    @view-drawing="openDrawing($event, selectedProject, 'project')"
    @edit-project="editProject"
    @edit-profile="currentView = 'profile-edit'"
    @select-company="selectCompany"
    @add-company="addCompany"
    @update-companies="updateCompanies"
  />
  <DrawingDetailPage
    v-else-if="currentView === 'drawing'"
    :project="selectedDrawingProject"
    :drawing="selectedDrawing"
    :companies="companies"
    :selected-company="selectedCompany"
    :user-name="displayUserName"
    :company-schedule="companyScheduleFor(selectedDrawingProject?.company)"
    @back="currentView = drawingBackView"
    @home="currentView = 'dashboard'"
    @logout="handleLogout"
    @edit-profile="currentView = 'profile-edit'"
    @select-company="selectCompany"
    @add-company="addCompany"
    @update-companies="updateCompanies"
  />
  <CreateProjectPage
    v-else-if="currentView === 'create-project'"
    :companies="companies"
    :selected-company="selectedCompany"
    :user-name="displayUserName"
    :edit-project="editingProject"
    @back="editingProject = null; currentView = 'dashboard'"
    @logout="handleLogout"
    @edit-profile="currentView = 'profile-edit'"
    @select-company="selectCompany"
    @add-company="addCompany"
    @update-companies="updateCompanies"
  />
  <AnalyticsPage
    v-else-if="currentView === 'analytics'"
    :companies="companies"
    :selected-company="selectedCompany"
    :user-name="displayUserName"
    @back="currentView = 'dashboard'"
    @logout="handleLogout"
    @edit-profile="currentView = 'profile-edit'"
    @select-company="selectCompany"
    @add-company="addCompany"
    @update-companies="updateCompanies"
  />
  <WorkersClientsPage
    v-else-if="currentView === 'workers-clients'"
    :companies="companies"
    :selected-company="selectedCompany"
    :user-name="displayUserName"
    @back="currentView = 'dashboard'"
    @logout="handleLogout"
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
    :user-name="displayUserName"
    @back="currentView = 'workers-clients'"
    @home="currentView = 'dashboard'"
    @logout="handleLogout"
    @edit-profile="currentView = 'profile-edit'"
    @select-company="selectCompany"
    @add-company="addCompany"
    @update-companies="updateCompanies"
  />
  <WarehousePage
    v-else-if="currentView === 'warehouse'"
    :companies="companies"
    :selected-company="selectedCompany"
    :user-name="displayUserName"
    @back="currentView = 'dashboard'"
    @logout="handleLogout"
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
    :user-name="displayUserName"
    @back="currentView = 'warehouse'"
    @home="currentView = 'dashboard'"
    @logout="handleLogout"
    @edit-profile="currentView = 'profile-edit'"
    @select-company="selectCompany"
    @add-company="addCompany"
    @update-companies="updateCompanies"
  />
  <ProductionHistoryPage
    v-else-if="currentView === 'production-history'"
    :companies="companies"
    :selected-company="selectedCompany"
    :user-name="displayUserName"
    @back="currentView = 'dashboard'"
    @logout="handleLogout"
    @view-project="openHistoryProject"
    @duplicate-project="currentView = 'dashboard'"
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
    :user-name="displayUserName"
    :company-schedule="companyScheduleFor(selectedHistoryProject?.company)"
    @back="currentView = 'production-history'"
    @logout="handleLogout"
    @view-drawing="openDrawing($event, selectedHistoryProject, 'history-project')"
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
    :user-name="displayUserName"
    @back="currentView = 'workers-clients'"
    @home="currentView = 'dashboard'"
    @logout="handleLogout"
    @edit-profile="currentView = 'profile-edit'"
    @select-company="selectCompany"
    @add-company="addCompany"
    @update-companies="updateCompanies"
  />
  <ProfileEditPage
    v-else-if="currentView === 'profile-edit'"
    :companies="companies"
    :selected-company="selectedCompany"
    :user-name="displayUserName"
    :user-id="loggedInUser?._id || ''"
    :user-email="loggedInUser?.email || ''"
    @back="currentView = 'dashboard'"
    @logout="handleLogout"
    @select-company="selectCompany"
    @add-company="addCompany"
    @update-companies="updateCompanies"
  />
</template>

<script>
import LoginPage from './components/LoginPage.vue'
import ForgotPasswordPage from './components/ForgotPasswordPage.vue'
import ResetPasswordPage from './components/ResetPasswordPage.vue'
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
  components: { LoginPage, ForgotPasswordPage, ResetPasswordPage, DashboardPage, ProjectDetailPage, DrawingDetailPage, CreateProjectPage, AnalyticsPage, WorkersClientsPage, WorkerDetailPage, ClientDetailPage, WarehousePage, WarehouseAddItemPage, ProductionHistoryPage, ProfileEditPage },
  data() {
    return {
      currentView: 'login',
      selectedProject: null,
      selectedDrawing: null,
      selectedDrawingProject: null,
      drawingBackView: 'project',
      selectedWorker: null,
      selectedClient: null,
      selectedHistoryProject: null,
      editingProject: null,
      companies: [],
      companyObjects: [],
      selectedCompany: '',
      loggedInUser: null,
      isGuest: false,
    }
  },
  provide() {
    return {
      isGuest: () => this.isGuest,
    }
  },
  computed: {
    displayUserName() {
      return this.loggedInUser?.fullName || this.loggedInUser?.email || '';
    },
    selectedCompanyObject() {
      return this.companyObjects.find(c => c.name === this.selectedCompany) || null;
    },
  },
  async created() {
    const saved = localStorage.getItem('dmf_user') || sessionStorage.getItem('dmf_user')
    if (saved) {
      try {
        this.loggedInUser = JSON.parse(saved)
        this.currentView = 'dashboard'
      } catch {
        this.clearStoredAuth()
      }
    } else {
      this.clearStoredAuth()
    }
    const hash = window.location.hash
    if (hash.startsWith('#reset-password')) {
      this.currentView = 'reset-password'
    } else if (this.loggedInUser) {
      await this.fetchCompanies()
    }
  },
  methods: {
    companyScheduleFor(companyName) {
      return this.companyObjects.find(c => c.name === companyName) || this.selectedCompanyObject;
    },
    clearStoredAuth() {
      localStorage.removeItem('dmf_user')
      localStorage.removeItem('dmf_token')
      sessionStorage.removeItem('dmf_user')
      sessionStorage.removeItem('dmf_token')
    },
    handleGuest() {
      this.clearStoredAuth()
      this.loggedInUser = { fullName: 'Guest', email: '' }
      this.isGuest = true
      if (!this.companies.length) {
        this.companies = ['Demo Factory']
        this.selectedCompany = 'Demo Factory'
      }
      this.currentView = 'dashboard'
    },
    handleLogout() {
      this.loggedInUser = null
      this.isGuest = false
      this.clearStoredAuth()
      this.currentView = 'login'
    },
    async handleLogin({ user, token, rememberMe }) {
      if (!user) {
        this.handleLogout()
        return
      }

      this.loggedInUser = user
      this.isGuest = false
      if (rememberMe) {
        localStorage.setItem('dmf_user', JSON.stringify(user))
        if (token) localStorage.setItem('dmf_token', token)
        else localStorage.removeItem('dmf_token')
        sessionStorage.removeItem('dmf_user')
        sessionStorage.removeItem('dmf_token')
      } else {
        localStorage.removeItem('dmf_user')
        localStorage.removeItem('dmf_token')
        sessionStorage.setItem('dmf_user', JSON.stringify(user))
        if (token) sessionStorage.setItem('dmf_token', token)
        else sessionStorage.removeItem('dmf_token')
      }
      this.currentView = 'dashboard'
      await this.fetchCompanies()
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
      if (project?.company) this.selectedCompany = project.company
      this.currentView = 'history-project'
    },
    openProject(project) {
      this.selectedProject = project
      if (project?.company) this.selectedCompany = project.company
      this.currentView = 'project'
    },
    editProject(project) {
      this.editingProject = project
      this.currentView = 'create-project'
    },
    openDrawing(drawing, project, backView = 'project') {
      this.selectedDrawing = drawing
      this.selectedDrawingProject = project
      this.drawingBackView = backView
      if (project?.company) this.selectedCompany = project.company
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
