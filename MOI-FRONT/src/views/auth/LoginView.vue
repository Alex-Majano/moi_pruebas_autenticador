<template>
  <div
    class="grid grid-cols-1 md:grid-cols-5"
    :style="{height: '93.6vh'}"
  >
    <div
      class="img-login col-span-2  hidden md:block lg:col-span-3 "
      :style="`background-image: url(${logoUrl}) !important`"
    />
    <div class="col-span-3 flex h-screen lg:col-span-2">
      <div class="flex w-full flex-col items-center justify-center gap-6">
        <img-component
          svg-icon="Logo"
          class="w-6/12"
        />
        <div class="w-6/12 rounded-md bg-custom-primary-900 md:w-8/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12">
          <form @submit="onSubmit">
            <div class="flex flex-col gap-6 py-8 mx-6 md:mx-10">
              <span class="py-3 text-center text-xl font-bold text-white">Iniciar sesión</span>
              <input-component
                v-model="email"
                type="email"
                placeholder="Ingrese el correo electrónico"
                icon="mdi mdi-account"
                :errors="errors.email"
              />

              <password-component
                v-model="password"
                placeholder="Ingrese contraseña"
                is-login
                icon="mdi mdi-lock"
                :errors="errors.password"
              />

              <!-- ✅ MODAL PARA 2FA -->
              <div v-if="show2FAModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg p-6 w-11/12 md:w-1/3 lg:w-1/4">
                  <h3 class="text-lg font-bold mb-4">Verificación en dos pasos</h3>
                  <p class="mb-4">Ingrese el código de 6 dígitos de su aplicación authenticator</p>
                  
                  <input-component
                    v-model="twoFACode"
                    type="text"
                    placeholder="Código de verificación"
                    maxlength="6"
                    class="mb-4"
                  />
                  
                  <div class="flex justify-end gap-2">
                    <button-component
                      label="Cancelar"
                      class="btn btn-secondary"
                      @click="show2FAModal = false"
                    />
                    <button-component
                      label="Verificar"
                      class="btn btn-primary"
                      @click="verify2FA"
                    />
                  </div>
                </div>
              </div>

              <div class="flex justify-center">
                <button-component
                  label="Ingresar"
                  class="btn btn-secondary mt-4 w-6/12"
                  type="submit"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <app-footer />
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';

import { useLayout } from '@/layout/composables/layout';
import { loaderPlugin } from '@/plugins/utils.js';
import { login, verify2FA as verify2FAService } from '@/services/auth/auth.js';

const { contextPath } = useLayout();
const router = useRouter();

// ✅ ESTADOS PARA MANEJAR 2FA
const show2FAModal = ref(false);
const twoFACode = ref('');
const userIdFor2FA = ref('');
const emailFor2FA = ref('');

const schema = toTypedSchema(yup.object({
  email: yup.string().required('El correo electrónico es requerido')
    .email('El correo electrónico es inválido')
    .test(
      'domain',
      'El dominio del correo no es permitido',
      value => value && value.endsWith('@salud.gob.sv')
    ),
  password: yup.string().required('La contraseña es requerida'),
}));

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: schema,
  initialErrors: {} // Evita validaciones previas
});

const [email] = defineField('email', { validateOnModelUpdate: false });
const [password] = defineField('password', { validateOnModelUpdate: false });

const logoUrl = computed(() => {
  return `${contextPath}images/login.jpg`;
});

const onSubmit = handleSubmit(async (values) => {
  loaderPlugin.show();
  try {
    const response = await login({
      email: values.email,
      password: values.password
    });

    // ✅ VERIFICAR SI REQUIERE 2FA
    if (response.requires2fa) {
      // Mostrar modal para ingresar código 2FA
      show2FAModal.value = true;
      userIdFor2FA.value = response.userId;
      emailFor2FA.value = response.email;
      
      // Opcional: mostrar notificación
      console.log('Se requiere verificación de 2FA:', response.message);
    } else {
      // Login exitoso sin 2FA - redirigir al home
      await router.push({ name: 'home', replace: true });
    }
  } catch (error) {
    console.error('Error en login:', error);
    // Manejar errores de login aquí
  } finally {
    loaderPlugin.hide();
  }
});

// ✅ MÉTODO PARA VERIFICAR CÓDIGO 2FA
const verify2FA = async () => {
  if (!twoFACode.value || twoFACode.value.length !== 6) {
    console.error('Código de verificación inválido');
    return;
  }

  loaderPlugin.show();
  try {
    await verify2FAService({
      userId: userIdFor2FA.value,
      token: twoFACode.value
    });
    
    // ✅ Verificación exitosa - redirigir al home
    show2FAModal.value = false;
    await router.push({ name: 'home', replace: true });
  } catch (error) {
    console.error('Error en verificación 2FA:', error);
    // Manejar errores de verificación aquí
  } finally {
    loaderPlugin.hide();
  }
};
</script>

<style scoped>
.img-login {
  background-repeat: no-repeat;
  background-position: left top;
  position: relative;
  background-size: auto 95%;
  z-index: -1;
}

/* ✅ Estilos para el modal de 2FA */
.fixed {
  position: fixed;
}
.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.bg-opacity-50 {
  background-color: rgba(0, 0, 0, 0.5);
}
.z-50 {
  z-index: 50;
}
</style>