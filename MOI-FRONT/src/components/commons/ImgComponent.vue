<template>
  <img
    :src="logoUrl"
    alt="Logo"
    class="my-3"
  >
</template>
<script setup>
import {useLayout} from '@/layout/composables/layout';
import {computed, toRefs} from 'vue';

const {contextPath} = useLayout();

const props = defineProps({
  svgIcon: {
    type: String,
    required: false,
    default: ''
  },
});

const {svgIcon} = toRefs(props);

const logoUrl = computed(() => {
  return svgIcon.value
    ? `${contextPath}images/${svgIcon.value}.svg`
    : ``;
});
</script>

<style lang="scss" scoped></style>
