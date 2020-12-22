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

    if(email == "aamir@gmail.com" || pass == "aamir123") {

        document.cookie = "username=Aamir;";
        window.location.href = "/login"
    }else {
        alert("wrong credentials")
    }


}

