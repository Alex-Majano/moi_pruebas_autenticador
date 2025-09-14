<template>
  <div class="layout-wrapper">
    <app-topbar />
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
</script>


<style scoped>

</style>
