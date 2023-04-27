<script setup>
import AppTabs from "@/components/AppTabs/AppTabs.vue";

const tabs = ['Main Info', 'Available Locations', 'Roles'];
</script>

<template>
  <div class="app-wrapper">
    <app-tabs :tabs="tabs" />
  </div>
</template>

<style lang="scss" scoped>
.app-wrapper{
  border: 1px solid red;
}
</style>
