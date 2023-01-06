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
						<col style="width: 20%">
						<!-- 배달점명-->
						<col style="width: 10%">
						<col style="width: 10%">
						<col style="width: 10%">
						<col style="width: 30%">
						<!-- 사물주소 -->

					</colgroup>
					<thead>
						<tr>
							<th>번호</th>
							<th>IMO 번호</th>
							<th>선박명</th>
							<th>국적</th>
							<th>처리방식</th>
							<th>처리용량(t)</th>
							<th>등록일자</th>
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
								<td>9751042</td>
								<td class="nameTd"><a href="javascript:selectDelivery('${deliveryMgmtList.objAdresNo}');">이사부(ISABU)</a></td>
								<td>KOR</td>
								<td>UV</td>
								<td>3000t</td>
								<td>2020-05-20</td>
							</tr>
							<tr>
								<td class="checkTd">
									2
								</td>
								<td>9751043</td>
								<td class="nameTd"><a href="javascript:selectDelivery('${deliveryMgmtList.objAdresNo}');">온누리(ONNURI)</a></td>
								<td>KOR</td>
								<td>UV</td>
								<td>2000t</td>
								<td>2020-05-20</td>
							</tr>
							<tr>
								<td class="checkTd">
									3
								</td>
								<td>9751044</td>
								<td class="nameTd"><a href="javascript:selectDelivery('${deliveryMgmtList.objAdresNo}');">이어도(EARDO)</a></td>
								<td>KOR</td>
								<td>UV</td>
								<td>1500t</td>
								<td>2020-05-20</td>
							</tr>
							<tr>
								<td class="checkTd">
									4
								</td>
								<td>9751045</td>
								<td class="nameTd"><a href="javascript:selectDelivery('${deliveryMgmtList.objAdresNo}');">장목1호(JM-1)</a></td>
								<td>KOR</td>
								<td>UV</td>
								<td>500t</td>
								<td>2020-05-20</td>
							</tr>
							<tr>
								<td class="checkTd">
									5
								</td>
								<td>9751046</td>
								<td class="nameTd"><a href="javascript:selectDelivery('${deliveryMgmtList.objAdresNo}');">장목2호(JM-2)</a></td>
								<td>KOR</td>
								<td>UV</td>
								<td>500t</td>
								<td>2020-05-20</td>
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