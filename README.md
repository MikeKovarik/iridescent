# iridescent

[![NPM](https://img.shields.io/npm/v/iridescent.svg)](https://www.npmjs.com/package/iridescent)
[![Dependency Status](https://david-dm.org/MikeKovarik/iridescent.svg)](https://david-dm.org/MikeKovarik/iridescent)
[![devDependency Status](https://david-dm.org/MikeKovarik/iridescent/dev-status.svg)](https://david-dm.org/MikeKovarik/iridescent#info=devDependencies)
[![Maintenance Status](http://img.shields.io/badge/status-maintained-brightgreen.svg)](https://github.com/MikeKovarik/iridescent/pulse)
[![Known Vulnerabilities](https://snyk.io/test/github/MikeKovarik/iridescent/badge.svg)](https://snyk.io/test/github/MikeKovarik/iridescent)
[![Discord](https://img.shields.io/discord/419198557363634178.svg)](https://discord.gg/v2mUmeD)
[![Gitter](https://badges.gitter.im/MikeKovarik/iridescent.svg)](https://gitter.im/MikeKovarik/iridescent?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Maintainability](https://api.codeclimate.com/v1/badges/f4c0ee405c46126d6325/maintainability)](https://codeclimate.com/github/MikeKovarik/iridescent/maintainability)

🎨 Color conversion, extraction & utility library

## Installation

```js
npm install iridescent
```

## Usage

```js
import Iridescent from 'iridescent'

Iridescent.isDark(10,20,13) // true
Iridescent.isLight('#EEE') // true
Iridescent.isWhite([255, 255, 255]) // true
Iridescent.isBlack({r: 1, g: 1, b: 1}) // false

Iridescent.luminance([255,255,255]) // 254.99999999999997
Iridescent.luminance([128,128,128]) // 128
Iridescent.luminance([185,100,80]) // 116.627
Iridescent.luminance([0,0,0]) // 0

Iridescent.brightness([255,255,255]) // 255
Iridescent.brightness([128,128,128]) // 128
Iridescent.brightness([185,100,80]) // 123.135
Iridescent.brightness([0,0,0]) // 0

Iridescent.rgbToHex([0,0,0]) // #000000
Iridescent.rgbToHex(16, 16, 16) // #101010
Iridescent.rgbToHex({r: 255, g:255, b: 255}) // #ffffff

Iridescent.hexToRgb('#FFF') // [ 255, 255, 255 ]
Iridescent.hexToRgb('#0F0F0F') // [ 15, 15, 15 ]
Iridescent.hexToRgb('FFFFFF') // [ 255, 255, 255 ]

Iridescent.rgbToHsl([185,100,80]) // [ 0.03174603174603175, 0.4285714285714286, 0.5196078431372548 ]

```