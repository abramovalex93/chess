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
			//console.log((list[i][arg]+' '+ typeof(list[i][arg])).toString())
			//console.log((val+' '+ typeof(val)).toString())
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
	chs.type.addRight = function (name_type, names_rights) {
		var n_new_rights = 0;
		var el_type = chs.fn.findSubstrInSubstr(chs.type.all, 'name', name_type);
		console.log('el_type', el_type);
		if (el_type == -1) {
			console.warn('Не найден тип', name_type);
		}
		else {
			for (var i = 0; i < names_rights.length; i++) {
				console.log('Смотрим на право', i+1);
				var el_right = chs.fn.findSubstrInSubstr(chs.right.all, 'name', names_rights[i]);
				if (el_right != -1) {
					chs.type.all[el_type]['rights'].push(chs.right.all[el_right]);
					n_new_rights++;
					console.log('Типу "'+name_type+'" присвоено правило "'+names_rights[i]+'"')
				}
			}
		}
		return n_new_rights;
	};
	
	chs.element.add = function (_type, _start) {
		var el_type = chs.fn.findSubstrInSubstr(chs.type.all, 'name', _type)
		if ((el_type > -1) && _start.splice() && _start.length == 2) {
			if (chs.fn.findSubstrInSubstr(chs.element.all, 'start', _start) == -1) {
				chs.element.all.push({
					type: chs.type.all[el_type],
					start: _start,
					position:_start,
					newPosition: function (new_pos) {
						if ((new_pos[0] >= 1 && new_pos[0] <= 8 )&&( new_pos [1] >= 1 && new_pos [1] <= 8)){
							var n_rights = this.type.rights.length;
							console.log('rights', n_rights);
							for (var i = 0; i < n_rights; i++) {
								console.log('right', i+1);
								if (this.type.rights[i].algorithm(this, new_pos) == true) {
									this.position = new_pos;
									return true;
								}
							}
						}
						
						return false;
					}
				});
				return true;
			}
		}
		console.log(chs.type.all.indexOf(_type), _start.splice(), _start.length);
		return false;
	};
	

	return chs;
}
