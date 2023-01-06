
<%
	/****************************************************************************************
	***	ID				: searchAdmnUserMgmt.jsp
	***	Title			: FAQ 관리
	***	Description		: FAQ 관리 화면
	***
	***	-----------------------------    Modified Log   --------------------------------------
	***	ver				date					author					description
	***  -----------------------------------------------------------------------------------------
	***	1.0			2019-10-31					NJS					First Coding.
	*****************************************************************************************/
%>

<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html lang="ko">
<head>
<%@ include file="../header.jsp"%>

<app:layout mode="stylescript" type="normal" />

<style>
/* #btnDelete a{
		border-radius: 5px;
		display: inline-block;
	    padding: 0 20px 0 35px;
	    height: 40px;
	    line-height: 40px;
	    font-size: 15px;
	    background: red url(../images/common/i_del.png)no-repeat 25px center;
	    color: #fff;
	} */
#btnDelete a {
	/* display: inline-block;
	    padding: 0 20px 0 35px;
	    height: 40px;
	    line-height: 40px;
	    font-size: 15px;
	    background: red url(../images/common/i_del.png)no-repeat 25px center;
	    color: #fff; */
	display: inline-block;
	padding: 0 20px 0 35px;
	height: 40px;
	line-height: 40px;
	color: #fff;
	font-size: 15px;
	width: initial;
}

.itemTitle {
	font-size: 18px;
	text-align: center;
	padding-bottom: 30px;
	color: #1f2732;
	font-weight: bold;
}
</style>

</head>

<body>

	<app:layout mode="header" />

	<form:form commandName="model" id="model" method="post">
		<form:hidden path="page" />
		<div class="titWrap">
			<div class="subject">
				<form:select path="searchCond">
					<form:option value="subject">아이디</form:option>
					<form:option value="role">권한</form:option>

				</form:select>
			</div>
			<div class="textInput">
				<form:input path="searchWord" />
			</div>
			<div class="search" id="btnSearch">
				<a href="#void">조회</a>
			</div>
		</div>

		<!-- 리스트 -->
		<div class="list_faq">
			<p class="itemTitle">BWMS 시스템 사용자</p>
			<div class="btnWrap">

				<a href="#void" class="add">추가</a>

			</div>
			<ul class="infoWrap">
				<li>
					<ul>
						<li>번호</li>
						<li>아이디</li>
						<li>권한</li>
						<li>등록 일자</li>
						<li>권한 수정 일자</li>
						<li>삭제</li>
					</ul>
				</li>
				<c:forEach items="${pageList }" var="item" varStatus="status">
					<li>
						<ul>
							<li>${item.rNum }</li>
							<li>${item.userId }</li>
							<li><select id="${item.userId}roleOption" name="roleOption"
								style="width: 60%;"
								onchange='javascript:fn_Role_Selected("${item.roleId}", "${item.userId}");'>
									<option value="ROLE_AUTH_SYS"
										<c:if test="${item.roleId eq 'ROLE_AUTH_SYS' }">selected</c:if>>관리자(00)</option>
									
<!-- 									<option value="ROLE_KLID" -->
<%-- 										<c:if test="${item.roleId eq 'ROLE_KLID' }">selected</c:if>>한국지역정보개발원 --%>
<!-- 										담당자</option> -->
									<option value="ROLE_RELT_ORG"
										<c:if test="${item.roleId eq 'ROLE_RELT_ORG' }">selected</c:if>>유관기관
										(01,02,03)</option>
									<option value="ROLE_MOIS"
										<c:if test="${item.roleId eq 'ROLE_MOIS' }">selected</c:if>>행정(04)
										</option>
									<option value="ROLE_USER"
										<c:if test="${item.roleId eq 'ROLE_USER' }">selected</c:if>>일반
										사용자(05)</option>
							</select></li>
							<li>${item.resDe }</li>
							<li>${item.updDe }</li>
							<li><div class="btnWrap" id="btnDelete"
									onclick='javascript:fn_Delete_User("sysUser", "${item.userId}");'>
									<a href="#" class="del">삭제</a>
								</div></li>
						</ul>
					</li>
				</c:forEach>

			</ul>
			<app:paging name="pageList" jsFunction="fn_search" />
		</div>
		<!-- //end list_faq -->

		<!-- 리스트 -->
		<div class="list_faq" style="margin-top: 10px;">
			<p class="itemTitle">관리자</p>
			<div class="btnWrap">

				<a href="#void" class="addAdmn">추가</a> 


			</div>
			<ul class="infoWrap">
				<li>
					<ul>
						<li>번호</li>
						<li>아이디</li>
						<li>등록 일자</li>
						<li style="width: 10%;">수정/삭제</li>
					</ul>
				</li>
				<c:forEach items="${pageList2 }" var="item2" varStatus="status">
					<li>
						<ul>


							<li>${item2.rNum }</li>


							<li>${item2.userId }</li>
							<li>${item2.resDe }</li>
							<li style="width: 10%;">
							<div class="btnWrap" id="btnDelete" >
								<a href="javascript:modifyadmn('${item2.userId}')"	class="modifyAdmn">수정</a>
								<a href='javascript:fn_Delete_User("admnUser", "${item2.userId}");' class="del">삭제</a>
								
							</div>
							</li>
						</ul>
					</li>
				</c:forEach>

			</ul>
			<app:paging name="pageList2" jsFunction="fn_search" />
		</div>
		<!-- //end list_faq -->

		<!-- 페이징 -->
		<%-- <app:paging name="pageList" jsFunction="fn_search"/> --%>
		<!-- //페이징 -->

	</form:form>

	<!-- 삭제 -->
	<div class="layerPop_del">
		<div>
			<div class="wrap">
				<a href="#void"><img src="../images/common/icon_x.png" alt=""></a>
				<div class="con">
					<p class="tit">
						선택된 <span id="delNum"></span>개의 해당 FAQ를 삭제하시겠습니까?
					</p>
					<ul>
						<li><a href="#void" id="btnDelete">Yes</a></li>
						<li><a href="#void" id="btnCancel">No</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<!-- FAQ 추가 -->
	<!-- <form name="insert_model" id="insert_model" method="post" enctype="multipart/form-data"> -->
	<!-- 	<div class="layerPop_add"> -->
	<!-- 		<div> -->
	<!-- 			<div class="wrap"> -->
	<!-- 				<a href="#void"><img src="../images/common/icon_x.png" alt=""></a> -->
	<!-- 				<div class="con"> -->
	<!-- 					<p class="tit">FAQ 작성</p> -->
	<!-- 					<div class="adminPop"> -->
	<!-- 						<div class="subject">FAQ 제목</div> -->
	<!-- 						<div class="inputWrap"> -->
	<!-- 							<input type="text" name="bbsSubject" placeholder="자주묻는 질문 제목"> -->
	<!-- 						</div> -->
	<!-- 						<div class="subject">FAQ 답변</div> -->
	<!-- 						<div class="inputWrap"> -->
	<!-- 							<textarea name="bbsCont"></textarea> -->
	<!-- 						</div> -->
	<!-- 					</div> -->
	<!-- 					<div class="save"> -->
	<!-- 						<a href="#void" id="btnSave">저장</a> -->
	<!-- 					</div> -->
	<!-- 				</div> -->
	<!-- 			</div> -->
	<!-- 		</div> -->
	<!-- 	</div> -->
	<!-- </form> -->

	<!-- 사용자 추가  -->
	<div class="layerPop_add_Id">

		<div>
			<div class="wrap">
				<a href="#void" class="cancle"><img
					src="../images/common/icon_x.png" alt=""></a>
				<div class="con">
					<p class="tit">아이디 추가</p>
					<form id=insert method="post" enctype="multipart/form-data">

						<div class="adminPop">
							<div class="subject">아이디</div>
							<div class="inputWrap">
								<input type="text" name="roleId" id="roleId">
							</div>
						</div>
						<div class="adminPop">
							<div class="subject">권한</div>
							<div class="inputWrap">
								<select name="roleOrg" id="roleOrg">
								<option value = "00">관리자(00)</option>
								<option value = "03">유관기관(01,02,03)</option>
								<option value = "04">행정(04)</option>
								<option value = "05" selected>일반 사용자(05)</option>
								</select>
							</div>
						</div>
						<div class="save">
							<a href="javascript:insertId()">저장</a>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>



	<!-- 관리자 추가 -->
	<div class="layerPop_add_admnId">

		<div>
			<div class="wrap">
				<a href="#void" class="cancle"><img
					src="../images/common/icon_x.png" alt=""></a>
				<div class="con">
					<p class="tit">관리자 추가</p>
					<form id=insertAdmnId method="post" enctype="multipart/form-data">

						<div class="adminPop">
							<div class="subject">아이디</div>
							<div class="inputWrap">
								<input type="text" name="userId" id="userId">
							</div>

							<div class="subject">비밀번호</div>
							<div class="inputWrap">
								<input type="text" name="passwd" id="passwd">
							</div>
						</div>



						<div class="save">
							<a href="javascript:insertAdmnId()">저장</a>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>



	<div class="layerPop_add_admnModify">

		<div>
			<div class="wrap">
				<a href="#void" class="cancle"><img
					src="../images/common/icon_x.png" alt=""></a>
				<div class="con">
					<p class="tit">관리자 수정</p>
					<form id=admnModify method="post" enctype="multipart/form-data">
						<div class="adminPop">
							<div class="subject">수정할 아이디 </div>
							<div class="inputWrap">
								<input type="text" id="inputId" value="" readOnly>
							</div>
							
							<div class="subject">현재 비밀번호</div>
							<div class="inputWrap">
								<input type="password" id="inputPwd"
									placeholder="현재 비밀번호를 입력해주세요.">
							</div>
							
							<div class="subject">변경할 비밀번호 </div>
							<div class="inputWrap">
								<input type="password" id="inputChangePwd"
									placeholder="변경할 비밀번호를 입력해주세요.">
							</div>
							<div class="subject">변경할 비밀번호 확인</div>
							<div class="inputWrap">
								<input type="password" id="inputChangePwdCheck"
									placeholder="변경할 비밀번호를 다시한번  입력해주세요.">
							</div>
						</div>
						
												
						<div class="save">
							<a href="javascript:updateAdmn()">변경</a>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>


	<!-- FAQ 수정 -->
	<form name="update_model" id="update_model" method="post"
		enctype="multipart/form-data">
		<input type="hidden" name="bbsNo" value="" />
		<div class="layerPop_modify">
			<div>
				<div class="wrap">
					<a href="#void"><img src="../images/common/icon_x.png" alt=""></a>
					<div class="con">
						<p class="tit">FAQ 질문</p>
						<div class="adminPop">
							<div class="subject">FAQ 제목</div>
							<div class="inputWrap">
								<input type="text" name="bbsSubject" value="">
							</div>
							<div class="subject">FAQ 답변</div>
							<div class="inputWrap">
								<textarea name="bbsCont"></textarea>
							</div>
							<div class="subject">공개 여부</div>
							<div class="inputWrap radio">
								<input type="radio" name="openYn" value="Y"> <label
									for="yes">Y</label> <input type="radio" name="openYn" value="N">
								<label for="no">N</label>
							</div>
						</div>
						<div class="save">
							<a href="#void" id="btnUpdate">저장</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>



	<!--   -->


	<!-- ======================= 중앙내용 종료 ====================== -->

	<app:layout mode="footer" type="normal" />

</body>
</html>
