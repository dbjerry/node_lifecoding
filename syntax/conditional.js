var args = process.argv;
console.log(args);
/*
['D:\\Util\\Node_js\\node.exe', <-- Node.js runtime이 어디에 위치하고 있는지에 대한 정보
 'D:\\node-workspace\\node_lifecoding\\test.js',  <-- 실행시킨 이 파일의 경로에 대한 정보
 'jerry' <-- 입력값 ]

 */
console.log(args[2]); // 'jerry'
console.log('A');
console.log('B');
//if(false){
if(args[2] === '1'){
    console.log('OK-1');
}
else {
    console.log('else2');
}
console.log('C');