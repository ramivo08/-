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
		_ALLOWED_FILE_EXTS = '<c:out value="${paramMap.allowedFileExts}"/>';
	</script>

	<form:form commandName="model" id="model" method="post" enctype="multipart/form-data" action="">

		<!-- 검색 조건 -->
		<form:hidden path="page" id="page"/>
		<form:hidden path="searchCond" id="searchCond" />
		<form:hidden path="searchWord" id="searchWord" />
		<!-- 게시판 타입 -->
		<form:hidden path="bbsType" id="bbsType" />
		<!-- 등록, 수정, 삭제 구분값 -->
		<input type="hidden" name="mode" id="mode" value="regi"/>

		<!-- 신규 html 넣은 부분 -->
		<div class="contents">

			<div class="con">

				<table class="th_top_left_01">
					<caption class="caption_none">글작성</caption>
					<colgroup>
						<col width="20%">
	                    <col width="">
					</colgroup>

					<tbody id ="_baseArea">
							<tr>
		                        <th>제목</th>
		                        <td><input type="text" class="w100" id="bbsSubject" name="bbsSubject" title="제목" maxlength="250"></td>
		                    </tr>
							<tr>
		                        <th>작성자</th>
		                        <td><input type="text" class="w40" id="userNm" name="userNm" title="작성자" value="${paramMap.gsUserNm }" disabled="disabled"></td>
		                    </tr>

							<tr>
		                    	<th>내용</th>
		                        <td>
		                            <textarea class="notice_con" id="bbsCont" name="bbsCont" title="내용"></textarea>
		                        </td>
		                    </tr>
	                 </tbody>
						<tr>
	                    	<th>첨부파일</th>
	                        <td>
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
	                <a class="btn i_save bg_blue" href="#"><span id="cnfmBtn">저장</span></a>
	                <a class="btn i_list bg_gray" href="#"><span id="cncleBtn">목록</span></a>
	            </div>

			</div>
		</div>
	</form:form>
	
	<script type='text/javascript' src='/webfilter/js/webfilter.js' defer='defer'></script>
	<iframe id='webfilterTargetFrame' name='webfilterTargetFrame' width='0' height='0' frameborder='0' scrolling='no' noresize></iframe>
	

<app:layout mode="footer" type="normal"/>
</body>
</html>
