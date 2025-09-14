<template>
  <div :class="['grid grid-cols-1 items-center text-left md:grid-cols-2']">
    <label
      v-if="!isEmpty(label)"
      :for="label"
      class="font-medium"
    >{{
        label
      }}</label>
    <div :class="['input-select', {'col-span-2' : isEmpty(label)}]">
      <Select
        v-bind="$attrs"
        v-model="item"
        :options="items"
        show-clear
        filter
        auto-filter-focus
        :filter-fields="Array.isArray(optionLabel) ? optionLabel : [optionLabel]"
        panel-class="panel-select-input"
        reset-filter-on-hide
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
        :class="[{'border-2 border-custom-error-500': !isEmpty(errors)}]"
        :input-class="[{'text-gray-400': isEmpty(item)}]"
      >
        <template #value="slotProps">
          <div
            v-if="slotProps.value"
            class="flex"
          >
            <slot
              name="default"
              :item="slotProps.value"
            >
                <span class="white-space-normal">
                  <template v-if="Array.isArray(labelSelected)">
                    <span
                      v-for="(text, index) in labelSelected"
                      :key="index"
                      class=""
                    >
                      {{ slotProps.value[text] }}
                      <span
                        v-if="index < labelSelected.length - 1"
                        class="ml-1"
                      >
                        /
                      </span>
                    </span>
                  </template>
                  <template v-else>
                    {{ slotProps.value[handlerOpcionLabel] }}
                  </template>
                </span>
            </slot>
          </div>
        </template>
        <template #option="slotProps">
          <div
            v-if="Array.isArray(optionLabel)"
            class=""
          >
              <span
                v-for="(text, index) in optionLabel"
                :key="index"
                class=""
              >
                {{ slotProps.option[text] }}
                <span
                  v-if="index < optionLabel.length - 1"
                  class="ml-1"
                >
                  /
                </span>
              </span>
          </div>
          <div
            v-else
          >
            <span>{{ slotProps.option[optionLabel] }}</span>
          </div>
        </template>
      </Select>
      <small v-if="!isEmpty(errors)" :class="[' text-custom-error-500 text-start', 'grid' ]">{{
          errors
        }}</small>
    </div>
  </div>
</template>
<script setup>
import Select from 'primevue/select';
import { computed, onMounted, reactive, ref, toRefs, watch } from 'vue';
import { isEmpty } from '@/utils/utilities.js';

const emit = defineEmits(['selectedItem', 'dataItem']);
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
  optionLabel: {
    type: [String, Array],
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
  // nombre del campo a mostrar una vez seleccionado el registro
  labelSelected: {
    type: [String, Array],
    required: false,
    default: 'nombre'
  },
  // en caso se necesite pasar parametros (query) al endpoint
  extraWhere: {
    type: [String, null],
    required: false,
    default: ''
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  },
  errors: {
    type: [String, null],
    default: ''
  }
});

const item = ref();
const items = ref([]);
const loadLazy = ref(false);
const isFindById = ref(false);

const {
  id,
  orderField,
  getAllItems,
  getItemId,
  optionLabel,
  labelSelected,
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

const labelOption = ref(null);

const filterItems = async ({ value }) => {
  paginacion.search = value;
  await getItems();
};

const getItems = async () => {
  try {
    const { data: response } = await getAllItems.value(paginacion);
    const { data } = response; // data: nombre del objeto que retorna el endpoint

    if (!isEmpty(data)) {
      await filtrarRegistros(data);
    }
  } catch (_error) {
  }
};

const getEspecificItem = async () => {
  if (!isFindById.value && !Array.isArray(labelSelected.value)) {
    const { data } = await getItemId.value(id.value);
    item.value = data;
    isFindById.value = true;
    labelOption.value = labelSelected.value;
    return handlerOpcionLabel;
  }
};

const filtrarRegistros = async (data) => {
  items.value = data;
  if (item.value) {
    const existInArray = data.map((a) => a.id).includes(item.value.id);
    if (existInArray) {
      const resultadosSinDuplicado = data.map((a) => a).filter((v) => v.id !== item.value.id);
      items.value = [item.value, ...resultadosSinDuplicado];
    } else {
      items.value = [item.value, ...items.value];
    }
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

const handlerOpcionLabel = computed(() => {
  if (!labelOption.value) {
    return optionLabel.value;
  }
  return labelOption.value;
});

const changeOption = ({ value }) => {
  item.value = value;
  // if (value?.id) {
  emit('selectedItem', value?.id);
  emit('dataItem', value);
  // }
};

watch(
  () => id.value,
  async () => {
    if (id.value) {
      await getEspecificItem();
    } else {
      item.value = null;
    }
    // await getItems();
  },
  {
    deep: true,
    immediate: true
  } // Se ejecuta immendiatamente cambia el valor
);

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
onMounted(async () => {
  if (orderField.value) {
    paginacion.orderField = orderField.value;
  }
  if (extraWhere.value) {
    paginacion.extraWhere = extraWhere.value;
  }
  // await getItems();
});
</script>

<style></style>
