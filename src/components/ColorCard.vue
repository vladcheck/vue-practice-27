<script setup lang="ts">
import { computed } from 'vue'
import type { Color, ColorFormat } from '@/types/types'

const props = defineProps<{
  color: Color
  format: ColorFormat
  index: number
}>()

const emit = defineEmits<{
  (e: 'copy', hex: string): void
  (e: 'togglePin', index: number): void
}>()

const colorValue = computed(() => {
  return props.format === 'hex' ? props.color.hex : props.color.rgb
})

const cardStyle = computed(() => {
  return {
    backgroundColor: props.color.hex,
    color: getContrastColor(props.color.hex)
  }
})

function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#333' : '#fff'
}

const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(props.color.hex)
    emit('copy', props.color.hex)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}
</script>

<template>
  <div class="color-card" :style="cardStyle" @click="handleCopy">
    <div class="color-info">
      <span class="color-value">{{ colorValue }}</span>
      <button class="pin-button" :class="{ pinned: color.isPinned }" @click.stop="emit('togglePin', index)">
        {{ color.isPinned ? '★' : '☆' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.color-card {
  flex: 1;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  position: relative;
  overflow: hidden;
}

.color-card:hover {
  transform: translateY(-2px);
}

.color-info {
  text-align: center;
  padding: 10px;
}

.color-value {
  font-family: monospace;
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.pin-button {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  margin-top: 5px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.pin-button.pinned {
  color: gold;
}
</style>
