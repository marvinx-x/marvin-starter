const presets = [
	[
		'@babel/preset-env',
		{
			useBuiltIns: 'usage',
			debug: false,
			corejs: 3,
			targets: "last 2 versions"
		}
	]
];

module.exports = { presets };

