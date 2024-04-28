export type LanguageType = 'zh-cn' | 'en'
export type MenuModeType = 'default' | 'overlay' | 'collapse' | 'top'
export interface ConfigState {
  language: LanguageType
  sideMenu: boolean
  menuMode: MenuModeType
  brandTheme: string
  successTheme: string
  errorTheme: string
  warningTheme: string
  topbarTheme: string
  menuTheme: string
  bgColorTheme: string
  sidebarFixed: boolean
  grayMode: boolean
  colorWeak: boolean
  [key: string]: any
}
