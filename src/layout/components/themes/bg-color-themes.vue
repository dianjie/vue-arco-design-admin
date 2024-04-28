<template>
  <a-divider>背景主题色</a-divider>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-item`">
      <div :class="`${prefixCls}-item__left`"> 背景色 </div>
      <div :class="`${prefixCls}-item__right`">
        <a-color-picker v-model="store.bgColorTheme" format="hex" @change="changeBgColorTheme" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { changeBgColorTheme } from '@/hooks/web/useBgColorTheme'
import { useDesign } from '@/hooks/web/useDesign'
import { useConfigStore } from '@/stores'

const store = useConfigStore()

const { prefixCls } = useDesign('theme-color')
</script>

<style lang="less"></style>
