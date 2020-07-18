const path = require('path')
const rootPath = path.resolve(__dirname, '../src')

module.exports = ({ config }) => {
	config.module.rules.push({
		test: /\.scss$/,
		use: [
			'vue-style-loader',
      'css-loader',
			{
				loader: 'sass-loader',
				options: {
					data: `
						@import "@/styles/_global.scss";
					`
				}
			}
		],
	})

	config.module.rules.push({
		test: /\.pug$/,
		loader: 'pug-plain-loader'
	})

	config.module.rules.push({
		test: /\.svg$/,
		use: [
			'svg-sprite-loader',
			'svgo-loader'
		]
	})

	config.resolve.alias['@'] = rootPath
	config.resolve.alias['~'] = rootPath

	return config
}