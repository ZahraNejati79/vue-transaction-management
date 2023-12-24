<template>
  <router-link class="w-full" to="/">
    <li
      class="w-ful transition duration-300 flex items-center justify-center sm:justify-start gap-4 px-4 py-4 cursor-pointer md:hover:bg-primary-100 rounded-lg"
    >
      <span class="flex items-center justify-center">
        <unicon :name="icon" fill="royalblue"></unicon>
      </span>
      <span class="hidden sm:block text-lg">{{ name }}</span>
    </li>
  </router-link>
</template>
<script setup>
const props = defineProps(["name", "icon"]);
</script>
