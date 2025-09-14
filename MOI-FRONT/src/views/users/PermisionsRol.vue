<template>
  <div class="card">
    <Toolbar class="py-6 text-center text-2xl">
      <template #start>
        <div>
          <h2 class="font-bold">
            Administrar permisos de acceso al sistema "{{ tipoUsuario }}"
          </h2>
        </div>
      </template>
    </Toolbar>
    <section v-if="!isEmpty(permisosModulos)">
      <div
        v-for="(item, index) in permisosModulos"

        :key="index"
        class="m-3 rounded-lg border-2 border-gray-100 px-12 py-6"
      >
        <h2 class="mb-4 text-xl font-bold">
          {{ item.label }}
        </h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(permission, index2) in item.items"
            :key="index2"
            class="rounded-lg border p-4"
          >
            <h3 class="mb-2 text-lg font-semibold">
              {{ permission.label }}
            </h3>
            <div class="flex items-center gap-2">
              <InputSwitch
                v-model="permission.activo_completo"
                :input-id="permission.id"
                @change="changeELement(permission.activo_completo,permission.id)"
              />
              <label
                for="checkPermission"
                class="flex items-center"
              >TODOS</label>
            </div>
            <div
              v-for="(permission2, index3) in permission.items"
              :key="index3"
              class="mt-2 flex items-center gap-2"
            >
              <InputSwitch
                v-model="permission2.activo"
                :input-id="permission2.idModulo"
                :input-class="'permisosModulos_' +permission.id +' permisosModulos'"
                @change="changeElementChild(permission2.activo,permission.id,permission2.idModulo)"
                @update:model-value="value = $event"
              />
              <label for="checkPermission">{{ permission2.label }}</label>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="flex justify-center p-4 sm:justify-end">
      <button-component
        label="Actualizar permisos"
        class="btn btn-primary h-9 w-auto"
        @click="updatePermisosTipoUsuario"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import {
  getPermisosModulosTipoUsuario,
  updatePermissionsTipoUsuario
} from '@/services/users/permisosServices';
import { verifyPermisson } from '@/services/auth/auth';
import { loaderPlugin, temporalAlertPlugin } from '@/plugins/utils';
import { useUtilsStore } from '@/store';
import { isEmpty } from '@/utils/utilities.js';

const utilsStore = useUtilsStore();
const route = useRoute();
const IdTipoUsuario = ref(route.params?.id);
const tipoUsuario = ref(null);
const permisosModulos = ref([]);

const getPermisosTipoUsuario = async () => {
  loaderPlugin.show();
  const { data } = await getPermisosModulosTipoUsuario(IdTipoUsuario.value);
  tipoUsuario.value = data.rol;
  permisosModulos.value = data.permisos;
  loaderPlugin.hide();
};

const updatePermisosTipoUsuario = async () => {
  loaderPlugin.show();
  var permisos = document.getElementsByClassName('permisosModulos');
  let stringSend = '{';
  let contador = 1;
  for (let element in permisos) {
    try {
      let idModulo = permisos[element].getAttribute('id');
      let checked = permisos[element].getAttribute('aria-checked');
      if (checked === 'true') {
        if (contador === 1) {

          stringSend += `\"mod${contador}\":\"${idModulo}\"`;
        } else {

          stringSend += `, \"mod${contador}\":\"${idModulo}\"`;
        }
        contador++;
      }
    } catch (_e) {
      /* empty */
    }
  }
  stringSend += '}';
  const data = {
    id: IdTipoUsuario.value,
    array: stringSend
  };
  await updatePermissionsTipoUsuario(data);
  loaderPlugin.hide();
  temporalAlertPlugin.show({
    severity: 'success',
    message: 'Permisos actualizados correctamente',
    life: 3000
  });
  // this.$router.replace('/tipos-usuarios');
};
const changeELement = (event, id) => {
  const permisos = document.getElementsByClassName(`permisosModulos_${id}`);
  for (const element of permisos) {
    try {
      const idModulo = element?.getAttribute('id');
      const checked = element?.getAttribute('aria-checked');
      let checkboolean = false;
      if (checked === 'true') {
        checkboolean = true;
      }
      if (checkboolean !== event) {
        document.getElementById(idModulo).click();
      }
    } catch (_e) {
      /* empty */
    }
  }
};

const changeElementChild = (newState, id, idModulo) => {
  const permisos = document.getElementsByClassName(`permisosModulos_${id}`);
  let iguales = true;
  for (const element of permisos) {
    try {
      const idModuloNuevo = element?.getAttribute('id');
      const checked = element?.getAttribute('aria-checked');
      let checkboolean = false;
      if (checked === 'true') {
        checkboolean = true;
      }
      if (checkboolean !== newState && idModuloNuevo !== idModulo) {
        iguales = false;
      }
    } catch (_e) {
      /* empty */
    }
  }
  let inputTodos = document.getElementById(id);
  let checkedAll = inputTodos?.getAttribute('aria-checked');
  let checkedBoolean = false;
  if (checkedAll === 'true') {
    checkedBoolean = true;
  }
  if (iguales) {
    if (
      (checkedBoolean === true && newState === false) ||
      (checkedBoolean === false && newState === true)
    ) {
      inputTodos.click();
    }
  }
};

const handlerPermisson = async () => {
  const { data } = await verifyPermisson('/administrar/permisos-modulos');
  if (!data[0]?.status) await utilsStore.forbidden();
  await getPermisosTipoUsuario();
};

onMounted(async () => {
  await handlerPermisson();
});
</script>
<style scoped lang="scss"></style>
