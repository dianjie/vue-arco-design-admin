<template>
  <div :class="prefixCls">
    <base-header />
    <base-menu v-if="!menuModeIsTop" />
    <base-content />
    <base-config />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import BaseConfig from './components/base-config.vue'
import BaseContent from './components/base-content.vue'
import BaseHeader from './components/base-header.vue'
import BaseMenu from './components/base-menu.vue'

import { useDesign } from '@/hooks/web/useDesign'
import { useConfigStore } from '@/stores'

const { prefixCls } = useDesign('layout-wrapper')

const configStore = useConfigStore()
const { menuModeIsTop } = storeToRefs(configStore)
</script>
