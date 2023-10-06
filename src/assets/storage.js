// step 1
window.indexedDB=window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// step2
window.IDBTransaction=window.IDBTransaction ||window.webkitIDBTransaction || window.msIDBTransaction;
// step3
window.IDBKeyRange=window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;


if(!window.indexedDB){
    alert("Your browser is not support indexed db")
}
var db;
var request=window.indexedDB.open("imageUpload",1);
request.onerror=function(event){
    console.log("error" + event.target.result)
}
request.onsuccess=function(event){
    db=request.result;
    console.log("success" +db);
}
request.onupgradeneeded=function(event){
    var db;
    var objectstore=db.createObjectStore("imageUpload")
}
