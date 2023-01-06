<%
 /****************************************************************************************
***	ID				: regiProg.jsp
***	Title			: 프로그램 관리
***	Description		: 프로그램 관리 처리화면 (등록, 수정)
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

<app:layout mode="headerPopup" title="프로그램 등록"/>

<!-- ======================= 중앙내용 시작 ====================== -->
<div class="wrap1 pop_con">
<form:form commandName="model" name="form1" id="form1">
<form:hidden path="orgProgId"/>

	<p class="floatL pad_T10"><span class="red">* </span>필수입력사항</p>

	<div class="right">
		<span id="saveBtn"><a class="btn bg_blue i_save" href="#void"><span>저장</span></a></span>
		<span id="deltBtn"><a class="btn bg_gray i_delete" href="#void"><span>삭제</span></a></span>
	</div>

	<table class="table1 admin_write" summary="프로그램ID, 프로그램명, 프로그램URL, 연결메뉴ID  리스트">
	<caption class="caption_none">프로그램 등록</caption>
	<colgroup>
		<col width="25%">
		<col width="75%">
	</colgroup>
	<tbody>
		<tr>
			<th scope="row" class="left"><span>*</span>프로그램ID</th>
			<td><form:input path="progId" maxlength="20" cssClass="w40"/></td>
		</tr>
		<tr>
			<th scope="row" class="left"><span>*</span>프로그램명</th>
			<td><form:input path="progNm" maxlength="100" cssClass="w100"/></td>
		</tr>
		<tr>
			<th scope="row" class="left"><span>*</span>프로그램URL</th>
			<td><form:input path="progPattern" maxlength="100" cssClass="w100"/></td>
		</tr>
		<tr>
			<th scope="row" class="left"><span> </span>연결 메뉴ID</th>
			<td>
				<div class="selectBox w100">
                  	<form:select path="menuId" cssClass="" >
                  		<form:option value="" label="=== 연결 메뉴 없음 ===" />
	  					<form:options items="${menuList}"/>
					</form:select>
				</div>
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
