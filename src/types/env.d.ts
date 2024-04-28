/// <reference types="vite/client" />
declare module '*.vue' {
  import { type DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@arco-design/color' {
  export function generate(
    color: string,
    option: {
      index?: number // 1-10
      dark?: boolean
      list?: boolean
      format?: 'hex' | 'rgb' | 'hsl'
    }
  ): string | string[]
  export function getRgbStr(string): string
  export function getPresetColors(): object
}
