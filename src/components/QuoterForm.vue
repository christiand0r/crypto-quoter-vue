<script setup>
import { ref } from "vue";
import { ALLOWED_FIAT_CURRENCIES as fiatCurrencies } from "../helpers/const.js";

import useCurrency from "../composables/useCurrency.js";

const emit = defineEmits(["get-quoter-params"]);

const { currencyData, marketcap, status } = useCurrency();
const errors = ref(null);

const quoterValidationMap = {
  fiat: [
    {
      message: "Debe seleccionar una moneda para poder cotizar.",
      method: (value) => !value,
    },
  ],
  crypto: [
    {
      message: "Debe seleccionar una moneda para poder cotizar.",
      method: (value) => !value,
    },
  ],
};

const handleQuoter = (e) => {
  const quoter = Object.fromEntries(new FormData(e.target));

  const quoterErrors = Object.entries(quoter).reduce((acc, [key, value]) => {
    const validations = quoterValidationMap[key];

    validations.forEach((validation) => {
      acc[key] = validation.method(value) ? validation.message : undefined;
    });

    !acc[key] && delete acc[key];

    return acc;
  }, {});

  errors.value = Object.keys(quoterErrors).length ? quoterErrors : null;
  if (errors.value) return;

  emit("get-quoter-params", quoter);
};

// Assing values to reactive properties
// for clean errors before submit
const handleQuoterInput = (e) => {
  const { name, value } = e.target;

  Object.assign(currencyData, { [name]: value });
  errors.value?.[name] && delete errors.value[name];
};
</script>

<template>
  <div :class="$attrs.class">
    <header class="mb-8">
      <h1 class="mx-auto w-fit">
        <span class="block font-quoter font-bold text-xl text-white">
          Cotizador de
        </span>
        <span class="block font-quoter font-bold text-4xl text-emerald-400">
          Criptomonedas
        </span>
      </h1>
    </header>

    <form @submit.prevent="handleQuoter" class="flex flex-col gap-4 w-full">
      <div class="flex flex-col gap-2">
        <label
          for="fiat"
          class="font-quoter font-medium text-xs uppercase text-slate-400"
        >
          Moneda
        </label>
        <select
          id="fiat"
          name="fiat"
          :value="currencyData.fiat"
          @change="handleQuoterInput"
          :class="[errors?.fiat ? 'bg-red-200' : 'bg-slate-200']"
          class="p-2 outline-none rounded-md"
        >
          <option value="" hidden selected>
            Seleccione una moneda para cotizar
          </option>
          <option
            v-for="fiatCurrency of fiatCurrencies"
            :key="fiatCurrency.symbol"
            :value="fiatCurrency.symbol"
          >
            {{ fiatCurrency.name }}
          </option>
        </select>
        <span v-if="errors?.fiat" class="text-xs text-red-500">
          {{ errors?.fiat }}
        </span>
      </div>

      <div class="flex flex-col gap-2">
        <label
          for="currency"
          class="font-quoter font-medium text-xs uppercase text-slate-400"
        >
          Criptomoneda
        </label>
        <select
          id="crypto"
          name="crypto"
          :disabled="!marketcap"
          :value="currencyData.crypto"
          @change="handleQuoterInput"
          :class="[errors?.crypto ? 'bg-red-200 ' : 'bg-slate-200 ']"
          class="p-2 outline-none rounded-md"
        >
          <option value="" hidden selected>Seleccione una criptomoneda</option>
          <option
            v-for="item of marketcap"
            :id="item.id"
            :key="item.id"
            :value="item.name"
          >
            {{ item.fullname }} ({{ item.name }})
          </option>
        </select>
        <span v-if="errors?.crypto" class="text-xs text-red-500">
          {{ errors?.crypto }}
        </span>
      </div>

      <p v-if="status" class="flex items-center gap-2 text-xs text-slate-300">
        <span class="loading-spinner"></span> {{ status }}
      </p>

      <button
        type="submit"
        class="font-quoter font-bold px-4 py-2 uppercase rounded-md w-full transition-colors ease-in duration-150 bg-emerald-400 text-slate-800 hover:bg-emerald-500 hover:text-slate-900"
      >
        Cotizar
      </button>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
