<%
 /****************************************************************************************
***	ID				: searchRoleMgmt.jsp
***	Title			: 롤(권한) 관리
***	Description		: 롤(권한) 관리 화면
***
***	-----------------------------    Modified Log   --------------------------------------
***	ver				date					author					description
***  -----------------------------------------------------------------------------------------
***	1.0			2019-10-30					NJS					First Coding.
*****************************************************************************************/
%>

<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html lang="ko">
<head>
<%@ include file ="../header.jsp" %>
<app:layout mode="stylescript" type="normal" />
</head>

<body>

<app:layout mode="header" />

<!-- ======================= 중앙내용 시작 ====================== -->
<form:form commandName="model" method="post" >
<form:hidden path="roleId"/>

	<!-- 검색 -->
	<!-- <div class="titWrap">
		<p class="subject">권한명</p>
		<div class="textInput"><input type="text" name="" value=""></div>
		<div class="search"><a href="javascript:fn_search(1)">조회</a></div>
	</div> -->
	
	
	<!-- 리스트 -->
	<div class="rightCube">
	
		<div class="rightWrap">
			<div class="list_right">
				<p class="itemTitle">권한 목록</p>
				<div class="listTitle">
					<p>권한명</p>
					<p>권한 코드</p>
				</div>
				<ul class="authority" style="overflow:auto;">
				
				<c:forEach var="data" items="${list}" varStatus="state">
					<c:if test="${data.roleId ne 'ROLE_RESTRICTED'}">
						<li>
							<input type="checkbox" name="roleArr" id="authority${state.index }" value="${data.roleId }" onclick="javascript:fn_Check_Authority(this);">
							<label for="authority${state.index }" >
								<span style="cursor:pointer"><c:out value="${data.roleNm}" /></span>
								<span><c:out value="${data.roleId }" /></span>
							</label>
						</li>
					</c:if>
				</c:forEach>
				
				</ul>
			</div>
		</div>
		<div class="rightWrap">
			<div class="list_right">
				<p class="itemTitle">메뉴 목록</p>
				<div class="listTitle">
					<p>메뉴 한글명</p>
				</div>
				<ul class="menu" style="overflow:auto;">
					<%@ include file ="../admin/searchRoleMenuMgmt.jsp" %>
				</ul>
			</div>
		</div>
		<!-- <div class="rightWrap">
			<div class="list_right">
				<p class="itemTitle">기능 목록</p>
				<div class="listTitle">
					<p>기능</p>
				</div>
				<ul class="function" style="overflow:auto;">
					<li>
						<input type="checkbox" name="" id="modify">
						<label for="modify">
							<span>수정</span>
						</label>
					</li>
					<li>
						<input type="checkbox" name="" id="del">
						<label for="del">
							<span>삭제</span>
						</label>
					</li>
					<li>
						<input type="checkbox" name="" id="add">
						<label for="add">
							<span>추가</span>
						</label>
					</li>
				</ul>
			</div>
		</div> -->
		
	</div>
	
	
	

<!-- 	<div class="con_nosearch community" style="margin:0px 0;"> -->
<!-- 		<div class="top_btn"> -->
<!-- 			<span id="openRegiBtn"><a class="btn bg_blue i_apply" href="#void"><span>신규등록</span></a></span> -->
<!-- 		</div> -->

<!-- 		<ul style="margin:50px 0 0px 0px;"> -->
<!-- 	    	<li>#. 삭제 기능은 시스템 전체부분에 대해서 위험 할 수 있으니 시스템관리자가 DB에서 조치 하시기 바랍니다.</li> -->
<!-- 		</ul> -->

<!-- 		<table style="margin:0px 0 0px 0px;"> -->
<!-- 		<caption class="caption_none">롤 목록</caption> -->
<!-- 			<colgroup> -->
<!-- 				<col style="width:50px"> -->
<!-- 				<col style="width:200px"> -->
<!-- 				<col style=""> -->
<!-- 			</colgroup> -->
<!-- 			<thead> -->
<!-- 				<tr> -->
<!-- 					<th scope="col">삭제</th> -->
<!-- 					<th scope="col">롤ID</th> -->
<!-- 					<th scope="col">롤명</th> -->
<!-- 				</tr> -->
<!-- 			</thead> -->
<!-- 			<tbody> -->
<%-- 			<c:forEach var="data" items="${list}" varStatus="state"> --%>
<!-- 				<tr> -->
<!-- 					<td><input name="arrRoleId" type="checkbox" value="${data.roleId}" title="<c:out value="${data.roleId}"/> 권한선택"/></td> -->
<%-- 					<td class="left"><a href="#none" onclick="goOpenRegi('${data.roleId}');"><c:out value="${data.roleId}"/></a></td> --%>
<%-- 					<td class="left"><c:out value="${fn:replace(data.treeRoleNm, '@', '&nbsp;')}" escapeXml="false"/></td> --%>
<!-- 				</tr> -->
<%-- 			</c:forEach> --%>
<!-- 			</tbody> -->
<!-- 		</table> -->
<!-- 	</div> -->

</form:form>
<!-- ======================= 중앙내용 종료 ====================== -->

<app:layout mode="footer" type="normal"/>

</body>
</html>
