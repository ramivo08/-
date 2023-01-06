<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
	<%@ include file ="../header.jsp" %>
	
	<app:layout mode="stylescript" type="normal" />


</head>

<body>

<app:layout mode="header" />

<div class = "inner administser">

	<h1>EC 도메인 목록</h1>

	<form:form commandName="model" name="model" id="model" method="post"
			class="form-administer_administer_delivery" onsubmit="return false;">
		<div class="search_box">
				<div class="type1 inputWrap">
					<select id="searchType" name="searchType" title="검색옵션">
						<option value="all">전체</option>
						<option value="name">IMO번호</option>
						<option value="objAdresNo">처리방식</option>
						<option value="organizationId">처리용량</option>
						<option value="contry">국적</option>

						
					</select>
				</div>
				<div class="type2 inputWrap">
					<div>
						
					</div>
					
					<div class="part">
						
						<input id="searchCont" name="searchCont" title="검색어" placeholder="검색어를 입력하세요" type="text" value="" maxlength="20">
						
					</div>

					
				</div>

				<div class="btn inputWrap">

<!-- 					<a href="#void" id="excelAllDown" class="down all" alt="전체 다운로드" title="전체 다운로드">전체 다운로드</a> -->
<!-- 					<a href="#void" id="excelDown" class="down" alt="선택 다운로드" title="선택 다운로드">선택 다운로드</a> -->
					<!-- 					<a href="/oper/allDeliveryCsvDownload.do" class="down" alt="전체 다운로드" title="전체 다운로드">전체 -->
					<a href="javascript:fn_search(1)" class="search" alt="조회" title="조회">조회</a>
						
					
				</div>
				</div>
				
				
				
				<div class="list">
				<table class="basic administer_delivery">
					<colgroup>
						<col style="width: 10%">
						<col style="width: 10%">
						<col style="width: 30%">
						<!-- 배달점명-->
						<col style="width: 10%">
						<col style="width: 10%">
						<col style="width: 30%">
				
						<!-- 사물주소 -->

					</colgroup>
					<thead>
						<tr>
							<th>번호</th>
							<th>항목</th>
							<th>설명</th>
							<th>Type</th>
							<th>예시</th>
							<th>단위</th>
							
						</tr>
					</thead>
					<tbody>
<%-- 						<c:set var="totalSize">${totalSize}</c:set> --%>
<%-- 						<c:set var="pageSize">${pageSize}</c:set> --%>
<%-- 						<c:set var="pageNum">${totalSize-(pageSize*(currSize-1))}</c:set> --%>
<%-- 						<c:forEach var="deliveryMgmtList" items="${deliveryMgmtList}" varStatus="status"> --%>
							
							<tr>
								<td class="checkTd">
									1
								</td>
								<td>CURRENT</td>
								<td class="nameTd">(단일)ECU 정류기 전류값 </td>
								<td>숫자(실수형)</td>
								<td>2.0</td>
								<td>A(소수점 첫째자리까지)</td>								
							</tr>
							<tr>
								<td class="checkTd">
									2
								</td>
								<td>REC1_CURRENT</td>
								<td class="nameTd">ECU 정류기 #1 전류값</td>
								<td>숫자(실수형)</td>
								<td>2.0</td>
								<td>A(소수점 첫째자리까지)</td>								
							</tr>
							<tr>
								<td class="checkTd">
									3
								</td>
								<td>REC2_CURRENT</td>
								<td class="nameTd">ECU 정류기 #2 전류값</td>
								<td>숫자(실수형)</td>
								<td>2.0</td>
								<td>A(소수점 첫째자리까지)</td>								
							</tr>
							<tr>
								<td class="checkTd">
									4
								</td>
								<td>REC3_CURRENT</td>
								<td class="nameTd">ECU 정류기 #3 전류값 </td>
								<td>숫자(실수형)</td>
								<td>2.0</td>
								<td>A(소수점 첫째자리까지)</td>								
							</tr>
							<tr>
								<td class="checkTd">
									5
								</td>
								<td>CURRENT</td>
								<td class="nameTd">(단일)ECU 정류기 전류값 </td>
								<td>숫자(실수형)</td>
								<td>2.0</td>
								<td>A(소수점 첫째자리까지)</td>								
							</tr>
							
<%-- 						</c:forEach> --%>
					</tbody>
				</table>
			</div>
		</form:form>
		<!-- 페이징 -->
<%-- 		<app:paging name="pageList" jsFunction="fn_search" /> --%>
		<!-- //페이징 -->
	</div>
		

</div>
</body>
</html>