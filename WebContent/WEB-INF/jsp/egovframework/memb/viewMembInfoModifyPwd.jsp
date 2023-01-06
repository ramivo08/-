<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<%-- @(#) viewMembInfoModifyPwd.jsp 1.0 2014/10/13                               --%>
<%--                                                                        --%>
<%-- COPYRIGHT (C) 2014 SUNDOSOFT CO., INC.                                     --%>
<%-- ALL RIGHTS RESERVED.                                                   --%>
<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<!DOCTYPE HTML>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html lang="ko">
<head>

<%@ include file ="../header.jsp" %>
<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<%-- 비밀번호 페이지                                                        --%>
<%--                                                                        --%>
<%-- @author NJS                                                            --%>
<%-- @version 1.0 2014/10/13                                                --%>
<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<!-- ==================== style & javascript layout ==================== -->
<app:layout mode="stylescript" type="popup" />


<script type="text/javascript">
    var RETURN_MSG = '<c:out value="${map.returnMessage}"/>';
</script>

</head>
<body id="popUp">
<app:layout mode="headerPopup" title="비밀번호 변경"/>

<!-- ==================== 중앙내용 시작 ==================== -->
<!-- ******************************** 본문 ****************************** -->

<form:form commandName="model"  id="popupForm" name="popupForm" method="post" >
	<form:hidden path="userId"/>
    <form:hidden path="uscmNo"/>

	<div class="popupContents">
		<h5>비밀번호 변경</h5>

			<!-- Table -->
			<table class="table viewTable thCenter tdCenter">
				<colgroup>
					<col style="width: 112px;">
					<col style="width: 112px;">
				</colgroup>
				<tbody>
					<tr class="top">
						<th class="leftNoLine">현재 비밀번호</th>
						<td class="rightNoLine">
							<input type="password" name="curPasswd" id="curPasswd" class="form-control input-sm" style="width:180px;;" title="현재 비밀번호"/>
						</td>
					</tr>
					<tr>
						<th class="leftNoLine">새 비밀번호</th>
						<td class="rightNoLine">
							<input type="password" name="passwd" id="passwd" class="form-control input-sm" style="width:180px; margin:0 4px 0px 0;" title="새 비밀번호"/>
						</td>
					</tr>
					<tr class="bottom">
						<th class="leftNoLine">새 비밀번호 확인</th>
						<td class="rightNoLine">
							<input type="password" name="cfrmPasswd" id="cfrmPasswd" class="form-control input-sm" style="width:180px; margin:0 4px 0px 0;" title="새 비밀번호 확인"/>
						</td>
					</tr>
				</tbody>
			</table><!-- //Table-->

			<div class="text-center" style="margin:50px;">
				<a class="btn btn-blue marginRright15" href="#" id="cfrmBtn"><i class="icon-ic_create"> </i>확인</a><a class="btn btn-red" href="#" id="cnclBtn"><i class="icon-ic_format_list_bulleted"> </i>취소</a>
			</div>

	</div><!-- /popupContents-->
</form:form>

</body>
</html>
