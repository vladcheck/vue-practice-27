<script setup lang="ts">
import { computed } from 'vue'
import type { Palette, Theme } from '@/types/types'

const props = defineProps<{
  palette: Palette
  theme: Theme
}>()

const previewStyle = computed(() => {
  return {
    backgroundColor: props.theme === 'light' ? '#f5f5f5' : '#333',
    color: props.theme === 'light' ? '#333' : '#f5f5f5'
  }
})

const getContrastTextColor = (hex: string): string => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#333' : '#fff'
}
</script>

<template>
  <div class="preview-container" :style="previewStyle">
    <div class="preview-header">
      <h3>Превью интерфейса</h3>
      <div class="theme-toggle">
        <span :class="{ active: theme === 'light' }">Светлая</span>
        <label class="switch">
          <input type="checkbox" :checked="theme === 'dark'"
            @change="$emit('update:theme', theme === 'light' ? 'dark' : 'light')">
          <span class="slider"></span>
        </label>
        <span :class="{ active: theme === 'dark' }">Тёмная</span>
      </div>
    </div>

    <div class="preview-content">
      <div class="preview-card">
        <h2 class="preview-title" :style="{ color: palette[0] ? palette[0].hex : '#333' }">
          Заголовок примера
        </h2>
        <p class="preview-text">Это пример текста с использованием вашей цветовой палитры.</p>
        <button class="preview-button" :style="{
          backgroundColor: palette[1] ? palette[1].hex : '#007bff',
          color: palette[1] ? getContrastTextColor(palette[1].hex) : '#fff'
        }">
          Кнопка действия
        </button>

        <div class="preview-tags">
          <span v-for="(color, index) in palette.slice(0, 3)" :key="index" class="preview-tag" :style="{
            backgroundColor: color.hex,
            color: getContrastTextColor(color.hex)
          }">
            Тег {{ index + 1 }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.preview-container {
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.theme-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
}

.theme-toggle span {
  font-size: 14px;
  cursor: pointer;
  color: #666;
}

.theme-toggle span.active {
  color: #007bff;
  font-weight: bold;
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked+.slider {
  background-color: #2196F3;
}

input:checked+.slider:before {
  transform: translateX(20px);
}

.preview-content {
  display: flex;
  justify-content: center;
}

.preview-card {
  width: 100%;
  max-width: 500px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.preview-title {
  font-size: 24px;
  margin-bottom: 15px;
}

.preview-text {
  margin-bottom: 20px;
  line-height: 1.6;
}

.preview-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.preview-button:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.preview-tags {
  display: flex;
  gap: 8px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.preview-tag {
  padding: 4px 10px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
}
</style>
