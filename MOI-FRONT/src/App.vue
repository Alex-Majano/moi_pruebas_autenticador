<template>
  <alert-component />
  <loader-component v-if="getLoader" />
  <router-view />
</template>

<script setup>
import { onBeforeMount, toRefs } from 'vue';
import { useUtilsStore } from '@/store';
import { sesionStorage } from '@/store/sesion';

const utilsStore = useUtilsStore();
const session = sesionStorage();
const { getLoader } = toRefs(utilsStore);

onBeforeMount(async () => {
  await session.verifyToken();
});
</script>
