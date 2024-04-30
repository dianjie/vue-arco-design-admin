import { generate } from '@arco-design/color'
import { useStyleTag, type UseStyleTagReturn } from '@vueuse/core'
import { range } from 'lodash-es'

import { isDark } from './useDark'

import { useConfigStore } from '@/stores'

// eslint-disable-next-line @typescript-eslint/no-var-requires

const brandStyle = useStyleTag('', { id: 'global-brand-theme' })
const successStyle = useStyleTag('', { id: 'global-success-theme' })
const errorStyle = useStyleTag('', { id: 'global-error-theme' })
const warningStyle = useStyleTag('', { id: 'global-warning-theme' })
// 先卸载，后面再加载，保证能覆盖默认的
brandStyle.unload()
successStyle.unload()
errorStyle.unload()
warningStyle.unload()

const typeKey = {
  brand: 'arcoblue',
  success: 'green',
  error: 'red',
  warning: 'orange'
}

// arcoblue、green、red、orange
type SetFunType = 'setBrandTheme' | 'setSuccessTheme' | 'setErrorTheme' | 'setWarningTheme'
export type ThemeType = 'brand' | 'success' | 'error' | 'warning'

const generateTokenList = (hex: string, type: ThemeType) => {
  const tempArr = range(0, 10)

  let temp = ''

  tempArr.forEach((item) => {
    const rgbText = generate(hex, { index: item + 1, dark: isDark.value, format: 'rgb' }) as string

    temp += `--${typeKey[type]}-${item + 1}:${rgbText.replace(/rgb|\(|\)/g, '')} !important;\n`
  })
  return temp
}

export const changeTheme = (color: string | null, themeType: ThemeType) => {
  let defaultColor: string = ''
  let setFun: SetFunType = 'setBrandTheme'
  let currentStyle: UseStyleTagReturn = brandStyle

  switch (themeType) {
    case 'brand':
      defaultColor = '#165dff'
      setFun = 'setBrandTheme'
      currentStyle = brandStyle
      break
    case 'success':
      defaultColor = '#00b42a'
      setFun = 'setSuccessTheme'
      currentStyle = successStyle
      break
    case 'error':
      defaultColor = '#f53f3f'
      setFun = 'setErrorTheme'
      currentStyle = errorStyle
      break
    case 'warning':
      defaultColor = '#ff7d00'
      setFun = 'setWarningTheme'
      currentStyle = warningStyle
      break
    default:
      break
  }

  if (!color) {
    const configStore = useConfigStore()
    configStore[setFun](defaultColor)
    changeTheme(defaultColor, themeType)
    return
  }
  const lowerCaseColor = color.toLocaleLowerCase()
  if (lowerCaseColor === defaultColor) {
    currentStyle.css.value = ''
    if (currentStyle.isLoaded.value) {
      currentStyle.unload()
    }
    return
  }

  let temp = generateTokenList(color, themeType)

  if (isDark.value) {
    temp = `body[arco-theme="dark"]{${temp}}`
  } else {
    temp = `body{${temp}}`
  }
  currentStyle.css.value = temp
  if (!currentStyle.isLoaded.value) {
    currentStyle.load()
  }
}

export const changeBrandTheme = (color: string | null) => {
  changeTheme(color, 'brand')
}

export const changeSuccessTheme = (color: string | null) => {
  changeTheme(color, 'success')
}

export const changeErrorTheme = (color: string | null) => {
  changeTheme(color, 'error')
}

export const changeWarningTheme = (color: string | null) => {
  changeTheme(color, 'warning')
}
