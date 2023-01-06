$(document).ready(function (){
	$(".domainContent").on("dblclick", function() {
		$("#domainInformationName").val($(this).children('.domainName')[0].textContent)
		$("#domainOrgName").val($(this).children('.domainName')[0].textContent)
		$("#domainInformationDes").text($(this).children('.domainDes')[0].textContent)
		$("#domainInformationType").val($(this).children('.domainType')[0].textContent)
		$("#domainInformationModal").modal('show')
	})
})

function addingModal() {
	$("#domainAddModal").modal()
}

function eventAddingModal() {
	$("#eventDomainAddModal").modal()
}
function operAddingModal() {
	$("#operDomainAddModal").modal()
}


function editDomain() {
var form = $("#domainInformaionForm");
form.attr("action", "/domain/editDomain.do")
form.submit()
}

function removeDomain() {
var form = $("#domainInformaionForm");
form.attr("action", "/domain/removeDomain.do")
//form.submit()
}

function addDomain() {
var form = $("#domainAddForm");
form.attr("action", "/domain/addDomain.do")
form.submit()
}


/*event*/
function  eventEditDomain() {
	var form = $("#eventDomainInformaionForm");
	form.attr("action", "/domain/editDomain.do")
	form.submit()
}

function eventRemoveDomain() {
	var form = $("#eventDomainInformaionForm");
	form.attr("action", "/domain/removeDomain.do")
//	form.submit()
}

function eventAddDomain() {
	var form = $("#eventDomainAddForm");
	form.attr("action", "/domain/addDomain.do")
	form.submit()
}

/*operation*/
function  operEditDomain() {
	var form = $("#operDomainInformaionForm");
	form.attr("action", "/domain/editDomain.do")
	form.submit()
}

function operRemoveDomain() {
	var form = $("#operDomainInformaionForm");
	form.attr("action", "/domain/removeDomain.do")
//	form.submit()
}

function operAddDomain() {
	var form = $("#operDomainAddForm");
	form.attr("action", "/domain/addDomain.do")
	form.submit()
}