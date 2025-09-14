<template>
  <div
    v-if="modal"
    class="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="fixed inset-0 bg-gray-500/75 transition-opacity"
      aria-hidden="true"
    />
    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4 text-center">
        <div
          class="relative overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        >
          <div
            v-if="!isEmpty(header)"
            :class="['border-b-2 px-4 pb-4 pt-2 sm:px-4 sm:py-3', {
              'border-b-gray-100 bg-white': type === 'default',
              'border-b-custom-primary-500 bg-custom-primary-900 text-custom-primary-500': type === 'primary',
              'border-b-custom-error-500 bg-custom-error-700 text-custom-error-500': type === 'error',
              'border-b-custom-success-500 bg-custom-success-700 text-custom-success-500': type ==='success',
              'border-b-custom-warning-500 bg-custom-warning-700 text-custom-warning-500': type === 'warning',

            }]"
          >
            <h3
              id="modal-title"
              class="text-left text-xl font-semibold"
            >
              {{ header }}
            </h3>
          </div>
          <div class="bg-white px-6 pb-4 pt-2 sm:flex sm:items-start">
            <div class="text-left">
              <div class="mt-5">
                <slot name="content" />
              </div>
            </div>
          </div>
          <div class="flex justify-center gap-4 px-6 py-3">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

import {ref} from "vue";
import {isEmpty} from "@/utils/utilities.js";

defineProps({
  header: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'default'
  }
});


const modal = ref(true);

const handleModal = () => {
  modal.value = !modal.value;
}

defineExpose({ handleModal });

</script>

<style lang="scss" scoped>
</style>
