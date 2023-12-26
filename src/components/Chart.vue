<template>
  <div class="bg-primary-100 flex flex-col rounded-lg">
    <h2 class="p-2">{{ name }}</h2>
    <apexchart
      class="w-[340px] md:w-[380px]"
      type="donut"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>
<script setup>
const props = defineProps(["options", "series", "name"]);
</script>
