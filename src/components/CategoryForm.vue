<template>
  <h1 class="text-xl font-bold w-full text-center mb-8">
    {{ action === "edit" ? "ویرایش" : "افزودن" }} دسته
  </h1>
  <form
    @submit.prevent="handleAction"
    class="flex flex-col items-start justify-center min-w-[25rem] gap-4 md:gap-8 px-8"
  >
    <!-- group -->
    <div class="flex items-center justify-center gap-4">
      <div class="flex items-center justify-center gap-2 cursor-pointer">
        <input
          type="radio"
          id="expense"
          value="out"
          v-model="categoryData.cat_type"
        />
        <label class="cursor-pointer" for="expense">خرج</label>
      </div>

      <div class="flex items-center justify-center gap-2 cursor-pointer">
        <input
          type="radio"
          id="income"
          value="in"
          v-model="categoryData.cat_type"
        />
        <label class="cursor-pointer" for="income">دخل</label>
      </div>
    </div>

    <!-- name -->
    <div class="flex items-center justify-between gap-2 w-full">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >نام دسته</label
      >
      <input
        type="text"
        v-model.lazy="categoryData.name"
        class="textField__input"
        required
      />
    </div>

    <button class="w-full btn btn--primary">
      {{ action === "edit" ? "ویرایش" : "ثبت" }}
    </button>
  </form>
</template>
<script setup>
import { reactive, defineEmits, defineProps } from "vue";
import { postCategory } from "../service/category/postCategory";
import { editCategory } from "../service/category/editCategory";

//action => what is this component used for? edit or submit

const props = defineProps(["action", "existingCategory"]);

const categoryData = reactive({
  cat_type: props.action === "edit" ? props.existingCategory.cat_type : "",
  name: props.action === "edit" ? props.existingCategory.name : "",
});

const emit = defineEmits(["update-category-list", "close-modal"]);
function handleAction() {
  if (props.action === "edit") {
    editCategory(props.existingCategory.id, categoryData)
      .then(() => emit("update-category-list"))
      .then(() => emit("closeModal"));
  } else {
    postCategory(categoryData).then(() => emit("update-category-list"));
  }
  Object.assign(categoryData, {
    cat_type: 1,
    name: "",
  });
}
</script>
