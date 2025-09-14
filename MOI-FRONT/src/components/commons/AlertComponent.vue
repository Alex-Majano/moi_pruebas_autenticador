<template>
  <div class="alert-container w-auto">
    <Message
      v-if="getAlert.show"
      class="alert"
      :class="{
        success: getAlert.severity === 'success',
        danger: getAlert.severity === 'error',
        warn: getAlert.severity === 'warn' || getAlert.severity === 'info'
      }"
      :sticky="false"
      :closable="false"
      :life="getAlert.life"
      unstyled
      @close="utilsStore.clearAlert()"
      @life-end="utilsStore.clearAlert()"
    >
      <template #messageicon>
        <span />
      </template>
      <section class="flex items-center justify-between gap-3 px-3">
        <span class="text-lg font-semibold">
          {{ getAlert.message }}
        </span>
      </section>
    </Message>
  </div>
</template>
<script setup>
import { useUtilsStore } from '@/store';
import { toRefs } from 'vue';

const utilsStore = useUtilsStore();
const { getAlert } = toRefs(utilsStore);
</script>

<style scoped lang="scss">
.alert-container {
  position: fixed;
  display: flex;
  top: 30px;
  right: 20px;
  min-width: 25rem;
  z-index: 10000;
  flex-direction: column;
}

.alert {
  position: relative;
  padding: 2px 5px;
  min-height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2rem 0.2rem 2rem 0.2rem;

  &.danger {
    @apply bg-custom-error-700 text-custom-error-500
  }

  &.warn {
    @apply bg-custom-warning-700 text-custom-warning-500
  }

  &.success {
   @apply bg-custom-success-700 text-custom-success-500
  }
}
</style>
