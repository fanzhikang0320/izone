
/**
 * 深度克隆
 * @param {*} origin 源对象
 * @param {*} targ 目标对象
 */
var deepClone = (function () {
	//判断是不是数组
	function isArray(prop) {
		return ((Object.prototype.toString.call(prop)) === '[object Array]');
	}
	//判断是不是对象
	function isObject(prop) {
		return ((Object.prototype.toString.call(prop)) === '[object Object]');
	}
//拷贝数组
	function copyArray(propName,orignProp,Target) {
		var arr = [];//定义一个空数组
		//遍历对象
		for(var prop in orignProp){
			//调用isArray判断是不是数组
			if (isArray(orignProp[prop])) {
				copyArray(prop,orignProp[prop],Target);
			} else if (isObject(orignProp[prop])) {
				copyObject(prop,orignProp[prop],Target);
			} else {
				arr.push(orignProp[prop]);
			}
		}
		Target[propName] = arr;
	}
//拷贝对象
	function copyObject(propName,orignProp,Target) {
		var obj = {};//定义一个空对象
	//	遍历整个对象
		for(var prop in orignProp){
			if (isArray(orignProp[prop])) {
				copyArray(prop,orignProp[prop],Target);
			} else if (isObject(orignProp[prop])) {
				copyObject(prop,orignProp[prop],Target);
			} else {
				obj[prop] = orignProp[prop];
			}
		}
		Target[propName] = obj;
	}

	return function (Orign,Target) {
		for(var prop in Orign){
			if (isArray(Orign[prop])) {
				copyArray(prop,Orign[prop],Target);
			} else if (isObject(Orign[prop])) {
				copyObject(prop,Orign[prop],Target);
			} else {
				Target[prop] = Orign[prop];
			}
		}
	};
}());
module.exports = {
    deepClone
}
