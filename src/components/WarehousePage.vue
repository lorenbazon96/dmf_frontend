<template>
  <div class="dashboard-layout d-flex min-vh-100">
    <SidebarNav
      :companies="companies"
      :selected-company="selectedCompany"
      :user-name="userName"
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
            <div class="d-flex flex-column gap-3">
              <div class="summary-box">
                <h6 class="summary-title">{{ $t("warehouse.title") }}</h6>
                <div class="summary-row">
                  <span>{{ $t("warehouse.totalItems") }}:</span>
                  <span class="fw-bold">{{ totalItems }}</span>
                </div>
                <div class="summary-row">
                  <span>{{ $t("warehouse.totalPcs") }}:</span>
                  <span class="fw-bold">{{ totalPcs }}</span>
                </div>
              </div>

              <div class="d-flex flex-column gap-2">
                <button class="btn btn-action" @click="$emit('back')">
                  <span>{{ $t("warehouse.goBackToHome") }}</span>
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" opacity="0.8">
                    <path d="M8.354 1.146a.5.5 0 00-.708 0l-6 6A.5.5 0 001.5 7.5v7a.5.5 0 00.5.5h4.5a.5.5 0 00.5-.5v-4h2v4a.5.5 0 00.5.5H14a.5.5 0 00.5-.5v-7a.5.5 0 00-.146-.354L13 5.793V2.5a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 00-.5-.5h-3a.5.5 0 00-.5.5v4z" />
                  </svg>
                </button>
                <button class="btn btn-action" @click="$emit('add-item')">
                  <span>{{ $t("warehouse.addNewItem") }}</span>
                  <span class="action-icon">+</span>
                </button>
                <button class="btn btn-action">
                  <span>{{ $t("warehouse.exportPdf") }}</span>
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" opacity="0.8">
                    <path d="M14 14V4.5L9.5 0H4a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2M9.5 3A1.5 1.5 0 0011 4.5h2V14a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1h5.5z" />
                  </svg>
                </button>
                <button class="btn btn-action">
                  <span>{{ $t("warehouse.print") }}</span>
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" opacity="0.8">
                    <path d="M2.5 8a.5.5 0 100-1 .5.5 0 000 1" />
                    <path d="M5 1a2 2 0 00-2 2v2H2a2 2 0 00-2 2v3a2 2 0 002 2h1v1a2 2 0 002 2h6a2 2 0 002-2v-1h1a2 2 0 002-2V7a2 2 0 00-2-2h-1V3a2 2 0 00-2-2zM4 3a1 1 0 011-1h6a1 1 0 011 1v2H4zm1 10a1 1 0 01-1-1V9h8v3a1 1 0 01-1 1z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="col-lg-9 col-md-8 col-12">
            <div class="d-flex gap-2 mb-3 flex-wrap align-items-center">
              <div class="search-wrap flex-grow-1">
                <svg class="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="#999">
                  <path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85a1 1 0 00-.115-.1zM12 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0" />
                </svg>
                <input
                  v-model="searchQuery"
                  type="text"
                  class="form-control search-input"
                  :placeholder="$t('warehouse.search')"
                />
              </div>
              <div class="dropdown-wrap">
                <button class="btn btn-filter" @click="showFilterDropdown = !showFilterDropdown; showSortDropdown = false">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="me-1">
                    <path d="M1.5 1.5A.5.5 0 012 1h12a.5.5 0 01.5.5v2a.5.5 0 01-.128.334L10 8.692V13.5a.5.5 0 01-.342.474l-3 1A.5.5 0 016 14.5V8.692L1.628 3.834A.5.5 0 011.5 3.5z" />
                  </svg>
                  {{ activeFilter || $t("warehouse.filter") }}
                </button>
                <div v-if="showFilterDropdown" class="dropdown-menu-custom">
                  <div
                    class="dropdown-item-custom"
                    :class="{ active: activeFilter === '' }"
                    @click="setFilter('')"
                  >{{ $t("warehouse.all") }}</div>
                  <div
                    v-for="t in uniqueTypes"
                    :key="t"
                    class="dropdown-item-custom"
                    :class="{ active: activeFilter === t }"
                    @click="setFilter(t)"
                  >{{ t }}</div>
                </div>
              </div>
              <div class="dropdown-wrap">
                <button class="btn btn-filter" @click="showSortDropdown = !showSortDropdown; showFilterDropdown = false">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="me-1">
                    <path d="M3.5 2.5a.5.5 0 00-1 0v8.793l-1.146-1.147a.5.5 0 00-.708.708l2 1.999.007.007a.497.497 0 00.7-.006l2-2a.5.5 0 00-.707-.708L3.5 11.293zm3.5 1a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5M7.5 6a.5.5 0 000 1h5a.5.5 0 000-1zm0 3a.5.5 0 000 1h3a.5.5 0 000-1zm0 3a.5.5 0 000 1h1a.5.5 0 000-1z" />
                  </svg>
                  {{ $t("warehouse.sortBy") }}
                </button>
                <div v-if="showSortDropdown" class="dropdown-menu-custom">
                  <div
                    v-for="opt in sortOptions"
                    :key="opt.key"
                    class="dropdown-item-custom"
                    :class="{ active: sortKey === opt.key }"
                    @click="setSort(opt.key)"
                  >
                    {{ $t(opt.label) }}
                    <span v-if="sortKey === opt.key" class="sort-arrow">{{ sortAsc ? '▲' : '▼' }}</span>
                  </div>
                </div>
              </div>
            </div>

            <section class="panel">
              <div class="table-responsive">
                <table class="table align-middle mb-0">
                  <thead class="dark-header">
                    <tr>
                      <th>ID</th>
                      <th>{{ $t("warehouse.type") }}</th>
                      <th>{{ $t("warehouse.name") }}</th>
                      <th>{{ $t("warehouse.specs") }}</th>
                      <th>{{ $t("warehouse.qty") }}</th>
                      <th class="text-end">{{ $t("warehouse.action") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in filteredItems" :key="item.id">
                      <td class="fw-semibold text-dark">{{ item.id }}</td>
                      <td>{{ item.type }}</td>
                      <td>{{ item.name }}</td>
                      <td class="text-muted">{{ item.specs }}</td>
                      <td>
                        <div class="qty-control d-inline-flex align-items-center">
                          <button class="btn btn-qty" @click="decrementQty(item)">−</button>
                          <span class="qty-value">{{ item.qty }}</span>
                          <button class="btn btn-qty" @click="incrementQty(item)">+</button>
                        </div>
                      </td>
                      <td class="text-end">
                        <button class="btn btn-sm btn-delete" @click="deleteItem(item.id)">
                          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" class="me-1">
                            <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5m2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5m3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0z" />
                            <path d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                          </svg>
                          {{ $t("warehouse.delete") }}
                        </button>
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
import SidebarNav from "./SidebarNav.vue";
import api from "../api";

export default {
  name: "WarehousePage",
  components: { SidebarNav },
  props: {
    companies: { type: Array, default: () => [] },
    selectedCompany: { type: String, default: '' },
    userName: { type: String, default: '' },
  },
  emits: ["back", "logout", "add-item", "edit-profile", "select-company", "add-company", "update-companies"],
  data() {
    return {
      searchQuery: "",
      activeFilter: "",
      sortKey: "",
      sortAsc: true,
      showFilterDropdown: false,
      showSortDropdown: false,
      items: [],
    };
  },
  watch: {
    selectedCompany: {
      immediate: true,
      handler() { this.fetchItems(); },
    },
  },
  computed: {
    companyFilteredItems() {
      return this.items;
    },
    uniqueTypes() {
      return [...new Set(this.companyFilteredItems.map((i) => i.type))];
    },
    sortOptions() {
      return [
        { key: "id", label: "warehouse.sortById" },
        { key: "type", label: "warehouse.sortByType" },
        { key: "name", label: "warehouse.sortByName" },
        { key: "specs", label: "warehouse.sortBySpecs" },
        { key: "qty", label: "warehouse.sortByQty" },
      ];
    },
    filteredItems() {
      let result = this.companyFilteredItems;

      if (this.searchQuery.trim()) {
        const q = this.searchQuery.toLowerCase();
        result = result.filter(
          (i) =>
            String(i.id).includes(q) ||
            i.type.toLowerCase().includes(q) ||
            i.name.toLowerCase().includes(q) ||
            i.specs.toLowerCase().includes(q)
        );
      }

      if (this.activeFilter) {
        result = result.filter((i) => i.type === this.activeFilter);
      }

      if (this.sortKey) {
        const key = this.sortKey;
        const dir = this.sortAsc ? 1 : -1;
        result = [...result].sort((a, b) => {
          const va = a[key];
          const vb = b[key];
          if (typeof va === "number") return (va - vb) * dir;
          return String(va).localeCompare(String(vb)) * dir;
        });
      }

      return result;
    },
    totalItems() {
      return this.companyFilteredItems.length;
    },
    totalPcs() {
      return this.companyFilteredItems.reduce((sum, i) => sum + i.qty, 0);
    },
  },
  mounted() {
    this._onClickOutside = (e) => {
      const wraps = this.$el.querySelectorAll(".dropdown-wrap");
      const inside = Array.from(wraps).some((el) => el.contains(e.target));
      if (!inside) {
        this.showFilterDropdown = false;
        this.showSortDropdown = false;
      }
    };
    document.addEventListener("click", this._onClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this._onClickOutside);
  },
  methods: {
    async fetchItems() {
      const params = this.selectedCompany ? { company: this.selectedCompany } : {};
      const { data } = await api.get("/warehouse", { params });
      this.items = data.map(i => ({ ...i, id: i._id }));
    },
    async incrementQty(item) {
      item.qty++;
      await api.put(`/warehouse/${item.id}`, { qty: item.qty });
    },
    async decrementQty(item) {
      if (item.qty > 0) {
        item.qty--;
        await api.put(`/warehouse/${item.id}`, { qty: item.qty });
      }
    },
    async deleteItem(id) {
      await api.delete(`/warehouse/${id}`);
      this.items = this.items.filter((i) => i.id !== id);
    },
    setFilter(type) {
      this.activeFilter = this.activeFilter === type && type !== "" ? "" : type;
      this.showFilterDropdown = false;
    },
    setSort(key) {
      if (this.sortKey === key) {
        this.sortAsc = !this.sortAsc;
      } else {
        this.sortKey = key;
        this.sortAsc = true;
      }
      this.showSortDropdown = false;
    },
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

.summary-box {
  background: #f5f5f5;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 1rem 1.1rem;
}
.summary-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}
.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #444;
  padding: 0.15rem 0;
}

.search-wrap {
  position: relative;
}
.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
.search-input {
  padding-left: 36px;
  border-radius: 20px;
  border: 1px solid #ccc;
  font-size: 0.85rem;
  height: 38px;
}
.search-input:focus {
  border-color: #2b579a;
  box-shadow: 0 0 0 2px rgba(43, 87, 154, 0.15);
}

.dropdown-wrap {
  position: relative;
}

.btn-filter {
  background: #2b579a;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 0.45rem 0.9rem;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
}
.btn-filter:hover {
  background: #1e3f73;
  color: #fff;
}

.dropdown-menu-custom {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  min-width: 160px;
  background: #fff;
  border: 1px solid #dcdcdc;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  padding: 4px 0;
}

.dropdown-item-custom {
  padding: 0.4rem 0.9rem;
  font-size: 0.82rem;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.dropdown-item-custom:hover {
  background: #e8eaed;
}
.dropdown-item-custom.active {
  color: #2b579a;
  font-weight: 700;
}

.sort-arrow {
  font-size: 0.7rem;
  margin-left: 6px;
}

.panel {
  background: #f5f5f5;
  border: 1px solid #dcdcdc;
  border-radius: 6px;
  padding: 0;
  overflow: hidden;
}

.table {
  font-size: 0.82rem;
  margin: 0;
}
.table thead th {
  font-weight: 700;
  padding: 0.45rem 0.7rem;
  white-space: nowrap;
  font-size: 0.8rem;
}
.dark-header th {
  background: #4a6785;
  color: #fff;
  border-bottom: none;
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

.qty-control {
  gap: 0;
}
.btn-qty {
  width: 28px;
  height: 28px;
  padding: 0;
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1;
  border: 1px solid #ccc;
  background: #fff;
  color: #333;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}
.btn-qty:hover {
  background: #e8eaed;
}
.qty-value {
  min-width: 40px;
  text-align: center;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 0 4px;
}

.btn-delete {
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
.btn-delete:hover {
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
  .table thead th,
  .table tbody td {
    padding: 0.35rem 0.45rem;
    font-size: 0.78rem;
  }
}
@media (max-width: 575.98px) {
  .content-wrap {
    padding: 0.75rem !important;
  }
}
</style>
