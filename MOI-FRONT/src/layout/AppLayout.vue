<template>
  <div class="layout-wrapper">
    <!-- Header con botón de logout -->
    <div class="app-header">
      <app-topbar />
      <div class="header-actions">
        <button 
          @click="logout" 
          class="logout-btn"
          title="Cerrar sesión"
        >
          <i class="pi pi-sign-out"></i>
          Cerrar sesión
        </button>
      </div>
    </div>
    
    <app-menu />
    <div class="layout-main-container">
      <div class="layout-main">
        <router-view />
      </div>
      <expired-session />
    </div>
    <app-footer />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = async () => {
  try {
    // 1. Limpiar todos los datos de autenticación
    const authItems = [
      'authToken', 'token', 'user', 'userData', 
      'selectedArea', 'selectedAreaName', 'vuex'
    ];
    
    authItems.forEach(item => {
      localStorage.removeItem(item);
      sessionStorage.removeItem(item);
    });
    
    // 2. Limpieza adicional para asegurar
    localStorage.clear();
    sessionStorage.clear();
    
    // 3. Redirigir al login - CON RUTA ABSOLUTA
    await router.push('/login');
    
    // 4. Forzar recarga completa para limpiar estado
    setTimeout(() => {
      window.location.reload();
    }, 100);
    
  } catch (error) {
    console.error('Error en logout:', error);
    // Fallback: redirección directa si hay error
    window.location.href = '/login';
  }
};
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 0 1rem;
  border-bottom: 1px solid #e5e7eb;
  height: 60px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logout-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  transition: background-color 0.2s;
}

.logout-btn:hover {
  background: #c82333;
}
</style>