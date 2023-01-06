<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<% pageContext.setAttribute("newLine", "\n"); %>
<html lang="ko">
<head>
	<%@ include file ="../header.jsp" %>

<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<%-- 회원가입 입력폼 						  	                                  									 		  --%>
<%--                                                                        														  --%>
<%-- @author NJS                                                         													  --%>
<%-- @version 1.0 2017-01-17                                               													  --%>
<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
	<app:layout mode="stylescript" type="normal" />

	<!-- 공통부분 스크립트 추가 -->
	<script type="text/javascript" src="/js/memb/commonBaseUscm.js"></script>
	<script type="text/javascript" src="/js/business.js"></script>
<!-- 	<script type="text/javascript" src="/js/memb/business.js"></script> -->
	<script type="text/javascript" src="/js/memb/commonBase.js"></script>
	<script type="text/javascript">

	_ALLOWED_FILE_EXTS = '<c:out value="${map.allowedFileExts}"/>';

	</script>

</head>

<body>

		<!-- header layout -->
	<app:layout mode="header"  type="normal"/>

            <div class="con">
				<div class="joinbox">
				<form:form commandName="model" id="form1" name="form1" method="post" >

				<form:hidden path="termsAgreeYn1" />
			    <form:hidden path="termsAgreeYn2" />
			    <form:hidden path="termsAgreeYn3" />

			    <input type="hidden" name="disChg"  id="disChg"/>
					<div id="_baseArea">
						<table class="table1">
							<caption>기본정보</caption>
							<colgroup>
								<col style="width:130px;">
								<col style="">
							</colgroup>
							<tr>
								<th>사용자 ID <span class="red">*</span></th>
								<td>
									<form:input path="userId" maxlength="15" title="사용자 ID"/>
									<input type="hidden" name="orgUserId" id="orgUserId" value='<c:out value="${model.userId }"/>'/>
									<a class="btn bg_gray2 c_gray userChkDuplBtn" data-name="double" href="#void">중복확인</a>
									<span>(4자리 이상~15자리 이하)</span>
									<input type="hidden" name="userIdDuplChkYn" id="userIdDuplChkYn"/>
								</td>
							</tr>
							<tr>
								<th>비밀번호 <span class="red">*</span></th>
								<td>
									<form:password path="passwd" maxlength="12" title="비밀번호"/>
									<span>(영문, 숫자 혼합 6자리이상~12자리이하)</span>
								</td>
							</tr>
							<tr>
								<th>비밀번호확인 <span class="red">*</span></th>
								<td>
									<form:password path="passwdCfrm" maxlength="12" title="비밀번호 확인"/>

								</td>
							</tr>
							<tr>
								<th>사용자명 <span class="red">*</span></th>
								<td>
									<form:input path="userNm"  type="text" maxlength="15" title="사용자 명"/>
								</td>
							</tr>
							<tr>
								<th>이메일 <span class="red">*</span></th>
								<td>
									<input type="text" name="email1" id="email1" title="E-mail1">
									<span>@</span>
									<input type="text" name="email2" id="email2" title="E-mail2"/>
									<form:hidden path="email"/>

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
							<caption>상세정보</caption>
<!-- 							<caption>추가정보</caption> -->
							<colgroup>
								<col style="width:130px;">
								<col style="">
							</colgroup>
							<tr>
								<th><span class="must_01">사용자 구분 </span> <span class="red">*</span></th>
								<td>
									<select name="userType" id="userType" title="사용자 구분" style="width:200px;">
							            <c:forEach items="${uscmTypeCodeList }" var="userType" end="7">
							                <option value="${userType.code }"><c:out value="${userType.codeNm }"/></option>
							            </c:forEach>
									</select>
								</td>
							</tr>
							<tr class="_rscuCDArea" style="display: none;">
								<th><span class="must_01">야생동물센터 구분</span> <span class="red">*</span></th>
								<td>
									<select name="rscuCd" id="rscuCd" title="야생동물센터 구분" style="width:200px;">
							            <c:forEach items="${orgKindCodeList }" var="orgKind">
							                <option value="${orgKind.code }"><c:out value="${orgKind.codeNm }"/></option>
							            </c:forEach>
									</select>
								</td>
							</tr>
							<tr class="_neirArea" style="display: none;">
								<th><span class="must_01">소속 (과)</span> <span class="red">*</span></th>
								<td><input type="text" name="nierCd" id="nierCd" maxlength="20" title="국립환경과학원 소속 과"></td>
<!-- 								<td><input type="text" name="rscuCd1" id="rscuCd1" maxlength="20" title="국립환경과학원 소속 과"></td> -->
							</tr>
							<tr class="_diagCDArea" style="display: none;">
								<th><span class="must_01">진단기관 구분</span> <span class="red">*</span></th>
								<td>
<!-- 									<select name="rscuCd2" id="rscuCd2" title="진단기관 구분" style="width:250px;"> -->
									<select name="diagCd" id="diagCd" title="진단기관 구분" style="width:250px;">
							            <c:forEach items="${diagKindCodeList }" var="orgKind">
							                <option value="${orgKind.code }"><c:out value="${orgKind.codeNm }"/></option>
							            </c:forEach>
									</select>
								</td>
							</tr>
							<tr>
								<th>기관명 <span class="red">*</span></th>
								<td><input type="text" name="organNm" id="organNm"  maxlength="30" title="기관(업체) 명)" style="width:65%;"></td>
							</tr>
							<tr>
								<th>담당업무 <span class="red">*</span></th>
								<td><input type="text" name="psnBusi" id="psnBusi" maxlength="100" title="기관(업체) 담당업무" style="width:65%;"></td>
							</tr>
							<tr>
								<th>개인연락처 <span class="red">*</span></th>
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
								<th>사무실연락처 <span class="red">*</span></th>
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
								<th>팩스 <span class="red">*</span></th>
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
								<th>주소 <span class="red">*</span></th>
								<td>
									<input type="text"  name="roadPostNo1" id="roadPostNo1" maxlength="5" style="width:102px;" title="우편번호1" readonly="readonly">
									<form:hidden path="roadPostNo" />
									<a class="btn bg_gray2 c_gray" data-name="double" href="#void" id="postPopBtn">주소검색</a>
									<br />
									<div style="clear: left; margin-top: 10px;"></div>
										<input type="text"  name="roadAddress1" id="roadAddress1" maxlength="100"  title="기본주소(도로명)"  style="width:100%;" readonly="readonly"/>
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
					<div class="btnWrap center">
						<a class="btn lg bg_blue" href="#href" id="cnfmBtn">회원가입요청</a>
						<a class="btn lg bg_gray" href="#void" id="cnclBtn">취소하기</a>
					</div>
				</form:form>
				</div>
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