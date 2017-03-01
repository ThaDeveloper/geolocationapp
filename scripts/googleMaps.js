// When map page is shown, run function
$('#gmap').live("pagecreate", function() {
	// Create gmap object, centering on given latitude/longitude, with a terrain map type
	$('#map_canvas').gmap({'center': '-0.416876000000000000,36.950980999999956000', 'mapTypeId': 'terrain'}).bind('init', function(evt, map) {
		// Use geolocation function watchPosition() to get position and success/fail status
		//google maps objects invokes the watchposition function(an html5 geolocation function that used to query the gps device and pull the position)
		$('#map_canvas').gmap('watchPosition', function(position, status) {
			if ( status === 'OK' ) {
				// Set variable 'latling' to values from watchPosition() function arg 'position'
				var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				// Set up marker
				var markers = $('#map_canvas').gmap('get', 'markers' );
				if ( !markers['client'] ) {
					$('#map_canvas').gmap('addMarker', { 'id': 'client', 'position': latlng, 'bounds': true });
				} else {
					markers['client'].setPosition(latlng);
					map.panTo(latlng);
				}
			}
		});
	});
});
