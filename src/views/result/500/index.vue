<template>
  <div class="p-4">
    <div class="content-bg flex flex-col flex-items-center justify-center">
      <a-result class="result" status="500" subtitle="抱歉，服务器出了点问题～" />
      <a-button key="back" type="primary" class="mb-4"> 返回 </a-button>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<script lang="ts">
export default {
  name: 'result-500'
}
</script>

<style scoped lang="less"></style>
