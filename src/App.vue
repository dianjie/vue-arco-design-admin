<template>
  <a-config-provider>
    <router-view />
  </a-config-provider>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { provide } from 'vue'
import { RouterView } from 'vue-router'

import { isDark } from '@/hooks/web/useDark'
import { useConfigStore } from '@/stores'

const store = useConfigStore()
const { sideMenu } = storeToRefs(store)

provide('sideMenu', sideMenu)
provide('isDark', isDark)
</script>

<style></style>
