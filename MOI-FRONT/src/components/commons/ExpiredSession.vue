<template>
  <Dialog v-model:visible="expiredSession" modal class="w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
    <template #container>
      <div class="flex flex-col px-5 py-5 gap-4">
        <span class="text-center text-2xl text-custom-primary-500">Sessión expirada</span>
        <span class="text-center text-3xl my-2"
        >Tu sesión ha expirado completamente, debe iniciar sesión nuevamente</span
        >
        <div class="flex justify-center">
          <button-component
            label="Aceptar"
            @click="sessionStorage.resetExpiredSession()"
            autofocus
            class="btn btn-primary"
          ></button-component>
        </div>
      </div>
    </template>
  </Dialog>
</template>
<script setup>
import { toRefs } from 'vue';
import { sesionStorage } from '@/store/sesion';

const sessionStorage = sesionStorage();
const { expiredSession } = toRefs(sessionStorage);
</script>


<style scoped lang="scss">

</style>
