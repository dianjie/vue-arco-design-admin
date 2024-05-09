<template>
  <div class="p-4">
    <div class="content-bg flex flex-col flex-items-center justify-center">
      <a-result class="result" status="403" subtitle="对不起，您没有访问该资源的权限" />
      <a-button key="back" type="primary" class="mb-4"> 返回 </a-button>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<script lang="ts">
export default {
  name: 'result-403'
}
</script>

<style scoped lang="less"></style>
