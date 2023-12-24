<template>
  <div class="bg-primary-100 p-4 rounded-lg">
    <h2>{{ name }}</h2>
    <apexchart
      width="380"
      type="donut"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>
<script setup>
const props = defineProps(["options", "series", "name"]);
</script>
