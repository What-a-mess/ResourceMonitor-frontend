<template>
  <div class="card mb-4" :class="{ shadow: haveShadow }">
    <div class="card-header py-3 text-left font-weight-bold" style="margin-top: 20px;">
      <h3 class="m-0 font-weight-bold text-primary">{{ title }}</h3>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Card Title'
  },
  haveShadow: {
    type: Boolean,
    default: true
  }
});
</script>

<style type="text/css" src="@/assets/css/sb-admin-2.css" scoped>
</style>