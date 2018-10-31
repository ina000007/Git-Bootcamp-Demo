function ranking () {
	var t = new Date().getTime();
	var obj = {};
	var temp=[];
	var arr = [11,11,11,22,22,22,22,33,33,33,33,4,44];
	for(var i=0;i<arr.length;i++){
		if(obj.hasOwnProperty(arr[i]))
			obj[arr[i]] = obj[arr[i]]+1;
		else
			obj[arr[i]]=1;
	}
	for (var key in obj) {
		temp.push(key);
	}
	var n =1;
	for (var i=temp.length-1; i>=0; i--) {
		console.log(temp[i]+" =>> "+n);		
		n= obj[temp[i]]+n;
	}
	console.log(new Date().getTime() - t);
}
ranking();

//######################################### Second Method ################################## 

function ranking1 () {
	var t = new Date().getTime();
	var mark=[];
	var arr = [11,11,11,22,22,22,22,33,33,33,33,4,44];
	var mm=100;
	for (var i = 100; i >= 0; i--) 
		mark[i]=0;

	for(var i=0;i<arr.length;i++)
		mark[arr[i]]=mark[arr[i]]+1;

	var rank=1;
	for (var i = 100; i >= 0; i--) {
		if(mark[i]>0){
			console.log(i+" rank= "+rank);
			rank = mark[i]+rank;			
		}
	}
	console.log(new Date().getTime() - t);
}
ranking1();