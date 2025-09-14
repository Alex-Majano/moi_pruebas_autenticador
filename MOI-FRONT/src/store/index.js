import { defineStore } from 'pinia';

export const useUtilsStore = defineStore('utils', {
  state: () => ({
    alert: {
      show: false,
      severity: 'info',
      message: null,
      detail: null,
      life: 3000
    },
    loader: false
  }),
  getters: {
    getAlert(state) {
      return state.alert;
    },
    getLoader() {
      return this.loader;
    }
  },
  actions: {
    setAlert(alert) {
      this.alert = { ...alert, show: true };
      // this.alert.unshift(alert);
    },
    clearAlert(/*index*/) {
      this.alert.show = false;
      // this.alert.splice(index, 1);
    },
    setLoader(payload) {
      this.loader = payload;
    },
    async forbidden() {
      await this.router.replace({ name: 'accessDenied' });
    },
    async notFound() {
      await this.router.replace({ name: 'notfound' });
    }
  }
});
