import axiosInstance from '@/plugins/axios';
import {loaderPlugin, temporalAlertPlugin} from '@/plugins/utils';
import { useUtilsStore } from '@/store';
import { sesionStorage } from "@/store/sesion";
import { isEmpty } from "@/utils/utilities";
const utilsStore = useUtilsStore();
const session = sesionStorage();


const httpClient = async (url, data = {}, method = 'get', headers = {}, sendToken = true) => {
    let config = { method, url, headers };
    if (sendToken) {
        const { token } = session;
        if (!isEmpty(token)) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    if (method === 'get') {
        config.params = data;
    } else {
        config.data = data;
    }
    try {
        return await axiosInstance(config);
    } catch (e) {
        switch (e?.status) {
            case 500:
                temporalAlertPlugin.show({
                    severity: 'error',
                    message: e?.data?.message || 'Ha ocurrido un error interno',
                    life: 3000
                });
                break;
            case 422:
                temporalAlertPlugin.show({
                    severity: 'info',
                    message: e?.data?.message || 'No se pudo procesar la entidad',
                    life: 3000
                });
                break;
            case 404:
                temporalAlertPlugin.show({
                    severity: 'warns',
                    message: e?.data?.message || 'No se encontró el recurso',
                    life: 3000
                });
                // await utilsStore.notFound();
                break;
            case 403:
                temporalAlertPlugin.show({
                    severity: 'error',
                    message: e?.data?.message || 'Petición rechazada',
                    life: 3000
                });
                loaderPlugin.hide();
                await utilsStore.forbidden();
                break;
            case 400:
                temporalAlertPlugin.show({
                    severity: 'error',
                    message: e?.data?.message || 'Petición errónea',
                    life: 3000
                });
                break;
            case 401:
                // temporalAlertPlugin.show({
                //     severity: 'error',
                //     message: e?.data?.message || 'Acceso no autorizado',
                //     life: 3000
                // });
                break;
            default:
                temporalAlertPlugin.show({
                    severity: 'error',
                    message: e?.data?.message || 'Error al realizar petición',
                    life: 3000
                });
        }
        loaderPlugin.hide();
        throw e;
    }
};

export default httpClient;
