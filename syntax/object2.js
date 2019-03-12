var f = function f1(){
    console.log(1+1);
    console.log(1+2);
}
console.log(f);
f();
var a = [f];
a[0];

var o = {
    func:f
}
console.log("\no.func");
o.func();

//조건문은 값이 아님
// var i = if(true){console.log(1)};

//반복문은 값이 아님
// var w = while(true){console.log(1)};