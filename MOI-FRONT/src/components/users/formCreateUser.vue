<template>
  <form @submit.prevent="onSubmitForm">
    <div class="flex justify-center py-8">
      <div class="grid grid-cols-1 gap-4 w-9/12 2xl:w-8/12">
        <div>
          <input-component
            v-model="usuario"
            label="Usuario:*"
            placeholder="Escriba..."
            :errors="errors.usuario"
          />
        </div>
        <div>
          <input-component
            v-model="nombreUsuario"
            label="Nombre del usuario:*"
            placeholder="Escriba..."
            :errors="errors.nombreUsuario"
          />
        </div>
        <div>
          <select-component
            :get-all-items="getTiposUsuarios"
            @selected-items="(id) => rolUsuario = id"
            order-field="name"
            option-label="name"
            label="Rol de usuario*"
            placeholder="Seleccione"
            :errors="errors.rolUsuario"
          />
        </div>
        <div>
          <select-component
            v-model="nivelUsuario"
            @selected-item="(id) => nivelUsuario = id"
            label="Nivel del usuario*"
            placeholder="Seleccione"
            :errors="errors.nivelUsuario"
          />
        </div>
        <div>
          <select-component
            v-model="stocks"
            label="Stocks:*"
            placeholder="Seleccione"
            :errors="errors.stocks"
          />
        </div>
        <div>
          <div class="grid grid-col-1 md:grid-cols-2">
            <span>Permisos:</span>
            <section class="mr-1 xl:mr-8">
              <div
                v-for="category in categories"
                :key="category.key"
                class="flex items-center gap-3"
              >
                <checkbox
                  v-model="permisos"
                  type="checkbox"
                  :value="category.key"
                />
                <label :for="category.key">{{ category.name }}</label>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-8 flex justify-center pb-8">
      <button-component
        label="Crear"
        class="btn btn-secondary border-2 border-custom-primary-900 hover:border-custom-primary-500"
        type="submit"
      />
    </div>
  </form>
</template>
<script setup>
import { ref } from 'vue';
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';
import { useForm } from 'vee-validate';
import { getTiposUsuarios } from '@/services/users/tiposUsuariosServices.js';
import Select from 'primevue/select';
import MultiSelectComponent from '@/components/commons/MultiSelectComponent.vue';

const categories = ref([
  { name: 'Administración', key: 'A' },
  { name: 'Generación de reportes', key: 'M' },
  { name: 'Introducción de requisiciones', key: 'P' }
]);

const schema = toTypedSchema(
  yup.object({
    usuario: yup.string().required('El usuario es requerido').min(3, 'El usuario debe contener mínimo 3 caracteres'),
    nombreUsuario: yup.string().required('El nombre del usuario es requerido'),
    rolUsuario: yup.string().required('El rol  del usuario es requerido'),
    nivelUsuario: yup.string().required('El nivel del usuario es requerido'),
    stocks: yup.string().required('Los stocks son requeridos'),
    permisos: yup.array().nullable().of(yup.string()).default([]) // Valor por defecto
  })
);

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: schema,
  initialErrors: {} // Evita validaciones previas
});

const [usuario] = defineField('usuario', { validateOnModelUpdate: false });

const [nombreUsuario] = defineField('nombreUsuario', { validateOnModelUpdate: false });

const [rolUsuario] = defineField('rolUsuario', { validateOnModelUpdate: false });

const [nivelUsuario] = defineField('nivelUsuario', { validateOnModelUpdate: false });

const [stocks] = defineField('stocks', { validateOnModelUpdate: false });

const [permisos] = defineField('permisos', { validateOnModelUpdate: true });


const onSubmitForm = handleSubmit(() => {
  alert('knskfksf');
});

</script>
<style scoped lang="scss">

</style>
