$(document).ready(function () {
	$(".userInfoRow").click(function(){
		$("#hiddenId").val($(this).children()[0].innerText)
		$("#inputId").val($(this).children()[0].innerText)
		$("#inputName").val($(this).children()[1].innerText)
		$("#inputEmail").val($(this).children()[2].innerText)
		$("#inputTel").val($(this).children()[3].innerText)
		$("#inputOffNm").val($(this).children()[4].innerText)
		$("#inputOffTel").val($(this).children()[5].innerText)
		if($(this).children()[6].innerText == "true") $("#isActive-on").prop('checked', true); // 선택하기 
		else $("#isActive-off").prop('checked', true); // 선택하기
		$("#inputRoleNm").val($(this).children("input").val()).prop("selected", true)
	})


	// $.ajax({
	// 	type: 'post',
	// 	url: '/admin/getUserList.do',
	// 	dataType: 'json',
	// 	success: ({ hashMapList, string }) => {
	// 		function onAfterChangeFunction(e) {
	// 			const { rowKey, columnName, value } = e
	// 			const userId = grid.getValue(rowKey, 'USER_ID')
	// 			console.log(userId, value)
	// 			$.ajax({
	// 				type: 'post',
	// 				url: '/admin/changeUserInfo.do',
	// 				data: {
	// 					userId: userId,
	// 					changeValue: value,
	// 					changeDomain: columnName
	// 				},
	// 				dataType: 'json',
	// 				success: (result) => {

	// 				},
	// 				error: (request, error, status) => {

	// 				}

	// 			})
	// 			// const userId = instance.getValue(rowKey, "userId")
	// 			// const changeValue = instance.getValue(rowKey, columnName)
	// 			// console.log(userId, changeValue)
	// 		}
	// 		const grid = new tui.Grid({
	// 			el: document.getElementById('grid'),
	// 			data: hashMapList,
	// 			scrollX: false,
	// 			scrollY: true,
	// 			bodyHeight: 400,
	// 			rowHeaders: ['checkbox'],
	// 			columns: [
	// 				{
	// 					header: '아이디',
	// 					name: 'USER_ID'
	// 				},
	// 				{
	// 					header: '이름',
	// 					name: 'USER_NM',
	// 					editor: 'text',
	// 					onAfterChange: onAfterChangeFunction
	// 				},
	// 				{
	// 					header: '이메일',
	// 					name: 'USER_EMAIL',
	// 					editor: 'text',
	// 					onAfterChange: onAfterChangeFunction
	// 				},
	// 				{
	// 					header: '전화 번호',
	// 					name: 'USER_TEL',
	// 					editor: 'text',
	// 					onAfterChange: onAfterChangeFunction
	// 				},
	// 				{
	// 					header: '회사 이름',
	// 					name: 'OFFI_NM',
	// 					editor: 'text',
	// 					onAfterChange: onAfterChangeFunction
	// 				},
	// 				{
	// 					header: '회사 번호',
	// 					name: 'OFFI_TEL',
	// 					editor: 'text',
	// 					onAfterChange: onAfterChangeFunction
	// 				},
	// 				{
	// 					header: '활성화',
	// 					name: 'ACCESS_YN',
	// 					onAfterChange: onAfterChangeFunction,
	// 					copyOptions: {
	// 						useListItemText: true
	// 					},
	// 					formatter: 'listItemText',
	// 					editor: {
	// 						type: 'radio',
	// 						options: {
	// 							listItems: [
	// 								{ text: "활성화", value: "true" },
	// 								{ text: "비활성화", value: "false" }
	// 							]
	// 						}
	// 					}
	// 				},
	// 				{
	// 					header: '유저 권한',
	// 					name: 'ROLE_NM',

	// 					copyOptions: {
	// 						useListItemText: true
	// 					},
	// 					formatter: 'listItemText',
	// 					editor: {
	// 						type: 'radio',
	// 						options: {
	// 							listItems: [
	// 								{ text: "시스템관리자", value: "시스템관리자" },
	// 								{ text: "제조사", value: "제조사" },
	// 								{ text: "항만통제국", value: "항만통제국" },
	// 								{ text: "연구원", value: "연구원" },
	// 								{ text: "선주", value: "선주" }
	// 							]
	// 						}
	// 					}
	// 				}
	// 			],
	// 			pageOptions: {
	// 				useClient: true,
	// 				perPage: 10
	// 			}
	// 		})

	// 		grid.getData().forEach((val, idx) => {
	// 			if (val["USER_ID"] == string) {
	// 				grid.disableRow(val.rowKey, true)
	// 			}
	// 		})
	// 	},
	// 	error: (request, status, error) => {

	// 	}
	// })

});

function deleteUser() {
	$.ajax({
		type: "POST",
		url: "/admin/deleteUser.do",
		data: {
			inputId: $("#inputId").val()
		},
		dataType: "json",
		async: false,
		success: function (result) {
			if (result.isSuccess) {
				alert("User 삭제 성공")
				location.href = "/admin/manageUser.do"
			} else {
				alert("User 삭제 실패")
			}

		},
		error: function (request, status, error) {
			// console.log("데이터 조회 오류\ncode:" + request.status + "\n" + "message:"
			// 	+ request.responseText + "\n" + "error:" + error);
			alert("현재 접속한 관리자 아이디입니다.");
			//			location.href='/admin/manageUser.do';
		}
	})
}


function fn_search(page) {
	const form = $("#userForm")
	$("input[name=page]").val(page);

	form.attr("action", ROOT_PATH + "/admin/manageUser.do");
	form.submit();
}