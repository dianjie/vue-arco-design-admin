import { useStyleTag } from '@vueuse/core'

import { isDark } from './useDark'

import { useConfigStore } from '@/stores'
import { getTextColor } from '@/utils/handleColor'

const { css, load, unload, isLoaded } = useStyleTag('', { id: 'global-content-theme' })
// 先卸载，后面再加载，保证能覆盖默认的
unload()

export const changeBgColorTheme = (color: string | null) => {
  let defaultColor = ''
  if (isDark.value) {
    defaultColor = '#181818'
  } else {
    defaultColor = '#eeeeee'
  }
  if (!color) {
    const configStore = useConfigStore()
    configStore.setBgColorTheme(defaultColor)
    changeBgColorTheme(defaultColor)
    return
  }
  const lowerCaseColor = color.toLocaleLowerCase()
  let temp = `--di-content-bg-color:${lowerCaseColor};--di-text-color:${getTextColor(lowerCaseColor)}`
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
