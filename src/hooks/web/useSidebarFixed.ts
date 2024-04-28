export const sidebarFixedChange = (store: any, val: any) => {
  if (val && (!store.menuModeIsTop || !store.menuModeIsOverlay) && !store.getSideMenuConfig) {
    store.toggleSideMenu()
  }
}
