// ######################################################### infixToPostfix  #########################
var ans=0;
class Stack { 
    constructor() 
    { 
        this.items = []; 
    } 
push(element) 
{ 
    this.items.push(element); 
} 
pop() 
{ 
    if (this.items.length == 0) 
        return "Underflow"; 
    return this.items.pop(); 
}
peek() 
{ 
    return this.items[this.items.length - 1]; 
} 
isEmpty() 
{ 
    return this.items.length == 0; 
} 
printStack() 
{ 
    var str = ""; 
    for (var i = 0; i < this.items.length; i++) 
        str += this.items[i] + " "; 
    return str; 
} 
}
function Prec(ch) 
{ 
    switch (ch) 
    { 
        case '+': 
        case '-': 
        return 1; 
        case '*': 
        case '/': 
        return 2; 
        case '^': 
        return 3; 
    } 
    return -1; 
} 
function calculate(exp) 
{ 
        var result ="";
        var stack = new Stack(); 
        for (var i = 0; i<exp.length; ++i) 
        { 
            var c = exp[i]; 
            if (!isNaN(c) || c==' ' ||c=='.') 
                result += c; 
            else 
            { 
                while (!stack.isEmpty() && Prec(c) <= Prec(stack.peek())) 
                    result += stack.pop(); 
                stack.push(c); 
            } 
        } 
        while (!stack.isEmpty()) 
            result += stack.pop(); 
        evaluatePostfix(result); 
} 


// ################################################ evaluatePostfix  ######################################
 function evaluatePostfix(exp) 
    { 
        var stack = new Stack(); 
        for(var i = 0; i < exp.length; i++) 
        { 
            var c = exp[i]; 
              
            if(c == ' ') 
            continue; 
              
            else if(!isNaN(c) || c=='.') 
            { 
                var n = 0; 
                var dec=1;
                var dgtAftrDec=false;  
             
                while((!isNaN(c) || c=='.') && c != ' ') 
                { 
                    if(dgtAftrDec)
                        dec=dec*10;
                    if(!isNaN(c)){
                    n = n*10 + parseInt(c);              
                   }
                   if(c=='.'){
                    dgtAftrDec=true;
                   }
                    i++;
                    c = exp[i]; 
                } 
                
                i--; 
                n=n/dec;
                
                stack.push(n); 
                stack.printStack();
               
            }  
            else
            { 
                var val1 = stack.pop(); 
                var val2 = stack.pop(); 
                  
                switch(c) 
                { 
                    case '+': 
                    stack.push(val2+val1); 
                    break; 
                      
                    case '-': 
                    stack.push(val2- val1); 
                    break; 
                      
                    case '/': 
                    stack.push(val2/val1); 
                    break; 
                      
                    case '*': 
                    stack.push(val2*val1); 
                    break; 
            } 
            } 
        } 
        ans = stack.pop();
        console.log("result = "+ans);
        return ans;
    } 


var optr="unassigned"; 
var str="";
$(document).ready(function(){
    $(".btn").click(function(){
        var val = $(this).text();
        str = str+val;
        $(".display").text(str);
        optr="unassigned"; 
    });
    $(".optr").click(function(){
        var val = $(this).text();       
        if(optr=="unassigned"){
            optr=val;
            str = str+val;
            $(".display").text(str);
        }
        else{
            str = str.substring(0, str.length - 1);
            str = str+val;
            $(".display").text(str);
        }
    });
    $(".cal").click(function(){   
    var lstCh=str[str.length - 1];   
        if(str!="" && !(lstCh=='/' || lstCh=='+' || lstCh=='-' || lstCh=='*')){
            str = str.replace(/[\+ / \- \*]/g, " $& ");
            var val = parseFloat(calculate(str));
            console.log(ans);
            $(".display").text(ans);
            str=ans;      
            optr="unassigned"; 
        }
    });
    $(".clear").click(function(){
            str="";
            optr="unassigned"; 
            $(".display").text("");
    });
     $(".sngClr").click(function(){
            str = str.substring(0, str.length - 1);
            optr="unassigned"; 
            $(".display").text(str);
    });

});