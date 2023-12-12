<script setup>
import { parseStampToLocaleDate } from "../helpers";

const { quoter } = defineProps({
  quoter: Object,
  loadingQuoter: Boolean,
});
</script>

<template>
  <div class="relative h-60 w-full md:w-1/2 md:h-full lg:w-4/6">
    <img
      :src="$attrs.src"
      :alt="$attrs.alt"
      class="object-cover object-center h-full w-full md:object-right"
    />

    <div
      v-if="loadingQuoter"
      class="flex items-center justify-center absolute inset-0 bg-opacity-70 bg-black"
    >
      <span class="loading-spinner border-4 h-12 w-12"></span>
    </div>

    <div
      v-if="quoter"
      class="flex items-center justify-center absolute inset-0 bg-opacity-70 bg-black"
    >
      <figure class="p-4 rounded-md bg-slate-100">
        <header
          class="font-quoter font-bold text-xl text-center mb-4 uppercase text-slate-900"
        >
          <span>Cotización {{ quoter.name }}</span>
          <span class="block font-medium text-xs normal-case text-slate-500">{{ parseStampToLocaleDate(quoter.timestamp) }}</span>
        </header>
        <div class="flex items-center justify-center gap-2">
          <img
            :src="'https://www.cryptocompare.com' + quoter.image"
            :alt="`Imagen del ${quoter.name}`"
            class="h-20 w-20"
          />

          <figcaption class="text-sm">
            <ul>
              <li class="font-medium">
                Precio: <span class="font-bold">{{ quoter.price }}</span>
              </li>
              <li class="font-medium">
                Precio más alto del día:
                <span class="font-bold">{{ quoter.highday }}</span>
              </li>
              <li class="font-medium">
                Precio más bajo del día:
                <span class="font-bold">{{ quoter.lowday }}</span>
              </li>
              <li class="font-medium">
                Variación últimas 24 horas:
                <span class="font-bold">{{ quoter.ptc24 }}%</span>
              </li>
              <li class="font-medium">
                Última actualización:
                <span class="font-bold">{{ quoter.updated }}</span>
              </li>
            </ul>
          </figcaption>
        </div>
      </figure>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
