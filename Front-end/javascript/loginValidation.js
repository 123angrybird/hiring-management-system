$('#login').submit(function (event){
    // Prevent the form from submiting
    event.preventDefault();

    let err = false;
    // Username validation
    if (!$('#username').val()){
        $('#id_err').html("Username is empty!");
        err = true;
    } else {
        $('#id_err').hide();
    }

    // Password validation
    if (!$('#password').val()){
        $('#pass_err').html("Password is empty!");
        err = true;
    } else {
        $('#pass_err').hide();
    }

    // Submits to the server
    if (err) {return;} 

    $.ajax({
        url: "http://localhost:5000/login",
        type: "POST",
        data: {
            username: $('#username').val(),
            password: $('#password').val()
        },
        crossDomain: true,
        success: function(data){

            localStorage.setItem("id", data.id);
            window.location.href = "applier_Home.html";
        },
        error: function(err){
            $('#errs').html(err.responseText);
        }
    });
})
