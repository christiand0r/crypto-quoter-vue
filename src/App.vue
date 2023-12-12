<script setup>
import { ref, watch, unref } from "vue";
import QuoterBanner from "./components/QuoterBanner.vue";
import QuoterForm from "./components/QuoterForm.vue";
import useQuoter from "./composables/useQuoter.js";
import QuoterRecords from "./components/QuoterRecords.vue";

const { quoter, loadingQuoter, getQuoterData } = useQuoter();

const records = ref([]);

watch(quoter, () => {
  if (!quoter.value) return;

  // Check if a record or request
  const isRegister = records.value.findIndex(
    (record) => record.id === quoter.value.id
  );

  isRegister === -1 && records.value.push({ ...quoter.value });
});

const recoverRecord = (record) => {
  quoter.value = record;
};

const removeRecord = (id) => {
  records.value = records.value.filter((record) => record.id !== id);
};
</script>

<template>
  <div class="flex flex-col h-screen md:flex-row">
    <QuoterBanner
      src="/img/crypto-bg.jpg"
      alt="Banner de Criptomonedas"
      :quoter="quoter"
      :loadingQuoter="loadingQuoter"
    />
    <div
      class="flex flex-col justify-center px-6 py-8 w-full md:flex-col-reverse md:w-1/2 lg:w-1/3"
    >
      <QuoterRecords
        @recover-record="recoverRecord"
        @delete-record="removeRecord"
        :records="records"
      />

      <QuoterForm
        @get-quoter-params="getQuoterData"
        class="flex flex-col justify-center bg-slate-900"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
