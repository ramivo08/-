<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<% pageContext.setAttribute("newLine", "\n"); %>
<html lang="ko">
<head>
	<%@ include file ="../header.jsp" %>

<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<%-- 야생동물 사용자 관리 리스트					  	                                  									  --%>
<%--                                                                        														  --%>
<%-- @author NJS                                                         													  --%>
<%-- @version 1.0 2017-03-20                                              													  --%>
<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
	<app:layout mode="stylescript" type="normal" />
</head>

<body>

		<!-- header layout -->
	<app:layout mode="header"  type="normal"/>

            <div class="con">
				<!-- 구분,검색조건 -->
				<form:form commandName="model" name="model" id="model">

					<input type="hidden" name="page" id="page"  value='<c:out value="${paramMap.page }"/>'/>
					<input type="hidden" name="mode" id="mode"/>
					<input type="hidden" name="userId" id="userId"/>
				<div class="searchbox">
					<div class="box1">
						<a href="#" id="testFunction">test</a>
						<a href="#" id="testDiedFunction">testDied</a>
						<p><span style="width:90px;">사용자구분</span>
							<form:select path="srchUserType" cssClass="w25" title="사용자구분" >
									<option value="">::전체::</option>
			               		<c:forEach items="${srchUserTypeCodeList }" var="item" varStatus="idx">
									<form:option value="${item.code }" label="${item.codeNm }">${item.codeNm }</form:option>
								</c:forEach>
							</form:select>
						<p><span style="margin-left:30px; width:50px;">가입일</span>
							<ul>
								<li>
									<form:input cssClass="jcalendar-1 cal" path="toJoinDate" title="가입일"/>
									<span>-</span>
									<form:input cssClass="jcalendar-2 cal" path="fromJoinDate" title="가입일"/>
								</li>
							</ul>
					</div>
					<div class="box2">
						<p><span style="width:90px;">검색조건</span></p>
								<form:select path="srchCondItem" cssClass="w20" title="검색조건" >
										<option value="">::전체::</option>
				               		<c:forEach items="${srchCondItemCodeList }" var="item" varStatus="idx">
										<form:option value="${item.code }" label="${item.codeNm }">${item.codeNm }</form:option>
									</c:forEach>
								</form:select>
							<form:input id="srchKeyWord" path="srchKeyWord" placeholder="검색어를 입력하세요." cssStyle="width:380px;" title="검색어"/>
							<a class="btn i_search bg_sky" href="#void" id="prcBtnSrch"><span>조회</span></a>
					</div>
				</div><!-- //구분,검색조건 -->
				</form:form>

				<!-- 테이블 영역 -->
				<div class="requestbox">
					<div class="tablebox">
						<table>
							<colgroup>
								<col style="width:12%;"> <!-- 사용자명 -->
								<col style="width:12%;"> <!-- 아이디 -->
								<col style="width:15%;"> <!-- 기관명 -->
								<col style="width:15%;"> <!-- 담당업무 -->
								<col style="width:12%;"> <!-- 가입일 -->
								<col style="width:10%;"> <!-- 사용자 구분 -->
								<col style="width:10%;"> <!-- 사용자 구분 -->
								<col style="width:10%;">
							</colgroup>
							<tr>
								<th>사용자명</th>
								<th>아이디</th>
								<th>기관명</th>
								<th>담당업무</th>
								<th>가입일</th>
								<th>가입상태</th>
								<th>사용자 구분</th>
								<th>상세</th>
							</tr>
							<c:if test="${empty admnUserList }">
									<tr>
										<td colspan="9">입력된 내용이 없습니다.</td>
									</tr>
							</c:if>
							<c:if test="${not empty admnUserList }">
								<c:forEach items="${admnUserList }" var="item" varStatus="idx">
									<tr>
										<td><c:out value="${item.userNm }"/></td>
										<td><c:out value="${item.userId }"/></td>
										<td><c:out value="${item.organNm }"/></td>
										<td><c:out value="${item.psnBusi }"/></td>
										<td><c:out value="${item.joinDate }"/></td>
										<td><c:out value="${item.useStatNm }"/></td>
										<td><c:out value="${item.userTypeNm }"/></td>
										<td><a class="btn sm bg_gray2 c_gray" href="#void" onclick="doView('<c:out value="${item.userId}"/>');">확인</a></td>
									</tr>
								</c:forEach>
							</c:if>
						</table>
					</div>
				</div><!-- //테이블 영역 -->

				<!-- 페이징 -->
				<app:paging name="pageList" jsFunction="fn_search" />
				<!-- //페이징 -->

            </div><!-- //con -->

	<app:layout mode="stylescript" type="footer"/>

</body>
</html>