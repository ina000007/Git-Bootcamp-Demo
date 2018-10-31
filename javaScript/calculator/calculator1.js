var n1="";
var n2="";
var optr="unassigned"; 
$(document).ready(function(){
    $(".btn").click(function(){
    	var val = $(this).text();
    	if(optr=="unassigned"){
    		n1=n1+val;
    		$(".display").text(n1);
    	}
    	else{
    		n2=n2+val;
    		$(".display").text($(".display").text()+val);
    	}
    });
    $(".optr").click(function(){
    	var val = $(this).text();   	
    	if(n1!="" && n2==""){
    		optr=val;
    		$(".display").text(n1+val);
    	}
    });
    $(".cal").click(function(){  	
    	if(n2!=""){
    		var nm1= parseFloat(n1);
    		var nm2= parseFloat(n2);
    		var ans;
    		console.log(optr);
    		switch(optr){
    			case "+":val = nm1+nm2;break;
    			case "-":val = nm1-nm2;break;
    			case "*":val = nm1*nm2;break;
    			case "/":val = nm1/nm2;break;
    			case "%":val = nm1%nm2;break; 
    		}
    		$(".display").text(val);
    		n1="";		
			n2="";
			optr="unassigned"; 
    	}
    });
    $(".clear").click(function(){
    		n1="";
			n2="";
			optr="unassigned"; 
			$(".display").text("");
    });

});