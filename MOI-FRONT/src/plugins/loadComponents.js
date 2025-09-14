import {camelCase, upperFirst} from "lodash";

const regComponents = async (vm) => {
  const requireComponent = import.meta.glob('@/**/**/*.vue');
  for (const file in requireComponent) {
    if (Object.prototype.hasOwnProperty.call(requireComponent, file)) {
      const componentConf = await requireComponent[file]();
      const fileName = file.match(/[^/]+\.vue$/)[0]; // Obtener el nombre del archivo con extensión
      const componentName = upperFirst(camelCase(fileName.replace(/\.\w+$/, '')));

      vm.component(componentName, componentConf.default || componentConf);
    }
  }
};

export default regComponents;
