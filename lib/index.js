module.exports = function(source){
	this.cacheable && this.cacheable();

	let options = this.query.replace(/^\?/, '')
	
	// 解析配置文件
	if (options) {
		options = JSON.parse(options)
	}

	// 匹配中include目录
	if (this.resourcePath.indexOf(options.include) == 0 && options.components) {
		
		for (let i in options.components) {
			var useReg = new RegExp('<' + i + '(\\s|\\.|\\>)')
            var importReg = new RegExp('(var|let|const|import)\\s+(.*\\{\\s*|.*\\,\\s*|\\s*)' + i + '(\\s+|\\,|\\})')

			var uri = options.components[i]
			
			// 页面中有用到相关的组件并没有引用
			if (useReg.test(source) && !importReg.test(source)) {
				source = 'import ' + i + ' from "' + uri + '";' + source
			}
			
		}
	}
	return source
}


