(function() {
	
	var successFn = function(result) {
		$("#results").text(result.text);
	};

	var errorFn = function(error){
		alert("Scanning failed: " + error);
	};

    var startScan = function(){
		cordova.plugins.barcodeScanner.scan(successFn, errorFn);
	}

    var bindingEvents = function() {
       
        $("#startScan").on("tap", function() {
            startScan();
    	}); 

		$("#displayPoint").on("tap", function() {
        	
           	var div = document.getElementById("map");
		  	var map = plugin.google.maps.Map.getMap(div);

		  	var coordinate = $("#results").text().split(",");	
		  	var longitude = coordinate[0].trim();	
		  	var latitude = coordinate[1].trim();	

	      	const GOOGLE = new plugin.google.maps.LatLng(longitude, latitude);

			map.addMarker({
			  'position': GOOGLE,
			  'draggable': true
			});

			map.showDialog();

    	}); 

    };

    $(document).on("pageinit", "#home", function(e) {
        bindingEvents();
    });
    
    $(document).on("pageshow", "#home", function(e) {
    });
    
})();