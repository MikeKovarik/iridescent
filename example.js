var Iridescent = require('./index.js')


console.log('isDark', Iridescent.isDark(10,20,13))
console.log('isLight', Iridescent.isLight('#EEE'))
console.log('isWhite', Iridescent.isWhite([255, 255, 255]))
console.log('isBlack', Iridescent.isBlack({r: 1, g: 1, b: 1}))

console.log('luminance', Iridescent.luminance([255,255,255]))
console.log('luminance', Iridescent.luminance([128,128,128]))
console.log('luminance', Iridescent.luminance([185,100,80]))
console.log('luminance', Iridescent.luminance([0,0,0]))

console.log('brightness', Iridescent.brightness([255,255,255]))
console.log('brightness', Iridescent.brightness([128,128,128]))
console.log('brightness', Iridescent.brightness([185,100,80]))
console.log('brightness', Iridescent.brightness([0,0,0]))

console.log('rgbToHex', Iridescent.rgbToHex([0,0,0]))
console.log('rgbToHex', Iridescent.rgbToHex(16, 16, 16))
console.log('rgbToHex', Iridescent.rgbToHex({r: 255, g:255, b: 255}))

console.log('hexToRgb', Iridescent.hexToRgb('#FFF'))
console.log('hexToRgb', Iridescent.hexToRgb('#0F0F0F'))
console.log('hexToRgb', Iridescent.hexToRgb('FFFFFF'))

console.log('rgbToHsl', Iridescent.rgbToHsl([185,100,80]))