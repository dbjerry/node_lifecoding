var members = ['egoing', 'k8805', 'hoya'];
console.log(members[1]); // k8805
var i = 0;
while(i < members.length){
  console.log('array loop[' + i + '] :', members[i]);
  i = i + 1;
}
 
var roles = {
  'programmer':'egoing',
  'designer' : 'k8805',
  'manager' : 'hoya'
}
console.log(roles.designer); //k8805
console.log(roles['designer']); //k8805
 
for(var n in roles){
    //n은 key값을 가져오고, roles[n]은 value값을 가져온다. 
    console.log('object => ', n, ', value => ', roles[n]);
}