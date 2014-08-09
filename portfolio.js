/*
Written by Wei, to create and hide pictures,
also it uses google map api to display my location.
*/
$(document).ready(function(){
	//create arrows for all eight images,
	//use fadeOut and fadeIn functions to create
	//animation effects.
	//use next, children, prev, parent, prev to 
	//navigate to different elements.
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
	//My location
	var request={
		address:"2045 Main Street, Waltham, MA 02453",
	}
	/*make ajax call here, can not use jsonp
	for google map api, has to be json
	*/
	var result=$.ajax({
		url: 'https://maps.googleapis.com/maps/api/geocode/json',
		data:request,
		dataType:"json",
		type:'GET',
	})
	/*i is either "results" or "status",
	hence we test if it is "results" */
	.done(function(result){
		$.each(result, function(i, item) {
			/*  The line below is for debugging only, it shows the structure of
                the object "result"
			    console.log(JSON.stringify(item, null, 10));
			 */
			 if(i=="results"){
			   success(item[0].geometry.location.lat,item[0].geometry.location.lng);
		     }	  
		});

     })  
	.fail(function(jqXHR, error, errorThrown){
		$('article').append('<h4>Google map is currently unavailable.</h4>');
     });

     /* Created a container div for the map,
        Then created a map with a marker, and 
        added the map to the container.  
     */

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
});