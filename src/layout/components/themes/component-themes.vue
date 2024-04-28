<template>
  <a-divider>组件主题色</a-divider>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-item`" v-for="item in colorTypes" :key="item.title">
      <div :class="`${prefixCls}-item__left`"> {{ item.title }} </div>
      <div :class="`${prefixCls}-item__right`">
        <a-color-picker
          v-model="store[`${item.type}Theme`]"
          format="hex"
          @change="(color) => changeTheme(color, item.type as ThemeType)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { changeTheme, type ThemeType } from '@/hooks/web/useComponentTheme'
import { useDesign } from '@/hooks/web/useDesign'
import { useConfigStore } from '@/stores'

const store = useConfigStore()

const { prefixCls } = useDesign('theme-color')

const colorTypes = [
  {
    title: '主色',
    type: 'brand'
  },
  {
    title: '成功色',
    type: 'success'
  },
  {
    title: '错误色',
    type: 'error'
  },
  {
    title: '警告色',
    type: 'warning'
  }
]
</script>

<style lang="less"></style>
