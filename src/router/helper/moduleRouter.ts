import type { RouteRecordNormalized } from 'vue-router'

const modules = import.meta.glob('../modules/*.ts', { eager: true })

const formatModules = (_modules: any, result: RouteRecordNormalized[]): RouteRecordNormalized[] => {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default
    if (!defaultModule) return
    const moduleList = Array.isArray(defaultModule) ? [...defaultModule] : [defaultModule]
    result.push(...moduleList)
  })
  return result
}

export const appRoutes = formatModules(modules, [])
