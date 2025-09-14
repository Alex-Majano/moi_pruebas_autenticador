<template>
  <div :class="['grid grid-cols-1 items-center text-left md:grid-cols-2']">
    <label
      v-if="!isEmpty(label)"
      :for="label"
      class="font-medium"
    >{{ label }}</label>

    <div :class="['password-container',{'col-span-2' : isEmpty(label)}]">
      <i
        v-if="icon"
        :class="icon"
      />
      <Password
        v-bind="$attrs"
        :id="label"
        :model-value="modelValue"
        toggle-mask
        :feedback="false"
        :placeholder="placeholder ? placeholder : ''"
        :class="['password-input',{'invalid': !isEmpty(errors)}]"
        unstyled
        @input="emit('update:modelValue', $event.target.value)"
        @blur="emit('blur')"
      />
      <small
        v-if="!isEmpty(errors)"
        id="text-error"
        class="pt-1 text-custom-error-500"
      >{{ errors }}</small>
    </div>
  </div>

</template>
<script setup>
import { isEmpty } from '@/utils/utilities.js';

const emit = defineEmits(['update:modelValue', 'validate', 'blur']);

defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  icon: {
    type: [String, null],
    default: 'mdi mdi-lock'
  },
  placeholder: {
    type: String,
    default: ''
  },
  errors: {
    type: [String, null],
    default: null
  }
});

</script>

<style lang="css" scoped>

</style>
