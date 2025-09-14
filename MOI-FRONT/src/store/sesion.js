import { defineStore } from 'pinia';
import { ref } from 'vue';
import { isEmpty } from '@/utils/utilities.js';
import { useRoute, useRouter } from 'vue-router';

export const sesionStorage = defineStore('session', () => {
  const user = ref({});
  const token = ref(null);
  const router = useRouter();
  const route = useRoute();
  const expiredSession = ref(false);

  function setUser(newUser) {
    user.value = newUser;
  }

  function setToken(newToken) {
    token.value = newToken;
  }

  function removeUser() {
    user.value = {};
    token.value = null;
  }

  async function verifyToken() {
    const { unrequiredAuth } = route?.meta;
    if (isEmpty(token.value) && !unrequiredAuth) {
      removeUser();
      await router.replace({ name: 'login' });
    }
  }

  const setExpiredSession = () => {
    expiredSession.value = true;
  };

  async function resetExpiredSession() {
    console.log('resetExpiredSession')
    expiredSession.value = false;
    removeUser();
    await router.replace({ name: 'login', force: true });
  }

  return { user, token, expiredSession, setUser, setToken, verifyToken, setExpiredSession, resetExpiredSession };
}, {
  persist: {
    key: import.meta.env.VITE_APP_TITLE || 'sessionSius'
  }
});

/*
import { defineStore } from 'pinia';
import { useRouter, useRoute } from 'vue-router';
import { isEmpty } from '@/utils/utilities.js';

export const sesionStorage = defineStore('session', {
  state: () => ({
    user: {},
    token: null,
    expiredSession: false,
    router: useRouter(),
    route: useRoute()
  }),
  actions: {
    setUser(newUser) {
      this.user = newUser;
    },
    setToken(newToken) {
      this.token = newToken;
    },
    removeUser() {
      this.user = {};
      this.token = null;
    },
    setExpiredSession() {
      this.expiredSession = true;
    },
    async resetExpiredSession() {
      this.expiredSession = false;
      this.removeUser();
      await this.router.replace({ name: 'login', force: true });
    },

    async verifyToken() {
      const { unrequiredAuth } = this.route?.meta;
      if (isEmpty(this.token) && !unrequiredAuth) {
        this.removeUser();
        await this.router.replace({ name: 'login' });
      }
    }
  }
}, {
  persist: true
});
*/
/*import { defineStore } from 'pinia';
import { useRouter, useRoute } from 'vue-router';
import { isEmpty } from '@/utils/utilities.js';


export const sesionStorage = defineStore('session', {
  state: () => ({
    user: {},
    token: null,
    expiredSession: false,
    router: useRouter(),
    route: useRoute()
  }),
  actions: {
    setUser(newUser) {
      this.user = newUser;
    },
    setToken(newToken) {
      this.token = newToken;
    },
    removeUser() {
      this.user = {};
      this.token = null;
    },
    setExpiredSession() {
      this.expiredSession = true;
    },
    async resetExpiredSession() {
      this.expiredSession = false;
      this.removeUser();
      await this.router.replace({ name: 'login', force: true });
    },
    async verifyToken() {
      const { unrequiredAuth } = this.route?.meta;

      if (isEmpty(this.token) && !unrequiredAuth) {
        this.removeUser();
        await this.router.replace({ name: 'login' });
      }
    }
  },
  persist: {
    enabled: true,
    key: import.meta.env.VITE_APP_TITLE || 'sessionSius'
  }
});*/

