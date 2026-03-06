<template>
  <LoginPage v-if="currentView === 'login'" @guest="currentView = 'dashboard'" />
  <DashboardPage
    v-else-if="currentView === 'dashboard'"
    @logout="currentView = 'login'"
    @view-project="openProject"
    @create-project="currentView = 'create-project'"
    @analytics="currentView = 'analytics'"
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
</template>

<script>
import LoginPage from './components/LoginPage.vue'
import DashboardPage from './components/DashboardPage.vue'
import ProjectDetailPage from './components/ProjectDetailPage.vue'
import DrawingDetailPage from './components/DrawingDetailPage.vue'
import CreateProjectPage from './components/CreateProjectPage.vue'
import AnalyticsPage from './components/AnalyticsPage.vue'

export default {
  name: 'App',
  components: { LoginPage, DashboardPage, ProjectDetailPage, DrawingDetailPage, CreateProjectPage, AnalyticsPage },
  data() {
    return {
      currentView: 'login',
      selectedProject: null,
      selectedDrawing: null,
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
