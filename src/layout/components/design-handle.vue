<template>
  <div class="btn-group">
    <a-button type="primary" status="warning" @click="handleRest">
      <template #icon>
        <i-ep-refresh-left />
      </template>
      重置设置
    </a-button>
    <a-button type="primary" @click="copyToClipboard">
      <template #icon>
        <i-ep-copy-document />
      </template>
      拷贝设置
    </a-button>
  </div>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { useClipboard, useDebounceFn } from '@vueuse/core'
import { unref } from 'vue'

import { useConfigStore } from '@/stores'

const store = useConfigStore()

const { copy } = useClipboard()

const copyToClipboard = useDebounceFn(() => {
  copy(JSON.stringify(unref(store.$state)))
  Message.success('拷贝成功，请到 src/config/design.ts 中替换[defaultSettings]默认配置')
}, 800)

const handleRest = useDebounceFn(() => {
  store.reset()
  Message.success('重置成功')
}, 800)
</script>

<style lang="less">
.btn-group {
  display: flex;
  justify-content: space-between;
  margin: 0 15px;
}
</style>
