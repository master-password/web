import type { Ref } from 'vue'
import { ref } from 'vue'

const symbols = Object.freeze([')', '!', '@', '#', '$', '%', '^', '&', '*', '('])

export function usePasswordGenerator(phrase: Ref<string>, numbers: Ref<string>): string {
  let password = ''

  const phraseStr = ref(
    phrase.value.charAt(0).toUpperCase() + phrase.value.slice(1).toLocaleLowerCase()
  )

  for (let i = 0; i < phraseStr.value.length && i < numbers.value.length; i++) {
    password += phraseStr.value[i] + numbers.value[i] + symbols[Number(numbers.value[i])]
  }

  return password
}
