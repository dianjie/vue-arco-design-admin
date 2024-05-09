import type {
  RouteComponent,
  RouteMeta,
  RouteRecordName,
  RouteRecordRedirectOption
} from 'vue-router'

export interface AppRouteRecordRaw {
  path: string
  name?: RouteRecordName
  meta?: RouteMeta
  redirect?: RouteRecordRedirectOption
  component: RouteComponent | Lazy<RouteComponent>
  children?: AppRouteRecordRaw[]
  fullPath?: string
}
