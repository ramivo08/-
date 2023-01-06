<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<%@ include file="../header.jsp"%>

<app:layout mode="stylescript" type="main" title="main"/>
<link rel="stylesheet" href="../css/viewBbs.css">
<script type="text/javascript" src="../js/board/deleteNotice.js"></script>
<script type="text/javascript" src="../js/board/updateNotice.js"></script>

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
            height : 300,
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
        
        
        
      function fileDownload(fileNo) {
            comutils.fileDownload(
             {
             fileNo: fileNo
             }
         );
      }
        
</script>

<style>
   table{
      border-color: #BDBDBD;
   }
   
    th, td {
    padding: 5px;
   }
</style>

</head>
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
               <form method="post" id="notice" enctype="multipart/form-data" action="updateformNotice.do">
               <input type=hidden name="bbsNo" value="${ bd.bbsNo }"/>
               <div class="panel-body">
                     <div class="card"><br>
                         
                        <table border="1" width="90%" align="center">
                           <tr>
                              <td align="center" style="border-left: hidden;" width="20%" bgcolor="#EBF7FF"><b>제목</b></td>
                              <td style="border-right: hidden;">&nbsp;${ bd.bbsSubject }</td>
                           </tr>
                           <tr>
                              <td align="center" style="border-left: hidden;" bgcolor="#EBF7FF"><b>작성일</b></td>
                              <td style="border-right: hidden;">&nbsp;${ bd.rgsDe }</td>
                           </tr>
                           <tr>
                              <td align="center" style="border-left: hidden;" bgcolor="#EBF7FF"><b>첨부파일</b></td>
                              <td style="border-right: hidden;">
                           <c:forEach var="file" items="${fileList}">
                                    <a href="javascript:fileDownload('${ file.fileNo }')">
                                       &nbsp;<i class="fa fa-file" style="color:#5e6773; "></i>
                                        <font style="color:#5e6773;" size="2">${ file.fileOrgNm }</font> 
                                    </a>
                                    <br>
                          </c:forEach>
                               </td>
                           </tr>
                        </table>
                        
                        <div class="card-body">
                           <div class="additionalContent">
                              <%-- <div class="file">
                                 <c:forEach var="file" items="${fileList}">
                                    <a href="javascript:fileDownload('${ file.fileNo }')">
                                       <i class="fa fa-file"></i>
                                       ${ file.fileOrgNm }
                                    </a>
                                    <br>
                                 </c:forEach>
                              </div> --%>
                           <div class="content" id="summernote" align="center">
                              ${ bd.bbsCont }
                           </div>
                           </div>
                        </div>
                     </div>
                       <div class="selectBtns">
                        <button type="button" class="btn btn-dark" onClick="location.href='/board/searchNotice.do?page='+${page}">
                           <i class="fa fa-align-justify"></i> 
                           목록
                        </button>
                        
              <c:if test="${userInfo.userId eq 'aea'}">           
                        <button type="button" class="btn btn-info" onClick="location.href='/board/updateformNotice.do?bbsNo='+${bd.bbsNo}+'&page='+${page}">
                           <i class="fa fa-edit"></i>
                           수정
                        </button>
                        <button type="button" class="btn btn-danger" onClick="location.href='/board/deleteNotice.do?bbsNo='+${bd.bbsNo}+'&page='+${page}">
                           <i class="fa fa-remove"></i>
                           삭제
                        </button>
              </c:if>
                     </div>
                  </div>
                  <%@ include file="editModalHeader.jsp" %>
                  <span>Edit notice</span>
                  <%@ include file="editModalBody.jsp" %>
                  <%@ include file="editModalFooter.jsp" %>
               </form>
            </div>
         </div>
         
      </div>
   </div>
   </div>






<app:layout mode="stylescript" type="footer" />
</body>
</html>