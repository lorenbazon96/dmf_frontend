<template>
  <div v-if="globalError" class="global-toast alert alert-danger" role="alert" aria-live="assertive">
    <span>{{ globalError }}</span>
    <button type="button" class="btn-close" aria-label="Zatvori" @click="globalError = ''"></button>
  </div>
  <LoginPage v-if="currentView === 'login'" @login="handleLogin" @forgot-password="currentView = 'forgot-password'" />
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
    @back="backFromDrawing"
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
    @duplicate-project="duplicateProject"
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
import { defineAsyncComponent } from 'vue'
import LoginPage from './components/LoginPage.vue'
import ForgotPasswordPage from './components/ForgotPasswordPage.vue'
import ResetPasswordPage from './components/ResetPasswordPage.vue'
import api, { clearStoredAuth } from './api'

const DashboardPage = defineAsyncComponent(() => import('./components/DashboardPage.vue'))
const ProjectDetailPage = defineAsyncComponent(() => import('./components/ProjectDetailPage.vue'))
const DrawingDetailPage = defineAsyncComponent(() => import('./components/DrawingDetailPage.vue'))
const CreateProjectPage = defineAsyncComponent(() => import('./components/CreateProjectPage.vue'))
const AnalyticsPage = defineAsyncComponent(() => import('./components/AnalyticsPage.vue'))
const WorkersClientsPage = defineAsyncComponent(() => import('./components/WorkersClientsPage.vue'))
const WorkerDetailPage = defineAsyncComponent(() => import('./components/WorkerDetailPage.vue'))
const ClientDetailPage = defineAsyncComponent(() => import('./components/ClientDetailPage.vue'))
const WarehousePage = defineAsyncComponent(() => import('./components/WarehousePage.vue'))
const WarehouseAddItemPage = defineAsyncComponent(() => import('./components/WarehouseAddItemPage.vue'))
const ProductionHistoryPage = defineAsyncComponent(() => import('./components/ProductionHistoryPage.vue'))
const ProfileEditPage = defineAsyncComponent(() => import('./components/ProfileEditPage.vue'))

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
      globalError: '',
      errorTimer: null,
      routeLoadToken: 0,
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
    if (this.$route.name === 'reset-password') {
      this.currentView = 'reset-password'
    } else if (this.$route.name && (this.loggedInUser || this.$route.meta.public) &&
      !['project', 'history-project', 'drawing', 'worker-detail', 'client-detail'].includes(this.$route.name)) {
      this.currentView = this.$route.name
    }
    if (this.loggedInUser && this.currentView !== 'reset-password') {
      await this.fetchCompanies()
      await this.applyRoute(this.$route)
    }
    window.addEventListener('dmf:session-expired', this.onSessionExpired)
    window.addEventListener('dmf:api-error', this.onApiError)
  },
  beforeUnmount() {
    window.removeEventListener('dmf:session-expired', this.onSessionExpired)
    window.removeEventListener('dmf:api-error', this.onApiError)
    clearTimeout(this.errorTimer)
  },
  watch: {
    currentView(view) {
      if (this.$route.name !== view && !['project', 'history-project', 'drawing', 'worker-detail', 'client-detail'].includes(view)) {
        this.$router.push({ name: view })
      }
    },
    '$route.fullPath'() {
      this.applyRoute(this.$route)
    },
  },
  methods: {
    backFromDrawing() {
      const project = this.selectedDrawingProject
      if (!project) {
        this.currentView = 'dashboard'
        return
      }
      const name = this.drawingBackView === 'history-project' ? 'history-project' : 'project'
      this.$router.push({ name, params: { id: project._id || project.id } })
    },
    async applyRoute(route) {
      if (!route.name || (!this.loggedInUser && !route.meta.public)) return
      const loadToken = ++this.routeLoadToken
      try {
        if (route.name === 'project' || route.name === 'history-project') {
          const target = route.name === 'project' ? this.selectedProject : this.selectedHistoryProject
          const project = String(target?._id) === String(route.params.id)
            ? target
            : (await api.get(`/projects/${route.params.id}`, { suppressGlobalError: true })).data
          if (route.name === 'project') this.selectedProject = project
          else this.selectedHistoryProject = project
          if (project?.company) this.selectedCompany = project.company
        } else if (route.name === 'drawing') {
          const project = String(this.selectedDrawingProject?._id) === String(route.params.projectId)
            ? this.selectedDrawingProject
            : (await api.get(`/projects/${route.params.projectId}`, { suppressGlobalError: true })).data
          const drawings = project.drawings || project.parts || []
          const drawing = drawings.find(item => String(item._id || item.id) === String(route.params.drawingId))
          if (!drawing) throw new Error('Drawing not found')
          this.selectedDrawingProject = project
          this.selectedDrawing = drawing
          this.drawingBackView = route.query.from === 'history' ? 'history-project' : 'project'
          if (project?.company) this.selectedCompany = project.company
        } else if (route.name === 'worker-detail') {
          if (String(this.selectedWorker?._id || this.selectedWorker?.id) !== String(route.params.id)) {
            this.selectedWorker = (await api.get(`/workers/${route.params.id}`, { suppressGlobalError: true })).data
          }
        } else if (route.name === 'client-detail') {
          if (String(this.selectedClient?._id || this.selectedClient?.id) !== String(route.params.id)) {
            this.selectedClient = (await api.get(`/clients/${route.params.id}`, { suppressGlobalError: true })).data
          }
        }
        if (loadToken === this.routeLoadToken && route.fullPath === this.$route.fullPath) {
          this.currentView = route.name
        }
      } catch {
        if (loadToken !== this.routeLoadToken || route.fullPath !== this.$route.fullPath) return
        const fallback = ['history-project'].includes(route.name) ? 'production-history'
          : ['worker-detail', 'client-detail'].includes(route.name) ? 'workers-clients' : 'dashboard'
        this.currentView = fallback
        if (this.$route.name !== fallback) this.$router.replace({ name: fallback })
      }
    },
    showError(message) {
      this.globalError = message
      clearTimeout(this.errorTimer)
      this.errorTimer = setTimeout(() => { this.globalError = '' }, 6000)
    },
    onApiError(event) {
      this.showError(event.detail?.userMessage || this.$t('apiErrors.unexpected'))
    },
    onSessionExpired() {
      if (!this.loggedInUser && this.currentView === 'login') return
      this.loggedInUser = null
      this.currentView = 'login'
      this.showError(this.$t('apiErrors.sessionExpired'))
    },
    companyScheduleFor(companyName) {
      return this.companyObjects.find(c => c.name === companyName) || this.selectedCompanyObject;
    },
    clearStoredAuth() {
      clearStoredAuth()
    },
    handleLogout() {
      this.loggedInUser = null
      this.clearStoredAuth()
      this.currentView = 'login'
    },
    async handleLogin({ user, token, rememberMe }) {
      if (!user) {
        this.handleLogout()
        return
      }

      this.loggedInUser = user
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
      this.$router.push({ name: 'history-project', params: { id: project._id || project.id } })
    },
    openProject(project) {
      this.selectedProject = project
      if (project?.company) this.selectedCompany = project.company
      this.$router.push({ name: 'project', params: { id: project._id || project.id } })
    },
    editProject(project) {
      this.editingProject = project
      this.currentView = 'create-project'
    },
    duplicateProject(project) {
      this.editingProject = { ...project, _id: null, _isCopy: true }
      if (project?.company) this.selectedCompany = project.company
      this.currentView = 'create-project'
    },
    openDrawing(drawing, project, backView = 'project') {
      this.selectedDrawing = drawing
      this.selectedDrawingProject = project
      this.drawingBackView = backView
      if (project?.company) this.selectedCompany = project.company
      this.$router.push({
        name: 'drawing',
        params: { projectId: project._id || project.id, drawingId: drawing._id || drawing.id },
        query: backView === 'history-project' ? { from: 'history' } : {},
      })
    },
    openWorker(worker) {
      this.selectedWorker = worker
      const id = worker?._id || worker?.id
      if (id) this.$router.push({ name: 'worker-detail', params: { id } })
      else this.currentView = 'worker-detail'
    },
    openClient(client) {
      this.selectedClient = client
      const id = client?._id || client?.id
      if (id) this.$router.push({ name: 'client-detail', params: { id } })
      else this.currentView = 'client-detail'
    },
    selectCompany(company) {
      this.selectedCompany = company
    },
    async addCompany() {
      const n = this.companies.length + 1
      try {
        await api.post('/companies', { name: `${this.$t('dashboard.newFactory')} ${n}` })
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
.global-toast { position: fixed; z-index: 2000; top: 1rem; left: 50%; transform: translateX(-50%); min-width: min(90vw, 360px); display: flex; justify-content: space-between; gap: 1rem; box-shadow: 0 4px 18px rgba(0,0,0,.2); }
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
