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
function popUpWindow(URL) {
	window.open(URL, "_blank", "directories=no, titlebar=no, toolbar=no, location=no, status=no, menubar=no, scrollbars=no, left=500, width=400, height=500");
}
function updateRequests () {
	console.log('listrequests');
	jsonRPC("updateRequests", "listrequests", {},
	function(data, status){
		var i;
		var table = "<table><tr><td class='address'>Address</td><td>Amount (VTC)</td><td class='memo'>Memo</td><td>Action</td></tr>";
		for(i = 0; i < data.result.length; i++) {
                	table +=
			"<tr><td>"+data.result[i].address+"</td><td>"+
			data.result[i].amount/100000000+
			"</td><td>"+data.result[i].memo+
			"</td><td><button class='button-okay' onclick='popUpWindow(\""+data.result[i].index_url+"\")'>Show</button></td></tr>";
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
	$("#switch-pay-button").click(function() {
		$("#requests-view").slideUp();
		$("#pay-view").slideDown();
	})
});
$(document).ready(function() {
	$("#switch-req-button").click(function() {
		$("#requests-view").slideDown();
		$("#pay-view").slideUp();
	})
});
$(document).ready(function() {
	$("#pay-button").click(function() {
		var amount = $("#pay-amount").val();
		var addr = $("#pay-address").val();
		var params = {"amount": amount, "destination": addr};
		console.log('payto');
		jsonRPC("payto", "payto", params);
	})
;});
function mainloop(){
  updateBalance();
  updateRequests();
}
window.setInterval(mainloop, 2000);
