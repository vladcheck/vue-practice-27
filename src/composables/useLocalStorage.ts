import { ref, watch } from 'vue'
import type { Palette } from '@/types/types'

export function useLocalStorage(key: string, initialValue: Palette) {
  const storedValue = localStorage.getItem(key)
  const value = ref<Palette>(storedValue ? JSON.parse(storedValue) : initialValue)

  watch(
    value,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue))
    },
    { deep: true },
  )

  return value
}
