import { createRouter, createWebHashHistory } from "vue-router";

const publicViews = new Set(["login", "forgot-password", "reset-password"]);
const views = [
  "login", "forgot-password", "reset-password", "dashboard", "project", "drawing",
  "create-project", "analytics", "workers-clients", "worker-detail", "client-detail",
  "warehouse", "warehouse-add-item", "production-history", "history-project", "profile-edit",
];

const contextualRoutes = {
  project: "/projects/:id",
  "history-project": "/history/projects/:id",
  drawing: "/projects/:projectId/drawings/:drawingId",
  "worker-detail": "/workers/:id",
  "client-detail": "/clients/:id",
};

const routes = views.map(name => ({
  path: contextualRoutes[name] || (name === "login" ? "/" : `/${name}`),
  name,
  component: { render: () => null },
  meta: { public: publicViews.has(name) },
}));

const router = createRouter({ history: createWebHashHistory(), routes });
router.beforeEach(to => {
  const authenticated = Boolean(localStorage.getItem("dmf_user") || sessionStorage.getItem("dmf_user"));
  if (!to.meta.public && !authenticated) return { name: "login" };
  return true;
});

export default router;
