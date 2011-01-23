// =====================================================================================
// CONSTANTS
// =====================================================================================

// TODO: Undo this before packaging

var TESTING = false;

var DINEVORE_URL_BASE = "http://Michael%20Dizon:9a97d89e4f7bb9b606b88c52f3f5889c@api.dinevore.com/v1";

var currentWindow = null;

Ti.include('windows/login.js', 'windows/restaurant.js', 'windows/nearby.js', 'windows/events.js');

// =====================================================================================
// HELPER FUNCTIONS
// =====================================================================================


// =====================================================================================
// STATUS INDICATOR FUNCTIONS
// =====================================================================================
var indWin = null;
var actInd = null;
function showIndicator()
{
	// window container
	indWin = Titanium.UI.createWindow({
		height:150,
		width:150
	});

	// black view
	var indView = Titanium.UI.createView({
		height:150,
		width:150,
		backgroundColor:'#000',
		borderRadius:10,
		opacity:0.8
	});
	indWin.add(indView);

	// loading indicator
	actInd = Titanium.UI.createActivityIndicator({
		style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
		height:30,
		width:30
	});
	indWin.add(actInd);

	// message
	var message = Titanium.UI.createLabel({
		text:'Loading',
		color:'#fff',
		width:'auto',
		height:'auto',
		font:{fontSize:20,fontWeight:'bold'},
		bottom:20
	});
	indWin.add(message);
	indWin.open();
	actInd.show();

};

function hideIndicator()
{
	actInd.hide();
	indWin.close({opacity:0,duration:500});
};


function emailExists(){
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var user_email = login.emailTextField.value;
    if(reg.test(user_email)) {
        Ti.App.Properties.setString('email', user_email);
        nearBy.open();
    } else {
        alert("You must provide your Dinevore email address to access your lists.");
    }  

}

function openWebWindow(url, title) {
    var closeWebViewButton = Ti.UI.createButton({
        title:'Close'
    });
  
    closeWebViewButton.addEventListener('click', function(e){
        webViewWindow.close();
    });
  
    var webViewWindow = Ti.UI.createWindow({
        url:'web.js',
        title:title,
        leftNavButton:closeWebViewButton,
        dest_url:url
    });

    webViewWindow.open({
        modal:true
    });
}

function sortRestaurantsByDistance(a, b){
  return (a.distance_to_center - b.distance_to_center);
}

function createAppSingleWindow(url, title, vars) {
    var win = Ti.UI.createWindow({
        url: url,
        title: title,
        tabBarHidden:true,
        navBarHidden:true,
        vars:vars
    });

    if (Ti.Platform.osname != 'android') {
        win.hideTabBar();
        
        var tab = Ti.UI.createTab({
            title: 'tab',
            window: win
        });
    
        var tabGroup = Ti.UI.createTabGroup();
        tabGroup.addTab(tab);

        tabGroup.open();
    } else {
        win.open();
    }
    
    return win;
}



function openWindow(url, title) {    
    var win = Ti.UI.createWindow({  
        url: url,
        title: title,
        fullscreen: false,
        tabBarHidden:true,
        navBarHidden:true
    });
    
    if (Ti.UI.currentTab != null) {
        Ti.UI.currentTab.open(win, {});
    } else {
        win.open({});
    }
    
    currentWindow.close();
    return win;
}

// Send a location update for a given Lat/Lon
function fireLatLon(lat, lon) {
    Ti.App.Properties.setDouble('lat', lat);
    Ti.App.Properties.setDouble('lon', lon);
    
    // TODO: remove
    //alert('Lat/Lon: ' + lat + ',' + lon);

    Ti.App.fireEvent('getNearby', {
        lat:lat,
        lon:lon
    });
}

// Generic request functionality
function getRequest(url, callback) {
    var xhr = null;
    Ti.App.fireEvent('show_indicator');
    
    try {
        xhr = Ti.Network.createHTTPClient();
    } catch (http_error) {
        alert('Error while creating HTTPClient');
    }
    
    // h4x: this line is needed to make sure onload event fires
    xhr.onreadystatechange  = function() {}; 
    
    xhr.onload = function() {
        // This code will get called when a response is returned from our web-service
        // This is passed in as a complete closure to be executed asynchronously
        var resourceList = null;
        
        try {
            // Try parsing the JSON response
            resourceList = JSON.parse(this.responseText);
        } catch (json_error) {
            // This is the case where we did not get proper JSON back
            // This is most likely an "invalid email" response
            // NOTE: I only got this working on the iPhone, not on Android...
            // Android gives an TiHttpClient error "Not Found" without ever getting to the try/catch  =(
            alert('Error: ' + this.responseText);
        }
        
        if (resourceList != null) {
            // Only call our callback if we were able to get a proper JSON response
            Ti.App.fireEvent('hide_indicator');
            
            callback(resourceList);
        }
    };
    
    try {
        xhr.open('GET', url);
        xhr.send();        
    } catch (xhr_error) {
        alert('Error while retrieving nearby restaraunts. Please try again later.');
    }
}

// Accept the list of restaurants (as a callback)
// Send restaurant list data to the near-by tab
function receiveNearby(nearbyRestaurants) {
    var data = [];
    for (var i = 0; i < nearbyRestaurants.length; i++) {
        var restaurant = nearbyRestaurants[i].restaurant;
        data.push(restaurant);
    }

    Ti.App.fireEvent('updateNearby', {
        data:data
    });
}

// =====================================================================================
// EVENT LISTENERS
// =====================================================================================


// =====================================================================================
// APP FLOW
// =====================================================================================

//currentWindow = createAppSingleWindow('windows/login.js', 'Login', {'baseUrl':DINEVORE_URL_BASE, 'getRequest':getRequest});
login.win.open();

//check for network connectivity
if (Ti.Network.online == false) {
  alert("You don't have internet access, please try again later");
}