<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
    default: () => []
  }
})
const { tabs } = toRefs(props)
</script>

<template>
  <div>hello</div>
</template>

<style lang="scss" scoped></style>
