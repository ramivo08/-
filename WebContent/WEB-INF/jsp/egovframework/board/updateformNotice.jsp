<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!-- updateformNotice.jsp -->
<head>
<%@ include file="../header.jsp"%>

<!-- 
include libraries(jQuery, bootstrap) 
<link href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" rel="stylesheet">
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
include summernote css/js 
<link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script> -->


<!-- <script src="/js/summernote/summernote-lite.js"></script>
<script src="/js/summernote/lang/summernote-ko-KR.js"></script>

<link rel="stylesheet" href="/js/summernote/summernote-lite.js"> -->


<app:layout mode="stylescript" type="main" />
<link rel="stylesheet" href="../css/viewBbs.css">
<script type="text/javascript" src="../js/board/deleteNotice.js"></script>
<!-- <script type="text/javascript" src="../js/board/updateNotice.js"></script> -->

<script src="../assets/js/summernote/summernote-lite.js"></script>
<script src="../assets/js/summernote/lang/summernote-ko-KR.js"></script>
<link rel="stylesheet" href="../assets/css/summernote/summernote-lite.css">
<script type="text/javascript">

$(document).ready(function() {
	var toolbar = [
	    // 글꼴 설정
	    ['fontname', ['fontname']],
	    // 글자 크기 설정
	    ['fontsize', ['fontsize']],
	    // 굵기, 기울임꼴, 밑줄,취소 선, 서식지우기
	    ['style', ['bold', 'italic', 'underline','strikethrough', 'clear']],
	    // 글자색
	    ['color', ['forecolor','color']],
	    // 표만들기
	    ['table', ['table']],
	    // 글머리 기호, 번호매기기, 문단정렬
	    ['para', ['ul', 'ol', 'paragraph']],
	    // 줄간격
	    ['height', ['height']],
	    // 그림첨부, 링크만들기, 동영상첨부
	    ['insert',['picture','link','video']],
	    // 코드보기, 확대해서보기, 도움말
	    ['view', ['codeview','fullscreen', 'help']]
	  ];

var setting = {
        height : 400,
        minHeight : null,
        maxHeight : null,
        focus : true,
        lang : 'ko-KR',
        toolbar : toolbar,
        callbacks : { //여기 부분이 이미지를 첨부하는 부분
        onImageUpload : function(files, editor,
        welEditable) {
        for (var i = files.length - 1; i >= 0; i--) {
        uploadSummernoteImageFile(files[i],
        this);
        		}
        	}
        }
     };

    $('#summernote').summernote(setting);
    });

	function changeFile(target) {
		   $('#fileTitle').text(target.files[0].name);
	}
	
	function deleteCurrentFile() {
		   var fileInput = $('#input-excel')[0];
		   fileInput.value = "";
		   $('#fileTitle').text('선택된 파일 없음');
		   var currentFileNo = $('#currentFileNo').val();
		   $('#deleteFileNo').val(currentFileNo);
	}
</script>
	
	
</head>
<style>
   .textarea{
      resize: none;
   }
</style>
<body>


   <div id="wrapper">
      <app:layout mode="header" />

      <div class="main">
         <div class="main-content">
            <div class="container-fluid">
               <div class="panel panel-headline">
                  <div class="panel-head">
                     <div class="content-heading">
                        <div class="heading-left">
                           <h1 class="page-title">공지사항</h1>
                        </div>
                        <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                           <li class="breadcrumb-item"><a href="/main.do"><i class="fa fa-home"></i> Home</a></li>
                           <li class="breadcrumb-item">게시판</li>
                           <li class="breadcrumb-item"><a href="/board/searchNotice.do">공지사항</a></li>
                        </ol>
                        </nav>
                     </div>
                  </div>
               </div>
               <form method="post" action="updateNotice.do" enctype="multipart/form-data">
               <input type="hidden" name="page" value="${page}">
               <input type="hidden" name="bbsNo" value="${bd.bbsNo}">
               <input type="hidden" name="deleteFileNo" id="deleteFileNo">
               <c:if test="${!empty fileList}">
   				<c:forEach var="file" items="${fileList}">
               		<input type="hidden" name="currentFileNo" id="currentFileNo" value="${ file.fileNo }">
              	</c:forEach>
               </c:if>
               <table border="1" width="1500" align="center" height="500">
                  <tr>
                     <td align="center">제목</td>
                     <td>
                        <input type="text" name="bbsSubject" value="${bd.bbsSubject}" size="100%" style="width:100%; border: 0;">
                     </td>
                  </tr>
                  <tr>
                     <td align="center">파일첨부</td>
                     <td>
                     	<span class="file-title">
                     		<span id="fileTitle">
                                 <c:if test="${empty fileList}">
                     				선택된 파일 없음
                                 </c:if>
                                 <c:if test="${!empty fileList}">
                     				<c:forEach var="file" items="${fileList}">
                                 		${ file.fileOrgNm }
                                	</c:forEach>
                                 </c:if>
                     		</span>
                     		<span class="x-button" onclick="deleteCurrentFile()">
                     			<i class="delete-btn"></i>
                     			파일삭제
                     		</span>
                     	</span>
                     	<label for="input-excel">파일찾기</label>
                    	<input type="file" id="input-excel" name="upfile" onchange="changeFile(this)" style="display: none;">
                     </td>
                  </tr>
                  <tr>
                     <td align="center">
                        내용
                     </td>
                     <td style="vertical-align: top">
                     <textarea id="summernote" name="bbsCont" rows="10" style="width:100%; border: 0; resize: none">${ bd.bbsCont }</textarea>
                     </td>
                  </tr>
               </table><br>
               <div class="selectBtns">
                        <button type="button" class="btn btn-dark" onClick="location.href='/board/searchNotice.do'">
                           <i class="fa fa-align-justify"></i> 
                           목록
                        </button>
                        <button type="submit" class="btn btn-info">
                           <i class="fa fa-edit"></i>
                           수정
                        </button>
                     </div>
               </form>