<template>
  <div class="card mb-4" :class="{ shadow: haveShadow }">
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  haveShadow: {
    type: Boolean,
    default: true
  }
});
</script>

<style type="text/css" src="@/assets/css/sb-admin-2.css" scoped>
</style>