import { useStyleTag } from '@vueuse/core'
import Color from 'color'

import { isDark } from './useDark'
import { getDarkTheme, getLightTheme } from './useMenuTheme'

import { prefix } from '@/config/design'
import { useConfigStore } from '@/stores'
import { getColorBorder, getTextColor } from '@/utils/handleColor'

const { css, load, unload, isLoaded } = useStyleTag('', { id: 'global-topbar-theme' })
// 先卸载，后面再加载，保证能覆盖默认的
unload()

export const changeTopbarTheme = (color: string | null) => {
  let defaultColor = ''
  if (isDark.value) {
    defaultColor = '#232324'
  } else {
    defaultColor = '#ffffff'
  }

  if (!color) {
    const configStore = useConfigStore()
    configStore.setTopbarTheme(defaultColor)
    changeTopbarTheme(defaultColor)
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

  let temp = `--di-header-bg-color:${lowerCaseColor};--di-header-text-color:${getTextColor(lowerCaseColor)}; --di-header-color-border: ${getColorBorder(Acolor, isDarkColor)};`

  const menuTemp = `.${prefix}-menu-wrapper.di-menu-wrapper--top {
    --color-menu-light-bg: ${lowerCaseColor};
    ${isDarkColor ? getDarkTheme(Acolor) : getLightTheme(Acolor)}
  }`
  if (isDark.value) {
    temp = `body[arco-theme="dark"]{${temp}${menuTemp}}`
  } else {
    temp = `body{${temp}${menuTemp}}`
  }
  css.value = temp
  if (!isLoaded.value) {
    load()
  }
}
