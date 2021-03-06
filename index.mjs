// Normalizes arguments into object with r,g,b properties.
// Accepts various formats
// - three arguments (r, g, b)
// - single array ([r, g, b])
// - single object {r, g, b}
export function normalizeRgb(...args) {
	if (args.length === 3)
		var [r, g, b] = args
	else if (Array.isArray(args[0]))
		var [r, g, b] = args[0]
	else if (typeof args[0] === 'string')
		var {r, g, b} = hexToRgb(args[0])
	else
		var {r, g, b} = args[0]
	return {r, g, b}
}

// Returns foreground color (white or black) for given color.
export function foreground(...args) {
	var r, g, b
	if (isDark(...args))
		r = g = b = 255
	else
		r = g = b = 0
	return {r, g, b}
}

export function brightness(...args) {
	var {r, g, b} = normalizeRgb(...args)
	return (r * 299 + g * 587 + b * 114) / 1000
}

// per ITU-R BT.709
export function luminance(...args) {
	var {r, g, b} = normalizeRgb(...args)
	return (0.2126 * r + 0.7152 * g + 0.0722 * b)
}

// Detects if color is dark and should be used on light backgrounds.
export function isDark(...args) {
	return luminance(...args) < 140
}

// Detects if color is light and should be used on dark backgrounds.
export function isLight(...args) {
	return !isDark(...args)
}

// Accepts color in any format and simply returns true if it's black (#000; 0,0,0; etc...)
export function isBlack(...args) {
	var {r, g, b} = normalizeRgb(...args)
	return r === 0 && g === 0 && b === 0
}

// Accepts color in any format and simply returns true if it's white (#FFF; 255,255,255; etc...)
export function isWhite(...args) {
	var {r, g, b} = normalizeRgb(...args)
	return r === 255 && g === 255 && b === 255
}

export function difference(...args) {
	if (args.length === 2) {
		var {r: r1, g: g1, b: b1} = normalizeRgb(args[0])
		var {r: r2, g: g2, b: b2} = normalizeRgb(args[1])
	} else if (args.length === 6) {
		var [r1, g1, b1, r2, g2, b2] = args
	} else {
		throw new Error('Invalid args')
	}
	var sumOfSquares = 0
	sumOfSquares += Math.pow(r1 - r2, 2)
	sumOfSquares += Math.pow(g1 - g2, 2)
	sumOfSquares += Math.pow(b1 - b2, 2)
	return Math.sqrt(sumOfSquares)
}


///////////////////////////////////////////////////////////////////////////
/////////////////////////////// CONVERSIONS ///////////////////////////////
///////////////////////////////////////////////////////////////////////////


// Converts RGB color to HEX format (including # symbol at starts).
export function rgbToHex(...args) {
	var {r, g, b} = normalizeRgb(...args)
	var int = (r << 16) + (g << 8) + b
	return '#' + int.toString(16).padStart(6, '0')
}

export function hexToRgb(string) {
	if (string.startsWith('#'))
		string = string.slice(1)
	if (string.length === 3) {
		var r = parseInt(string.substr(0,1).repeat(2), 16)
		var g = parseInt(string.substr(1,1).repeat(2), 16)
		var b = parseInt(string.substr(2,1).repeat(2), 16)
	} else {
		var r = parseInt(string.substr(0,2), 16)
		var g = parseInt(string.substr(2,2), 16)
		var b = parseInt(string.substr(4,2), 16)
	}
	return {r, g, b}
}

export function rgbToHsl(...args) {
	var {r, g, b} = normalizeRgb(...args)
	r /= 255
	g /= 255
	b /= 255
	var max = Math.max(r, g, b)
	var min = Math.min(r, g, b)
	var h
	var s
	var l = (max + min) / 2
	if (max == min) {
		h = s = 0 // achromatic
	} else {
		var d = max - min
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
		switch (max) {
			case r: h = (g - b) / d + (g < b ? 6 : 0); break
			case g: h = (b - r) / d + 2; break
			case b: h = (r - g) / d + 4; break
		}
		h /= 6
	}
	return [h, s, l]
}


///////////////////////////////////////////////////////////////////////////
//////////////////////////// COLOR EXTRACTION /////////////////////////////
///////////////////////////////////////////////////////////////////////////


// Extracts color from given canvas by summing and averaging all pixels
// Precision modifies how many pixels are used.
// 1 = every pixel, 2 = every other pixel, 10 = only every tenth pixel (10x speedup, 10% accuracy).
export function accentAverage(canvasOrImg, precision = 1) {
	var data = getCanvasData(canvasOrImg)
	var output = {r: 0, g: 0, b: 0}
	var count = 0
	var step = 4 * precision
	for (var i = 0; i < data.length; i += step) {
		let alpha = data[i + 3]
		// ignore transparent alpha
		if (data[i+3] === 0) continue
		let r = data[i]
		let g = data[i + 1]
		let b = data[i + 2]
		// ignore black
		if (r === 0 && g === 0 && b === 0) continue
		// ignore white
		if (r === 255 && g === 255 && b === 255) continue
		++count
		output.r += r
		output.g += g
		output.b += b
	}
	
	// ~~ used to floor values
	output.r = ~~(output.r / count)
	output.g = ~~(output.g / count)
	output.b = ~~(output.b / count)
	
	return output	
}

export function getCanvasData(canvasOrImg) {
	if (canvasOrImg instanceof Image) {
		var img = canvasOrImg
		var canvas = document.createElement('canvas')
		var context = canvas.getContext('2d')
		context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)
	} else {
		var canvas = canvasOrImg
		var context = canvas.getContext('2d')
	}
	var {data} = context.getImageData(0, 0, canvas.width, canvas.height)
	return data
}