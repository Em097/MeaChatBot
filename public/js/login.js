function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  var userName = getCookie("username");

  

  
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

           const chatBot =  (chatToken, convoId) => {
            window.WebChat.renderWebChat(
              {
                 directLine: window.WebChat.createDirectLine({
                    secret: chatToken
                 }),
                 conversationId: conId,
                 webSpeechPonyfillFactory: webPonyfill,
                 userID: 'user1',
                 username: userName,
                 styleOptions
              },
              document.getElementById('webchat')
           );
           }
  
        const chatToken = getCookie("token")
        const conId = getCookie("conversationId")

        const webPonyfill =  window.WebChat.createCognitiveServicesSpeechServicesPonyfillFactory({
            credentials: {
              region: 'eastus',
              subscriptionKey: 'eba68efb3f6b443aad82e12999de0624'
            }
          })
          

          if(!chatToken){
            const token = fetch("https://directline.botframework.com/v3/directline/tokens/generate", {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Authorization': 'Bearer' + ' K-v3KkOskR0.tN_OEKOPJfhMOQRMHmLIMBTtWZrHPTKyWXTGPrq8X2I'
            }
          }).then(response => response.json())
          .then(result => {
            document.cookie = "token=" + result.token + ";"
            document.cookie = "conversationId=" + result.conversationId + ";"
            chatBot(result.token, result.conversationId)
          })
          .catch(error => console.log('error', error));
          }else{

            chatBot(chatToken, conId)
          }

         
          


          
