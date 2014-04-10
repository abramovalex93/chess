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
	// Список типов шахмат
	chs.type = [];
	chs.type.all = [];
	
	chs.type.add = function (name) {
		if (typeof(name) != 'undefined' && name != '') {
			chs.type.all.push(name);
			return true;
		}
		return false;
	}
	
	chs.element.add = function (_type, _start) {
		if (chs.type.all.indexOf(_type) > -1 && _start.splice() && _start.length = 2) {
			chs.element.all.push({ type: _type, start: _start });
		}
		return false;
	}
	
	return chs;
}