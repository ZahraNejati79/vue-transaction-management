<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center w-screen h-screen justify-center bg-black bg-opacity-50"
  >
    <div
      class="bg-white rounded shadow-md w-screen h-screen md:w-[30rem] md:h-fit pb-8"
    >
      <button @click="closeModal" class="pt-4 mr-6">
        <unicon name="multiply" fill="royalblue"></unicon>
      </button>
      <div class="py-2">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["isOpen"]);
const emit = defineEmits(["closeModal"]);

function closeModal() {
  emit("closeModal");
}
</script>
