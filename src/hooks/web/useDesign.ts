import { prefix } from '@/config/design'

export function useDesign(scope?: string) {
  return {
    prefixCls: `${prefix}-${scope}`,
    prefixVar: prefix
  }
}
