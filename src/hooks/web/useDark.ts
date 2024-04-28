import { useDark, useToggle } from '@vueuse/core'

import {
  changeBrandTheme,
  changeErrorTheme,
  changeSuccessTheme,
  changeWarningTheme
} from './useComponentTheme'
import { changeTopbarTheme } from './useTopbarTheme'

import { changeBgColorTheme } from '@/hooks/web/useBgColorTheme'
import { changeMenuTheme } from '@/hooks/web/useMenuTheme'
import { useConfigStore } from '@/stores'

export const isDark = useDark({
  attribute: 'arco-theme',
  selector: 'body'
})
export const toggleDark = () => {
  useToggle(isDark)
  const configStore = useConfigStore()
  changeBrandTheme(configStore.brandTheme)
  changeSuccessTheme(configStore.successTheme)
  changeErrorTheme(configStore.errorTheme)
  changeWarningTheme(configStore.warningTheme)
  // 重置回默认的
  changeTopbarTheme(null)
  changeMenuTheme(null)
  changeBgColorTheme(null)
}
