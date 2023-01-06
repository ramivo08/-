<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<%@ include file="../header.jsp"%>

<app:layout mode="stylescript" type="main" title="main"/>
<link rel="stylesheet" href="/css/manageMenu.css">
<!-- Plugin CSS -->
<link href="/assets/plugins/nestable2/jquery.nestable.min.css" rel="stylesheet" />
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
									<h1 class="page-title">메뉴 권한 관리</h1>
								</div>
								<nav aria-label="breadcrumb">
		                        <ol class="breadcrumb">
		                           <li class="breadcrumb-item"><a href="/main.do"><i class="fa fa-home"></i> Home</a></li>
		                           <li class="breadcrumb-item">관리자 페이지</li>
		                           <li class="breadcrumb-item"><a href="/admin/manageMenu.do">메뉴 권한 관리</a></li>
		                        </ol>
                        </nav>                        
							</div>
						</div>
					</div>
	               	<div class="panel-body">
	               		<div class="row">
	               			<div class="col-sm-2">
	               				<div class="card">
	               					<div class="card-header">
	               						<span>권한 목록</span>
	               					</div>
	               					<div class="card-body">
	               						<ul class="pl-0">
	               							<c:forEach items="${ roleList }" var="role" varStatus="status">
	               								<li class="text-center pt-1 pb-1 roleItem">
	               									<input type="hidden" value="${ role.roleId }" />
	               									<span>${ role.roleName }</span>
	               								</li>
	               							</c:forEach>
	               						</ul>
	               					</div>
	               				</div>
	               			</div>
	               			<div class="col-sm-5">
	               				<div class="card">
	               					<div class="card-header">
	               						<div class="row">
	               							<div class="col-6 text-left">
	               								<span>조회 가능한 메뉴</span>
	               							</div>
	               							<div class="col-6 text-right">
	               								<button type="button" class="btn btn-danger" id="menuDelBtn">Del</button>
	               							</div>
	               						</div>
	               					</div>
	               					<div class="card-body">
	               						<div id="accessableDiv" class="static">
	               							<ol id="staticAccessableList" class="static-list">
	               							
	               							</ol>
	               						</div>
	               						<!-- <div class="static" id="accessableDiv">
	               							<ol class="static-list" id="staticAccessableList">
	               							</ol>
	               						</div> -->
	               						<!-- <table id="accessableMenuTable" class="w-100">
	               							<colgroup>
	               								<col width="35%"/>
	               								<col width="65%"/>
	               							</colgroup>
	               							<tbody>
	               								<tr id="tableHeader">
		               								<th>메뉴 이름</th>
		               								<th>메뉴 URL</th>
		               							</tr>
	               							</tbody>
	               							
	               						</table> -->
	               					</div>
	               				</div>
	               			</div>
	               			<div class="col-sm-5">
	               				<div class="card">
	               					<div class="card-header">
	               						<div class="row">
	               							<div class="col-6 text-left">
	               								<span>전체 메뉴</span>
	               							</div>
	               							<div class="col-6 text-right">
	               								<button type="button" class="btn btn-info" id="menuAddBtn">Add</button>
	               							</div>
	               						</div>
	               						
	               						
	               					</div>
	               					<div class="card-body">
	               						<div class="static">
	               							<ol id="menuWholeList" class="static-list">
		               							
		               						</ol>
	               						</div>
	               						
	               					
	               					
	               					
	               						<%-- <div class="static" id="staticList">
	               							<ol class="static-list" id="staticRootList">
	               							</ol>
	               						</div>
	               						<div class="dd" id="nestable1" style="display:none;">
	               							<%@ page import="java.util.ArrayList" %>
	               							<%@ page import="java.util.HashMap" %>
	               							<%@ page import="java.util.Arrays" %>
	               							<%@ page import="java.util.Collections" %>
	               							<%
	               							Object obj = request.getAttribute("menuMap");
	               							HashMap<String, List<HashMap>> menus = null;
	               							if(obj != null) menus = (HashMap<String, List<HashMap>>)obj;
	               							
	               							ArrayList<String> levels = new ArrayList<String>(menus.keySet());
	               							Collections.sort(levels, new Comparator<String>() {
	               							 	@Override
	               							    public int compare(String o1, String o2) {
	               							        return o2.compareTo(o1);
	               							    }
	               							});
	               							HashMap<String, String> olList = new HashMap<String, String>();
	               							for(String level : levels){
	               								List<HashMap> menuList = menus.get(level);
	               								ArrayList<String> curLevelBelongTo = new ArrayList<String>();
	               								String ol = "";
	               								for(HashMap menu : menuList) {
	               									String id = (String)menu.get("id"), 
	               											name = (String)menu.get("name"), 
	               											belongTo = (String)menu.get("belongTo"), 
	               											url = (String)menu.get("url");
	               									if(!curLevelBelongTo.contains(belongTo)) curLevelBelongTo.add(belongTo);
	               									String item = "";
	               									if(olList.keySet().contains(belongTo)) item += olList.get(belongTo);
	               									else item += "<ol class=\"dd-list\" id=\"" + belongTo + "List\">";
	               									item += "<li class=\"dd-item \" id=\"" + id + "Item\" data-id=\"" + id 
	               											+ "\" data-url=\"" + url + "\" data-belongTo =\"" + belongTo + "\"" 
	               											+ "data-name=\"" + name +"\">"
	               											+ "<div class=\"dd-handle\">"
	               											//+ "<div class=\"row\">"
	               											//+ "<div class=\"col-11\">"
	               											+ name + " : " + url
	               											+ "</div>";
	               											//+ "<div class=\"col-1\">"
	               											//+ "<button type=\"button\" class=\"btn btn-outline-dark\">"
	               											//+ "+"
	               											//+ "</button>"
	               											//+ "</div>"
	               											//+ "</div>"
	               											//+ "</div>";
	               											//+ "<div class=\"col-1\">"
	               											//
	               											//+ "+"
	               											//+ "</button>"
	               											//+ "</div>";
	               											
	               									if(olList.keySet().contains(id)) {
	               										item += olList.get(id) + "</li>";
	               									}
	               									olList.put(belongTo, item);
	               								}
	               								for(String belongTo : curLevelBelongTo) {
	               									olList.put(belongTo, olList.get(belongTo)+"</ol>");
	               									if(level.equals("1")){
	               										%><%= olList.get(belongTo) %><%
	               									}
	               								}
	               							}
	               							%>
	               						</div> --%>
	               					</div>
	               				</div>
	               			</div>
	               		</div>
	               	</div>
				</div>
			</div>
		</div>
	</div>
	<app:layout mode="stylescript" type="footer" />


  	<!-- jQuery UI Plugin -->
  	<script src="/assets/plugins/nestable2/jquery.nestable.min.js"></script>

  	<!-- Drag Drop Panel Init -->
  	<script src="/assets/js/pages/nestable2.init.min.js"></script>
  	<%@ page import="org.json.simple.JSONArray" %>
  	<% JSONArray list = (JSONArray)request.getAttribute("menuList"); %>
	<script>
		let output = '';
	    $.each(<%=list%>, function(index, item) {
	    	output += buildItem(item);
	    })
	    $("#menuWholeList").append(output)
	    document.getElementById('menuWholeList').querySelectorAll('input').forEach(function(i, idx) {
	    	i.isWhole = true
	    	/* console.log(i)
	    	console.log(i.isWhole) */
	    })
	    $("#menuWholeList input").on("change", menuListCheck)
	    
	    
	</script>
</body>
</html>