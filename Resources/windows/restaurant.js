// First things first ..............
resto = {};

resto.win = Ti.UI.createWindow({});

var restaurant = resto.win.restaurant;

resto.restaurantView = Ti.UI.createScrollView({
  backgroundColor:'#E5E5DB',
  top:0,
  left:0,
  showVerticalScrollIndicator:true
});

resto.restaurantTableView = Ti.UI.createTableView({
    top:51,
    left:0,
    height:80,
    separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.SINGLE_LINE
});

resto.restaurantHeader = Ti.UI.createImageView({
  image:'DETAILS.png',
  height:51,
  width:320,
  top:0,
  right:0
});

resto.restaurantView.add(resto.restaurantTableView);

resto.contactHeader = Ti.UI.createView({
    backgroundImage:'bgheader.png'
});

resto.contactLabel = Ti.UI.createLabel({
    font:{fontFamily:'Arial',fontSize:12,fontWeight:'bold'},
    text:'Contact',
    color:'#333',
    textAlign:'left',
    top:0,
    left:8
});

resto.contactHeader.add(resto.contactLabel);

resto.mapHeader = Ti.UI.createView({
    backgroundImage:'bgheader1.png',
    top:0,
    left:0,
    height:22
});

resto.mapLabel = Ti.UI.createLabel({
    font:{fontFamily:'Arial',fontSize:12,fontWeight:'bold'},
    text:'Map',
    color:'#333',
    textAlign:'left',
    top:0,
    left:8    
});

resto.mapHeader.add(resto.mapLabel);

resto.directionsLabel = Ti.UI.createLabel({
    font:{fontFamily:'Arial',fontSize:12,fontWeight:'bold'},
    text:'Directions',
    color:'#333',
    textAlign:'left',
    top:85,
    left:8    
});

resto.contactTableViewSection = Ti.UI.createTableViewSection({
    headerView:resto.contactHeader
});

resto.mapView = Ti.UI.createView({
    top:130,
    backgroundColor:'#fff'
});



resto.note = Ti.Map.createAnnotation({
  animate:true
});

if (Ti.Platform.osname == 'android') {
    resto.note.pinImage = "restaurant_pin.png";
} else {
    resto.note.pincolor = Titanium.Map.ANNOTATION_RED;
}

resto.map = Ti.Map.createView({
  mapType: Ti.Map.STANDARD_TYPE,
  animate:true,
  regionFit:true,
  userLocation:true,
  borderRadius:0,
  height:140,
  width:304,
  top:30,
  left:8
});

resto.address = Ti.UI.createLabel({
  font:{fontFamily:'Arial',fontSize:12},
  color:'#5E4319',
  left:8,
  top:20,
  height:'auto',
  textAlign:'left'
});

resto.phone = Ti.UI.createLabel({
  font:{fontFamily:'Arial',fontSize:12,fontWeight:'bold'},
  color:'#5E4319',
  left:8,
  top:35,
  height:'auto',
  textAlign:'left'
});


// Adding a label to a button in Android did not work
// This is a h4x where we set the button's title instead
// But we need to move the text over to align it with the "Dinos" text...
// ...so we use a bunch of spaces...  =/

resto.title = Ti.UI.createLabel({
  textAlign:'left',
  font:{fontFamily:'Arial',fontSize:12,fontWeight:'bold'},
  color:'#5E4319',
  width:215,
  height:'auto',
  left:8,
  top:5
});


resto.directionsLabel.addEventListener('click', function(e){
    slat = Ti.App.Properties.getDouble('lat');
    slon = Ti.App.Properties.getDouble('lon');
    dlat = resto.win.restaurant.latitude;
    dlon = resto.win.restaurant.longitude;
    var url = "http://maps.google.com/maps?f=d&source=s_d&saddr="+slat+","+slon+"&daddr="+dlat+","+dlon;
    Ti.Platform.openURL(url);    
});


// =====================================================================================
// APP FLOW
// =====================================================================================

resto.win.add(resto.restaurantView);