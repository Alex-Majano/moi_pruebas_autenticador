<template>
  <div
    class="absolute z-10 flex h-screen w-full items-center justify-center gap-x-4"
  >
    <div class="fixed inset-0 bg-gray-300/50 transition-opacity" />
    <div
      v-for="(dot, index) in dots"
      :key="index"
      :class="[
        'size-7 rounded-full bg-custom-primary-500 transition-all duration-500 ease-in-out',
        { 'scale-125 opacity-100': index === currentDot, 'scale-100 opacity-50': index !== currentDot },
      ]"
    />
  </div>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount} from "vue";

const dots = 4; // Número de puntos en el loader
const interval = 500; // Tiempo entre cambios en milisegundos
const currentDot = ref(0); // Índice del punto activo
let animationInterval = null;

const startAnimation = () => {
  stopAnimation(); // Limpia cualquier intervalo previo
  animationInterval = setInterval(() => {
    currentDot.value = (currentDot.value + 1) % dots; // Cambia el punto activo
  }, interval);
};

const stopAnimation = () => {
  if (animationInterval) {
    clearInterval(animationInterval);
    animationInterval = null;
  }
};

onMounted(() => {
  startAnimation();
});

onBeforeUnmount(() => {
  stopAnimation();
});
</script>

<style>
/* Personaliza estilos globales si es necesario */
</style>
