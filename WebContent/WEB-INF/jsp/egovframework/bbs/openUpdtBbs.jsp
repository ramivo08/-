<!DOCTYPE HTML>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html lang="ko">
<head>
<%@ include file ="../header.jsp" %>
<app:layout mode="stylescript" type="normal" />
</head>
<body id="top">

	<app:layout mode="header" />

	<script type="text/javascript">
	_ALLOWED_FILE_EXTS = '<c:out value="${modelMap.allowedFileExts}"/>';
	</script>

	<form:form commandName="model" id="model" method="post" enctype="multipart/form-data" action="">

		<!-- 검색 조건 -->
		<form:hidden path="page" id="page"/>
		<form:hidden path="searchCond" id="searchCond" />
		<form:hidden path="searchWord" id="searchWord" />
		<!-- 게시판 타입 -->
		<form:hidden path="bbsType" id="bbsType" />
		<!-- 등록, 수정, 삭제 구분값 -->
		<input type="hidden" name="mode" id="mode" value="updt"/>
		<!-- 게시판 No -->
		<input type="hidden" name="bbsNo" id="bbsNo" value="${resultView.bbsNo }"/>
		<!-- 삭제 파일 No-->
	    <input type="hidden" name="ArrdelFileNo"  id="ArrdelFileNo"/>
		<input type="hidden" name="fileNo" id="fileNo" />

		<!-- 신규 html 넣은 부분 -->
		<div class="contents">
			<div class="con">

				<table class="th_top_left_01">
					<colgroup>
						<col width="20%">
		                <col width="">
					</colgroup>

					<tbody>
						<tr>
							<th>제목</th>
							<td>
								<form:input path="bbsSubject" cssClass="w100" placeholder="" title="제목" maxlength="250"/>
							</td>
						</tr>
						<tr>
							<th>작성자</th>
							<td>
								<form:input path="userNm" cssClass="w40" disabled="true"/>
							</td>
						</tr>
						<tr>
							<th>내용</th>
							<td>
								<form:textarea path="bbsCont" cssClass="notice_con" title="내용"></form:textarea>
							</td>
						</tr>

						<tr>
							<th>첨부파일</th>
							<td>
								<%-- 첨부된 파일 리스트 --%>
								<c:if test="${fn:length(resultView.fileList) > 0 }">
									<c:forEach items="${resultView.fileList }" var="item" varStatus="idx">
										<div>
											삭제 <input name="arrFileNo" type="checkbox" value='<c:out value="${item.fileNo}"/>' /> :
											<a href="javascript:download('${item.fileNo}');"><img src="${pageContext.request.contextPath}/images/common/file.png" alt="첨부파일 아이콘"><span>${item.fileOrgNm }</span></a>
										</div>
									</c:forEach>
								</c:if>
								<div class="fileWrap">
	                                <div class="fileDiv">
	                                    <ul>
	                                        <li>
	                                            <div class="filebox">
	                                              <input type="checkbox" name="delChk" id="file_checkBox" title="첨부파일 삭제"/>
	                                              <input type="text" name="fileNum" disabled="disabled" class="upload-name" value="파일선택" title="파일선택"/>
	                                              <label for="fileName">찾아보기</label>
	                                              <input type="file" name="upfile" id="fileName" class="upload-hidden" onchange=""/>
	                                            </div>
	                                        </li>
	                                    </ul>
	                                </div>

	                                <div class="btnFile">
	                                    <a class="btn bg_green i_plus plus" href="#void"><span>추가</span></a>
	                                    <a class="btn bg_pink i_delete minus" href="#void"><span>삭제</span></a>
	                                </div>
	                            </div>
							</td>
						</tr>
					</tbody>
				</table>
				<!-- //Table-->

				<div class="align_r">
	                <a class="btn i_save bg_blue" href="#void"><span id="cnfmBtn">저장</span></a>
	                <a class="btn i_list bg_gray" href="#"><span id="cncleBtn">목록</span></a>
	            </div>

			</div>	<!-- //con -->
		</div>	<!-- //contents -->

	</form:form>
	
	<script type='text/javascript' src='/webfilter/js/webfilter.js' defer='defer'></script>
	<iframe id='webfilterTargetFrame' name='webfilterTargetFrame' width='0' height='0' frameborder='0' scrolling='no' noresize></iframe>

<app:layout mode="footer" type="normal"/>
</body>
</html>
