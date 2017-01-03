 模板字符串，编译诸如 "a = ${b}"的模板

 * 不存在属性以及属性为null编译为空字符串
 * ${}内容为空的直接取作用域对象
 * @type {String} [模板字符串]
 * @type {Object?} [作用域]
 * @return {String|Function} [编译完成的字符串或编译函数]
