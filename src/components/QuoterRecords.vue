<script setup>
import { ref } from "vue";

const emit = defineEmits(["recover-record", "delete-record"]);

const { records } = defineProps({
  records: Array,
});

const recordSelected = ref(null);

const handleRecoverRecord = (record) => {
  recordSelected.value = record.id;
  emit("recover-record", record);
};
</script>

<template>
  <ul
    class="flex gap-2 my-4 mx-auto pb-1 max-w-lg overflow-x-auto w-full md:mt-12 md:max-w-none"
  >
    <li v-for="record of records" :key="record.id">
      <div
        @click.self="() => handleRecoverRecord(record)"
        :class="[
          record.id === recordSelected
            ? 'bg-slate-700 text-slate-300'
            : 'bg-slate-400 text-slate-700',
        ]"
        class="flex items-center justify-center font-medium text-sm gap-2 px-2 py-1 rounded-md whitespace-nowrap"
      >
        <button @click="$emit('delete-record', record.id)"> &#x2715; </button>
        {{ record.pair }} - {{ record.name }} ({{ record.id.slice(-4) }})
      </div>
    </li>
  </ul>
</template>

<style lang="scss" scoped></style>
