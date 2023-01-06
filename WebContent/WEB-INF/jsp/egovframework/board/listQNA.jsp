<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<%@ include file="../header.jsp"%>

<app:layout mode="stylescript" type="main" />
<link rel="stylesheet" href="../css/listBbs.css">
<script type="text/javascript" src="../js/board/insertQNA.js"></script>
<script type="text/javascript" src="../js/board/deleteQNA.js"></script>
<script type="text/javascript" src="../js/board/listQNA.js"></script>
<script type="text/javascript" src="../js/board/selectQNA.js"></script>
<script type="text/javascript">
	function selectQNA(bbsNo,page){
	    location.href = "selectQNA.do?bbsNo="+bbsNo+"&page="+page;
	 }
	
	function allChecked(){
		
		var allCheck = document.getElementById('allCheck').checked;
		var rowCheckList = document.querySelectorAll('[name="rowCheck"]');
		
		if(allCheck){
			for(i=0; i<rowCheckList.length;i++){
				rowCheckList[i].checked = true;
			}
		}else{
			for(i=0; i<rowCheckList.length; i++){
				rowCheckList[i].checked = false;
			}
		}
	} //allChecked
	
	
	function rowChecked(){
		
		var allCheck = document.getElementById('allCheck').checked;
		var rowCheck = document.querySelectorAll('[name="rowCheck"]');
		var rowCheckList = document.querySelectorAll('[name="rowCheck"]:checked');
		
		
		if(rowCheck.length != rowCheckList.length){
			allCheck.checked=false;
		}else{
			allCheck.checked=true;
		}
	}
	
	var flag=false;
	function deleteQNAs(){
		//alert(1);
		var allCheck = document.getElementById('allCheck');
		var rowCheckList = document.querySelectorAll('[name="rowCheck"]');
		var rowCheckList2 = document.querySelectorAll('[name="rowCheck"]:checked');
		
		if(rowCheckList2.length==0){
			alert("체크박스를 선택해주세요.");
			return;
		}
		else{
			deletedata='';
			for(var i=0; i<rowCheckList2.length; i++){
				deletedata +=rowCheckList2[i].value;
				if(rowCheckList2[i+1] != null){
					deletedata += ' ';
				}
			}
			
			alert('선택한 항목을 삭제 합니다.');
			location.href="deleteQNAs.do?numList="+deletedata;
		}
	}
	
</script>

</head>

<body>
	<input type=hidden id="isCorrect" value=""/>
	
	<div id="wrapper">
		<app:layout mode="header" />

		<div class="main">
			<div class="main-content">
				<div class="container-fluid">
					<div class="panel panel-headline">
						<div class="panel-head">
							<div class="content-heading">
								<div class="heading-left">
									<h1 class="page-title">Q & A</h1>
								</div>
								<nav aria-label="breadcrumb">
								<ol class="breadcrumb">
									<li class="breadcrumb-item"><a href="/main.do"><i class="fa fa-home"></i> Home</a></li>
									<li class="breadcrumb-item">게시판</li>
									<li class="breadcrumb-item"><a href="/board/searchQNA.do">Q&A</a></li>
								</ol>
								</nav>
							</div>
						</div>
					</div>
					<div class="panel-body">
							<form method="post" class="form-" id="qna">
								<input type= hidden name="page" id ="page" />
								<input type= hidden name="bbsType" id ="bbsType" />
								<input type= hidden name="bbsNo" id ="bbsNo" />
								<input type= hidden name="checked" id="checkedQNAs"/>
								

								<!-- 검색 -->
								<div class="row margin-bottom-30 search" >
									<div class="col-md-3">
										<select class="form-control"name="searchType" id = "searchType" title="검색">
											<option value="all">전체</option>
											<option value="title">제목</option>
											<option value="content">내용</option>
										</select>
									</div>
									<div class="col-md-6">
	
										<input class="form-control" name="searchCont" id="searchCont" maxlength="30"
											title="검색어"  />
									</div>
									<div class="col-md-3 searchBtns">
											<button type="submit" class="btn btn-info" onClick="javascript:searchQNA()">
												<i class="fa fa-search"></i> 
												조회
											</button>
											<button class="btn btn-success" type="button" onClick="location.href='/board/insertQNA.do'">
												<i class="fa fa-plus"></i>
												등록
											</button>
											<button type="button" class="btn btn-danger" onClick="javascript:deleteQNAs()">
												<i class="fa fa-remove"></i>
												삭제
											</button>
									</div>
								</div>
								<!-- //검색 -->


								<div class="row margin-bottom-30 select">
									<div class="col-md-10">
										<label class="fancy-checkbox">
											<input type="checkbox" type="checkbox" id="allCheck" name="allCheck" onClick="allChecked()"> 
											<span>전체선택 / 해제</span>
										</label>
									</div>
									<div class="col-md-2 pageInfo">
								
										전체 :
										<c:out value="${totalSize }" />
										현재 :
										<c:out value="${currSize }" />
										/
										<c:out value="${totalSize }" />
										페이지
									</div>
								</div>
								
								<!-- 목록 -->
								<div class="list row margin-bottom-30">
									<ul class="board">
										<c:set var="totalSize">${totalSize}</c:set>
										<c:set var="pageSize">${pageSize}</c:set>
										<c:set var="pageNum">${totalSize-(pageSize*(currSize-1))}</c:set>
										<c:forEach var="qna" items="${qnaList}"
											varStatus="status">
											<li style="list-style:none;" class="boardContent">
											
												<div class="row">
													<div class="col-md-2 contentNum">
														<label class="fancy-checkbox">
															<input type="checkbox" id="rowCheck" ${qna.bbsNo}" name="rowCheck" value="${qna.bbsNo}" onClick="rowChecked()">
															<span>${pageNum - status.index}</span>
														</label>
														<!-- <label class="fancy-checkbox" for="chk_num ${qna.bbsNo}">${pageNum - status.index}</label>  -->	
														
													</div>											
													
													<div class="col-md-8 content">
														<h2 class="contentTitle">
														<a  href="javascript:selectQNA('${ qna.bbsNo }','${currSize }')"  title="${ qna.bbsNo }">${qna.bbsSubject }</a></h2>
														<p>
															<span>작성일 : ${qna.rgsDe}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>작성자 : ${qna.register}</span>
															&nbsp;&nbsp;&nbsp;&nbsp;<span>조회 : ${qna.viewCnt}</span>	
														</p>
													</div>
												</div>
											</li>
										</c:forEach>
									</ul>
								</div>
								<input type="hidden" name="privYn" id="readPrivYn"/>
								<%@ include file="qnaPasswordModal.jsp" %>
							</form>
						</div>

						<!-- 페이징 -->
						<div class="col-md-12">
							<app:paging name="pageList" jsFunction="fn_search" />
						</div>
						<!-- //페이징 -->
						
					<%@ include file="writeModalHeader.jsp" %>
					<div class="row" style="width : 100%">
						<div class="col-sm-6">
							<span>Write Q&A</span>	
						</div>
						<div class="col-sm-6">
							<label class="switch-input">
	                        <input type="checkbox" name="isPrivate" checked="" id="isPrivateToggleBtn">
	                    		<i data-swon-text="Private" data-swoff-text="Public"></i>
	                    	</input>
	                    </label>
						</div>
						
					</div>
					
                    
					<%@ include file="writeModalBody.jsp" %>
					
						<div class="form-group row">
							<label class="col-sm-2 col-form-label">Password</label>
						<div class="col-sm-10">
							<input type="password" class="form-control ui-autocomplete-input" name="bbsPwd" id="password" placeholder="" autocomplete="off">
						</div>
						</div>
					
					<%@ include file="writeModalFooter.jsp" %>
				</div>
			</div>
		</div>
	</div>
	</div>
	<app:layout mode="stylescript" type="footer" />
</body>
</html>