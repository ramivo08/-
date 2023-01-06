<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<% pageContext.setAttribute("newLine", "\n"); %>
<html lang="ko">
<head>
	<%@ include file ="../header.jsp" %>

<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<%-- 야생동물 사용자 수정 화면	 						  	                                  								  --%>
<%--                                                                        														  --%>
<%-- @author NJS                                                         													  --%>
<%-- @version 1.0 2017-03-20                                               													  --%>
<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
	<app:layout mode="stylescript" type="normal" />

	<!-- 공통부분 스크립트 추가 -->
	<script type="text/javascript" src="/js/memb/commonBaseUscm.js"></script>
	<script type="text/javascript" src="/js/memb/business.js"></script>
	<script type="text/javascript" src="/js/memb/commonBase.js"></script>
	<!-- 우편번호 검색을 위한 스크립트 추가 -->
	<script src="//dmaps.daum.net/map_js_init/postcode.js"></script>

	<script type="text/javascript">
    	var RETURN_MSG = '<c:out value="${map.returnMessage}"/>';
	</script>

</head>

<body>

		<!-- header layout -->
	<app:layout mode="header"  type="normal"/>

	<form name="popupForm" id="popupForm" method="post">
    	<input type="hidden" name="userId" value='<c:out value="${model.userId }"/>'/>
	</form>

            <div class="con">
            <form:form commandName="model" id="form1" name="form1">
			    <form:hidden path="userId" />
			    <form:hidden path="roleId" />
<%-- 			    <input type="text" name="roleId" id="roleId" value="${userInfo.roleId }" /> --%>
<%-- 			    <form:hidden path="userId" /> --%>
			    <input type="hidden" name="mode" id="mode" value='<c:out value="${paramMap.mode }"/>'/>
				<div class="joinbox">
					<div id="_baseArea">
						<table class="table1">
							<caption>기본정보</caption>
							<colgroup>
								<col style="width:130px;">
								<col style="">
							</colgroup>
							<tr>
								<th>사용자 ID *</th>
								<td>
									<c:out value="${model.userId }"/>
								</td>
							</tr>
							<tr>
								<th>사용자명 *</th>
								<td>
									<c:out value="${model.userNm }"/>
								</td>
							</tr>
							<tr>
								<th>비밀번호 *</th>
								<td>
									<span style="font-size:11px; letter-spacing:-1px;">*****
									</span> <a href="#void" class="btn bg_sky i_modify" data-name="address" id=resetPwdBtn><span>비밀번호 초기화</span></a>
								</td>
							</tr>
							<tr>
								<th>이메일 *</th>
								<td>
									<input type="text" name="email1" id="email1" title="E-mail1">
									<input type="text" name="email2" id="email2" title="E-mail2"/>
									<form:hidden path="email"/>
									<span>@</span>

									<select name="email3"  id="email3"  style="width:150px;" title="E-mail3">
							            <c:forEach items="${emailCdCodeList }" var="emailCd">
						                    <option value="${emailCd.code }"><c:out value="${emailCd.codeNm }"/></option>
						                </c:forEach>
									</select>
								</td>
							</tr>
						</table>
					</div>
					<div class="h40"></div>
					<div id="_etcArea">
						<table class="table1">
							<caption>추가정보</caption>
							<colgroup>
								<col style="width:130px;">
								<col style="">
							</colgroup>
							<tr>
								<th><span class="must_01">사용자 구분</span></th>
								<td>
									<form:select path="userType" id="userType" title="사용자 구분" cssStyle="width:200px;">
							            <c:forEach items="${uscmTypeCodeList }" var="userType" end="7">
							                <form:option value="${userType.code }"><c:out value="${userType.codeNm }"/></form:option>
							            </c:forEach>
									</form:select>
								</td>
							</tr>
							<tr class="_rscuCDArea" style="display: none;">
								<th><span class="must_01">야생동물센터 구분</span></th>
								<td>
									<form:select path="rscuCd" id="rscuCd" title="야생동물센터 구분" cssStyle="width:200px;">
							            <c:forEach items="${orgKindCodeList }" var="orgKind">
							                <form:option value="${orgKind.code }"><c:out value="${orgKind.codeNm }"/></form:option>
							            </c:forEach>
									</form:select>
								</td>
							</tr>
							<tr class="_neirArea" style="display: none;">
								<th><span class="must_01">소속 (과)</span> <span class="red">*</span></th>
								<td><input type="text" name="rscuCd1" id="rscuCd1" maxlength="20" title="국립환경과학원 소속 과"></td>
							</tr>
							<tr class="_diagCDArea" style="display: none;">
								<th><span class="must_01">진단기관 구분</span> <span class="red">*</span></th>
								<td>
									<select name="rscuCd2" id="rscuCd2" title="진단기관 구분" style="width:250px;">
							            <c:forEach items="${diagKindCodeList }" var="orgKind">
							                <option value="${orgKind.code }"><c:out value="${orgKind.codeNm }"/></option>
							            </c:forEach>
									</select>
								</td>
							</tr>
							<tr>
								<th>기관명</th>
								<td><form:input path="organNm" maxlength="20" title="기관(업체) 명)" style="width:65%;"/></td>
							</tr>
							<tr>
								<th>담당업무</th>
								<td><form:input path="psnBusi" maxlength="100" title="기관(업체) 담당업무)" style="width:65%;"/></td>
							</tr>
							<tr>
								<th>개인연락처</th>
								<td>
									<select name="telNo1"  id="telNo1" title="개인연락처1"  style="width:100px;">
						                <c:forEach items="${cellFNumCodeList }" var="cellFType">
						                	<option value="${cellFType.code }" label="${cellFType.codeNm }"><c:out value="${cellFType.codeNm }"/></option>
						                </c:forEach>
									</select> -
									<input class="number_input" type="text" name="telNo2" id="telNo2"  maxlength="4" title="개인연락처2"> -
									<input class="number_input" type="text" name="telNo3" id="telNo3"  maxlength="4" title="개인연락처3">
									<form:hidden path="telNo" />
								</td>
							</tr>
							<tr>
								<th>사무실연락처</th>
								<td>
									<select name="offTelNo1"  id="offTelNo1"  title="사무실연락처1"  style="width:100px;">
						                 <c:forEach items="${telFnumCodeList }" var="telType">
						                	 <option value="${telType.code }" label="${telType.codeNm }"><c:out value="${telType.codeNm }"/></option>
						                 </c:forEach>
									</select> -
									<input class="number_input" type="text" name="offTelNo2" id="offTelNo2"  maxlength="4" title="사무실연락처2"> -
									<input class="number_input" type="text" name="offTelNo3" id="offTelNo3"  maxlength="4" title="사무실연락처3">
									<form:hidden path="offTelNo" />
								</td>
							</tr>
							<tr>
								<th>팩스</th>
								<td>
									<select name="faxNo1"  id="faxNo1" title="FAX 번호1"  style="width:100px;">
						                 <c:forEach items="${telFnumCodeList }" var="telType">
						                	 <option value="${telType.code }"><c:out value="${telType.codeNm }"/></option>
						                 </c:forEach>
									</select> -
									<input class="number_input" type="text" name="faxNo2" id="faxNo2" maxlength="4" title="FAX 번호2"> -
									<input class="number_input" type="text" name="faxNo3" id="faxNo3" maxlength="4" title="FAX 번호3">
									<form:hidden path="faxNo" />
								</td>
							</tr>
							<tr>
								<th>주소</th>
								<td>
									<input type="text"  name="roadPostNo1" id="roadPostNo1" maxlength="5" style="width:102px;" title="우편번호1" readonly="readonly">
									<form:hidden path="roadPostNo" />
									<a class="btn bg_gray2 c_gray" data-name="double" href="#void" id="postPopBtn">주소검색</a>
									<br />
									<div style="clear: left; margin-top: 10px;"></div>
										<input type="text"  name="roadAddress1" id="roadAddress1" maxlength="100"  title="기본주소(도로명)"  style="width:100%;" readonly="readonly"  value='<c:out value="${userInfo.roadAddress1 }"/>'/>
										<form:hidden path="roadAddr1" />
										<form:hidden path="roadAddr2" />
										<form:hidden path="roadAddr3" />
										<form:hidden path="roadAddr4" />
										<span>"읍/면/동" 이상</span>
									<br />
									<form:input path="roadAddr5" style="width:100%;" maxlength="100"  title="상세주소(도로명)"/>
									<span>"번지" 이하 / 나머지 주소는 정확히 입력하세요. </span>
								</td>
							</tr>
						</table>
					</div>
					<div class="h30"></div>
					<div class="btnWrap right">
						<a class="btn bg bg_blue" href="#href" id="cfrmBtn"  title="수정버튼">개인정보수정</a>
						<c:if test="${model.useStat ne '90' }">
							<a href="#void" class="btn bg_pink i_apply" id="apprBtn"><span>가입승인</span></a>
						</c:if>
						<a class="btn bg bg_gray" href="#href" id="cnclBtn"  title="취소버튼">이전</a>
					</div>
				</div>
			</form:form>
            </div><!-- //con -->

<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<%-- bottom footer layout                                                  													  --%>
<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
	<app:layout mode="footer" type="normal"/>

	<!-- gotop -->
	<a id="gotop" href="#void" title="Top"></a>

<!-- ie8 이하 안내 메시지 -->
<!--#include virtual="/ver3/include/ie8.asp"-->

</body>
</html>