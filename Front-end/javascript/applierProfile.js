var user_id = localStorage.getItem("id"); 

// get profile
var profile_template = `
<h3>Profile</h3>
<form id="profile" method="post">      

    <label for="email">Email</label>
    <input type="text" name="email" id="email" class="form-control" readonly> 
    <div id="email_err" class="err"></div>
    
    <br/>
        
    <label for="phone">Phone</label>
    <input type="text" name="phone" id="phone" class="form-control"> 
    <div id="phone_err" class="err"></div>
        
    <br>
        
    <label for="address">Address</label>
    <input type="text" name="address" id="address" class="form-control"> 
    <div id="address_err" class="err"></div>
        
    <br/>
        
    <label for="age">Age</label>
    <input type="number" name="age" id="age" class="form-control"> 
    <div id="age_err" class="err"></div>
        
    <br/>

    <label for="gender">Gender &nbsp;&nbsp;</label>
    <input type="radio" name="gender" id="male" class="" value="M">Male &nbsp
    <input type="radio" name="gender" id="female" class="" value="F">Female    
    <br/>

    <label for="qualification">Qualification</label>
    <textarea class="form-control" name="qualification" row="5" id="qualification"></textarea>

    <br/>

    <label for="schedule">Schedule</label> <br/>
    <input id="s_m" name="s_m" type="checkbox" class="" value="Monday"> Monday <br/>
    <input id="s_t" name="s_t" type="checkbox" class="" value="Tuesday"> Tuesday <br/>
    <input id="s_w" name="s_w" type="checkbox" class="" value="Wednesday"> Wednesday <br/>
    <input id="s_th" name="s_th" type="checkbox" class="" value="Thursday"> Thursday <br/>
    <input id="s_f" name="s_f" type="checkbox" class="" value="Friday"> Friday <br/>
        
    <br/>
        
    <div id="success" class="success"></div>

</form>
<div class="button-group">
    <button class="primary-button" onclick="updateProfile()">Save</button>
</div>
`;

function getProfile() {
    $('#content').html(profile_template);
    
    // auto-fill the form
    $.ajax({
        url: "http://localhost:5000/applier/applierProfile/"+user_id.toString(),
        type: "GET",
        dataType: "json",
        crossDomain: true,
        success: function(data) {
            data = data[0];

            $('#email').val(data.email);
            
            $('#phone').val((data.phone!=null)?data.phone:"");

            $('#address').val((data.address!=null)?data.address:"");

            $('#age').val((data.age!=null)?data.age:"");

            $('#qualification').val((data.qualification!=null)?data.qualification:"");

            if (data.gender) {
                if (data.gender === "M") {$('#male').prop('checked',true);}
                else {$('#female').prop('checked',true);}
            }

            if (data.schedule) {
                data.schedule.forEach(element => {
                    if (element == "Monday") {$('#s_m').prop('checked',true);}
                    if (element == "Tuesday") {$('#s_t').prop('checked',true);}
                    if (element == "Wednesday") {$('#s_w').prop('checked',true);}
                    if (element == "Thursday") {$('#s_th').prop('checked',true);}
                    if (element == "Friday") {$('#s_f').prop('checked',true);}
                });
            }
        },
        error: function(data) {
            window.location.href = "loginFail.html?message=You need to login first!";
        }
    });
}

function updateProfile() {

    var user_id = localStorage.getItem("id"); 
    
    $('#success').css("display","none");
    
    var g = $('input[name="gender"]').val();
    var s = [];
    $('input[type="checkbox"]').each(
        function(){
            if (this.checked) {
                s.push(this.value);
            }
        }
    );

    $.ajax({
        url: "http://localhost:5000/applier/applierProfile/"+user_id.toString(),
        type: "POST",
        data: {
            phone: $('#phone').val(),
            address: $('#address').val(),
            age: $('#age').val(),
            qualification: $('#qualification').val(),
            gender: g,
            schedule: s
        },
        statusCode:{
            200: function(data){
                $('#success').html(data.message);
                $('#success').css("display","block");
            },
        },
        error: function(err) {
            console.log(err);
        },
        crossDomain: true,
    });
}