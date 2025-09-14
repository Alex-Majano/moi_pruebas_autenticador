import httpClient from '@/plugins/http_client';

const getTiposUsuarios = async (data) => {
  return await httpClient('/api/v1/rols', data, 'get');
};

const getOneTipoUsuario = async (id) => {
  return await httpClient(`/api/v1/rols/${id}`, {}, 'get');
};

const createTipoUsuario = async (data) => {
  return await httpClient(`/api/v1/rols`, data, 'post');
};

const updateTipoUsuario = async (id, data) => {
  return await httpClient(`/api/v1/rols/${id}`, data, 'put');
};

const deleteTipoUsuario = async (id) => {
  return await httpClient(`/api/v1/rols/${id}`, {}, 'delete');
};

export {
  getTiposUsuarios,
  getOneTipoUsuario,
  createTipoUsuario,
  updateTipoUsuario,
  deleteTipoUsuario
};
