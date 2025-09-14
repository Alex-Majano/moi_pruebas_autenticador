<template>
  <div class="flex w-full justify-center">
    <div class="card w-10/12 lg:w-8/12 2xl:w-6/12">
      <div class="flex items-center justify-center gap-2 bg-custom-secondary-500 py-1">
        <slot name="header" />
      </div>
      <slot name="container" />
    </div>
  </div>
</template>
<script setup>

</script>


<style scoped lang="scss">

</style>
