var tskData=[];
var myData =[];
var baseUrl = "http://localhost:59414";
var endPoint = "/api/todoes";
var editDataflg=false;
function rendrData(){

	var id, descpt, date,stats;
	for(var i in myData){
		console.log(myData[i]);
		id = myData[i].todo_id;
		descpt = myData[i].descpt;
		stats  = myData[i].st_cd;
		date = myData[i].crt_dt;
		switch(stats){
			case 1: createNwDiv(descpt,"task",id);
			break;
			case 2: createNwDiv(descpt,"done",id);
			break;
			case 3: createNwDiv(descpt,"backlog",id);				
		}
	}
	for(var i in tskData){
		console.log(tskData[i].todo_type_cd+" and "+tskData[i].todo_type_desc);
		crtTskOption(tskData[i].todo_type_cd,tskData[i].todo_type_desc);
	}

}

function crtTskOption(tskId,tskVal){
	var newTskCat = document.createElement("a");
	var tskCatOpt = document.createElement("option");
	newTskCat.id = "newTskCat_"+tskId;
	tskCatOpt.id = "tskCatOpt_"+tskId;
	newTskCat.className = "tskCat";
	tskCatOpt.className = "tskCat";
	newTskCat.innerHTML = tskVal;
	tskCatOpt.innerHTML = tskVal; 
	newTskCat.value = tskId;
	tskCatOpt.value = tskId;
	newTskCat.onclick = fltrData;
	document.getElementById("tskCatFtr").appendChild(newTskCat);
	document.getElementById("catDrpDn").appendChild(tskCatOpt);
}
// type: task, backlog, done
function createNwDiv(val,type,id){
	var newTsk = document.createElement("div");
	var editbtn = document.createElement("button");
	var deletebtn = document.createElement("button");
	var backlogbtn = document.createElement("button");
	var donebtn = document.createElement("button");
	editbtn.className = "btn edit";
	deletebtn.className = "btn del";
	donebtn.className = "btn done";
	backlogbtn.className = "btn backlog";

	deletebtn.id = "delete_"+id; 
	editbtn.id = "edit_"+id;
	donebtn.id = "done_"+id; 
	backlogbtn.id = "backlog_"+id;

	deletebtn.onclick = deleteTsk;
	editbtn.onclick = editTsk;
	donebtn.onclick = done;
	backlogbtn.onclick = backlog;
		// var t = document.createTextNode("CLICK ME");
		newTsk.innerHTML = val+"<br>";
		editbtn.innerHTML = "";
		deletebtn.innerHTML = "";
		newTsk.className = "tskDiv";
		newTsk.id = "tskDiv_"+id;
		// newTsk.addEventListener("dragstart", drag);
		// newTsk.bind("dragstart", function(ev){drag(ev);});
		// newTsk.addEventListener('dragstart', function() {drag(ev)}, true);


		document.getElementById(type).appendChild(newTsk);
		document.getElementById("tskDiv_"+id).appendChild(editbtn);
		document.getElementById("tskDiv_"+id).appendChild(deletebtn);
		document.getElementById("tskDiv_"+id).appendChild(backlogbtn);
		document.getElementById("tskDiv_"+id).appendChild(donebtn);
		document.getElementById("taskBox").value = "";
	}

	function keyCode(event){
		if(event.key=="Enter"){
			console.log(event);
			var inputEle = document.getElementById("taskBox");
			var val = inputEle.value;
			val = val.trim();
			if(val=="")
				return ;
			var d = new Date();
			var dt = d.getFullYear()+"-"+(d.getMonth() + 1)+"-"+d.getDate();
			console.log("booolean result "+(editDataflg));
			if(editDataflg==false){
				var catCd= $('#catDrpDn').val();	//$('#catDrpDn :selected').text();
				postData(val,1,dt,catCd);
			}	
			else{
				console.log("upd called for: "+id+" "+val);
				updateData(id,val,aFunc);
				editDataflg=false;
			}	inputEle.value="";

		}
	}
	function deleteTsk(){
		var tskDivId = $(this).parent().attr("id");
		var tskDiv = document.getElementById(tskDivId);
		tskDiv.parentNode.removeChild(tskDiv);
		deleteTodo(tskDivId,aFunc);
	}
	var id;
	function editTsk(){
		var tskDivId = $(this).parent().attr("id");
		var tskDiv = document.getElementById(tskDivId);
		var taskBox = document.getElementById("taskBox");
		if(taskBox.value!="")
			return;	
		var text = tskDiv.innerText.split("\n");
		tskDiv.parentNode.removeChild(tskDiv);

		var taskBox = document.getElementById("taskBox");
		taskBox.value = text[0];
		editDataflg = true;
		id = tskDivId.split("_")[1];
		
	}
	function backlog(){
		var tskDivId = $(this).parent().attr("id");
		var tskDiv = document.getElementById(tskDivId);
		document.getElementById("backlog").appendChild(tskDiv);
		updateStatus(tskDivId,3,aFunc);
	}
	function done(){
		console.log("caleld");
		var tskDivId = $(this).parent().attr("id");
		var tskDiv = document.getElementById(tskDivId);
		document.getElementById("done").appendChild(tskDiv);
		// tskDiv.parentNode.removeChild(tskDiv);
		updateStatus(tskDivId,2,aFunc);
	}

	$(function () {
		$("#task div").draggable({
			revert: "invalid",
			refreshPositions: true,
			drag: function (event, ui) {
				ui.helper.addClass("draggable");
			},
			stop: function (event, ui) {
				ui.helper.removeClass("draggable");
				var image = this.src.split("/")[this.src.split("/").length - 1];
				if ($.ui.ddmanager.drop(ui.helper.data("draggable"), event)) {
					alert(image + " dropped.");
				}
				else {
					alert(image + " not dropped.");
				}
			}
		});
		$("#backlog").droppable({
			drop: function (event, ui) {
				if ($("#backlog div").length == 0) {
					$("#backlog").html("");
				}
				ui.draggable.addClass("dropped");
				$("#backlog").append(ui.draggable);
			}
		});
	});


// ##################################################  Backend Connectivity  #######################s

$(document).ready(function(){
	getData(aFunc);
});
function aFunc(){
	console.log("done");
}
function getData(aFunc){
	var url = baseUrl+endPoint;
	$.getJSON( url, {
		crossDomain: true,
		format: "json"
	})
	.done(function( data ) {
		myData = data;
		getTskCat(aFunc);
		aFunc(); 
	});
}
function editStatus(id,status_cd,aFunc){
	var url = baseUrl+endPoint+"/"+id;
	$.getJSON( url, {
		crossDomain: true,
		format: "json"
	})
	.done(function( data ) {
		myData = [];
		myData = data;
		console.log("getting the data "+myData.descpt);
		console.log("Sending parameter on edit status: "+id+" "+myData.descpt+" "+status_cd+" "+myData.crt_dt+" "+myData.todo_type_cd);
		putData(id,myData.descpt,status_cd,myData.crt_dt,myData.todo_type_cd,aFunc);
		aFunc(); 
	});
}
function editData(id,updData,aFunc){
	var url = baseUrl+endPoint+"/"+id;
	$.getJSON( url, {
		crossDomain: true,
		format: "json"
	})
	.done(function( data ) {
		myData = [];
		myData = data;
		console.log("getting the data "+myData.descpt);
		console.log(id+" "+updData+" "+myData.st_cd+" "+myData.crt_dt);
		putData(id,updData,myData.st_cd,myData.crt_dt,myData.todo_type_cd,aFunc);
		aFunc(); 
		location.reload();
	});
}
function postData(data,status,date,catCd){
	if(editDataflg==true)
		return;
	jQuery.ajax({
		url: baseUrl+endPoint,
		type: "POST",
		data: {descpt: data, crt_dt:date,st_cd:status,"todo_type_cd":catCd },
		dataType: "json",
		beforeSend: function(x) {
			if (x && x.overrideMimeType) {
				x.overrideMimeType("application/j-son;charset=UTF-8");
			}
		},
		success: function(result) {
			console.log("post done: "+ result.todo_id);
			aFunc(); 
			createNwDiv(result.descpt,"task",result.todo_id);
		}
	}); 
}

function putData(id,data,status,date,type,aFunc){
	console.log("Check here the type: "+id +" "+data+" "+status+" "+data+" "+type);
	jQuery.ajax({
		url: baseUrl+endPoint+"/"+id,
		type: "PUT",
		data: {todo_id:id, descpt: data, crt_dt:date,st_cd:status, todo_type_cd:type },
		dataType: "json",
		beforeSend: function(x) {
			if (x && x.overrideMimeType) {
				x.overrideMimeType("application/j-son;charset=UTF-8");
			}
		},
		success: function(result) {
			console.log("put done: "+ result.todo_id);
			aFunc(); 
		}
	}); 
}
function delData(id,aFunc){
	$.ajax({
		url: baseUrl+endPoint+"/"+id,
		type: 'DELETE',
		success: function(result) {
			aFunc();
		}
	});
}
function updateStatus(id,status_cd,aFunc){
	id = id.split("_")[1];
	editStatus(id,status_cd,aFunc);
	// console.log(id+" "+myData.descpt+" "+status_cd+" "+myData.crt_dt);
	// putData(id,myData.descpt,status_cd,myData.crt_dt,aFunc);
}
function updateData(id,data,aFunc){
	// id = id.split("_")[1];
	editDataflg=true;
	console.log("updateData  editDataflg:"+editDataflg);
	editData(id,data,aFunc);
}
function deleteTodo(id,aFunc){
	id = id.split("_")[1];
	delData(id,aFunc);

}

// function allowDrop(ev) {
//     ev.preventDefault();
// }

// function drag(ev) {
// 	console.log("gere")
// 	alert("here");
//     ev.dataTransfer.setData("text", ev.target.id);
// }

// function drop(ev) {
//     ev.preventDefault();
//     var data = ev.dataTransfer.getData("text");
//     ev.target.appendChild(document.getElementById(data));
// }

// $(document).ready(function () {
//     $(function () {
//         $("#task, #backlog").sortable({
//             connectWith: ".tskDiv",
//             cursor: "move"
//         }).disableSelection();
//     });


// });

//######################################## MODAL ##################################################
// Get the modal'

$(document).ready(function(){
	var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// Get the button that create new catagory
var newCataBtm = document.getElementById("newCataCrtBtn");

//when user clicks create, the newly created catagory added to db
newCataBtm.onclick = function(){
	var inpCat =  document.getElementById("newCata").value;
	addTskCat(inpCat,aFunc);
	modal.style.display = "none";
	document.getElementById("newCata").value="";
}

// When the user clicks the button, open the modal 
btn.onclick = function() {
	modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
	modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}
});

//####################################### Task Type changes ####################################

function addTskCat(inpCat,aFunc){
	console.log("caleed");
	jQuery.ajax({
		url: baseUrl+"/api/todo_type",
		type: "POST",
		data: {"todo_type_desc": inpCat },
		dataType: "json",
		beforeSend: function(x) {
			if (x && x.overrideMimeType) {
				x.overrideMimeType("application/j-son;charset=UTF-8");
			}
		},
		success: function(result) {
			console.log("post done for adding new task type: "+ result.todo_type_desc);
			aFunc(); 
			location.reload();
		}
	}); 
}

function getTskCat(aFunc){
	var url = baseUrl+"/api/todo_type";
	$.getJSON( url, {
		crossDomain: true,
		format: "json"
	})
	.done(function( data ) {
		tskData = data;
		rendrData();
		aFunc(); 
	});
}
function fltrData(){
	$('.tskDiv').remove();
	$('.tskCat').remove();
	var id = $(this).attr("id").split("_")[1];
	var url = baseUrl+"/api/todoes/catatory/"+id;
	$.getJSON( url, {
		crossDomain: true,
		format: "json"
	})
	.done(function( data ) {
		myData = data;
		for(var i in myData){
		console.log(myData[i]);
	}
		console.log("data : "+data);
		rendrData();
		// aFunc(); 
	});
}