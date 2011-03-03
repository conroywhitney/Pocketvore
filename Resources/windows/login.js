// First things first ..............
login = {};

login.loginView = Ti.UI.createScrollView({});

login.win = Ti.UI.createWindow({});
login.win.add(login.loginView);

// =====================================================================================
// UI
// =====================================================================================
login.background = Ti.UI.createImageView({
  image:'login_background.png',
  top:0,
  height:480,
  width:320  
});

login.aboutButton = Ti.UI.createButton({
  backgroundImage:'48badge.png',
  top:0,
  left:20,
  height:109,
  width:167
});

login.signupButton = Ti.UI.createButton({
  backgroundImage:'signup_button.png',
  height:44,
  width:129,
  left:20,
  bottom:40
});

login.goButton = Ti.UI.createButton({
  backgroundImage:'go_button.png',
  height:44,
  width:129,
  right:20,
  bottom:40 
});

login.emailTextField = Ti.UI.createTextField({
  backgroundImage:'text_field.png',
  hintText:'name@example.com',
  value:Ti.App.Properties.getString('email'),
  paddingLeft:10,
  paddingRight:10,
  height:44,
  width:280,
  left:20,
  bottom:104
});

// =====================================================================================
// HELPER FUNCTIONS
// =====================================================================================

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

// =====================================================================================
// Seems like the callback only gets called if there is no error
// So lets just return true
// =====================================================================================

// Apple-only events for text-field UX
if (Ti.Platform.osname != 'android') {
    login.emailTextField.addEventListener('focus', function(e){
      loginView.top = -216;
      loginView.bottom = 216;
    });
    
    login.emailTextField.addEventListener('blur', function(e){
      loginView.top = 0;
      loginView.bottom = 0;
    });
}

// =====================================================================================
// APP FLOW
// =====================================================================================

login.loginView.add(login.background);
login.loginView.add(login.emailTextField);
login.loginView.add(login.signupButton);
login.loginView.add(login.goButton);