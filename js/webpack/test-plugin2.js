class TestPlugin2 {
	constructor(options) {
		this.options = options;
	}

	apply(compiler) {
		// compiler.hooks.done.tap('TestPlugin', () => {
		// 	console.log('Hello TestPlugin2!');
		// });

		// compiler.plugin("TestPlugin", function(compilation) {
		// 	console.log(compilation);

		// 	// compilation.plugin("optimize", function() {
		// 	// 	console.log("The compilation is starting to optimize files...");
		// 	// });
		// });
	}
}

module.exports = TestPlugin2;