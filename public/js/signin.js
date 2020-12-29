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

const onSubmit = () => {
    const email = document.getElementById("email").value;

    const pass = document.getElementById("pass").value;

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", pass);
    formData.append("client_id", "304");
    formData.append("client_secret", "SfJdvJgkW8529mSp7AKBRnB5B2RIjrUaExeS1oia");
    formData.append("provider", "customers");

   fetch("http://opsadminstaging.momsbelief.com/api/v1/login", {
        method: 'POST',
        headers: {
            "Accept": "application/json"
        },
        body: formData
    }).then(res => res.json())
        .then(res => {
            let token = res.access_token
        if(token){
            let parse = {
                Access: token
            }

            fetch("https://meabot.azurewebsites.net/user",{
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(parse)
            }).then(res => res.json())
            .then(res => {                
                document.cookie = "username=" + res.data.user.name + ";"
                document.cookie = "loc_id=" + res.data.location.id + ";"
                document.cookie = "org_id=" + res.data.org.id + ";"
                document.cookie = "user_id=convoId" + res.data.user.id + ";"
                document.cookie = "accessToken=" + token + ";"

                let parse2 =  {
                    Access: token,
                    orgId: res.data.org.id,
                    locId:res.data.location.id
                }

                fetch("https://meabot.azurewebsites.net/child",{
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(parse2)
            }).then(res => res.json())
                .then(res => {
                    document.cookie = "crp=" + res.data[0].plan_name + ";" 
                    window.location.href = "/login"
                
                })
                
            }).catch(err => console.log(err))
                    

            
        }else {
            alert("Wrong Credientials")
            window.location.reload()
        }
    })
}




