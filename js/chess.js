function Chess (arg) {
	// Глобальная переменная для return
	var chs = [];
	// Переменная начальных аргументов
	chs.arg = arg;
	// Переменная для элементов шахмат
	chs.element = [];
	chs.element.all = [];
	// Список правил для фигур
	chs.right = [];
	chs.right.all = [];
	// Список типов шахмат
	chs.type = [];
	chs.type.all = [];
	// Свои функции
	chs.fn = [];
	
	chs.fn.findSubstrInSubstr = function (list, arg, val) {
		for (var i = 0; i < list.length; i++) {
			// console.log('list['+i+']['+arg+'] == '+list[i][arg]+' ?? '+val)
			console.log((list[i][arg]+' '+ typeof(list[i][arg])).toString())
			console.log((val+' '+ typeof(val)).toString())
			if ((list[i][arg]+' '+ typeof(list[i][arg])).toString() == (val+' '+ typeof(val)).toString()) return i;
		}
		return -1;
	};
	
	chs.right.add = function (name, algorithm) {
		if (typeof(algorithm) == 'function' && name != '' && typeof(name) == 'string') {
			chs.right.all.indexOf()
		}
	};
	
	chs.type.add = function (name) {
		if (typeof(name) == 'string' && name != '' && chs.type.all.indexOf(name) == -1) {
			chs.type.all.push(name);
			return true;
		}
		return false;
	};
	
	chs.element.add = function (_type, _start) {
		if ((chs.type.all.indexOf(_type) > -1) && _start.splice() && _start.length == 2) {
			if (chs.fn.findSubstrInSubstr(chs.element.all, 'start', _start) == -1) {
				chs.element.all.push({ type: _type, start: _start });
				return true;
			}
		}
		// console.log(chs.type.all.indexOf(_type), _start.splice(), _start.length);
		return false;
	};
	
	
	
	return chs;
}