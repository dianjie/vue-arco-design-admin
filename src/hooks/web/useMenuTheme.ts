import { useStyleTag } from '@vueuse/core'
import Color from 'color'

import { isDark } from './useDark'

import { prefix } from '@/config/design'
import { useConfigStore } from '@/stores'
import { getColorBorder } from '@/utils/handleColor'

const { css, load, unload, isLoaded } = useStyleTag('', { id: 'global-menu-theme' })
// 先卸载，后面再加载，保证能覆盖默认的
unload()

export const getLightTheme = (Acolor: Color) => {
  const c_10 = -226
  const c_8 = -177
  const c_6 = -121
  const c_4 = -54
  const c_3 = -26
  const c_2 = -13
  const c_1 = -8

  const getHex = (temp: number, gNum: number, bNum: number) => {
    return Acolor.red(Acolor.red() + temp)
      .green(Acolor.green() + temp + gNum)
      .blue(Acolor.blue() + temp + bNum)
      .hex()
  }

  return `--color-text-1: ${getHex(c_10, 7, 12)};
  --color-text-2: ${getHex(c_8, 11, 27)};
  --color-text-3: ${getHex(c_6, 10, 22)};
  --color-text-4: ${getHex(c_4, 4, 11)};
  --color-fill-1: ${getHex(c_1, 1, 3)};
  --color-fill-2:${getHex(c_2, 1, 3)};
  --color-fill-3: ${getHex(c_3, 1, 6)};
  --color-fill-4: ${getHex(c_4, 4, 11)};
  `

  // return `--color-text-1: #1d2129;
  // --color-text-2: #4e5969;
  // --color-text-3: #86909c;
  // --color-text-4: #c9cdd4;
  // --color-fill-1: #f7f8fa;
  // --color-fill-2: #f2f3f5;
  // --color-fill-3: #e5e6eb;
  // --color-fill-4: #c9cdd4;
  // `
}

export const getDarkTheme = () => {
  return `--color-text-1: rgba(255, 255, 255, 0.9);
  --color-text-2: rgba(255, 255, 255, 0.7);
  --color-text-3: rgba(255, 255, 255, 0.5);
  --color-text-4: rgba(255, 255, 255, 0.3);
  --color-fill-1: rgba(255, 255, 255, 0.04);
  --color-fill-2: rgba(255, 255, 255, 0.08);
  --color-fill-3: rgba(255, 255, 255, 0.12);
  --color-fill-4: rgba(255, 255, 255, 0.16);
  `
}

export const changeMenuTheme = (color: string | null) => {
  let defaultColor = ''
  if (isDark.value) {
    defaultColor = '#232324'
  } else {
    defaultColor = '#ffffff'
  }
  if (!color) {
    const configStore = useConfigStore()
    configStore.setMenuTheme(defaultColor)
    changeMenuTheme(defaultColor)
    return
  }
  const lowerCaseColor = color.toLocaleLowerCase()
  if (lowerCaseColor === defaultColor) {
    css.value = ''
    if (isLoaded.value) {
      unload()
    }
    return
  }
  const Acolor = Color(lowerCaseColor)
  const isDarkColor = Acolor.isDark()

  let temp = `.${prefix}-menu-wrapper:not(.di-menu-wrapper--top) {
    --color-menu-light-bg: ${lowerCaseColor};
    --di-menu-color-border: ${getColorBorder(Acolor, isDarkColor)};
    ${isDarkColor ? getDarkTheme() : getLightTheme(Acolor)}
  }`
  if (isDark.value) {
    temp = `body[arco-theme="dark"]{${temp}}`
  } else {
    temp = `body{${temp}}`
  }
  css.value = temp
  if (!isLoaded.value) {
    load()
  }
}
