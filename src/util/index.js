import _ from 'lodash'

export const randomFromArray = arr => _.sample(_.shuffle(arr));

export const getCircleDiameter = () => {
  let diameter = 0
  while(diameter < 2) {
    diameter = (Math.random() * 7) * 2
  }
  return diameter
}

export const hexToRGBA = (hex, alpha) => {
  const trimHex = hex => {
    return hex.replace('#', '')
  }

  let red = parseInt(trimHex(hex).substring(0, 2), 16)
  let green = parseInt(trimHex(hex).substring(2, 4), 16)
  let blue = parseInt(trimHex(hex).substring(4, 6), 16)

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}
