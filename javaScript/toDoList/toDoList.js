 
var counter=1;
function keyCode(event){
	if(event.key=="Enter"){
		console.log(event);
		var inputEle = document.getElementById("taskBox");
		var val = inputEle.value;
		val = val.trim();
		if(val=="")
			 return ;
		var newTsk = document.createElement("div");
		var editbtn = document.createElement("button");
		var deletebtn = document.createElement("button");
		var backlogbtn = document.createElement("button");
		var donebtn = document.createElement("button");
		editbtn.className = "btn edit";
		deletebtn.className = "btn del";
		donebtn.className = "btn done";
		backlogbtn.className = "btn backlog";

		deletebtn.id = "delete_"+counter; 
		editbtn.id = "edit_"+counter;
		donebtn.id = "done_"+counter; 
		backlogbtn.id = "backlog_"+counter;

		deletebtn.onclick = deleteTsk;
		editbtn.onclick = editTsk;
		donebtn.onclick = done;
		backlogbtn.onclick = backlog;
		// var t = document.createTextNode("CLICK ME");
		newTsk.innerHTML = val+"<br>";
		editbtn.innerHTML = "";
		deletebtn.innerHTML = "";
		newTsk.className = "tskDiv";
		newTsk.id = "tskDiv_"+counter;
		// newTsk.addEventListener("dragstart", drag);
		// newTsk.bind("dragstart", function(ev){drag(ev);});
		// newTsk.addEventListener('dragstart', function() {drag(ev)}, true);


		document.getElementById("task").appendChild(newTsk);
		document.getElementById("tskDiv_"+counter).appendChild(editbtn);
		document.getElementById("tskDiv_"+counter).appendChild(deletebtn);
		document.getElementById("tskDiv_"+counter).appendChild(backlogbtn);
		document.getElementById("tskDiv_"+counter).appendChild(donebtn);
		inputEle.value = "";
		counter++;
	}
}
	function deleteTsk(){
		var tskDivId = $(this).parent().attr("id");
		var tskDiv = document.getElementById(tskDivId);
		tskDiv.parentNode.removeChild(tskDiv);
	}
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
	}
	function backlog(){
		var tskDivId = $(this).parent().attr("id");
		var tskDiv = document.getElementById(tskDivId);
		document.getElementById("backlog").appendChild(tskDiv);
	}
	function done(){
		console.log("caleld");
		var tskDivId = $(this).parent().attr("id");
		var tskDiv = document.getElementById(tskDivId);
		document.getElementById("done").appendChild(tskDiv);
		// tskDiv.parentNode.removeChild(tskDiv);
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