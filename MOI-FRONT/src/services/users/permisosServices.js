// Get specific rol-usuarios
import httpClient from '@/plugins/http_client';

const getPermisosModulosTipoUsuario = async (codigo) => {
    return await httpClient(`/api/v1/rols/permisos-modulos/${codigo}`, {}, 'get');
};

// Update permissions rol-usuarios
const updatePermissionsTipoUsuario = async (data) => {
    return await httpClient(`/api/v1/rols/permisos-modulos`, data, 'post');
};

const getPermisosModulosUsuario = async (codigo) => {
    return await httpClient(`/api/v1/usuarios/permisos-modulos/${codigo}`, {}, 'get');
};

// Update permissions rol-usuarios
const updatePermissionsUsuario = async (data) => {
    return await httpClient(`/api/v1/usuarios/permisos-modulos`, data, 'post');
};

export {
    getPermisosModulosTipoUsuario,
    updatePermissionsTipoUsuario,
    updatePermissionsUsuario,
    getPermisosModulosUsuario
};
