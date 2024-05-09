<template>
  <div class="p-4">
    <div class="content-bg flex flex-col flex-items-center justify-center">
      <a-result class="result" status="404" subtitle="抱歉，页面不见了～"> </a-result>
      <div class="operation-row mb-4">
        <a-button key="again" style="margin-right: 16px"> 重试 </a-button>
        <a-button key="back" type="primary"> 返回 </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<script lang="ts">
export default {
  name: 'result-404'
}
</script>

<style scoped lang="less"></style>
