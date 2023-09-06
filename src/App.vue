<script setup lang="ts">
import {
  ArrowPathIcon,
  CheckIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon
} from '@heroicons/vue/24/outline'
import { useClipboard } from '@vueuse/core'
import { ref } from 'vue'
import { usePasswordGenerator } from './composables/password'

const phrase = ref('')
const numbers = ref('')
const password = ref('')

const { copy, copied } = useClipboard()

function generate() {
  password.value = usePasswordGenerator(phrase, numbers)
}
</script>

<template>
  <main class="border-2 rounded-md p-5 shadow-lg shadow-gray-400 bg-white">
    <form @submit.prevent="generate">
      <div class="space-y-12">
        <div class="">
          <h2 class="text-base font-semibold leading-7 text-cyan-900 text-center">
            Master Password
          </h2>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-12">
              <label for="phrase" class="block text-sm font-medium leading-6 text-gray-900"
                >Phrase</label
              >
              <div class="mt-2">
                <input
                  v-model.trim="phrase"
                  type="text"
                  name="phrase"
                  id="phrase"
                  class="block w-full border-0 border-b-2 px-0.5 border-gray-200 text-gray-900 shadow-sm focus:ring-0 focus:border-black sm:text-sm sm:leading-6"
                  placeholder="johnys"
                  pattern=".{4,}"
                  oninvalid="setCustomValidity('Please enter at least 4 characters')"
                  oninput="setCustomValidity('')"
                  required
                />
              </div>
            </div>
            <div class="sm:col-span-12">
              <label for="number" class="block text-sm font-medium leading-6 text-gray-900"
                >Numbers</label
              >
              <div class="mt-2">
                <input
                  v-model.trim="numbers"
                  type="text"
                  name="number"
                  id="number"
                  class="block w-full border-0 border-b-2 px-0.5 border-gray-200 text-gray-900 shadow-sm focus:ring-0 focus:border-black sm:text-sm sm:leading-6"
                  placeholder="140897"
                  pattern="[0-9]{4,}"
                  oninvalid="setCustomValidity('Please enter only numbers (at least 4 numbers)')"
                  oninput="setCustomValidity('')"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-center gap-x-6">
        <button
          type="submit"
          class="rounded-md px-2 py-1 text-sm font-semibold border border-cyan-800 text-cyan-800 shadow-sm hover:border-cyan-500 hover:text-cyan-500 flex justify-between gap-4"
        >
          Generate <ArrowPathIcon class="h-6 w-6" />
        </button>
      </div>
    </form>

    <div v-if="password" class="space-y-12">
      <div class="mt-5 grid grid-cols-1 gap-y-4 sm:grid-cols-6">
        <div class="sm:col-span-12">
          <input
            v-model="password"
            type="text"
            name="phrase"
            id="phrase"
            class="block w-full border-0 border-b-2 px-0.5 text-center border-cyan-700 text-gray-900 shadow-sm focus:ring-0 sm:text-sm sm:leading-6"
            readonly
          />
        </div>
        <div class="sm:col-span-12 flex justify-center">
          <button
            v-if="!copied"
            @click="copy(password)"
            title="Copy to clipboard"
            class="flex flex-col items-center hover:text-gray-400"
          >
            <ClipboardDocumentIcon class="w-9 h-9 cursor-pointer" />
            <p class="sm:col-span-12 text-sm text-center">Copy password</p>
          </button>
          <button
            v-else
            @click="copy(password)"
            title="Copy to clipboard"
            class="flex flex-col items-center"
          >
            <ClipboardDocumentCheckIcon class="w-9 h-9 cursor-pointer text-green-700" />
            <p class="sm:col-span-12 text-sm text-green-700 text-center">
              Copied <CheckIcon class="w-4 inline-block" />
            </p>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
input:valid {
  @apply border-green-700;
}
</style>
