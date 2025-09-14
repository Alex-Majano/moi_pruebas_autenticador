import httpClient from '@/plugins/http_client';

const getMenuUser = async () => {
    return await httpClient('/api/menu', {}, 'get');
};

const getUsers = async (data) => {
    return await httpClient('/api/usuarios', data, 'get');
};

const getOneUser = async (id) => {
    return await httpClient(`/api/usuarios/${id}`, {}, 'get');
};

const createUsuario = async (data) => {
    return await httpClient(`/api/usuarios`, data, 'post');
};

const updateUsuario = async (id, data) => {
    return await httpClient(`/api/usuarios/${id}`, data, 'put');
};

const deleteUsuario = async (id) => {
    return await httpClient(`/api/usuarios/${id}`, {}, 'delete');
};

const desactiveUsuario = async (id) => {
    return await httpClient(`/api/usuarios/desactivacion/${id}`, {}, 'put');
};

const activeUsuario = async (id) => {
    return await httpClient(`/api/usuarios/activacion/${id}`, {}, 'put');
};
export {
    getMenuUser,
    getUsers,
    getOneUser,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    desactiveUsuario,
    activeUsuario,
};
