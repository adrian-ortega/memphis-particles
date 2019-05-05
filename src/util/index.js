import _ from 'lodash'

/**
 * @param {array} arr
 * @return {*}
 */
export const getRandomFromArray = arr => _.sample(_.shuffle(arr));

/**
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export const getRandomIntFromMinMax = (min = 1, max = 100) => Math.floor(Math.random() * (max - min) + min)

/**
 * @return {number}
 */
export const getCircleDiameter = () => {
  let diameter = 0
  while(diameter < 2) {
    diameter = (Math.random() * 7) * 2
  }
  return diameter
}

/**
 * @param {String} hex
 * @param {Number} alpha
 * @return {string}
 */
export const getRGBAFromHex = (hex, alpha = 1) => {
  const trimHex = hex => {
    return hex.replace('#', '')
  }

  let red = parseInt(trimHex(hex).substring(0, 2), 16)
  let green = parseInt(trimHex(hex).substring(2, 4), 16)
  let blue = parseInt(trimHex(hex).substring(4, 6), 16)

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

/**
 * @param {number} start
 * @param {number} end
 * @return {number}
 */
export const getRandomBetween = (start, end) => getRandomFromArray(_.range(start, end));

/**
 * @param start
 * @param end
 * @param step
 * @return {*}
 */
export const getRandomFromRange = (start, end, step = 1) => getRandomFromArray(_.range(start, end, step));

/**
 *
 * @param percentage
 * @param colorA
 * @param colorB
 * @param l
 * @return {string|null}
 */
export const scaleColor = (percentage, colorA, colorB, l) => {
  let r, g, b, P, f, t, h, i = parseInt, m = Math.round, a = typeof (colorB) == "string";

  if (typeof (percentage) != "number" || percentage < -1 || percentage > 1 || typeof (colorA) != "string" || (colorA[0] != 'r' && colorA[0] != '#') || (colorB && !a)){
    return null;
  }

  const pSBCr = (d) => {
    let n = d.length, x = {};
    if (n > 9) {
      [r, g, b, a] = d = d.split(","), n = d.length;
      if (n < 3 || n > 4) return null;
      x.r = i(r[3] == "a" ? r.slice(5) : r.slice(4)), x.g = i(g), x.b = i(b), x.a = a ? parseFloat(a) : -1
    } else {
      if (n == 8 || n == 6 || n < 4) return null;
      if (n < 6) d = "#" + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : "");
      d = i(d.slice(1), 16);
      if (n == 9 || n == 5) x.r = d >> 24 & 255, x.g = d >> 16 & 255, x.b = d >> 8 & 255, x.a = m((d & 255) / 0.255) / 1000;
      else x.r = d >> 16, x.g = d >> 8 & 255, x.b = d & 255, x.a = -1
    }
    return x
  };

  h = colorA.length > 9, h = a ? colorB.length > 9 ? true : colorB == "c" ? !h : false : h, f = pSBCr(colorA), P = percentage < 0, t = colorB && colorB != "c" ? pSBCr(colorB) : P ? {
    r: 0,
    g: 0,
    b: 0,
    a: -1
  } : {r: 255, g: 255, b: 255, a: -1}, percentage = P ? percentage * -1 : percentage, P = 1 - percentage;
  if (!f || !t) {
    return null;
  }

  if (l) r = m(P * f.r + percentage * t.r), g = m(P * f.g + percentage * t.g), b = m(P * f.b + percentage * t.b);
  else r = m((P * f.r ** 2 + percentage * t.r ** 2) ** 0.5), g = m((P * f.g ** 2 + percentage * t.g ** 2) ** 0.5), b = m((P * f.b ** 2 + percentage * t.b ** 2) ** 0.5);
  a = f.a, t = t.a, f = a >= 0 || t >= 0, a = f ? a < 0 ? t : t < 0 ? a : a * P + t * percentage : 0;
  if (h) return "rgb" + (f ? "a(" : "(") + r + "," + g + "," + b + (f ? "," + m(a * 1000) / 1000 : "") + ")";
  else return "#" + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2)
}
