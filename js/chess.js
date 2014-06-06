function Chess (arg) {
	if (typeof(arg.append) != 'string') {
		console.info('Chess: в аргументах необходимо передать append (type:string).');
		return false;
	}
	// Глобальная переменная для return
	var chs = [];
	// Переменная начальных аргументов
	chs.arg = arg;
	// Переменная для элементов шахмат
	chs.element = [];
	chs.element.all = [];
	chs.element.basket = [];
	// Список правил для фигур
	chs.right = [];
	chs.right.all = [];
	// Список типов шахмат
	chs.type = [];
	chs.type.all = [];
	// Свои функции
	chs.fn = [];
	// Работа с доской
	chs.board = [];
	// Работа с историей
	chs.history = [];
	// Записи об истории
	chs.history.all = [];
	
	// Добавить запись в историю
	chs.history.add = function (el, new_pos) {
		chs.history.all.push({element: el, new_position: new_pos});
	}
	
	// Поиск субстроки в субстроке
	chs.fn.findSubstrInSubstr = function (list, arg, val) {
		for (var i = 0; i < list.length; i++) {
			// console.log('list['+i+']['+arg+'] == '+list[i][arg]+' ?? '+val)
			//console.log((list[i][arg]+' '+ typeof(list[i][arg])).toString())
			//console.log((val+' '+ typeof(val)).toString())
			if ((list[i][arg]+' '+ typeof(list[i][arg])).toString() == (val+' '+ typeof(val)).toString()) return i;
		}
		return -1;
	};
	
	// Добавление правила
	chs.right.add = function (_name, _algorithm) {
		if (typeof(_algorithm) == 'function' && _name != '' && typeof(_name) == 'string') {
			if(chs.right.all.indexOf(_name)==-1) { 
				chs.right.all.push({name: _name, algorithm:_algorithm});
				return true;
			}
		}
		return false;
	};
	
	
	// Добавление типа
	chs.type.add = function (_name) {
		if (typeof(_name) == 'string' && _name != '' && chs.fn.findSubstrInSubstr(chs.type.all, 'name', _name) == -1) {
			chs.type.all.push({name: _name, rights: []});
			return true;
		}
		return false;
	};
	
	// Присвоение типам прав
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
	
	
	// Добавление элементов на доску
	chs.element.add = function (_type, _start) {
		var el_type = chs.fn.findSubstrInSubstr(chs.type.all, 'name', _type)
		if ((el_type > -1) && _start.splice() && _start.length == 2) {
			if (chs.fn.findSubstrInSubstr(chs.element.all, 'start', _start) == -1) {
				chs.element.all.push({
					type: chs.type.all[el_type],
					start: _start,
					position:_start,
					inf: {},
					factor: function () {
						return -Math.pow(-1, this.team());
					},
					newPosition: function (new_pos) {
						if ((new_pos[0] >= 1 && new_pos[0] <= 8 ) && ( new_pos [1] >= 1 && new_pos [1] <= 8) && ((ch.history.all.length > 0 && ch.history.all.slice(-1)[0].element.team() != this.team()) || (ch.history.all.length == 0))) {
							var n_rights = this.type.rights.length;
							console.log('Всего прав: '+ n_rights);
							var ok = false;
							var pray = false;
							for (var i = 0; i < n_rights; i++) {
								result = this.type.rights[i].algorithm(this, new_pos);
								console.log('- правило '+ (i+1) +' ['+ this.type.rights[i].name +']: '+ result);
								switch (result) {
									case true:
										ok = true;
										break;
									case false:
										return false;
										break;
								}
							}
							if (ok) {
								chs.history.add(this, new_pos);
								this.position = new_pos;
								chs.board.refresh();
								return true;
							}
						}
						return false;
					},
					kill: function (n) {
						el_kill_start = chs.element.all[n].start;
						console.log('killing', el_kill_start);
						if (el_kill_start[0] <= this.start[0] + 1 && el_kill_start[0] >= this.start[0] - 1) {
							return false;
						}
						chs.element.del(n);
						return true;
					},
					team: function () {
						return chs.element.team(this);
					}
				});
				return true;
			}
		}
		console.log(chs.type.all.indexOf(_type), _start.splice(), _start.length);
		return false;
	};
	
	
	// Перемещение элемента с доски в корзину
	chs.element.del = function (n) {
		in_basket = chs.element.all.splice(n, 1);
		chs.element.basket.push(in_basket);
	}
	
	// Определение команды элемента с доски
	chs.element.team = function (el) {
		if (typeof(el.start[0]) == 'undefined') {
			return null;
		}
		if (el.start[0]  >= 7) {
			return 1;
		}
		return 0;
	}
	
	// Работа с доской
	chs.board.mousedown = false;
	chs.board.mousedownStart = [false, false];
	chs.board.mousedownElement = false;
	chs.board.size_square_px = 50;
	chs.board.mouseupXY = [0, 0];
	
	chs.board.events = function () {
		// функция для перемещения в другой див по координатам
		// chess.checkImg = function (el, xy) {
			// $(el).remove();
			// $('#square'+xy[0]+'-'+xy[1]).append(el);
		// }
	
		// Клик мышкой на объект доски
		$('.square').on('mousedown', 'img', function(e) {
			chs.board.mousedown = true;
			chs.board.mousedownStart = [e.pageX,e.pageY];
			chs.board.mousedownElement = this;
			console.log('Зажата фигура', chs.board.mousedown, chs.board.mousedownStart);
		});
		
		// Мышка отпустила объект доски
		$(document).mouseup(function (e) {
			console.log('Зажата фигура', chs.board.mousedown);
			var x = Math.ceil((e.pageY - $('.chess').offset().top) / ($('.chess').height() / 8));
			var y = Math.ceil((e.pageX - $('.chess').offset().left) / ($('.chess').width() / 8));
			if (1 <= x && x <= 8 && 1 <= y && y <= 8 && chs.board.mousedown) {
				chs.board.mouseupXY = [x, y];
				console.log(chs.board.mouseupXY);
				//chess.checkImg(chess.mousedownElement, chess.mouseupXY)
				if (chs.board.mousedownElement.id.slice(0, 4) == 'chsN') {
					var N = Number(chs.board.mousedownElement.id.slice(4));
					chs.element.all[N].newPosition(chs.board.mouseupXY);
				};
			}
			chs.board.mousedown = false;
			$(chs.board.mousedownElement).css('margin', '0 auto');
			chs.board.mousedownElement = false;
		});
		
		// Перетаскивание элемента
		$('.chess *').mousemove(function(e) {
			if (chs.board.mousedown == true) {
				chs.board.mousemove = [ e.pageX - chs.board.mousedownStart[0], e.pageY - chs.board.mousedownStart[1] ]
				$(chs.board.mousedownElement).css({marginTop: chs.board.mousemove[1], marginLeft: chs.board.mousemove[0]});
				//console.log('Переместилась фигура', chs.board.mousemove);
			}
			return false;
		});
	};
	
	chs.board.addElements = function () {
		// Расстановка фигур
		// - соответствие картинок
		var img = [];
		img['Пешка']	= 'p';
		img['Слон']		= 'b';
		img['Ферзь']	= 'q';
		img['Король']	= 'k';
		img['Ладья']	= 'r';
		img['Конь']		= 'n';
		img['-cat']		= 'img/';
		img['-black']	= 'b';
		img['-white']	= 'w';
		img['-end']		= '.png';
		
		// - перебор элементов и расстановка
		for (i in chs.element.all) {
			var el = chs.element.all[i];
			var team = img['-black'];
			if (el.team()) team = img['-white'];
			var type = el.type.name;
			$('#square'+ chs.element.all[i].position[0] +'-'+ chs.element.all[i].position[1]).append('<img id="chsN'+i+'" src="'+ img['-cat'] + team + img[type] + img['-end'] +'">');
		}
	}
	
	chs.board.init = function () {
		$(document).ready(function () {
			// Создание строк на доске
			for (var y = 1; y < 9; y++) {
				$(chs.arg.append).append('<div class="string" id="string'+y+'">')
				// Создание столбцов в строке
				for (var x = 1; x < 9; x++) {
					$('#string'+y).append('<div class="square" id="square'+y+'-'+x+'" style="width:'+chs.board.size_square_px+'px; height:'+chs.board.size_square_px+'px;">');
				}
			}
			
			// Раскраска доски
			$('.string:even').find('.square:odd').css('backgroundColor', 'grey');
			$('.string:odd').find('.square:even').css('backgroundColor', 'grey');
			$('.square').css('display','inline-block');
			$(chs.arg.append).css('width', chs.board.size_square_px * 8);
			
			chs.board.addElements();
			
			// Запрет на выделение мышью объектов на доске
			$('.chess *')
				.attr('unselectable', 'on')
				.css('-moz-user-select', 'none')
				.css('-webkit-user-select', 'none')
				.css('-ms-user-select', 'none')
				.attr('onselectstart', false);
				
			// Отмена события начала перетаскивания( изображение не идёт за мышкой)
			$('.chess img').off('dragstart').on('dragstart', function () { return false; });
			
			chs.board.events();
		});
	};
	
	chs.board.refresh = function () {
		$(chs.arg.append +' img').remove();
		chs.board.addElements();
	};
	
	chs.board.init();
	return chs;
}
