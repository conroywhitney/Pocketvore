nearBy = {};
// =====================================================================================
// UI
// =====================================================================================

nearBy.win = Ti.UI.createWindow({backgroundColor:'#E5E5DB'});
nearBy.win1 = Ti.UI.createWindow({barImage:'TitleBar.png'});

nearBy.nearbyHeader = Ti.UI.createImageView({
  image:'NEARBY.png',
  height:51,
  width:320,
  top:0,
  right:0
});

nearBy.nearbyListTableView = Ti.UI.createTableView({
  data:[],
  rowHeight:70,
  top:51
});


nearBy.navigationGroup = Ti.UI.iPhone.createNavigationGroup({
    window:nearBy.win1
});

nearBy.win.add(nearBy.navigationGroup);


// =====================================================================================
// APP FLOW
// =====================================================================================

// Whenever this view opens, we should update this list of Nearby restaurants !
// Forward-firing events (firing updateGeo and then opening this View) do not work for Android (that I could figure out)
// Instead, we re-fire this event when we load this View so that we are open (and able) to handle it
nearBy.open = function(){
    login.win.close();
    Ti.App.fireEvent('updateGeo');
    nearBy.win1.add(nearBy.nearbyHeader);
    nearBy.win1.add(nearBy.nearbyListTableView);
    nearBy.win.open();
};