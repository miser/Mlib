## webpack

通过命令行工具（CLI）将编写好的模块进行处理、打包成期望的资源文件。

###Module

如果是JS文件，它需要遵循 [ES6](https://en.wikipedia.org/wiki/ECMAScript#6th_Edition_-_ECMAScript_2015), [CommonJS](https://en.wikipedia.org/wiki/CommonJS), and [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) 规范。

###Loaders

主要职责是将写好的源码翻译成通用的格式，比如讲JS的ES6、ES7标准翻译成ES5，将SASS、LESS翻译成CSS等。

###Plugins

在我看来webpack就是一个plugin管理工具，通过[Tapable](https://github.com/webpack/tapable)将生命周期中不同的业务逻辑订阅到不同的hook上，随着程序的运行、生命周期的推进，不断触发这些逻辑处理方法，达到开发者对资源的处理目的。其中compiler和compilation为主要的对象。

#### compiler

全局只有一个compiler对象

#### compilation

每次编译的时候都会重新创建一个新的compilation对象，包含chunks，modules，cache，assets等信息。

打印出整个compiler和compilation的生命周期

```js
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
// compiler => environment
// compiler => afterEnvironment
// compiler => entryOption
// compiler => afterPlugins
// compiler => afterResolvers
// compiler => beforeRun
// compiler => run
// ℹ ｢webpack｣: Starting Build
// compiler => normalModuleFactory
// compiler => contextModuleFactory
// compiler => beforeCompile
// compiler => compile
// compiler => thisCompilation
// compiler => compilation
// compiler => make
// compilation => buildModule
// compilation => succeedModule
// compilation => buildModule
// compilation => normalModuleLoader
// compilation => succeedModule
// compilation => finishModules
// compilation => seal
// compilation => optimizeDependenciesBasic
// compilation => optimizeDependencies
// compilation => dependencyReference
// compilation => optimizeDependenciesAdvanced
// compilation => afterOptimizeDependencies
// compilation => beforeChunks
// compilation => dependencyReference
// compilation => afterChunks
// compilation => optimize
// compilation => optimizeModulesBasic
// compilation => optimizeModules
// compilation => optimizeModulesAdvanced
// compilation => afterOptimizeModules
// compilation => optimizeChunksBasic
// compilation => optimizeChunks
// compilation => optimizeChunksAdvanced
// compilation => afterOptimizeChunks
// compilation => optimizeTree
// compilation => afterOptimizeTree
// compilation => optimizeChunkModulesBasic
// compilation => optimizeChunkModules
// compilation => optimizeChunkModulesAdvanced
// compilation => afterOptimizeChunkModules
// compilation => shouldRecord
// compilation => reviveModules
// compilation => optimizeModuleOrder
// compilation => advancedOptimizeModuleOrder
// compilation => beforeModuleIds
// compilation => moduleIds
// compilation => optimizeModuleIds
// compilation => afterOptimizeModuleIds
// compilation => reviveChunks
// compilation => optimizeChunkOrder
// compilation => beforeChunkIds
// compilation => optimizeChunkIds
// compilation => afterOptimizeChunkIds
// compilation => recordModules
// compilation => recordChunks
// compilation => beforeHash
// compilation => chunkHash
// compilation => contentHash
// compilation => afterHash
// compilation => recordHash
// compilation => beforeModuleAssets
// compilation => shouldGenerateChunkAssets
// compilation => beforeChunkAssets
// compilation => chunkAsset
// compilation => additionalChunkAssets
// compilation => record
// compilation => additionalAssets
// compilation => optimizeChunkAssets
// compilation => afterOptimizeChunkAssets
// compilation => optimizeAssets
// compilation => afterOptimizeAssets
// compilation => needAdditionalSeal
// compilation => afterSeal
// compiler => afterCompile
// compiler => shouldEmit
// compiler => emit
// compiler => afterEmit
// compilation => needAdditionalPass
// compiler => done
// ℹ ｢webpack｣: Build Finished
```

- compilation => normalModuleLoader 主要处理webpack.config.js 里的loaders，一个接一个的处理
- compilation => seal 后续compilation的其它hook就是对module的封装处理，合并、分离、提取公共模块等，编程预期的chunk。
- compiler => emit 将结果输出到指定的目录
- compiler => afterEmit 输出完成

