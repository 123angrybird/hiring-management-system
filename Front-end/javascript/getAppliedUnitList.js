// function openDetails(id){
//     var url = "C:\\Users\\ADMIN\\OneDrive\\Swinburne_University\\Master of Information Technology (Professional Computing)\\COS60010-Technology Inquiry Project\\Assignment 3\\project\\Front-end\\staffView_ApplierDetail.html?applier_id=" + id.toString();
//     window.open(url, '_blank');
// }


$.ajax({
    url: "http://localhost:5000/ViewAppliedUnitList/",
    type: "GET",
    crossDomain: true,
    dataType: "json",
    success: function(data){
        data.forEach(unit => {
            let unit_row = `
                <tr class="onHover">
                    <td>`+ unit.code.toUpperCase() +`</td>
                    <td>`+ unit.unitName +`</td>
                    <td>`+ unit.applierName +`</td>
                    <td><button class="btn btn-secondary" onclick="getDetails(`+ unit.applierId +`)">View</button></td>
                </tr>
            `;
            $('#data').append(unit_row);
        });
    },
    error: function(err){
        console.log(err);
    }
});