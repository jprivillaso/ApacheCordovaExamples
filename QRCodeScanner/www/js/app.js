(function() {
	
    var successFn = function(result) {
        $("#results").text(result.text);
    };

    var errorFn = function(error){
        $("#errorMessage").text("Error: " + error);
    };

    var startScan = function(){
		
        $("#errorMessage").hide();	
        cordova.plugins.barcodeScanner.scan(successFn, errorFn);

    }

    var createMap = function(){

    var map = plugin.google.maps.Map.getMap($("map"));
    var coordinate = $("#results").text().split(",");	
    var longitude = coordinate[0].trim();	
    var latitude = coordinate[1].trim();	

    if (isFinite(longitude) && isFinite(latitude)) {

        var coordinates = new plugin.google.maps.LatLng(longitude, latitude);

        map.addMarker({
            'position': coordinates,
            'draggable': true
        });

        map.showDialog();

    } else {

        $("#errorMessage").show();
        $("#errorMessage").text("Error parsing the points");

    }
			
    };

    var bindingEvents = function() {
       
        $("#startScan").on("tap", function() {
            startScan();
    	}); 

	$("#displayPoint").on("tap", function() {
	    createMap();
    	}); 

    };

    $(document).on("pageinit", "#home", function(e) {
        bindingEvents();
    });
    
    $(document).on("pageshow", "#home", function(e) {
    });
    
})();
