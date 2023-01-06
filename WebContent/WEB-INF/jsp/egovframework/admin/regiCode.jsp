<%
 /****************************************************************************************
***	ID				: regiCode.jsp
***	Title			: 코드 관리
***	Description		: 코드 관리 처리화면 (등록, 수정)
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

<app:layout mode="headerPopup" title="코드 등록"/>

<!-- ======================= 중앙내용 시작 ====================== -->
<div class="wrap1 pop_con">
<form:form commandName="model" name="form1" id="form1">
<form:hidden path="orgCode"/>

	<p class="floatL pad_T10"><span class="red">* </span>필수입력사항</p>

	<div class="right">
		<span id="saveBtn"><a class="btn bg_blue i_save" href="#void"><span>저장</span></a></span>
		<span id="deltBtn"><a class="btn bg_gray i_delete" href="#void"><span>삭제</span></a></span>
	</div>

	<table class="table1 admin_write" summary="코드, 코드명, 부모코드, 코드순서, 사용여부 리스트">
	<caption class="caption_none">코드 등록</caption>
	<colgroup>
		<col width="25%">
		<col width="75%">
	</colgroup>
	<tbody>
		<tr>
			<th scope="row" class="left"><span>*</span>코드타입</th>
			<td><form:input path="codeType" maxlength="20" cssClass="w40"/></td>
		</tr>
		<tr>
			<th scope="row" class="left"><span>*</span>코드</th>
			<td><form:input path="code" maxlength="20" cssClass="w40"/></td>
		</tr>
		<tr>
			<th scope="row" class="left"><span>*</span>코드명</th>
			<td><form:input path="codeNm" maxlength="100" cssClass="w50"/></td>
		</tr>
		<tr>
			<th scope="row" class="left"><span>*</span>부모코드</th>
			<td><form:input path="parentCode" maxlength="20" cssClass="w40"/></td>
		</tr>
		<tr>
			<th scope="row" class="left"><span> </span>코드순서</th>
			<td><form:input path="codeOdr" maxlength="2" cssClass="w10"/>&nbsp;미입력 시 마지막번호로 자동 등록됩니다.</td>
		</tr>
		<tr>
			<th scope="row" class="left"><span> </span>추가컬럼1</th>
			<td><form:input path="addCol1" maxlength="100" cssClass="w80"/></td>
		</tr>
		<tr>
			<th scope="row" class="left"><span> </span>추가컬럼2</th>
			<td><form:input path="addCol2" maxlength="100" cssClass="w80"/></td>
		</tr>
		<tr>
			<th scope="row" class="left"><span> </span>추가컬럼3</th>
			<td><form:input path="addCol3" maxlength="100" cssClass="w80"/></td>
		</tr>
		<tr>
			<th scope="row" class="left"><span> </span>추가컬럼4</th>
			<td><form:input path="addCol4" maxlength="100" cssClass="w80"/></td>
		</tr>
		<tr>
			<th scope="row" class="left"><span> </span>추가컬럼5</th>
			<td><form:input path="addCol5" maxlength="100" cssClass="w80"/></td>
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
