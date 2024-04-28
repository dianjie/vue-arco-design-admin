<template>
  <a-divider>界面显示</a-divider>
  <div class="flex justify-between my-4">
    <span> 灰色模式</span>
    <a-switch v-model="store.grayMode" @change="updateGrayMode" />
  </div>
  <div class="flex justify-between my-4">
    <span> 色弱模式</span>
    <a-switch v-model="store.colorWeak" @change="updateColorWeak" />
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/stores'
import { toggleClass } from '@/utils/toggleClass'

const store = useConfigStore()

const updateGrayMode = (gray: any) => {
  toggleClass(gray, 'gray-mode')
  if (gray) {
    toggleClass(false, 'color-weak')
  } else {
    toggleClass(store.colorWeak, 'color-weak')
  }
}

const updateColorWeak = (colorWeak: any) => {
  toggleClass(colorWeak, 'color-weak')
  if (colorWeak) {
    toggleClass(false, 'gray-mode')
  } else {
    toggleClass(store.grayMode, 'gray-mode')
  }
}
</script>

<style lang="less"></style>
