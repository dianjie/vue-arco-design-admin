import type { ConfigState } from '@/stores/modules/design/types'

export const defaultSettings: ConfigState = {
  language: 'zh-cn',
  sideMenu: true,
  menuMode: 'default',
  brandTheme: '#165dff',
  successTheme: '#00b42a',
  errorTheme: '#f53f3f',
  warningTheme: '#ff7d00',
  topbarTheme: '#ffffff',
  menuTheme: '#ffffff',
  bgColorTheme: '#eeeeee',
  sidebarFixed: false,
  grayMode: false,
  colorWeak: false
}

// css 前缀
export const prefix = 'di'
