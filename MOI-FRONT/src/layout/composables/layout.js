// import { toRefs, reactive, computed } from 'vue';
//
// const contextPath = import.meta.env.BASE_URL;
//
//
// export function useLayout() {
//
//   return {
//     contextPath
//   };
// }

import { toRefs, reactive, computed } from 'vue';

const contextPath = import.meta.env.BASE_URL;

const layoutConfig = reactive({
  activeMenuItem: null
});

const layoutState = reactive({
  configSidebarVisible: false,
  staticMenuMobileActive: false,
  menuHoverActive: false,
});

export function useLayout() {

  const setActiveMenuItem = (item) => {
    layoutConfig.activeMenuItem = item?.value || item;
  };


  return {
    layoutConfig: toRefs(layoutConfig),
    layoutState: toRefs(layoutState),
    setActiveMenuItem,
    contextPath,
  };
}
