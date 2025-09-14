<template>
  <div
    class="min-w-screen flex min-h-screen items-center justify-center overflow-hidden"
  >
    <div class="flex flex-col items-center justify-center">
      <div>
        <div
          class="flex w-full flex-col items-center gap-2 px-5 py-4 sm:px-8"
        >
          <span class="text-5xl font-bold">404</span>
          <span class="mb-2 text-3xl font-bold lg:text-5xl">Recurso no encontrado</span>
          <img-component svg-icon="notfound" />
          <div class="text-gray-600">
            No se ha encontrado la página buscada.
          </div>
          <div class="col-12 mt-5 text-center">
            <i
              class="pi pi-fw pi-arrow-left mr-2 text-primary"
              style="vertical-align: center"
            />
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
  </div>
</template>

<script setup>

</script>
