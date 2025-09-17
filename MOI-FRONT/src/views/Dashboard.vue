<template>
  <div class="dashboard-container">
    <!-- Banner con área seleccionada -->
    <div v-if="selectedAreaName" class="area-banner">
      <div class="banner-content">
        <i class="pi pi-building text-xl mr-2"></i>
        <div>
          <p class="banner-title">Área de trabajo actual</p>
          <p class="banner-subtitle">{{ selectedAreaName }}</p>
        </div>
      </div>
      <button 
        @click="showAreaModal = true" 
        class="change-area-btn"
        title="Cambiar área de trabajo"
      >
        <i class="pi pi-refresh"></i>
        Cambiar
      </button>
    </div>

    <!-- Modal de selección de área -->
    <div v-if="showAreaModal" class="modal-overlay">
      <div class="modal-content">
        <h3 class="modal-title">Seleccione subárea de stock</h3>
        <p class="modal-subtitle">Elija el área de trabajo deseada</p>
        
        <div class="area-selection">
          <label class="block text-sm font-medium mb-2">Subárea de Stock:</label>
          <select v-model="tempSelectedArea" class="area-select">
            <option value="">-- Seleccione una opción --</option>
            <option value="area_stock_central">Stock Central</option>
            <option value="area_stock_medicamentos">Stock de Medicamentos</option>
            <option value="area_stock_insumos">Stock de Insumos Médicos</option>
            <option value="area_stock_equipos">Stock de Equipos</option>
          </select>
        </div>

        <div class="modal-actions">
          <button 
            @click="showAreaModal = false" 
            class="btn-secondary"
          >
            Cancelar
          </button>
          <button 
            @click="confirmAreaSelection" 
            class="btn-primary"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>

    <!-- Contenido principal del dashboard -->
    <div class="welcome-section">
      <h1 class="welcome-title">¡Bienvenido al Sistema MINSAL!</h1>
      <p class="welcome-subtitle">Sistema de Gestión de Stock y Inventarios</p>
      
      <div v-if="!selectedAreaName" class="no-area-selected">
        <i class="pi pi-exclamation-triangle text-2xl mb-2"></i>
        <p>No has seleccionado un área de trabajo.</p>
        <button @click="showAreaModal = true" class="select-area-btn">
          Seleccionar Área
        </button>
      </div>
    </div>

    <!-- Cards de resumen si hay área seleccionada -->
    <div v-if="selectedAreaName" class="dashboard-cards">
      <div class="card">
        <div class="card-header">
          <i class="pi pi-box text-blue-500"></i>
          <h3>Stock Total</h3>
        </div>
        <div class="card-content">
          <p class="card-number">1,245</p>
          <p class="card-label">items en inventario</p>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <i class="pi pi-check-circle text-green-500"></i>
          <h3>Disponible</h3>
        </div>
        <div class="card-content">
          <p class="card-number">892</p>
          <p class="card-label">items disponibles</p>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <i class="pi pi-exclamation-triangle text-orange-500"></i>
          <h3>Por reabastecer</h3>
        </div>
        <div class="card-content">
          <p class="card-number">47</p>
          <p class="card-label">items con stock bajo</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const selectedAreaName = ref('');
const showAreaModal = ref(false);
const tempSelectedArea = ref('');

onMounted(() => {
  // Obtener el nombre del área guardado en localStorage
  selectedAreaName.value = localStorage.getItem('selectedAreaName') || '';
  // Inicializar la selección temporal con el valor actual
  tempSelectedArea.value = localStorage.getItem('selectedArea') || '';
});

const confirmAreaSelection = () => {
  if (!tempSelectedArea.value) {
    alert('Por favor seleccione una subárea de trabajo');
    return;
  }

  // Guardar la nueva selección
  const areaName = getAreaName(tempSelectedArea.value);
  localStorage.setItem('selectedArea', tempSelectedArea.value);
  localStorage.setItem('selectedAreaName', areaName);
  
  // Actualizar el valor en el dashboard
  selectedAreaName.value = areaName;
  
  // Cerrar el modal
  showAreaModal.value = false;
};

const getAreaName = (areaKey) => {
  const areas = {
    'area_stock_central': 'Stock Central',
    'area_stock_medicamentos': 'Stock de Medicamentos', 
    'area_stock_insumos': 'Stock de Insumos Médicos',
    'area_stock_equipos': 'Stock de Equipos'
  };
  return areas[areaKey] || 'Área no seleccionada';
};
</script>

<style scoped>
.dashboard-container {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.area-banner {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border: 1px solid #90caf9;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.banner-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.banner-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #1565c0;
  margin: 0;
}

.banner-subtitle {
  font-size: 1.125rem;
  font-weight: 600;
  color: #0d47a1;
  margin: 0;
}

.change-area-btn {
  background: #1976d2;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
}

.change-area-btn:hover {
  background: #1565c0;
}

/* Estilos para el modal de selección de área */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 400px;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.modal-subtitle {
  color: #7f8c8d;
  margin-bottom: 1.5rem;
}

.area-selection {
  margin-bottom: 1.5rem;
}

.area-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
}

.area-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.btn-primary {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-secondary {
  background: #6b7280;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.btn-secondary:hover {
  background: #4b5563;
}

.welcome-section {
  text-align: center;
  margin-bottom: 3rem;
}

.welcome-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.welcome-subtitle {
  font-size: 1.125rem;
  color: #7f8c8d;
  margin-bottom: 2rem;
}

.no-area-selected {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem auto;
  max-width: 400px;
}

.select-area-btn {
  background: #28a745;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 1rem;
  font-weight: 500;
}

.select-area-btn:hover {
  background: #218838;
}

.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.card-header h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.card-content {
  text-align: center;
}

.card-number {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

.card-label {
  font-size: 0.875rem;
  color: #7f8c8d;
  margin: 0;
  margin-top: 0.25rem;
}

/* Responsive */
@media (max-width: 768px) {
  .area-banner {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .dashboard-cards {
    grid-template-columns: 1fr;
  }
  
  .welcome-title {
    font-size: 1.5rem;
  }
  
  .modal-content {
    width: 95%;
    padding: 1.5rem;
  }
  
  .modal-actions {
    flex-direction: column;
  }
  
  .btn-primary, .btn-secondary {
    width: 100%;
  }
}
</style>