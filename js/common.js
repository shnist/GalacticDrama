var effects = {} || window.effects;
effects = {
	slide: function ($element) {
		$element.removeClass('hidden');
	}
};

var map = {} || window.map;
map = {
	init: function () {
		var id = 'map-container';

		$('#introduction').append('<div id="map-outerbox" class="glass">' +
			'<a href="#" class="close glass" title="Close">X</a><div id="' + id + '"></div>' +
			'</div>');

		$('#map-outerbox').css({
			left: (window.innerWidth / 2) - $('#map-outerbox').width() / 2,
			top: $(window).scrollTop() + 40
		});

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
	$('.register-title a').one('click', function () {
		effects.slide($('.slide'));
		$('html').scrollTop($('form').scrollTop());
	});
	$('#map-link').one('click', function (e) {
		e.preventDefault();
		map.init();
	});
	$('form').submit(function (e) {
		form.validation(e);
	});
	form.blur();
});