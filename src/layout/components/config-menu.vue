<template>
  <a-divider>菜单模式</a-divider>
  <div class="flex justify-center">
    <a-radio-group v-model="store.menuMode" type="button">
      <a-radio value="default">默认</a-radio>
      <a-radio value="overlay">抽屉</a-radio>
      <a-radio value="collapse">折叠</a-radio>
      <a-radio value="top">顶部</a-radio>
    </a-radio-group>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'

import { useConfigStore } from '@/stores'
// https://github.com/vuejs/pinia/discussions/854
const store = useConfigStore()

watch(
  () => store.menuMode,
  (newValue) => {
    // 切换菜单模式为默认、抽屉，如果隐藏了就显示
    if (['default', 'overlay'].includes(newValue) && !store.sideMenu) {
      store.setSideMenuConfig(!store.sideMenu)
    }
  }
)
</script>

<style></style>
