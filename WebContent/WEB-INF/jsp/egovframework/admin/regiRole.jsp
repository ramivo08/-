<%
 /****************************************************************************************
***	ID				: regiRole.jsp
***	Title			: 롤(권한) 관리
***	Description		: 롤(권한) 관리 처리화면 (등록, 수정)
***
***	-----------------------------    Modified Log   --------------------------------------
***	ver				date				author					description
***  -----------------------------------------------------------------------------------------
***	1.0			2016-11-14 				ntarget					First Coding.
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

<app:layout mode="headerPopup" title="롤 등록"/>

<!-- ======================= 중앙내용 시작 ====================== -->
<div class="wrap1 pop_con">
<form:form commandName="model" name="form1" id="form1">
<form:hidden path="orgRoleId"/>

	<p class="floatL pad_T10"><span class="red">* </span>필수입력사항</p>

	<div class="right">
		<span id="saveBtn"><a class="btn bg_blue i_save" href="#void"><span>저장</span></a></span>
		<!-- <span id="deltBtn"><a class="btn bg_gray i_delete" href="#void"><span>삭제</span></a></span> -->
	</div>

	<div class="h10"></div>

	<table class="table1 admin_write" summary="롤ID, 롤명, 부모롤ID 리스트">
	<caption class="caption_none">롤 등록</caption>
	<colgroup>
		<col width="25%">
		<col width="75%">
	</colgroup>
	<tbody>
		<tr>
			<th scope="row" class="left"><span>*</span>롤ID</th>
			<td><form:input path="roleId" maxlength="20" cssClass="w80"/></td>
		</tr>
		<tr>
			<th scope="row" class="left"><span>*</span>롤명</th>
			<td><form:input path="roleNm" maxlength="25" cssClass="w80"/></td>
		</tr>
		<tr>
			<th scope="row" class="left"><span>*</span>부모 롤ID</th>
			<td>
				<div class="selectBox w80">
                  	<form:select path="parentRoleId" cssClass="" >
                  		<c:if test="${model.roleId eq 'ROLE_AUTH_SYS'}">
							<form:option value="NONE" label="NONE" />
                  		</c:if>
                  		<c:if test="${model.roleId ne 'ROLE_AUTH_SYS'}">
		  					<form:option value="" label="=== 선택하세요 ===" />
		  					<form:options  items="${roleList}"/>
                  		</c:if>
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
