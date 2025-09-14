<template>
  <div>

      <Transition
        v-if="!isEmpty(item.items) && item.visible !== false"
        name=""
      >
        <ul
          v-show="isActiveMenu"
          class=""
        >
          <app-menu-item
            v-for="(child, i) in item.items"
            :key="child"
            :index="i"
            :item="child"
            :parent-item-key="itemKey"
            :root="root"
          />
        </ul>
      </Transition>
  </div>
</template>

<script setup>
import {ref, onBeforeMount, watch} from 'vue';
import {useLayout} from '@/layout/composables/layout';
import {isEmpty} from '@/utils/utilities';


const {layoutConfig } = useLayout();

const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  },
  index: {
    type: Number,
    default: 0
  },
  root: {
    type: Boolean,
    default: true
  },
  parentItemKey: {
    type: String,
    default: null
  }
});

const isActiveMenu = ref(false);
const itemKey = ref(null);

onBeforeMount(() => {
  itemKey.value = props.parentItemKey
    ? props.parentItemKey + '-' + props.index
    : String(props.index);

  isActiveMenu.value = false;
});

watch(
  () => layoutConfig.activeMenuItem.value,
  (newVal) => {
    isActiveMenu.value = newVal === itemKey?.value || newVal?.startsWith(itemKey.value + '-');
  }
);
</script>

<style scoped>
</style>
