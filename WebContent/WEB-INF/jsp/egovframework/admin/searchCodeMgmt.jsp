<%
 /****************************************************************************************
***	ID				: searchCodeMgmt.jsp
***	Title			: 코드 관리
***	Description		: 코드 관리 화면
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

	<form:form commandName="model" id="model" method="post">
		<form:hidden path="page" />
		<input type="hidden" name="delArr" />
		
		<!-- 검색 -->
		<div class="titWrap">
			<div class="subject">
				<form:select path="searchCond">
					<form:option value="all">전체</form:option>
					<form:option value="sdNm">시도 명</form:option>
					<form:option value="sigNm">시군구 명</form:option>
					
				</form:select>
			</div>
			<div class="textInput"><form:input path="srchCodeNm" /></div>
			<div class="search" id="btnSearch"><a href="javascript:fn_search(1)">조회</a></div>
		</div>
		
		<!-- 리스트 -->
		<div class="list_admin">
		
<!-- 			<div class="btnWrap"> -->
<!-- 				<a href="#void" class="add">추가</a> -->
<!-- 				<a href="#void" class="modify">수정</a> -->
<!-- 				<a href="#void" class="del">삭제</a> -->
<!-- 			</div> -->
			
			<div class="infoWrap">
				<table>
					<colgroup>
					<!-- max width : 1118px; -->
<!-- 						<col style="width:10%">	체크박스 -->
						<col style="width:20%">	<!-- 시군구 코드 -->
						<col style="width:20%">	<!-- 시도명 -->
						<col style="width:30%">	<!-- 시군구 명 -->
						<col style="width:20%">	<!-- 사용 여부   -->
						
					</colgroup>
					<thead>
					
						<tr>
<!-- 							<th><input type="checkbox" name="ckall" id="chk"></th> -->
	<!-- 						<th>구분 코드</th> -->
							<th>시군구 코드</th>
							<th>시도 명</th>
							<th>시군구 명</th>
							<th>사용 여부 </th>
							
						</tr>
					</thead>
					<tbody>
					<c:forEach var="data" items="${pageList}" varStatus="state">
						<tr>
<%-- 							<td><input type="checkbox" name="ck" id="chk" value="${data.sigCd }"> --%>
								
							</td>
	<%-- 						<td><c:out value="${data.codeType}"/></td> --%>
							<td><c:out value="${data.sigCd}"/></td>
							<td><c:out value="${data.sdNm}"/></td>
							<td><c:out value="${data.sigNm}"/></td>							
							<td>
							<c:if test="${data.delYn eq null}">Y</c:if>
							<c:out value="${data.delYn}"/>
							
							</td>
						</tr>
					</c:forEach>
					</tbody>
				</table>
			</div>
		</div>		<!-- // end list_admin -->
		
		<!-- 페이징 -->
		<app:paging name="pageList" jsFunction="fn_search"/>
		<!-- //페이징 -->
		
	</form:form>

<!-- 삭제 -->
<div class="layerPop_del">
	<div>
		<div class="wrap">
			<a href="#void"><img src="../images/common/icon_x.png" alt=""></a>
			<div class="con">
				<p class="tit">선택된 <span id="delNum"></span>개의 코드를 삭제하시겠습니까?</p>
				<ul>
					<li><a href="#void" id="btnDelete">Yes</a></li>
					<li><a href="#void" id="btnCancel">No</a></li>
				</ul>
			</div>
		</div>
	</div>
</div>

<!-- 코드관리 추가 -->
<form name="insert_model" id="insert_model" method="post" enctype="multipart/form-data">
	<div class="layerPop_add">
		<div>
			<div class="wrap">
				<a href="#void"><img src="../images/common/icon_x.png" alt=""></a>
				<div class="con">
					<p class="tit">코드 추가</p>
					<div class="adminPop">
<!-- 						<div class="subject">구분 코드</div> -->
<!-- 						<div class="inputWrap"> -->
<!-- 							<input type="text" name="" value=""> -->
<!-- 						</div> -->
						<div class="subject">시군구 코드</div>
						<div class="inputWrap">
							<input type="text" name="sigCd" value="" maxlength="10">
						</div>						
						<div class="subject">시도 명</div>
						<div class="inputWrap">
							<input type="text" name="sdNm" value="" maxlength="10">
						</div>
						<div class="subject">시군구 명</div>
						<div class="inputWrap">
							<input type="text" name="sigNm" value="" maxlength="10">
						</div>						
						<div class="subject">사용 여부</div>
						<div class="inputWrap radio">
							<input type="radio" name="delYn" value="Y" checked="checked">
							<label for="yesUse">Yes</label>
							<input type="radio" name="delYn" value="N">
							<label for="noUse">No</label>
						</div>
					</div>
					<div class="save" id="btnSave">
						<a href="#void">저장</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</form>


<!-- 코드관리 수정 -->
<form name="update_model" id="update_model" method="post" enctype="multipart/form-data">
	<div class="layerPop_modify">
		<div>
			<div class="wrap">
				<a href="#void"><img src="../images/common/icon_x.png" alt=""></a>
				<div class="con">
					<p class="tit">코드 관리</p>
					<div class="adminPop">
<!-- 						<div class="subject">구분 코드</div> -->
<!-- 						<div class="inputWrap"> -->
<!-- 							<p class="nope">지자체 구분 코드</p> -->
<!-- 						</div> -->
					<div class="subject">시군구 코드</div>
						<div class="inputWrap">
							<input type="hidden" name="sigCd" value="" />
							<p class="nope sigCd"></p>
						</div>						
						<div class="subject">시도 명</div>
						<div class="inputWrap">
							<input type="text" name="sdNm" value="" maxlength="10">
						</div>
						<div class="subject">시군구 명</div>
						<div class="inputWrap">
							<input type="text" name="sigNm" value="" maxlength="10">
						</div>						
						<div class="subject">사용 여부</div>
						<div class="inputWrap radio">
							<input type="radio" name="delYn" value="Y" checked="checked">
							<label for="yesUse">Yes</label>
							<input type="radio" name="delYn" value="N">
							<label for="noUse">No</label>
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
