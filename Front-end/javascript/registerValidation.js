$('#register').submit(function (event){
    // Prevent the form from submiting
    event.preventDefault();

    let err = false;
    $('#success').css("display","none");

    // Name validation
    if (!$('#name').val()){
        $('#name_err').html("Name is empty!");
        err = true;
    } else {
        $('#name_err').hide();
    }

    // Email validation
    if (!$('#email').val()){
        $('#email_err').html("Email is empty!");
        err = true;
    } else {
        $('#email_err').hide();
    }

    // Password validation
    if (!$('#password').val()){
        $('#pass_err').html("Password is empty!");
        err = true;
    } else {
        $('#pass_err').hide();
    }

    // Confirm Password validation
    if (!$('#c_password').val()){
        $('#cpass_err').html("Confirm Password is empty!");
        err = true;
    } else {
        if ($('#password').val() != $('#c_password').val()){
            $('#cpass_err').html("Password and Confirm Password is same!");
            err = true;
        } else {
            $('#cpass_err').hide();
        }
    }

    // Submits to the server
    if (err) {return;} 

    $.ajax({
        url: "http://localhost:5000/register",
        type: "POST",
        data: {
            name: $('#name').val(),
            email: $('#email').val(),
            password: $('#password').val()
        },
        statusCode:{
            200: function(data){
                $('#success').html(data.responseText);
                $('#success').css("display","block");
            },
            422: function(err){
                if (err.status == 422){
                    $('#email_err').html(err.responseText);
                    $('#email_err').show();
                } else console.log(err);
            }
        },
        crossDomain: true,
    });
})
