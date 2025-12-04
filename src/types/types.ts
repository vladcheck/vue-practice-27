export interface Color {
  hex: string
  rgb: string
  isPinned: boolean
}

export type Palette = Color[]

export type ColorFormat = 'hex' | 'rgb'

export type Theme = 'light' | 'dark'
