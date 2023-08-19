var user_id = localStorage.getItem("id"); 

// get profile
var applied_unit_template = `
<h3>Applied units</h3>
<div id="success" class="success"></div>
<br/>
<div class="table-responsive ">
    <table class="table table-striped table-hover">
        <thead class="thead-dark">
            <tr>
                <th>Unit code</th>
                <th>Unit name</th>
                <th>Description</th>
                <th>Timetable</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody id="data">
        
        </tbody>
    </table>
</div>
`;

function getAppliedUnit() {
    $('#content').html(applied_unit_template);


    $('#success').css("display","none");
    // auto-fill the form
    $.ajax({
        url: "http://localhost:5000/applier/appliedUnit/"+user_id.toString(),
        type: "GET",
        dataType: "json",
        crossDomain: true,
        success: function(data) {
            $('#data').html("");
            
            if (data === undefined || data.length == 0){
                let unit_row = `
                    <tr>
                        <td colspan="5" class="center">No Unit Available to withdraw</td>
                    </tr>
                `;
                $('#data').append(unit_row);
            } else {
                data.forEach(unit => {
                    let unit_row = `
                        <tr id="`+ unit.unit_id+`">
                            <td>`+ unit.unit_id.toUpperCase() +`</td>
                            <td>`+ unit.name +`</td>
                            <td>`+ unit.description +`</td>
                            <td>`+ ((unit.date==null || unit.time==null)? "Scheduling...": (unit.date + " - " + unit.time)) +`</td>
                            <td><button class="btn btn-secondary" onclick='withdraw(` + user_id + ',' + "\"" + unit.unit_id +`\")'>Withdraw</button></td>
                        </tr>
                    `;
                    $('#data').append(unit_row);
                });
            }
            
        },
        error: function(data) {
            window.location.href = "loginFail.html?message=You need to login first!";
        }
    });
}

function withdraw(id, unit_code) {
    
    $.ajax({
        url: "http://localhost:5000/applier/withdrawUnit/"+user_id.toString(),
        type: "POST",
        data: {
            unit_code: unit_code
        },
        statusCode:{
            200: function(data){
                $('#success').css("display","block");
                $('#success').html(data.message);
                $('#'+unit_code).remove();
                window.location.hash = "success";
            },
            error: function(err) {
                console.log(err);
            }
        },
        crossDomain: true,
    });
}