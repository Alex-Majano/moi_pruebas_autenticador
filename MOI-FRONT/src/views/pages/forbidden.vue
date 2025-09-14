<template>
  <div
    class="min-w-screen flex min-h-screen items-center justify-center overflow-hidden"
  >
    <div class="flex flex-col items-center justify-center">
      <div
        class="flex w-full flex-col items-center gap-3 px-5 py-4 sm:px-8"
      >
        <span class="text-5xl font-bold">403</span>
        <span class="mb-2 text-3xl font-bold lg:text-5xl">Acceso Denegado</span>
        <img-component svg-icon="asset-access" />
        <div class="text-gray-600">
          No tienes los permisos necesarios para acceder a este recurso.
        </div>
        <div class="mt-5 w-full text-center">
          <router-link
            :to="{ name: 'home' }"
            class="btn btn-outline-primary text-xl"
          >
            Volver al inicio
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

