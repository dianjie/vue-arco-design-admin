import { useStyleTag } from '@vueuse/core'
import Color from 'color'

import { isDark } from './useDark'
import { getDarkTheme, getLightTheme } from './useMenuTheme'

import { prefix } from '@/config/design'
import { useConfigStore } from '@/stores'
import { getTextColor } from '@/utils/handleColor'

const { css, load, unload, isLoaded } = useStyleTag('', { id: 'global-topbar-theme' })
// 先卸载，后面再加载，保证能覆盖默认的
unload()

export const changeTopbarTheme = (color: string | null) => {
  let defaultColor = ''
  if (isDark.value) {
    defaultColor = '#242424'
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
  let temp = `--di-header-bg-color:${lowerCaseColor};--di-header-text-color:${getTextColor(lowerCaseColor)};`

  const Acolor = Color(lowerCaseColor)

  const menuTemp = `.${prefix}-menu-wrapper.di-menu-wrapper--top {
    --color-menu-light-bg: ${lowerCaseColor};
    ${Acolor.isDark() ? getDarkTheme() : getLightTheme()}
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
