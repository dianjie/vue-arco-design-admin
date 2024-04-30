import Color from 'color'

// https://github.com/PimpTrizkit/PJs/wiki/12.-Shade,-Blend-and-Convert-a-Web-Color-(pSBC.js)#stackoverflow-archive-begin
export const shadeHexColor = (color: string, percent: number) => {
  const f = parseInt(color.slice(1), 16),
    t = percent < 0 ? 0 : 255,
    p = percent < 0 ? percent * -1 : percent,
    R = f >> 16,
    G = (f >> 8) & 0x00ff,
    B = f & 0x0000ff
  return (
    '#' +
    (
      0x1000000 +
      (Math.round((t - R) * p) + R) * 0x10000 +
      (Math.round((t - G) * p) + G) * 0x100 +
      (Math.round((t - B) * p) + B)
    )
      .toString(16)
      .slice(1)
  )
}

export const getTextColor = (hex: string) => {
  const tColor = Color(hex)
  const temp = -177
  return tColor.isDark()
    ? 'rgba(255, 255, 255, 0.9)'
    : tColor
        .red(tColor.red() + temp)
        .green(tColor.green() + temp + 11)
        .blue(tColor.blue() + temp + 27)
        .hex()
}

export const getColorBorder = (Acolor: Color, isDarkColor: boolean) => {
  const num = isDarkColor ? 14 : -14
  return Acolor.red(Acolor.red() + num)
    .green(Acolor.green() + num)
    .blue(Acolor.blue() + num)
    .hex()
}
