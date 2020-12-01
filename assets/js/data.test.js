$(function() {
    var allMembersData = 
[
{"name":"Test1","number":"007"},
{"name":"Test2","number":"010"},
{"name":"Test3","number":"015"},
{"name":"Test4","number":"215"},
{"name":"Test5","number":"825"}
];
    setInitData(allMembersData);

    function setInitData(data) {
        var storageNumbers = localStorage.getItem("LuckyNumbers2017");
    	if(!storageNumbers){
        	localStorage.setItem("LuckyNumbers2017", JSON.stringify(data));
    	}
    }
});