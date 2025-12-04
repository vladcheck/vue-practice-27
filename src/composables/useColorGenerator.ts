import type { Color, Palette } from '@/types/types'

export function useColorGenerator() {
  const generateRandomHex = (): string => {
    return (
      '#' +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
    )
  }

  const hexToRgb = (hex: string): string => {
    const bigint = parseInt(hex.slice(1), 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return `rgb(${r}, ${g}, ${b})`
  }

  const generatePalette = (count: number, existingPalette: Palette = []): Palette => {
    const newPalette: Palette = []

    for (let i = 0; i < count; i++) {
      if (existingPalette[i] && existingPalette[i]!.isPinned) {
        newPalette.push(existingPalette[i]!)
      } else {
        const hex = generateRandomHex()
        newPalette.push({
          hex,
          rgb: hexToRgb(hex),
          isPinned: false,
        })
      }
    }

    return newPalette
  }

  const generateHarmoniousPalette = (count: number, existingPalette: Palette = []): Palette => {
    const baseHue = Math.random() * 360
    const saturation = 70 + Math.random() * 30
    const lightness = 50 + Math.random() * 20

    const newPalette: Palette = []

    for (let i = 0; i < count; i++) {
      if (existingPalette[i] && existingPalette[i]!.isPinned) {
        newPalette.push(existingPalette[i]!)
      } else {
        const hueShift = (360 / count) * i
        const hue = (baseHue + hueShift) % 360
        const hex = hslToHex(hue, saturation, lightness)
        newPalette.push({
          hex,
          rgb: hexToRgb(hex),
          isPinned: false,
        })
      }
    }

    return newPalette
  }

  const hslToHex = (h: number, s: number, l: number): string => {
    l /= 100
    const a = (s * Math.min(l, 1 - l)) / 100
    const f = (n: number, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    const r = Math.round(f(0) * 255)
    const g = Math.round(f(8) * 255)
    const b = Math.round(f(4) * 255)
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
  }

  return {
    generatePalette,
    generateHarmoniousPalette,
    hexToRgb,
  }
}
