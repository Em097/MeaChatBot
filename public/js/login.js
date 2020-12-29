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
  const userName = getCookie("username");
  const chatToken = getCookie("token")
  const conId = getCookie("conversationId")
  const orgId = getCookie("org_id")
  const locId =  getCookie("loc_id")
  const accessToken = getCookie("accessToken")
  const crp = getCookie("crp")
  const userid = getCookie("user_id")
  console.log(orgId, locId, crp, userName, userid)


  

  
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

           const chatBot =  (chatToken, conId, userId) => {
            window.WebChat.renderWebChat(
              {
                 directLine: window.WebChat.createDirectLine({
                    secret: chatToken
                 }),
                 conversationId: conId,
                 webSpeechPonyfillFactory: webPonyfill,
                 userID: userId,
                 username: userName,
                 styleOptions
              },
              document.getElementById('webchat')
           );
           }
  
        
        

        const webPonyfill =  window.WebChat.createCognitiveServicesSpeechServicesPonyfillFactory({
            credentials: {
              region: 'eastus',
              subscriptionKey: 'eba68efb3f6b443aad82e12999de0624'
            }
          })
          

          if(!chatToken){
             fetch("https://directline.botframework.com/v3/directline/tokens/generate", {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Authorization': 'Bearer' + ' K-v3KkOskR0.tN_OEKOPJfhMOQRMHmLIMBTtWZrHPTKyWXTGPrq8X2I'
            }
          }).then(response => response.json())
          .then(result => {

            fetch("https://directline.botframework.com/v3/directline/conversations", {
            method: 'POST',
            headers: {
                "Authorization": 'Bearer ' + result.token
            }
            }).then(res => res.json())
              .then(res => {

                let bodyText = {
                  type: "message",
                  from: {
                      id: userid,
                      name: userName,
                      org_id: orgId,
                      loc_id: locId,
                      crp: crp,
                      token: accessToken
                  },
                  text: "Start"
              }
                      fetch("https://directline.botframework.com/v3/directline/conversations/" + res.conversationId + "/activities", {
                              method: 'POST',
                              headers: {
                                  "Authorization": 'Bearer ' + res.token,
                                  'Content-Type': 'application/json'
                              },
                              body: JSON.stringify(bodyText)
                          })
                          .then(res => res.json())

                document.cookie = "token=" + result.token + ";"
                 document.cookie = "conversationId=" + result.conversationId + ";"
                 chatBot(result.token, result.conversationId, userid)
              })
              
            
            
          })
          .catch(error => console.log('error', error));
          }else{

            chatBot(chatToken, conId, userid)
          }

         
          


          
