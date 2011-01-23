Titanium.App.addEventListener('show_indicator', function(e)
{
    // showIndicator can be found in app.js
	Ti.API.info("IN SHOW INDICATOR");
	showIndicator();
});

Titanium.App.addEventListener('hide_indicator', function(e)
{
    // hideIndicator function can be found in app.js
	Ti.API.info("IN HIDE INDICATOR");
	hideIndicator();
});


login.signupButton.addEventListener('click', function(e){
    openWebWindow('http://dinevore.com/signup/mobile', 'Sign Up Up For Dinevore');
});

login.aboutButton.addEventListener('click', function(e){
    openWebWindow('http://48hourapps.com/pocketvore', 'About Pocketvore');
});

login.goButton.addEventListener('click', function(e){
    var user_email = login.emailTextField.value;
    var userUrl = '/users/id_by_email?email=' + user_email;
    getRequest(DINEVORE_URL_BASE + userUrl, emailExists);
});


nearBy.nearbyHeader.addEventListener('click', function(e){
  Ti.App.fireEvent('updateGeo');
});

// listen for new nearby restaurants
Ti.App.addEventListener('updateNearby', function(event){
// update nearby display
  var data = [];
  var restaurants = event.data;
  restaurants.sort(sortRestaurantsByDistance);

  for (var i=0; i<restaurants.length; i++) {
    var backgroundImageUrl = 'table_view_cell_background.png';

    if (restaurants[i].rounded_dinescore > 85) {
      backgroundImageUrl = 'high_score.png';
    } else if (restaurants[i].rounded_dinescore > 0) {
      backgroundImageUrl = 'score.png';      
    } else {
      backgroundImageUrl = 'no_score.png';
    }
    
    // This is PURELY COSMETIC
    // Sux, I know...
    // ...but Android will format the rounded_dinescore as a decimal w/ 1 decimal place (XX.0)
    var formatted_score = '';
    if (restaurants[i].rounded_dinescore > 0) {
        formatted_score = '' + restaurants[i].rounded_dinescore;
        if (formatted_score.indexOf('.') != -1) {
            formatted_score = formatted_score.substring(0, formatted_score.indexOf('.'));
        }
    }

    var row = Ti.UI.createTableViewRow({
      backgroundImage:backgroundImageUrl,
      height:74
    });

    var name = Ti.UI.createLabel({
      text:restaurants[i].name,
      font:{fontFamily:'Verdana',fontSize:17,fontWeight:'bold'},
      color:'#5E4319',
      textAlign:'left',
      top:15,
      left:10,
      height:22,
      width:230
    });

    var price = Ti.UI.createLabel({
      text:restaurants[i].average_price_range,
      font:{fontFamily:'Verdana',fontSize:17},
      color:'#B8552A',
      width:'auto',
      textAlign:'left',
      left:150,
      bottom:10,
      height:22
    });

    var distance = Ti.UI.createLabel({
      text:Math.floor(restaurants[i].distance_to_center) + "m",
      font:{fontFamily:'Verdana',fontSize:14,fontWeight:'bold'},
      color:'#5E4319',
      width:'auto',
      textAlign:'right',
      top:20,
      right:5,
      height:16
    });
    
    var cuisine = Ti.UI.createLabel({
      text:restaurants[i].supported_cuisines,
      font:{fontFamily:'Verdana',fontSize:14,fontStyle:'italic'},
      color:'#5E4319',
      bottom:10,
      left:10,
      height:20,
      width:130
    });
    
    var score = Ti.UI.createLabel({
      text:formatted_score,
      font:{fontFamily:'Georgia',fontSize:24,fontWeight:'bold'},
      color:'#FFFFFF',
      right:5,
      height:30,
      bottom:10,
      width:50,
      textAlign:'right'
    });

    row.add(name);
    row.add(price);
    row.add(distance);
    row.add(cuisine);
    row.add(score);
    row.restaurant = restaurants[i];
    row.className = 'nearby_row';

    data.push(row);    
  } // end of for loop creating rows
  
  nearBy.nearbyListTableView.setData(data);
});

nearBy.nearbyListTableView.addEventListener('click', function(e) {

    var restaurant = e.rowData.restaurant;
    var name = e.rowData.restaurant.name;
        
    resto.note.latitude = restaurant.latitude;
    resto.note.longitude = restaurant.longitude;
    resto.note.title = name;
    resto.note.subtitle = Math.floor(restaurant.distance_to_center) + 'm, ' + restaurant.average_price_range;
    
    resto.map.region = {latitude:restaurant.latitude, longitude:restaurant.longitude, 
            latitudeDelta:0.005, longitudeDelta:0.005};
    
    resto.map.annotations = [resto.note];
    
    
    resto.address.text = restaurant.street;
    resto.score.text = restaurant.rounded_dinescore;
    resto.title.text = name;
    
    if (restaurant.phone_number == '') {
      resto.phone.title = 'unlisted';
    }
    resto.phone.title = restaurant.phone_number;

    resto.win.navBarHidden = false;

    nearBy.navigationGroup.open(resto.win);
});

Ti.App.addEventListener('updateGeo', function() {
    if (true == TESTING) {
        alert('Setting lat/lon with test values');
        fireLatLon(40.7256, -73.991375); 
    } else {
        Ti.Geolocation.purpose = "Find restaurant locations near to user's lat/long location";
        Ti.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
        Ti.Geolocation.getCurrentPosition(function(e) {
            if (e.error) {
                alert("We can't get your current location.");
            } else {
                fireLatLon(e.coords.latitude, e.coords.longitude);
            }
        });
    } // end testing if location services enabled
});

// listen for events from tabs
Ti.App.addEventListener('getNearby', function(event){
    var nearbyUrl = "/users/" + Ti.App.Properties.getString('email') + "/default_lists.json?filter_by=wanted&radius=5000";
    getRequest(DINEVORE_URL_BASE + nearbyUrl + '&lat=' + event.lat + '&lon=' + event.lon, receiveNearby);
});


resto.phone.addEventListener('click', function(e){
  number = e.source.title.replace(/\-|\(|\) /gi,'');
  Ti.Platform.openURL('tel:'+number);
});

