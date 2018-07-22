const {
	ConcatSource
} = require('webpack-sources')


const wrapComment = (str) => {
	console.log(str)
	if (!str.includes("\n")) return `/*! ${str} */`;
	return `/*!\n * ${str.split("\n").join("\n * ")}\n */`;
};

class TestPlugin1 {
	constructor(banner) {
		this.options = {};
		this.banner = wrapComment(banner);
	}

	apply(compiler) {
		const options = this.options;
		const banner = this.banner;

		for (var key in compiler.hooks) {
			((hook) => {
				compiler.hooks[hook].tap("TestPlugin1", () => {
					console.log(`compiler => ${hook}`)
				})
			})(key)
		}
		compiler.hooks.compilation.tap("BannerPlugin", compilation => {
			for (var key in compilation.hooks) {
				((hook) => {
					compilation.hooks[hook].tap("TestPlugin1", () => {
						console.log(`compilation => ${hook}`)
					})
				})(key)
			}
		})
	}
}

module.exports = TestPlugin1;