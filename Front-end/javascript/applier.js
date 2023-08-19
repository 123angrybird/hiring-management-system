var user_id = localStorage.getItem("id"); 

// logout
function logout(){
    localStorage.clear();
    window.location.href = "login.html";

    $.ajax({
        url: "http://localhost:5000/logout/"+user_id.toString(),
        type: "GET",
        crossDomain: true,
    });
}

// check if the user is valid
function init() {
    if (!user_id){
        window.location.href = "loginFail.html?message=Please Login first!!";
    } else {
        $.ajax({
            url: "http://localhost:5000/applier/"+user_id.toString(),
            type: "GET",
            dataType: "json",
            crossDomain: true,
            success: function(data) {
                $('#title').html("Welcome " + data.name);
                getProfile();
            },
            error: function(err) {
                window.location.href = "loginFail.html?message=Your session has expired!";
            }
        });
    }
}

window.onload = init();