<%
 /****************************************************************************************
***	ID				: regiMenu.jsp
***	Title			: 메뉴 관리
***	Description		: 메뉴 관리 처리화면 (등록, 수정)
***
***	-----------------------------    Modified Log   --------------------------------------
***	ver				date				author					description
***  -----------------------------------------------------------------------------------------
***	1.0			2017-02-23 				ntarget					First Coding.
*****************************************************************************************/
%>

<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html lang="ko">
<head>
<%@ include file ="../header.jsp" %>
<app:layout mode="stylescript" type="normal" />
</head>

<body class="popup">

<app:layout mode="headerPopup" title="메뉴 등록"/>

<!-- ======================= 중앙내용 시작 ====================== -->
<div class="wrap1 pop_con">
<form:form commandName="model" name="form1" id="form1">
<form:hidden path="orgMenuId"/>

	<p class="floatL pad_T10"><span class="red">* </span>필수입력사항</p>

	<div class="right">
		<span id="saveBtn"><a class="btn bg_blue i_save" href="#void"><span>저장</span></a></span>
		<span id="deltBtn"><a class="btn bg_gray i_delete" href="#void"><span>삭제</span></a></span>
	</div>

	<table class="table1 admin_write" summary="메뉴ID, 메뉴명, 부모메뉴ID, 메뉴레벨, 메뉴순서, 타겟URL, 팝업여부, 사용여부 리스트">
	<caption class="caption_none">메뉴 등록</caption>
	<colgroup>
		<col width="25%">
		<col width="75%">
	</colgroup>
	<tbody>
		<tr>
			<th scope="row" class="left"><span>*</span>메뉴ID</th>
			<td><form:input path="menuId" maxlength="20" cssClass="w40"/></td>
		</tr>
		<tr>
			<th scope="row" class="left"><span>*</span>메뉴명</th>
			<td><form:input path="menuNm" maxlength="100" cssClass="w50"/></td>
		</tr>
		<tr>
			<th scope="row" class="left"><span>*</span>부모 메뉴ID</th>
			<td>
				<div class="selectBox w80">
                  	<form:select path="parentMenuId" cssClass="" >
	  					<form:option value="NONE" label="최상위 메뉴"/>
	  					<form:options items="${menuList}"/>
					</form:select>
				</div>
			</td>
		</tr>
		<tr>
			<th scope="row" class="left"><span>*</span>메뉴레벨</th>
			<td><form:input path="menuLvl" maxlength="2" cssClass="w10"/></td>
		</tr>
		<tr>
			<th scope="row" class="left"><span> </span>메뉴순서</th>
			<td><form:input path="menuOdr" maxlength="2" cssClass="w10"/>&nbsp;미입력 시 마지막번호로 자동 등록됩니다.</td>
		</tr>
		<tr>
			<th scope="row" class="left"><span>*</span>타겟 URL</th>
			<td><form:input path="tagtUrl" maxlength="100" cssClass="w80"/></td>
		</tr>
		<tr>
			<th scope="row" class="left"><span>*</span>팝업여부</th>
			<td>
				<form:radiobutton path="popupYn" label="사용(Y)" value="Y" cssStyle="border:none;"/>
				<form:radiobutton path="popupYn" label="미사용(N)" value="N" cssStyle="border:none;"/>
			</td>
		</tr>
		<tr>
			<th scope="row" class="left"><span>*</span>사용여부</th>
			<td>
				<form:radiobutton path="useYn" label="사용(Y)" value="Y" cssStyle="border:none;"/>
				<form:radiobutton path="useYn" label="미사용(N)" value="N" cssStyle="border:none;"/>
			</td>
		</tr>
	</tbody>
	</table>
</form:form>
</div>
<!-- ======================= 중앙내용 종료 ====================== -->

<app:layout mode="footerPopup"/>

</body>
</html>
