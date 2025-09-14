<template>
  <Button
    :label="label"
    :class="{'disabled': disabled}"
    :icon="icon"
    icon-class="text-xl pr-2"
    :size="size ? size : 'small'"
    :style="{
      paddingTop: '4px',
      paddingBottom: '4px'
    }"
/>
</template>
<script setup>
defineProps({
  label: {
    type: [String, null],
    required: false,
    default: ''
  },
  color: {
    type: String,
    default: 'primary'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'small'
  }
});
</script>

<style scoped lang="scss"></style>
