<script setup lang="ts">
import { ref } from 'vue'
import { useNotification } from '@/composables/useNotification'
import { useLocalStorage } from '@/composables/useLocalStorage'
import { useColorGenerator } from '@/composables/useColorGenerator'
import ColorCard from './ColorCard.vue'
import PalettePreview from './PalettePreview.vue'
import type { Palette, ColorFormat, Theme } from '@/types/types'

const { show, showNotification, notificationMessage } = useNotification()
const { generateHarmoniousPalette } = useColorGenerator()

const colorCount = ref(5)
const colorFormat = ref<ColorFormat>('hex')
const theme = ref<Theme>('light')
const currentPalette = useLocalStorage<Palette>('color-palette', generateHarmoniousPalette(5))

const availableCounts = [3, 5, 7]
const availableFormats = ['hex', 'rgb'] as const

const generateNewPalette = () => {
  currentPalette.value = generateHarmoniousPalette(colorCount.value, currentPalette.value)
}

const copyColor = (hex: string) => {
  show(`Цвет ${hex} скопирован в буфер обмена`)
}

const togglePinColor = (index: number) => {
  if (index < currentPalette.value.length) {
    currentPalette.value[index]!.isPinned = !currentPalette.value[index]!.isPinned
  }
}

</script>

<template>
  <div class="palette-generator">
    <div class="controls">
      <div class="control-group">
        <label for="color-count">Количество цветов:</label>
        <select id="color-count" v-model="colorCount">
          <option v-for="count in availableCounts" :key="count" :value="count">
            {{ count }}
          </option>
        </select>
      </div>

      <div class="control-group">
        <label for="color-format">Формат отображения:</label>
        <select id="color-format" v-model="colorFormat">
          <option v-for="format in availableFormats" :key="format" :value="format">
            {{ format.toUpperCase() }}
          </option>
        </select>
      </div>

      <button class="generate-button" @click="generateNewPalette">
        Случайная палитра
      </button>
    </div>

    <div class="palette-container">
      <ColorCard v-for="(color, index) in currentPalette" :key="index" :color="color" :format="colorFormat"
        :index="index" @copy="copyColor" @toggle-pin="togglePinColor" />
    </div>

    <PalettePreview :palette="currentPalette" :theme="theme" @update:theme="theme = $event" />

    <div v-if="showNotification" class="notification">
      {{ notificationMessage }}
    </div>
  </div>
</template>

<style scoped>
.palette-generator {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  align-items: center;
}

.control-group {
  display: flex;
  flex-direction: column;
  min-width: 150px;
}

.control-group label {
  margin-bottom: 5px;
  font-weight: bold;
}

select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
}

.generate-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease;
}

.generate-button:hover {
  background-color: #0069d9;
}

.palette-container {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #28a745;
  color: white;
  padding: 12px 20px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: fadeInOut 2s ease;
}

@keyframes fadeInOut {

  0%,
  100% {
    opacity: 0;
    transform: translateY(20px);
  }

  20%,
  80% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
