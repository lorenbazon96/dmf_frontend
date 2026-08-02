<template>
  <div class="dashboard-layout d-flex">
    <SidebarNav :companies="companies" :selected-company="selectedCompany" :user-name="userName" @logout="$emit('logout')" @select-company="$emit('select-company', $event)" />
    <main class="main-content flex-grow-1"><div class="content-wrap p-4">
      <div class="d-flex justify-content-between"><h4>{{ $t("myTasks.title") }}</h4><button class="btn btn-secondary" @click="$emit('back')">{{ $t("project.goBack") }}</button></div>
      <div v-if="isGuest()" class="alert alert-info">{{ $t("myTasks.guest") }}</div>
      <div v-else-if="unlinked" class="alert alert-warning">{{ $t("myTasks.unlinked") }}</div>
      <div v-else class="table-responsive"><table class="table"><thead><tr><th>RN / {{ $t("createProject.name") }}</th><th>{{ $t("project.drawingNo") }}</th><th>{{ $t("dashboard.operation") }}</th><th>{{ $t("project.status") }}</th><th>{{ $t("project.estimatedTime") }}</th><th>{{ $t("project.actualDuration") }}</th><th>{{ $t("dashboard.action") }}</th></tr></thead>
        <tbody><tr v-for="task in tasks" :key="task._id"><td>{{ task.project?.rn || task.projectRn }} - {{ task.project?.name || task.projectName }}</td><td>{{ task.drawingNo }}</td><td>{{ task.operation }}</td><td>{{ task.status }}</td><td>{{ task.estimatedMinutes || 0 }} min</td><td>{{ task.actualMinutes || 0 }} min</td><td><button v-for="action in actions(task)" :key="action" class="btn btn-sm btn-primary-action me-1" @click="run(task, action)">{{ action }}</button></td></tr></tbody>
      </table></div>
    </div></main>
  </div>
</template>
<script>
import SidebarNav from "./SidebarNav.vue";
import api from "../api";
import { taskActions } from "../utils/domain";
export default {
  name: "MyTasksPage", components: { SidebarNav }, inject: ["isGuest"],
  props: { companies: Array, selectedCompany: String, userName: String },
  emits: ["back", "logout", "select-company"],
  data: () => ({ tasks: [], unlinked: false }),
  watch: { selectedCompany: { immediate: true, handler() { this.load(); } } },
  methods: {
    actions(task) { return Object.entries(taskActions(task.status, task.projectStatus || task.project?.status)).filter(([, allowed]) => allowed).map(([name]) => name); },
    async load() { if (this.isGuest()) return; const { data } = await api.get("/projects/tasks/mine", { params: { company: this.selectedCompany } }); this.tasks = data.tasks || data.data || (Array.isArray(data) ? data : []); this.unlinked = data.meta?.workerLinked === false || data.meta?.emailLinked === false; },
    async run(task, action) { const projectId = task.projectId || task.project?._id; await api.put(`/projects/${projectId}/tasks/${task._id}/${action}`); await this.load(); },
  },
};
</script>
