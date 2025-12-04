<script lang="ts">
class HSL {
  hue: number
  saturation: number
  lightness: number

  constructor({
    hue,
    saturation,
    lightness,
  }: {
    hue: number
    saturation: number
    lightness: number
  }) {
    this.hue = hue
    this.saturation = saturation
    this.lightness = lightness
  }

  toString(): string {
    return `hsl(${this.hue},${this.saturation}%,${this.lightness}%)`
  }

  rotatedDeg(degree: number): HSL {
    return new HSL({
      hue: (this.hue + degree) % 255,
      saturation: this.saturation,
      lightness: this.lightness,
    })
  }
}

function randint(upper: number): number {
  return Math.floor(Math.random() * upper)
}

function getRandomHSLColor(): HSL {
  return new HSL({
    hue: randint(256),
    saturation: randint(100),
    lightness: randint(100),
  })
}

function generateRandomHSLPalette(): HSL[] {
  const colorCount = 5
  const base = getRandomHSLColor()
  const pallete = [base]
  const degree = 360 / colorCount
  for (let i = 1; i < colorCount; i++) {
    pallete.push(pallete[pallete.length - 1]!.rotatedDeg(degree))
  }
  return pallete
}

export default {
  name: 'randomPaletteButton',
  setup() {
    return { generateRandomHSLPalette }
  },
}
</script>

<template>
  <button class="random-palette-button button" @click.left="generateRandomHSLPalette">
    Случайная палитра
  </button>
</template>
