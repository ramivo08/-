<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<%-- @(#)viewMembInfoUser.jsp 1.0 2014/10/10                                   										  --%>
<%--                                                                       														  --%>
<%-- COPYRIGHT (C) 2014 SUNDOSOFT CO., INC.                                   												  --%>
<%-- ALL RIGHTS RESERVED.                                                 													  --%>
<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<!DOCTYPE HTML>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html lang="ko">
<head>

<%@ include file ="../header.jsp" %>
<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<%-- 내정보보기-기본정보보기 페이지                                             											  --%>
<%--                                                                       													      --%>
<%-- @author NJS                                                            													  --%>
<%-- @version 1.0 2014/10/10                                               													  --%>
<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<%-- Title                                            													  						   	  --%>
<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<%-- style & javascript layout                                              													  --%>
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
<body id="top">
<div class="wrap">

<div class="memberBanner"><!-- ******************************** 메인배너 ****************************** -->

<!-- ==================== top header layout ==================== -->
<app:layout mode="header" />

<!-- ==================== 중앙내용 시작 ==================== -->
<form name="popupForm" id="popupForm" method="post">
    <input type="hidden" name="userId" value='<c:out value="${model.userId }"/>'/>
    <input type="hidden" name="uscmNo" value='<c:out value="${model.uscmNo }"/>'/>
</form>

<form:form commandName="model" id="form1" name="form1">
    <form:hidden path="userId" />
    <form:hidden path="uscmNo" />

    <!-- ********** contents ********** -->
	<div class="col-xs-9">
		<div class="contents login">
			<h3>개인정보 및 비밀번호수정</h3>
			<h4>개인정보 수정</h4>

			<h5 class="position">회원정보<span class="textRed pull-right">* 필수 입력사항</span></h5>
			<div id="_baseArea">
			<!-- Table -->
			<table class="table viewTable">
				<colgroup>
					<col style="width: 160px;">
					<col style="width: *;">
				</colgroup>
				<tbody>
					<tr class="top">
						<th class="leftNoLine"><span class="textRed">*&nbsp;</span>사용자명</th>
						<td class="rightNoLine">
							<c:out value="${model.userNm }"/>
						</td>
					</tr>
					<tr>
						<th class="leftNoLine"><span class="textRed">*&nbsp;</span>사용자 ID</th>
						<td class="rightNoLine">
							<c:out value="${model.userId }"/>
						</td>
					</tr>
					<tr>
						<th class="leftNoLine"><span class="textRed">*&nbsp;</span>비밀번호</th>
						<td class="rightNoLine">
							<span style="font-size:11px; letter-spacing:-1px;">*****</span>
							<a class="btn btn-smGreen" href="#" id="modPwBtn">비밀번호 변경</a>
						</td>
					</tr>
					<tr>
						<th class="leftNoLine"><span class="textRed">*&nbsp;</span>전화번호</th>
						<td class="rightNoLine">
							<table>
								<tr>
									<td>
										<select name="telNo1"  id="telNo1" class="form-control input-sm" title="전화번호1" style="width: 74px;">
							                <c:forEach items="${telFnumCodeList }" var="telType">
							                	<option value="${telType.code }"><c:out value="${telType.codeNm }"/></option>
							                </c:forEach>
										</select>
									</td>
									<td>&nbsp;-&nbsp;</td>
									<td><input type="text" class="form-control input-sm" name="telNo2" id="telNo2" style="width: 90px;" maxlength="4" title="전화번호2"/></td>
					            	<td>&nbsp;-&nbsp;</td>
					            	<td><input type="text" class="form-control input-sm" name="telNo3" id="telNo3" style="width: 90px;" maxlength="4" title="전화번호3"/></td>
					            	<form:hidden path="telNo" />
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<th class="leftNoLine"><span class="textRed">*&nbsp;</span>휴대폰 번호</th>
						<td class="rightNoLine">
							<table>
								<tr>
									<td>
										<select name="cellphoneNo1"  id="cellphoneNo1" class="form-control input-sm" title="휴대폰 번호" style="width: 74px;">
							                 <c:forEach items="${cellFNumCodeList }" var="cellFType">
							                	 <option value="${cellFType.code }"><c:out value="${cellFType.codeNm }"/></option>
							                 </c:forEach>
										</select>
									</td>
									<td>&nbsp;-&nbsp;</td>
									<td><input type="text" class="form-control input-sm" name="cellphoneNo2" id="cellphoneNo2" style="width: 90px;" maxlength="4" title="휴대폰 번호2"/></td>
					            	<td>&nbsp;-&nbsp;</td>
					            	<td><input type="text" class="form-control input-sm" name="cellphoneNo3" id="cellphoneNo3" style="width: 90px;" maxlength="4" title="휴대폰 번호3"/></td>
									<form:hidden path="cellphoneNo" />
								</tr>
							</table>
						</td>
					</tr>
					<tr class="bottom">
						<th class="leftNoLine"><span class="textRed">*&nbsp;</span>E-mail</th>
						<td class="rightNoLine">
							<table><tr>
								<td><input type="text" class="form-control input-sm" name="email1" id="email1" value="" style="width: 175px;" title="담당자 E-mail1"></td>
								<td>&nbsp;@&nbsp;</td>
								<td>
									<input type="text" class="form-control input-sm marginRright10" name="email2" id="email2" style="width: 175px;" title="담당자 E-mail2"/>
									<form:hidden path="email"/>
								</td>
								<td>
									<select name="email3"  id="email3" class="form-control input-sm" style="width: 140px;" title="담당자 E-mail3">
							            <c:forEach items="${emailCdCodeList }" var="emailCd">
						                    <option value="${emailCd.code }"><c:out value="${emailCd.codeNm }"/></option>
						                </c:forEach>
									</select>
								</td>
							</tr></table>

							<h6>ID/비밀번호 찾기에 이용됩니다.</h6>
							"국가 관광자원통합정보시스템 마스터플랜에서 다양한 정보를 제공해 드립니다.<br />
									다양한 정보수신을 원치 않으시는 경우, 회원가입 후 마이페이지 > 개인정보 수정에서 수시로 변경이 가능하오니 이점 참고하시기<br />바랍니다."
						</td>
					</tr>
				</tbody>
			</table><!-- //Table-->
			</div>


			<h5 class="position">추가정보<span class="textRed pull-right">* 필수 입력사항</span></h5>
			<div id="_uscmArea">
			<!-- Table -->
			<table class="table viewTable">
				<colgroup>
					<col style="width: 160px;">
					<col style="width: *;">
				</colgroup>
				<tbody>
					<tr class="top">
						<th class="leftNoLine"><span class="textRed">*&nbsp;</span>사용자 구분</th>
						<td class="rightNoLine">
							<form:select  path="uscmType" id="uscmType" cssClass="form-control input-sm" cssStyle="width: 175px;" title="사용자 구분"  disabled="true">
					            <c:forEach items="${uscmTypeCodeList }" var="uscmType" end="7">
				                	<form:option value="${uscmType.code }"><c:out value="${uscmType.codeNm }"/></form:option>
				                </c:forEach>
							</form:select>
						</td>
					</tr>
					<tr class="_localGoverArea">
						<th class="leftNoLine"><span class="textRed">*&nbsp;</span>지자체</th>
						<td class="rightNoLine">
							<select name="cityauthCd1" id="cityauthCd1" class="form-control input-sm pull-left marginRright10" style="width: 175px;" title="관할관청(시도)" disabled="disabled"></select>
							<select  name="cityauthCd"  id="cityauthCd"  class="form-control input-sm" style="width: 175px;" title="관할관청(시군구)" disabled="disabled"></select>
							<input type="hidden" name="cityauthCdVal" id="cityauthCdVal" value="${model.cityAuthCd }"/>
						</td>
					</tr>
					<tr class="_localGoverArea">
						<th class="leftNoLine"><span class="textRed">*&nbsp;</span>담당업무명</th>
						<td class="rightNoLine">
							<form:input path="uscmRole" id="uscmRole" cssClass="form-control input-sm" maxlength="100" title="기관(업체) 담당업무" cssStyle="width: 400px;"/>
							<span class="textPosition">※ 담당하고 계신 업무명을 적어주시기 바랍니다. (예: 제주올레 걷기코스 개발, 청학동 관광자원개발 등등)</span>
						</td>
					</tr>
					<tr class="_localGoverArea _investorArea">
						<th class="leftNoLine"><span class="textRed">*&nbsp;</span>기관(업체)명</th>
						<td class="rightNoLine">
							<form:input path="uscmNm" id="uscmNm" cssClass="form-control input-sm pull-left marginRright10" maxlength="20" title="기관(업체) 명" cssStyle="width: 175px;"/>
							<span class="textPosition">※ 기관(업체)의 명칭을 적어주시기 바랍니다.</span>
						</td>
					</tr>
					<tr class="bottom _localGoverArea _mcstArea">
						<th class="leftNoLine"><span class="textRed">*&nbsp;</span>부서명</th>
						<td class="rightNoLine">
							<form:select path="deptCd" id="deptCd" cssClass="form-control input-sm pull-left marginRright10" cssStyle="width: 175px;" title="부서명 코드">
					           <c:forEach items="${deptCodeList }" var="deptCode">
				               		<form:option value="${deptCode.code }"><c:out value="${deptCode.codeNm }"/></form:option>
				               </c:forEach>
							</form:select>
							<form:input path="deptNm" id="deptNm" cssClass="form-control input-sm pull-left marginRright10" maxlength="20"  style="width:175px;" title="부서명"  />
							<span class="textPosition">※ 해당하는 부서명이 없을 경우 공란으로 선택 후 부서명을 직접 입력해주시기 바랍니다.</span>
						</td>
					</tr>
					<tr class="_investorArea">
						<th class="leftNoLine">대표자명</th>
						<td class="rightNoLine">
							<input type="text" name="ownerNm" id="ownerNm" class="form-control input-sm" maxlength="10"  title="대표자명" style="width: 175px;"/>
						</td>
					</tr>
					<tr class="bottom _investorArea _default">
						<th class="leftNoLine">주소</th>
						<td class="rightNoLine">
							<input type="text" name="roadPostNo1" id="roadPostNo1" class="form-control input-sm pull-left marginRright10" maxlength="5" style="width:102px;" title="우편번호1" readonly="readonly"/>
							<form:hidden path="roadPostNo" />
							<a class="btn btn-smBlue" href="#" id="postPopBtn"><i class="icon-ic_search"> </i>검색</a>
							<br />
							<div style="clear: left; margin-top: 10px;">
								<input type="text"  name="roadAddress1" id="roadAddress1" class="form-control input-sm pull-left marginRright10" style="width: 410px;" maxlength="100"  title="기본주소(도로명)" readonly="readonly" value='<c:out value="${userInfo.roadAddress1 }"/>'/>
								<form:hidden path="roadAddr1" />
								<form:hidden path="roadAddr2" />
								<form:hidden path="roadAddr3" />
								<form:hidden path="roadAddr4" />
								<span class="textPosition">"읍/면/동" 이상</span>
							</div>
							<br />
							<form:input path="roadAddr5" cssClass="form-control input-sm pull-left marginRright10" cssStyle="width: 410px;" maxlength="100"  title="상세주소(도로명)"/>
							<span class="textPosition">"번지" 이하 / 나머지 주소는 정확히 입력하세요. </span>
						</td>
					</tr>
				</tbody>
			</table><!-- //Table-->
			</div>

			<div class="text-center" style="margin:50px;">
				<a class="btn btn-blue marginRright15" href="#" id="cfrmBtn"><i class="icon-ic_perm_contact_cal"> </i>회원정보 수정</a><a class="btn btn-red" href="#" id="cnclBtn"><i class="icon-ic_refresh"> </i>취소</a>
			</div>

		</div><!-- /contents-->
	</div><!-- /col-xs-9-->
</form:form>

<!-- ==================== 중앙내용 종료 ==================== -->


<!-- ==================== bottom footer layout ==================== -->
<app:layout mode="footer" type="normal"/>

</body>
</html>
