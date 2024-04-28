<template>
  <a-divider>界面功能</a-divider>
  <div class="flex justify-between my-4">
    <span> 固定侧边菜单</span>
    <a-switch
      v-model="store.sidebarFixed"
      :disabled="sidebarFixedDisabled"
      @change="(val) => sidebarFixedChange(store, val)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { sidebarFixedChange } from '@/hooks/web/useSidebarFixed'
import { useConfigStore } from '@/stores'

const store = useConfigStore()

const sidebarFixedDisabled = computed(() => {
  return store.menuModeIsTop || store.menuModeIsOverlay
})
</script>

<style lang="less"></style>
