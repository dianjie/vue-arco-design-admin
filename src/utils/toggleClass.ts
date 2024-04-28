export function toggleClass(flag: boolean, clsName: string, target?: HTMLElement) {
  const targetEl = target || document.documentElement
  const { className } = targetEl
  let tempClassName = className ? className.trim() : ''
  tempClassName = tempClassName.replace(clsName, '')
  tempClassName = flag ? `${tempClassName} ${clsName} ` : tempClassName
  targetEl.className = tempClassName.trim()
}
