const Iridescent = require('./index.js')
const {assert} = require('chai')


describe('Iridescent', () => {


	describe('.normalizeRgb()', () => {

		it('accepts three arguments (r, g, b)', () => {
			var result = Iridescent.normalizeRgb(255, 255, 255)
			assert.deepEqual(result, [255, 255, 255])
		})

		it('accepts single array ([r, g, b])', () => {
			var result = Iridescent.normalizeRgb([255, 255, 255])
			assert.deepEqual(result, [255, 255, 255])
		})

		it('accepts single array ({r, g, b})', () => {
			var result = Iridescent.normalizeRgb({r: 255, g: 255, b: 255})
			assert.deepEqual(result, [255, 255, 255])
		})

	})


	describe('.rgbToHex()', () => {

		it('returns six digit hex #000000', () => {
			var result = Iridescent.rgbToHex(0, 0, 0)
			assert.equal(result, '#000000')
		})

		it('returns six digit hex #010101', () => {
			var result = Iridescent.rgbToHex(1, 1, 1)
			assert.equal(result, '#010101')
		})

		it('returns six digit hex #ffffff', () => {
			var result = Iridescent.rgbToHex(255, 255, 255)
			assert.equal(result, '#ffffff')
		})

		it('returns six digit hex #0000ff', () => {
			var result = Iridescent.rgbToHex(0, 0, 255)
			assert.equal(result, '#0000ff')
		})

	})


	describe('.isWhite()', () => {

		it('return true if [255, 255, 255]', () => {
			assert.isTrue(Iridescent.isWhite([255, 255, 255]))
		})

		it('return true if #FFF', () => {
			assert.isTrue(Iridescent.isWhite('#FFF'))
		})

		it('return false if #000', () => {
			assert.isFalse(Iridescent.isWhite('#000'))
		})

	})


	describe('.isBlack()', () => {

		it('return true if [0, 0, 0]', () => {
			assert.isTrue(Iridescent.isBlack([0, 0, 0]))
		})

		it('return true if #000', () => {
			assert.isTrue(Iridescent.isBlack('#000'))
		})

		it('return false if #FFF', () => {
			assert.isFalse(Iridescent.isBlack('#FFF'))
		})

	})


	describe('.isLight()', () => {

		it('return true if [255, 255, 255]', () => {
			assert.isTrue(Iridescent.isLight([255, 255, 255]))
		})

		it('return true if [199, 199, 199]', () => {
			assert.isTrue(Iridescent.isLight([199, 199, 199]))
		})

		it('return false if [70, 70, 70]', () => {
			assert.isFalse(Iridescent.isLight([70, 70, 70]))
		})

		it('return true if #FFF', () => {
			assert.isTrue(Iridescent.isLight('#FFF'))
		})

		it('return true if #DDD', () => {
			assert.isTrue(Iridescent.isLight('#DDD'))
		})

		it('return false if #333', () => {
			assert.isFalse(Iridescent.isLight('#333'))
		})

	})


	describe('.isDark()', () => {

		it('return false if [255, 255, 255]', () => {
			assert.isFalse(Iridescent.isDark([255, 255, 255]))
		})

		it('return false if [199, 199, 199]', () => {
			assert.isFalse(Iridescent.isDark([199, 199, 199]))
		})

		it('return true if [70, 70, 70]', () => {
			assert.isTrue(Iridescent.isDark([70, 70, 70]))
		})

		it('return false if #FFF', () => {
			assert.isFalse(Iridescent.isDark('#FFF'))
		})

		it('return false if #DDD', () => {
			assert.isFalse(Iridescent.isDark('#DDD'))
		})

		it('return true if #333', () => {
			assert.isTrue(Iridescent.isDark('#333'))
		})

	})


})

