<template>
  <a-divider>顶栏主题色</a-divider>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-item`">
      <div :class="`${prefixCls}-item__left`"> 顶栏色 </div>
      <div :class="`${prefixCls}-item__right`">
        <a-color-picker
          v-model="store.topbarTheme"
          :show-preset="true"
          :disabled-alpha="true"
          :preset-colors="presetColor"
          format="hex"
          @change="changeTopbarTheme"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import presetColor from './preset-color'

import { useDesign } from '@/hooks/web/useDesign'
import { changeTopbarTheme } from '@/hooks/web/useTopbarTheme'
import { useConfigStore } from '@/stores'

const store = useConfigStore()

const { prefixCls } = useDesign('theme-color')
</script>

<style lang="less"></style>
