var effects = {} || window.effects;
effects = {
	hide: function ($element) {
		$element.addClass('hidden');
	},
	slide: function ($element) {
		// hide all the contents inside the element first
		$('input[type=submit], input[type=reset], label, fieldset input', $element).addClass('invisible');
		
		if ($element.hasClass('hidden')) {
			$element.slideDown(2000, function () {
				$element.addClass('glass');
				var timer = setTimeout(function () {
					effects.showContent($element);
				}, 500);
			});
			$element.removeClass('hidden');
		} else {
			$element.slideUp(function () {
				$element.removeClass('glass');
				//$('input, label', $element).css({opacity: 0});
			});
			$element.addClass('hidden');
			
		}
	},
	arrow: function ($element) {
		$element.removeClass('down').addClass('up');
	},
	showContent: function ($element) {
		$('input[type=submit], input[type=reset], label, fieldset input', $element).removeClass('invisible');
	},
	equalise: function ($element) {
		$element.equaliser();
	}
};

var map = {} || window.map;
map = {
	init: function () {
		var id = 'map-container',
			offset = $('#introduction a').offset(),
			left = offset.left + 100,
			top = offset.top - 240;
			
		$('#introduction').append('<div id="map-outerbox" class="glass"><a href="#" class="close">Close</a><div id="' + id + '"></div></div>');
		$('#map-outerbox').css({left: left, top: top});
		this.createMap(id);
		this.ui($('#map-outerbox a'));
	},
	createMap: function (id) {
		// co-ordinates
		var location = new google.maps.LatLng(51.866454,  -2.245339),
		mapOptions = {
			zoom: 15,
			center: location,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		},
		googleMap = new google.maps.Map(document.getElementById(id), mapOptions),
		// setting up the marker for the position on the map
		marker = new google.maps.Marker({
			position: location, 
			map: googleMap,
			title: "Mandy Godding's Theatre Arts"
		});
	},
	ui: function ($element) {
		$element.on('click', function () {
			map.destroy();
		});
	},
	destroy: function () {
		$('#map-outerbox').remove();
		$('a').one('click', function (e) {
			e.preventDefault();
			map.init();	
		});
	}	
};

var form = {} || window.form;

form = {
	validation: function (e) {
		var error = false;
		$('form li input').each(function () {
			if ($(this).val() === '' && $(this).prop('id') !== 'telephone') {
				e.preventDefault();
				$(this).addClass('error');
				$(this).after('<p class="error">Please fill this in.</p>');
				error = true;
			}
		});
		if (error === false) {
			$('form').submit();
		}
	},
	blur: function () {
		$('form li input').on('blur', function () {
			if ($(this).hasClass('error') === true) {
				if ($(this).val() !== '') {
					$(this).removeClass('error');
					$(this).siblings('p.error').remove();
				}
			}
			
		
		});
	}

};


$(document).ready(function () {
	effects.hide($('form'));
	$('#register-title span').on('click', function () {
		$(this).toggleClass('clicked');
		effects.slide($('.slide'));
		effects.arrow($('#register-title'));
	});
	$('a').one('click', function (e) {
		e.preventDefault();
		map.init();	
	});
	effects.equalise($('#columns'));
	$('form').submit(function (e) {
		form.validation(e);
	});
	form.blur();
});