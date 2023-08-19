function getDetails(id) {
    $('#detail').show();
    $('#id_err').hide();

    $.ajax({
        url: "http://localhost:5000/GetApplierDetail/" + id.toString(),
        type: "GET",
        crossDomain: true,
        dataType: "json",
        success: function(data){
            data = data[0];
            $('#name').html(data.name);
            $('#email').html(data.email);
            $('#phone').html((data.phone!=null)?data.phone:"empty");
            $('#address').html((data.address!=null)?data.address:"empty");
            $('#age').html((data.age!=null)?data.age:"empty");
            $('#gender').html((data.gender!=null)?data.gender:"empty");
            $('#qualification').html((data.qualification!=null)?data.qualification:"empty");
            
            if (data.schedule!=null) {
                $('#schedule').show();
                $('#schedule_text').html("");
                $('#schedule').html("");
                data.schedule.forEach(date => {
                    $('#schedule').append("<li>"+ date +"</li>");
                });
            } else {
                $('#schedule_text').html("emtpty");
                $('#schedule').hide();
            }

        },
        error: function(err){
            console.log(err);
            $('#detail').hide();
            $('#id_err').show();
        }
    });
}