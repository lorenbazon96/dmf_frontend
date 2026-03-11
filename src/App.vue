<template>
  <LoginPage v-if="currentView === 'login'" @guest="currentView = 'dashboard'" @forgot-password="currentView = 'forgot-password'" />
  <ForgotPasswordPage v-else-if="currentView === 'forgot-password'" @back="currentView = 'login'" />
  <DashboardPage
    v-else-if="currentView === 'dashboard'"
    :companies="companies"
    :selected-company="selectedCompany"
    @logout="currentView = 'login'"
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
    @back="currentView = 'dashboard'"
    @logout="currentView = 'login'"
    @view-drawing="openDrawing"
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
    @back="currentView = 'project'"
    @home="currentView = 'dashboard'"
    @logout="currentView = 'login'"
    @edit-profile="currentView = 'profile-edit'"
    @select-company="selectCompany"
    @add-company="addCompany"
    @update-companies="updateCompanies"
  />
  <CreateProjectPage
    v-else-if="currentView === 'create-project'"
    :companies="companies"
    :selected-company="selectedCompany"
    @back="currentView = 'dashboard'"
    @logout="currentView = 'login'"
    @edit-profile="currentView = 'profile-edit'"
    @select-company="selectCompany"
    @add-company="addCompany"
    @update-companies="updateCompanies"
  />
  <AnalyticsPage
    v-else-if="currentView === 'analytics'"
    :companies="companies"
    :selected-company="selectedCompany"
    @back="currentView = 'dashboard'"
    @logout="currentView = 'login'"
    @edit-profile="currentView = 'profile-edit'"
    @select-company="selectCompany"
    @add-company="addCompany"
    @update-companies="updateCompanies"
  />
  <WorkersClientsPage
    v-else-if="currentView === 'workers-clients'"
    :companies="companies"
    :selected-company="selectedCompany"
    @back="currentView = 'dashboard'"
    @logout="currentView = 'login'"
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
    @back="currentView = 'workers-clients'"
    @home="currentView = 'dashboard'"
    @logout="currentView = 'login'"
    @edit-profile="currentView = 'profile-edit'"
    @select-company="selectCompany"
    @add-company="addCompany"
    @update-companies="updateCompanies"
  />
  <WarehousePage
    v-else-if="currentView === 'warehouse'"
    :companies="companies"
    :selected-company="selectedCompany"
    @back="currentView = 'dashboard'"
    @logout="currentView = 'login'"
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
    @back="currentView = 'warehouse'"
    @home="currentView = 'dashboard'"
    @logout="currentView = 'login'"
    @edit-profile="currentView = 'profile-edit'"
    @select-company="selectCompany"
    @add-company="addCompany"
    @update-companies="updateCompanies"
  />
  <ProductionHistoryPage
    v-else-if="currentView === 'production-history'"
    :companies="companies"
    :selected-company="selectedCompany"
    @back="currentView = 'dashboard'"
    @logout="currentView = 'login'"
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
    @back="currentView = 'production-history'"
    @logout="currentView = 'login'"
    @view-drawing="openDrawing"
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
    @back="currentView = 'workers-clients'"
    @home="currentView = 'dashboard'"
    @logout="currentView = 'login'"
    @edit-profile="currentView = 'profile-edit'"
    @select-company="selectCompany"
    @add-company="addCompany"
    @update-companies="updateCompanies"
  />
  <ProfileEditPage
    v-else-if="currentView === 'profile-edit'"
    :companies="companies"
    :selected-company="selectedCompany"
    @back="currentView = 'dashboard'"
    @logout="currentView = 'login'"
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
      companies: ['Company 1', 'Company 2', 'Company 3', 'Company 4'],
      selectedCompany: 'Company 1',
    }
  },
  methods: {
    openHistoryProject(project) {
      this.selectedHistoryProject = project
      this.currentView = 'history-project'
    },
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
    selectCompany(company) {
      this.selectedCompany = company
    },
    addCompany() {
      const n = this.companies.length + 1
      this.companies.push('New Factory ' + n)
    },
    updateCompanies(updated) {
      this.companies = updated
      if (!updated.includes(this.selectedCompany)) this.selectedCompany = updated[0] || ''
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
