import { useUtilsStore } from '@/store';

const temporalAlertPlugin = {
    show(alert) {
        const utilsStore = useUtilsStore();
        utilsStore.setAlert(alert);
    }
};

const loaderPlugin = {
    show() {
        const utilsStore = useUtilsStore();
        utilsStore.setLoader(true);
    },
    hide() {
        const utilsStore = useUtilsStore();
        utilsStore.setLoader(false);
    }
};

export { temporalAlertPlugin, loaderPlugin };
