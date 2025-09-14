<template>
<Menubar :model="menu" breakpoint="768px" class="">
  <template #item="{ item, hasSubmenu }">
    <div class="">
      <a
        v-if="(!item.to || !isEmpty(item.items)) && item.visible !== false"
        :href="item.url"
        :target="item.target"
        tabindex="0"
      >
        <span
          class=""
        >{{ item.label }}</span>
      </a>

      <router-link
        v-if="item.to && isEmpty(item.items) && item.visible !== false"
        tabindex="0"
        :to="item.to"
      >
        <span
          class=""
        >{{ item.label }}</span>
      </router-link>
</div>
    </template>
  </Menubar>
<!--  <div class="relative">
    <button
      class="menu-toggle md:hidden"
      @click="toggleMenu"
    >
      ☰
    </button>

    <ul
      class="layout-menu bg-menu-500 text-white"
      :class="{ 'mobile-active': isMobileMenuOpen }"
    >
      <template
        v-for="(item, i) in menu"
        :key="item"
      >
        <app-menu-item
          :item="item"
          :index="i"
        />
      </template>
    </ul>
  </div>-->
</template>


<script setup>
import {onMounted, ref} from "vue";
import {loaderPlugin} from "@/plugins/utils";
import {getMenu} from "@/services/auth/auth";
import { isEmpty } from '@/utils/utilities';

const menu = ref([]);
onMounted(async () => {
  loaderPlugin.show();
  const { data } = await getMenu();
  menu.value = data;
  loaderPlugin.hide();
});
</script>

<style></style>
