<template>
  <div :class="['grid grid-cols-1 items-center text-left md:grid-cols-2']">
    <label
      v-if="!isEmpty(label)"
      :for="label"
      class="font-medium"
    >{{
        label
      }}</label>
    <div :class="['input-container', {'col-span-2' : isEmpty(label)}]">
      <i
        v-if="icon"
        :class="[icon, 'text-xl']"
      />
      <InputText
        v-bind="$attrs"
        :id="label"
        :type="type"
        :model-value="modelValue"
        :class="{'invalid': !isEmpty(errors)}"
        unstyled
        @input="emit('update:model-value', $event.target.value)"
        @blur="emit('blur')"
      />
      <small v-if="!isEmpty(errors)" :class="[' text-custom-error-500 text-start', 'grid' ]">{{
          errors
        }}</small>
    </div>
  </div>
</template>
<script setup>
import { isEmpty } from '@/utils/utilities.js';

const emit = defineEmits(['update:model-value', 'blur']);
defineProps({
  modelValue: {
    type: String,
    required: false,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  icon: {
    type: String,
    required: false,
    default: ''
  },
  errors: {
    type: [String, null],
    default: null
  }
});
</script>

<style lang="scss" scoped>
</style>
