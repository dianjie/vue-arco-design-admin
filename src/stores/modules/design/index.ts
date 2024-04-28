import { defineStore } from 'pinia'

import { defaultSettings } from '@/config/design'
import { changeBgColorTheme } from '@/hooks/web/useBgColorTheme'
import {
  changeBrandTheme,
  changeSuccessTheme,
  changeErrorTheme,
  changeWarningTheme
} from '@/hooks/web/useComponentTheme'
import { isDark } from '@/hooks/web/useDark'
import { changeMenuTheme } from '@/hooks/web/useMenuTheme'
import { sidebarFixedChange } from '@/hooks/web/useSidebarFixed'
import { changeTopbarTheme } from '@/hooks/web/useTopbarTheme'
import type { LanguageType, MenuModeType, ConfigState } from '@/stores/modules/design/types'
import { toggleClass } from '@/utils/toggleClass'

const useConfigStore = defineStore('app-config', {
  state: (): ConfigState => {
    return { ...defaultSettings }
  },
  getters: {
    getLanguageConfig(): LanguageType {
      return this.language
    },
    getSideMenuConfig(): boolean {
      return this.sideMenu
    },
    getMenuModeConfig(): MenuModeType {
      return this.menuMode
    },
    menuModeIsDefault(): boolean {
      return this.menuMode === 'default'
    },
    menuModeIsOverlay(): boolean {
      return this.menuMode === 'overlay'
    },
    menuModeIsTop(): boolean {
      return this.menuMode === 'top'
    },
    menuModeIsCollapse(): boolean {
      return this.menuMode === 'collapse'
    },
    getBrandTheme(): string {
      return this.brandTheme
    },
    getSuccessTheme(): string {
      return this.successTheme
    },
    getErrorTheme(): string {
      return this.errorTheme
    },
    getWarningheme(): string {
      return this.warningTheme
    },
    getTopbarTheme(): string {
      return this.topbarTheme
    },
    getMenuTheme(): string {
      return this.menuTheme
    },
    getBgColorTheme(): string {
      return this.bgColorTheme
    }
  },
  actions: {
    reset() {
      isDark.value = false
      this.$reset()
      // 恢复自定义主题色
      changeBrandTheme(null)
      changeSuccessTheme(null)
      changeErrorTheme(null)
      changeWarningTheme(null)
      // 恢复顶栏主题色
      changeTopbarTheme(null)
      // 恢复菜单主题色
      changeMenuTheme(null)
      // 恢复内容背景主题色
      changeBgColorTheme(null)

      toggleClass(false, 'gray-mode')

      toggleClass(false, 'color-weak')
    },
    setLanguageConfig(val: LanguageType) {
      this.language = val
    },
    setSideMenuConfig(val: boolean) {
      this.sideMenu = val
    },
    setMenuModeConfig(val: MenuModeType) {
      this.menuMode = val
    },
    toggleSideMenu() {
      this.setSideMenuConfig(!this.sideMenu)
    },
    setBrandTheme(val: string) {
      this.brandTheme = val
    },
    setSuccessTheme(val: string) {
      this.successTheme = val
    },
    setErrorTheme(val: string) {
      this.errorTheme = val
    },
    setWarningTheme(val: string) {
      this.warningTheme = val
    },
    setTopbarTheme(val: string) {
      this.topbarTheme = val
    },
    setMenuTheme(val: string) {
      this.menuTheme = val
    },
    setBgColorTheme(val: string) {
      this.bgColorTheme = val
    }
  },
  persist: {
    afterRestore: ({ store }) => {
      // 恢复自定义主题色
      changeBrandTheme(store.brandTheme)
      changeSuccessTheme(store.successTheme)
      changeErrorTheme(store.errorTheme)
      changeWarningTheme(store.warningTheme)
      // 恢复顶栏主题色
      changeTopbarTheme(store.topbarTheme)
      // 恢复菜单主题色
      changeMenuTheme(store.menuTheme)
      // 恢复内容背景主题色
      changeBgColorTheme(store.bgColorTheme)
      // 恢复侧边菜单固定
      sidebarFixedChange(store, store.sidebarFixed)

      if (store.grayMode) {
        toggleClass(store.grayMode, 'gray-mode')
        toggleClass(false, 'color-weak')
      }

      if (store.colorWeak) {
        toggleClass(store.colorWeak, 'color-weak')
        toggleClass(false, 'gray-mode')
      }
    }
  }
})
export default useConfigStore
