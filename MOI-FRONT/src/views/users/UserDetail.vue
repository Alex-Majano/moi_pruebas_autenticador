<template>
  <div class="flex flex-col gap-12">
    <user-container>
      <template #header>
        <i class="mdi mdi-account text-3xl" />
        <span>Actualizar usuario</span>
      </template>
      <template #container>
        <form-update-user />
      </template>
    </user-container>
    <user-container>
      <template #header>
        <span class="py-1">Asignación de áreas de stock</span>
      </template>
      <template #container>
        <div class="flex justify-center">
          <div class="flex flex-col md:flex-row justify-center items-center w-10/12 gap-4 py-3">
            <div class="w-10/12">
              <multi-select-component
                label="Stocks:*"
                placeholder="Seleccione"
              />
            </div>
            <div>
              <button-component class="w-min h-min ml-10 px-5" label="Añadir" />
            </div>
          </div>
        </div>
      </template>
    </user-container>
    <user-container>
      <template #header>
          <span class="py-1">Reiniciar contraseña del usuario</span>
      </template>
      <template #container>
        <div class="grid grid-cols-2 mx-4 py-4 justify-center items-center">
          <div class="w-11/12 flex justify-center">
            <button-component label="Reiniciar contraseña" class="btn btn-error w-6/12" @click="handleResetPassword" />
          </div>
          <div class="flex gap-2" v-if="!isEmpty(passwordRestored)">
            <span class="text-3xl font-bold underline decoration-2">{{passwordRestored}}</span>
            <span class="mdi mdi-content-copy items-start text-xl cursor-pointer" @click=""></span>
          </div>
        </div>
      </template>
    </user-container>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { isEmpty } from '@/utils/utilities.js';

const passwordRestored = ref('');

const handleResetPassword = async () => {}
</script>

<style scoped lang="scss">
</style>
