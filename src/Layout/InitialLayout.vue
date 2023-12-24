<template>
  <div class="min-h-screen min-w-screen">
    <Navbar />
    <main class="bg-white mx-auto">
      <div class="h-full pt-8 container">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>
<script setup>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/SideBar.vue";
</script>
