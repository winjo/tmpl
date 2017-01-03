/**
 * 模板字符串，编译诸如 "a = ${b}"的模板
 * 不存在属性以及属性为null编译为空字符串
 * ${}内容为空的直接取作用域对象
 * @type {String} [模板]
 * @type {Object?} [作用域]
 * @return {String|Function} [编译完成的字符串或编译函数]
 */
var INTERPOLATE = /\$\{([^\}]*)\}/g;
module.exports = function(str, data) {
  var tmpl = "var __ = [];" + 
    "with(scope || {}){" +
      "__.push('" +
      str.trim()
        .replace(/([\\'])/g, "\\$1")
        .replace(/[\r\t\n]/g, " ")
        .replace(INTERPOLATE, function(all, target) {
          target = target.replace(/\\'/g, "'").replace(/\\\\/g, "\\").trim();
          var expr = target || "scope";
          return "');" + 
            "if (" + (target ? "typeof " + target + " !== 'undefined' && " + target + " != null" : "true") + ") {" +
            "__.push(" + expr + ")" + "}" + 
            "__.push('";
        }) + "');" + 
    "}" +
    "return __.join('');"
  var fn = new Function('scope', tmpl);
  return data ? fn(data) : fn;
}
