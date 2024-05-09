<template>
  <div class="p-4">
    <div class="content-bg flex flex-col flex-items-center justify-center">
      <a-result class="result" status="404" subtitle="抱歉，页面不见了～"> </a-result>
      <div class="operation-row mb-4">
        <a-button key="back" type="primary" @click="back"> 返回 </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

import { DEFAULT_TAB_ROUTE_NAME } from '@/router/constants'

const router = useRouter()
const back = () => {
  router.push({ name: DEFAULT_TAB_ROUTE_NAME })
}
</script>
