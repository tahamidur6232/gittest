<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script type="text/javascript">
    $(document).ready(function(){
		getDocData();
	$("#btnSubmit").on("click",function(){
		var docTitle = $("#DocTitle").val();
		var docID = $("#DocID").val();
		var docAddress = $("#DocAdd").val();
		var doctype = $("#DocType").val();
		var docFloor = $("#DocFlr").val();
		var docSalary = $("#DocSal").val();
		var data1 = {
			"__metadata":{"type":"SP.Data.DocInfoListItem"},
			"Title":docTitle,
			"tigl":docID,
			"v1cy":docAddress,
			"aowg":doctype,
			"e02l":docFloor,
			"Salary":docSalary
		};
		$.ajax({
		url: _spPageContextInfo.siteAbsoluteUrl + "/Rahman/_api/Web/Lists/GetByTitle('DocInfo')/items",
			type:"POST",
		    data: JSON.stringify(data1),
			headers:{
					"accept":"application/json;odata=verbose",
					"X-RequestDigest": $("#__REQUESTDIGEST").val(),
					"content-Type": "application/json;odata=verbose"
				},
		success:function(data){
			alert("Successfully Entered !!!");
		},
		error:function(data){
			alert("Error to get data : "+JSON.stringify(data));
		}
	});
	});
	$("#btnUpdate").on("click",function(){
		alert("Item ID: "+$("#DocId").val());
	});	
});
	
function getDocData()
{
	$.ajax({
		url: _spPageContextInfo.siteAbsoluteUrl + "/Rahman/_api/Web/Lists/GetByTitle('DocInfo')/items",
		type:"GET",
		headers:{"accept":"application/json;odata=verbose"},
		success:function(data){
			$.each(data.d.results,function(index,doc){
				$("#tb1").append("<tr><td>"+doc.ID+"</td><td>"+doc.Title+"</td><td>"+doc.tigl+"</td><td>"+doc.v1cy+"</td><td>"+doc.aowg+"</td><td>"+doc.e02l+"</td><td>"+doc.Salary+"</td><td><button type='button' onClick='funEdit("+doc.ID+")'>Edit</button></td></tr>");
			});
		},
		error:function(data){
			alert("Error to get data : "+JSON.stringify(data));
		}
	});
}
function funEdit(itemId)
{
	//alert("Testing Edit:"+ itemId);
		$.ajax({
		url: _spPageContextInfo.siteAbsoluteUrl + "/Rahman/_api/Web/Lists/GetByTitle('DocInfo')/items("+itemId+")",
		type:"GET",
		headers:{"accept":"application/json;odata=verbose"},
		success:function(data){
		    //alert(data.d.Title);
			$("#DocId").val(data.d.ID);
			$("#DocTitle").val(data.d.Title);
			$("#DocID").val(data.d.tigl);
			$("#DocAdd").val(data.d.v1cy);
			$("#DocType").val(data.d.aowg);
			$("#DocFlr").val(data.d.e02l);
			$("#DocSal").val(data.d.Salary);
			
		},
		error:function(data){
			alert("Error to get data : "+JSON.stringify(data));
		}
	});
}	
</script>
<table border = '2' id ='tb1'>
    <tr><th>Title</th><th>DocId</th><th>Address</th><th>Type</th><th>Floor</th><th>Salary</th></tr>
</table>
<br/>
<table border='1'>
<tr><th colspan='2'>Insert Doctors Info<input type='text' id='DocId'/></th></tr>
<tr><td>Name</td><td><input type='text' id='DocTitle'/></td></tr>
<tr><td>Doctor ID</td><td><input type='text' id='DocID'/></td></tr>
<tr><td>Address</td><td><input type='text' id='DocAdd'/></td></tr>
<tr><td>Type</td><td><input type='text' id='DocType'/></td></tr>
<tr><td>Floor</td><td><input type='text' id='DocFlr'/></td></tr>
<tr><td>Salary</td><td><input type='text' id='DocSal'/></td></tr>
<tr><td colspan='2'><input type='button' value='Submit' id='btnSubmit'/><input type='button' value='Update'/></td></tr>
</table>
<button type='button' id='addbtn'>Add Info</button>