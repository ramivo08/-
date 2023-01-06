<%
 /****************************************************************************************
***	ID				: searchMenuMgmt.jsp
***	Title			: 메뉴 관리
***	Description		: 메뉴 관리 리스트 화면
***
***	-----------------------------    Modified Log   --------------------------------------
***	ver				date					author					description
***  -----------------------------------------------------------------------------------------
***	1.0			2019-10-28					NJS					First Coding.
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

	<!-- 타이틀-조회 -->
	<form:form commandName="model" id="model" method="post">
		<form:hidden path="page" />
		<div class="titWrap">
			<p class="subject">메뉴 한글명</p>
			<div class="textInput"><form:input path="srchMenuNm" /></div>
			<div class="search" id="btnSearch"><a href="javascript:fn_search(1)">조회</a></div>
		</div>
		
	<!-- 리스트 -->
	<div class="list_admin">
	
		<div class="btnWrap">
			<a href="#void" class="modify">수정</a>
			<a href="#void" class="del">삭제</a>
		</div>
		
		<div class="infoWrap">
			<table>
				<colgroup>
					<!-- max width : 1118px; -->
					<col style="width:112px">
					<col style="width:242px">	<!-- 메뉴 ID -->
					<col style="width:242px">	<!-- 메뉴 한글명 -->
					<col style="width:242px">	<!-- 메뉴 순서 -->
					<col style="width:140px">	<!-- 팝업 여부 -->
					<col style="width:140px">	<!-- 사용 여부 -->
				</colgroup>
				<thead>
					<tr>
						<th><input type="checkbox" name="ckall" id="chk"></th>
						<th>메뉴 ID</th>
						<th>메뉴 한글명</th>
						<th>메뉴 순서</th>
						<th>팝업 여부</th>
						<th>사용 여부</th>
					</tr>
				</thead>
				<tbody>
				<c:forEach var="data" items="${menuList }" varStatus="state">
					<tr>
						<td><input type="checkbox" name="ck" id="ck" value="${data.menuId}"></td>
						<td <c:if test="${data.menuOdr eq '0'}">class= "mnfirst"</c:if>>
						
							<c:out value="${data.menuId}"/>
						</td>
						<td <c:if test="${data.menuOdr eq '0'}">class= "mnfirst"</c:if>>						
<%-- 							<a href="#none" onclick="goOpenRegi('${data.menuId}');"> --%>
								
								<c:out value="${fn:replace(data.treeMenuNm, '@', '&nbsp;')}" escapeXml="false"/>
						</td>
						<td <c:if test="${data.menuOdr eq '0'}">class= "mnfirst"</c:if>>
							<c:out value="${data.menuOdr}"/>
						</td>
						<td <c:if test="${data.menuOdr eq '0'}">class= "mnfirst"</c:if>>
							<c:out value="${data.popupYn}"/>
						</td>
						<td <c:if test="${data.menuOdr eq '0'}">class= "mnfirst"</c:if>>
							<c:if test="${data.useYn eq 'N'}">
								<span style="font-weight:bold; color:red"><c:out value="${data.useYn}"/></span>
							</c:if>
							<c:if test="${data.useYn ne 'N'}">
								<c:out value="${data.useYn}"/>
							</c:if>
						</td>
					</tr>
				</c:forEach>
				</tbody>
			</table>
		</div>
		
		<!-- 페이징 -->
<%-- 		<app:paging name="pageList" jsFunction="fn_search"/> --%>
		<!-- //페이징 -->
		
	</div>		<!-- // end list_admin -->
	
	</form:form>

<!-- 삭제 -->
<div class="layerPop_del">
	<div>
		<div class="wrap">
			<a href="#void"><img src="../images/common/icon_x.png" alt=""></a>
			<div class="con">
				<p class="tit">선택된 <span id="delNum"></span>개의 메뉴를 삭제하시겠습니까?<br>삭제하면 하위 메뉴 모두 삭제됩니다.</p>
				<ul>
					<li><a href="#void" id="btnDelete">Yes</a></li>
					<li><a href="#void" id="btnCancel">No</a></li>
				</ul>
			</div>
		</div>
	</div>
</div>

<!-- 메뉴관리 수정 -->
<form name="pop_model" id="pop_model" method="post" enctype="multipart/form-data">
	<input type="hidden" name="menuLvl" id="menuLvl" value="" />
<!-- 	<input type="text" name="menuId" value="" /> -->
	<div class="layerPop_modify">
		<div>
			<div class="wrap">
				<a href="#void"><img src="../images/common/icon_x.png" alt=""></a>
				<div class="con">
					<p class="tit">메뉴 관리</p>
					<div class="adminPop">
						<div class="subject">메뉴 ID</div>
						<div class="inputWrap">
							<input type="hidden" name="menuId" value="">
							<p class="nope menuId"></p>
						</div>
						<div class="subject">메뉴 한글명</div>
						<div class="inputWrap">
							<input type="text" name="menuNm" value="">
						</div>
						<div class="subject">메뉴 영문명</div>
						<div class="inputWrap">
							<p class="nope menuEngNm"></p>
	<!-- 						<input type="text" name="menuEngNm" value=""> -->
						</div>
						<div class="subject">메뉴 순서</div>
						<div class="inputWrap">
							<input type="number" name="menuOdr" value="">
						</div>
						<div class="subject">팝업 여부</div>
						<div class="inputWrap radio">
							<input type="radio" name="popupYn" value="Y" >
							<label>yes</label>
							<input type="radio" name="popupYn" value="N" >
							<label>no</label>
						</div>
						<div class="subject">사용 여부</div>
						<div class="inputWrap radio">
							<input type="radio" name="useYn" value="Y"> 
							<label>yes</label>
							<input type="radio" name="useYn" value="N">
							<label>no</label>
						</div>
						<div class="subject">부모 메뉴</div>
						<div class="inputWrap">
							<select name="parentMenuId">
								<option value="NONE">최상위 메뉴</option>
							<c:forEach items="${menuComboList }" var="item" varStatus="status">
								<option value="${item.comboValue }">${item.comboText }</option>
							</c:forEach>
							</select>
						</div>
					</div>
					<div class="save" id="btnUpdate">
						<a href="#void">저장</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</form>

<!-- ======================= 중앙내용 종료 ====================== -->

<app:layout mode="footer" type="normal"/>

</body>
</html>
