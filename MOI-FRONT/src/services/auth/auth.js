import httpClient from '@/plugins/http_client';
import {sesionStorage} from "@/store/sesion";
import { toRefs } from 'vue';

const login = async (body) => {
  return await httpClient('/api/v1/auth/login', body, 'post').then((res) => {
    // ✅ VERIFICAR SI REQUIERE 2FA
    if (res.data.requires2fa) {
      // Si requiere 2FA, devolver la información para que el componente la maneje
      return {
        requires2fa: true,
        message: res.data.message,
        email: res.data.email,
        userId: res.data.userId
      };
    } else {
      // Si NO requiere 2FA, guardar token y usuario normalmente
      const session = sesionStorage();
      const { setUser, setToken } = toRefs(session);
      setUser.value(res.data.user);
      setToken.value(res.data.token);
      return {
        requires2fa: false,
        token: res.data.token,
        user: res.data.user
      };
    }
  });
};

// ✅ AGREGAR MÉTODO PARA VERIFICAR CÓDIGO 2FA
const verify2FA = async (body) => {
  return await httpClient('/api/v1/auth/verify-2fa', body, 'post').then((res) => {
    // Después de verificar 2FA exitosamente, guardar token y usuario
    const session = sesionStorage();
    const { setUser, setToken } = toRefs(session);
    setUser.value(res.data.user);
    setToken.value(res.data.token);
    return res.data;
  });
};

const changePassword = async (body) => {
  const data = {
    oldPassword: body.currentPassword,
    newPassword: body.password
  };
  return await httpClient('/api/v1/auth/cambiar-password', data, 'put');
};

const recoverPassword = async (body) => {
  return await httpClient('/api/v1/auth/recuperar-password/${id}', {}, 'post');//Aca realizare un ajuste quitar body por{} majano 
};

const restorePassword = async (body) => {
  return await httpClient('/api/v1/auth/reestablecer-password', body, 'post');
};

const resetPassword = async (body) => {
  return await httpClient('/api/v1/auth/change-password-reset', body, 'post');
};

const verifyPermisson = async (data) => {
  return await httpClient(
    '/api/v1/auth/has-permission',
    {
      data: [
        {
          adminName: data
        }
      ]
    },
    'post'
  );
};

const getMenu = async () => {
  return await httpClient(`/api/v1/menu/`, {}, 'get');
}

export {
  login, 
  verify2FA, // ✅ EXPORTAR EL NUEVO MÉTODO
  changePassword, 
  recoverPassword, 
  restorePassword, 
  resetPassword, 
  verifyPermisson, 
  getMenu
};