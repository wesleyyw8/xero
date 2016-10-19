
var userDescriptions = [];
var userNames = [];
//create 10 thousand of items (somewith matching IDs and some not,
// thats the reason I start the second array with the initial id of 500)
userNames = createTenThousandObj(userNames, "name", 1);
userDescriptions = createTenThousandObj(userDescriptions, "description", 500);

var startTime = window.performance.now();    //starts the performance timer
var output = mergeData(userNames, userDescriptions);
alert((window.performance.now() - startTime).toString()+" milliseconds.");    //show the result of the performance test on the screen

$(".content pre").text(JSON.stringify(output, null, 2));   //put the result on the screen

function createTenThousandObj(arr, prop, initialId){
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";   
  for (var x=initialId;x<(initialId+10000);x++){
    var obj = {id: x.toString()};
    if (Math.random() >= 0.5)
      obj[prop] = possible[Math.floor(Math.random() * possible.length)];
    arr.push(obj);
  }
  return arr;
}
function mergeData(arrA, arrB){
  var obj = {};
  $.each(arrA, function(index,val){
    obj[val.id] = val;
  });
  $.each(arrB, function(index,val){
    if (!obj[val.id])
      obj[val.id] = val;
    else
      obj[val.id] = $.extend({}, val, obj[val.id]);
  });
  return obj;
}
