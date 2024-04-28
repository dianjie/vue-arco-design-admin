<template>
  <a-switch v-model="isDark" @change="handleThemeChange">
    <template #label="slotProps">
      <template v-if="slotProps.value">
        <i-ep-moon />
      </template>
      <template v-else>
        <i-ep-sunny />
      </template>
    </template>
  </a-switch>
</template>

<script setup lang="ts">
import { inject } from 'vue'

import { toggleDark } from '@/hooks/web/useDark'

const isDark = inject('isDark') as boolean
const handleThemeChange = () => {
  toggleDark()
}
</script>

<style lang="less"></style>
