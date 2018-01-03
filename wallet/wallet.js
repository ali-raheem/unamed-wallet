electrumRPC = "http://localhost:7777";
function jsonRPC(id, method, params={}, callback = null, dataType = "json") {
	var j = {"id":id,"method":method,"params":params};
	request = JSON.stringify(j);
	$.post(electrumRPC, request, callback, dataType);
	console.log(request);
}
function updateBalance () {
	console.log('getbalance');
	jsonRPC("updateBalance","getbalance", {},
		function(data){
			$("#balance").html(data.result.confirmed+ " VTC");
	});
}
function updateRequests () {
	console.log('listrequests');
	jsonRPC("updateRequests", "listrequests", {},
	function(data, status){
		var i;
		var table = "<table><tr><td class='address'>Address</td><td>Amount (VTC)</td><td class='memo'>Memo</td>";
		for(i = 0; i < data.result.length; i++) {
                	table += "<tr><td>"+data.result[i].address+"</td><td>"+ data.result[i].amount/100000000+ "</td><td>"+data.result[i].memo+"</td></tr>";
                 }
		table += "</table>";
		$("#requests-table").html(table);
        });
}
                 
$(document).ready(function() {
	$("#add-request-button").click(function() {
		console.log('addreq');
		var amount = $("#add-request-amount").val();
		var memo = $("#add-request-memo").val();
		var params = {"amount": amount, "memo": memo};
		jsonRPC("addreq", "addrequest", params);
	})
;});
$(document).ready(function() {
	$("#clear-requests-button").click(function() {
		console.log('clearrequests');
		jsonRPC("clearreq", "clearrequests");
	})
});
$(document).ready(function() {
	$("#update-button").click(function() {
		console.log('update');
		mainloop();
	})
});
function mainloop(){
  updateBalance();
  updateRequests();
}
window.setInterval(mainloop(), 1000);
