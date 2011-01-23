// First things first ..............
resto = {};

resto.win = Ti.UI.createWindow({});

resto.restaurantView = Ti.UI.createScrollView({
  backgroundColor:'#E5E5DB',
  top:0,
  left:0,
  contentHeight:'auto',
  showVerticalScrollIndicator:true
});

resto.restaurantHeader = Ti.UI.createImageView({
  image:'details_header.png',
  height:67,
  width:320,
  top:0,
  right:0
});

resto.detailsBackground = Ti.UI.createView({
  backgroundColor:'#FFFFFF',
  borderRadius:10,
  height:370,
  width:295,
  top:79,
  left:12
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
  borderRadius:10,
  height:140,
  width:275,
  top:206,
  left:10
});

resto.address = Ti.UI.createLabel({
  font:{fontFamily:'Verdana',fontSize:14},
  color:'#5E4319',
  left:10,
  top:26,
  height:42,
  width:144,
  textAlign:'left'
});

resto.phone = Ti.UI.createButton({
  backgroundImage:'phone_background.png',
  color:'#FFF',
  width:145,
  height:36,
  top:70,
  left:10
});


// Adding a label to a button in Android did not work
// This is a h4x where we set the button's title instead
// But we need to move the text over to align it with the "Dinos" text...
// ...so we use a bunch of spaces...  =/
resto.listedButton = Ti.UI.createButton({
  backgroundImage:'listed.png',
  title:'          "Want to Try"',      
  color:'#377c8e',
  height:40,
  width:276,
  top:113,
  left:10
});

resto.eatenButton = Ti.UI.createButton({
  backgroundImage:'dinos.png',
  title:'None',
  color:'#787a46',
  height:40,
  width:276,
  top:160,
  left:10
});

resto.scoreBackground = Ti.UI.createImageView({
  image:'details_score_bg.png',
  width:74,
  height:70,
  top:0,
  right:0
});

resto.score = Ti.UI.createLabel({
  color:'#FFFFFF',
  font:{fontFamily:'Georgia',fontSize:24,fontWeight:'bold'},
  textAlign:'right',
  right:15
});

resto.title = Ti.UI.createLabel({
  textAlign:'left',
  font:{fontFamily:'Verdana',fontSize:17,fontWeight:'bold'},
  color:'#5E4319',
  width:215,
  height:25,
  left:10,
  top:5
});


// =====================================================================================
// APP FLOW
// =====================================================================================



resto.scoreBackground.add(resto.score);
resto.detailsBackground.add(resto.scoreBackground);
resto.detailsBackground.add(resto.address);

resto.detailsBackground.add(resto.map);
resto.detailsBackground.add(resto.phone);
resto.detailsBackground.add(resto.listedButton);
resto.detailsBackground.add(resto.eatenButton);
resto.detailsBackground.add(resto.title);

resto.restaurantView.add(resto.restaurantHeader);
resto.restaurantView.add(resto.detailsBackground);


resto.win.add(resto.restaurantView);