<template>
  <div :class="['grid grid-cols-1 items-center text-left md:grid-cols-2']">
    <label
      v-if="!isEmpty(label)"
      :for="label"
      class="font-medium"
    >{{
        label
      }}</label>
    <div :class="['input-multiselect', {'col-span-2' : isEmpty(label)}]">
      <MultiSelect
        v-bind="$attrs"
        v-model="item"
        :options="items"
        filter
        auto-filter-focus
        :filter-fields="[optionsLabel]"
        :virtual-scroller-options="{
            lazy: true,
            itemSize: 38,
            onLazyLoad: handleScroll,
            showLoader: true,
            loading: loadLazy
          }"
        @hide="paginacion.search = ''"
        @filter="filterItems"
        @change="changeOption"
        @show="getItems"
        :class="[{'border-2 border-custom-error-500': !isEmpty(errors), 'empty': true}]"
        :optionLabel="optionsLabel"
        display="chip"
      >
        <!--          <template #value="slotProps">-->
        <!--            <div-->
        <!--              class="flex"-->
        <!--              v-if="!isEmpty(slotProps.value)"-->
        <!--            >-->
        <!--              <slot-->
        <!--                name="value"-->
        <!--                :value="slotProps.value"-->
        <!--              >-->
        <!--              </slot>-->
        <!--            </div>-->
        <!--          </template>-->
        <template #option="slotProps">
          <slot name="options" :options="slotProps.option">
            <span>{{ slotProps.option[optionsLabel] }}</span>
          </slot>
        </template>
      </MultiSelect>
      <small v-if="!isEmpty(errors)" :class="[' text-custom-error-500 text-start', 'grid' ]">{{
          errors
        }}</small>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, reactive, ref, toRefs, watch } from 'vue';
import { isEmpty } from '@/utils/utilities.js';

const emit = defineEmits(['selected-items', 'data-items']);
const props = defineProps({
  id: {
    type: [String, null],
    required: false,
    default: null
  },
  getAllItems: {
    type: [Function],
    required: false,
    default: () => {
    }
  },
  getItemId: {
    type: [Function],
    required: false,
    default: () => {
    }
  },
  // nombre del campo a mostrar cuando se listen los registros
  optionsLabel: {
    type: [String],
    required: false,
    default: 'nombre'
  },
  label: {
    type: [String, null],
    required: false,
    default: ''
  },
  // nombre del campo por el cual se hará el order by
  orderField: {
    type: [String, null],
    required: false,
    default: 'nombre'
  },
  // en caso se necesite pasar parametros (query) al endpoint
  extraWhere: {
    type: [String, null],
    required: false,
    default: ''
  },
  errors: {
    type: [String, null],
    default: ''
  }
});

const item = ref();
const items = ref([]);
const loadLazy = ref(false);

const {
  orderField,
  getAllItems,
  extraWhere
} = toRefs(props);

const paginacion = reactive({
  pagination: true,
  page: 1,
  take: 5,
  search: '',
  orderField: orderField.value,
  directionOrder: 'ASC'
});

const filterItems = async ({ value }) => {
  paginacion.search = value;
  await getItems();
};

const getItems = async () => {
  try {
    const { data: response } = await getAllItems.value(paginacion);
    const { data } = response; // data: nombre del objeto que retorna el endpoint
    items.value = data || [];
  } catch (_error) {
  }
};

const handleScroll = async (event) => {
  loadLazy.value = true;
  const { last } = event;
  if (+last === items.value?.length || paginacion.take <= 5 || paginacion.search !== '') {
    paginacion.take += 5;
    await getItems();
  }
  loadLazy.value = false;
};

const changeOption = ({ value }) => {
  item.value = value;
  emit('selected-items', value.map((v) => v.id) || []);
  emit('data-items', value || []);
};

const deleteOption = (id) => {
  console.log('delete', id);
};
// watch(
//   () => id.value,
//   async () => {
//     if (id.value) {
//       await getEspecificItem();
//     } else {
//       item.value = null;
//     }
//     // await getItems();
//   },
//   {
//     deep: true,
//     immediate: true
//   } // Se ejecuta immendiatamente cambia el valor
// );

// Usa `watch` para actualizar `itemssActions` cuando cambien las props
watch(
  [() => extraWhere.value, () => orderField.value],
  async () => {
    if (extraWhere.value || orderField.value) {
      if (orderField.value) paginacion.orderField = orderField.value;
      if (extraWhere.value) paginacion.extraWhere = extraWhere.value;
      await getItems();
    }
  },
  { deep: true }
);
</script>

<style></style>
