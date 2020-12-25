function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}


deleteAllCookies()

    const styleOptions = {
              botAvatarBackgroundColor: "#19a9a1",
              botAvatarInitials: "Bot",
              userAvatarInitials: 'You',
              backgroundColor: "transparent",
              fontSizeSmall: '50%',
              userAvatarBackgroundColor: "#19a9a1",
              avatarBorderRadius: '50%',
              avatarSize: 30,
              typingAnimationDuration: 5000,
              emojiSet: true,
              hideScrollToEndButton: false,
              hideUploadButton: true,
              sendBoxBackground: 'transparent',
              sendBoxButtonColor: 'white',
              sendBoxButtonColorOnHover: '#19a9a1',
              sendBoxPlaceholderColor: 'white',
              sendBoxBorderTop: 'solid 1px white'
  
              
           };




           window.WebChat.renderWebChat(
              {
                 directLine: window.WebChat.createDirectLine({
                    secret: 'K-v3KkOskR0.tN_OEKOPJfhMOQRMHmLIMBTtWZrHPTKyWXTGPrq8X2I'
                 }),
                 userID: 'user1',
                 styleOptions
              },
              document.getElementById('webchat')
           );


   