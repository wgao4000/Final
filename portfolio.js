$(document).ready(function(){
  for(var i=1;i<9;i++){
  	$('.arrow'+i).hide();
    $('.pic'+i).click(function(){
	   $(this).fadeOut('slow',function(){
	      $(this).next().children().fadeIn("slow");
	   });   
	});
    $('.arrow'+i).click(function(e){
       $(this).hide();
	   $(this).parent().prev().show();
    });
  }	
   var request={
    	   address:"2045 Main Street, Waltham, MA 02453",
    }
    var result=$.ajax({
    	     url: 'https://maps.googleapis.com/maps/api/geocode/json',
    	     data:request,
    	     dataType:"json",
    	     type:'GET',
    	   })
    	  .done(function(result){
              $.each(result, function(i, item) {
			     success(item[0]["geometry"]["location"]["lat"],item[0]["geometry"]["location"]["lng"]);
		       });
		      
          })  
           .fail(function(jqXHR, error, errorThrown){
        	  alert("something went wrong");
         });

         //  navigator.geolocation.getCurrentPosition(success);
         function success(lat,lng) {
           	
           var mapcanvas = document.createElement('div');
           mapcanvas.id = 'mapcontainer';
           mapcanvas.style.height = '600px';
           mapcanvas.style.width = '800px';

          document.querySelector('article').appendChild(mapcanvas);
          coords = new google.maps.LatLng(lat, lng);
          var options = {
                   zoom: 15,
                   center: coords,
                   mapTypeControl: false,
                   navigationControlOptions: {
                      style: google.maps.NavigationControlStyle.SMALL
                   },
                  mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          var map = new google.maps.Map(document.getElementById("mapcontainer"), options);

          var marker = new google.maps.Marker({
              position: coords,
              map: map,
              title:"You are here!"
         });
       }
       if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(success);
       } 
       else {
         error('Geo Location is not supported');
       }
});