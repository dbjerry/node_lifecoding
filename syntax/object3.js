var v1 = 'v1';
var v2 = 'v2';

// 정리
var o = {
    v1:'v1',
    v2:'v2',
    f1:function (){
        //console.log(o.v1);
        //this : 속해있는 객체
        //ex) o.v1 = this.v1
        console.log(this.v1);
    },
    f2:function (){
        // console.log(o.v2);
        console.log(this.v2);
    }
}

/*
o 객체에 정리 가능
function f1(){
    console.log(o.v1);
}

function f1(){
    console.log('???');
}

function f2(){
    console.log(o.v2);
}
*/

o.f1();
o.f2();
