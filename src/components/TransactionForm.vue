<template>
  <h1 class="text-xl font-bold w-full text-center mb-8">
    {{ action === "edit" ? "ویرایش" : "افزودن" }} تراکنش
  </h1>
  <form
    @submit.prevent="handleAction"
    class="flex flex-col items-start justify-center min-w-[25rem] max-w-lg md:gap-8 px-8"
  >
    <!-- trans_type -->
    <div class="flex items-center justify-center gap-4">
      <div class="flex items-center justify-center gap-2 cursor-pointer">
        <input
          type="radio"
          id="expense"
          value="out"
          v-model="transactionData.trans_type"
        />
        <label class="cursor-pointer" for="expense">خرج</label>
      </div>

      <div class="flex items-center justify-center gap-2 cursor-pointer">
        <input
          type="radio"
          id="income"
          value="in"
          v-model="transactionData.trans_type"
        />
        <label class="cursor-pointer" for="income">دخل</label>
      </div>
    </div>

    <!-- description -->
    <div class="flex items-center justify-between gap-2 w-full">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >توضیح</label
      >
      <textarea
        type="rext"
        v-model.lazy="transactionData.description"
        class="textField__input"
      ></textarea>
    </div>

    <!-- category -->
    <div class="flex items-center justify-between gap-2 w-full">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >دسته</label
      >
      <select v-model="transactionData.category" class="textField__input">
        <option v-for="category in categoryList" :value="category.name">
          {{ category.name }}
        </option>
      </select>
    </div>

    <!-- amount -->
    <div class="flex items-center justify-between gap-2 w-full">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >مبلغ</label
      >
      <input
        type="number"
        v-model.lazy="transactionData.amount"
        class="textField__input"
        required
      />
    </div>

    <!-- data -->
    <custom-date-picker
      class="w-full rounded-lg"
      v-model="transactionData.date"
    ></custom-date-picker>

    <button class="btn btn--primary w-full">
      {{ action === "edit" ? "ویرایش" : "ثبت" }}
    </button>
  </form>
</template>

<script setup>
import {
  reactive,
  onMounted,
  ref,
  watchEffect,
  defineEmits,
  defineProps,
} from "vue";
import { getCategories } from "../service/category/getCategories";
import { postTransaction } from "../service/transaction/postTransaction";
import { editTransaction } from "../service/transaction/editTransaction";

//action => what is this component used for? edit or submit

const props = defineProps(["action", "existingTransaction"]);
const emit = defineEmits(["update-transaction-list", "closeModal"]);

const transactionData = reactive({
  trans_type:
    props.action === "edit" ? props.existingTransaction.trans_type : "",
  description:
    props.action === "edit" ? props.existingTransaction.description : "",
  category: props.action === "edit" ? props.existingTransaction.category : "",
  amount: props.action === "edit" ? props.existingTransaction.amount : "",
  date: props.action === "edit" ? props.existingTransaction.date : "",
});

const categoryList = ref([]);

function updateCategory() {
  getCategories(transactionData.trans_type).then(
    (categories) => (categoryList.value = categories)
  );
}
onMounted(() => {
  updateCategory();
});

watchEffect(() => {
  updateCategory();
});

function handleAction() {
  if (props.action === "edit") {
    editTransaction(props.existingTransaction.id, transactionData)
      .then(() => emit("update-transaction-list"))
      .then(() => emit("closeModal"));
  } else {
    postTransaction(transactionData).then(() =>
      emit("update-transaction-list")
    );
  }
  Object.assign(transactionData, {
    trans_type: 0,
    description: "",
    category: 0,
    amount: "",
    date: "",
  });
}
</script>
