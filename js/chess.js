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
	
	chs.right.add = function (_name, _algorithm) {
		if (typeof(_algorithm) == 'function' && _name != '' && typeof(_name) == 'string') {
			if(chs.right.all.indexOf(_name)==-1) { 
				chs.right.all.push({name: _name, algorithm:_algorithm});
				return true;
			}
		}
		return false;
	};
	
	chs.type.add = function (_name) {
		if (typeof(_name) == 'string' && _name != '' && chs.fn.findSubstrInSubstr(chs.type.all, 'name', _name) == -1) {
			chs.type.all.push({name: _name, rights: []});
			return true;
		}
		return false;
	};
	
	//функция присвоения типам прав
	chs.type.addRight = function (name_type, name_right) {
		var el_type = chs.fn.findSubstrInSubstr(chs.type.all, 'name', name_type);
		var el_right = chs.fn.findSubstrInSubstr(chs.right.all, 'name', name_right);
		if (el_type != -1 && el_right != -1) {
			chs.type.all[el_type]['rights'].push(chs.right.all[el_right]);
			return true;
		}
		return false;
	};
	
	chs.element.add = function (_type, _start) {
		var el_type = chs.fn.findSubstrInSubstr(chs.type.all, 'name', _type)
		if ((el_type > -1) && _start.splice() && _start.length == 2) {
			if (chs.fn.findSubstrInSubstr(chs.element.all, 'start', _start) == -1) {
				chs.element.all.push({ type: chs.type.all[el_type], start: _start });
				return true;
			}
		}
		console.log(chs.type.all.indexOf(_type), _start.splice(), _start.length);
		return false;
	};
	
	
	
	return chs;
}





//построение доски
	// $(document).addBoard = function (){
	// board = {};
	// board.stdSize = 50;
   // for (var y = 1; y < 9; y++) 
	// {
		// $('#board1').append('<div class="string" id="string'+y+'">')
		// for (var x = 1; x < 9; x++) 
		// {
			// console.log(x, y)
			// $('#string'+y).append('<div class="square" id="square'+y+'-'+x+'" style="width:'+board.stdSize+'px; height:'+board.stdSize+'px;">');
		// }
	// }
// };
//раскраска доски
	// $('.string:even').find('.square:odd').css('backgroundColor', 'grey');
	// $('.string:odd').find('.square:even').css('backgroundColor', 'grey');
	// $('.square').css('display','inline-block');
	// $('#board1').css('width', board.stdSize * 8);
