function altEnter () {
	var n=10;
	var k=11;
	var arr=["chrome","firefox","git","cmd","skype","sublime","outlook","note++","eclipse","netbeats"];
	k=k%n;
	var temp = arr[k];
	for (var i = k; i > 0; i--) {
		arr[i]= arr[i-1];
	};
	arr[0]=temp;
	for (var i =0; i<arr.length ;  i++) {
		console.log(arr[i]);
	};
	
}