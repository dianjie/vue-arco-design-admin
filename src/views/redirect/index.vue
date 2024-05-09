<template>
  <div></div>
</template>
<script lang="ts" setup>
import { unref } from 'vue'
import { useRouter } from 'vue-router'

const { currentRoute, replace } = useRouter()

const { params } = unref(currentRoute)

const gotoPath = params.path as string

replace({ path: gotoPath })
</script>
