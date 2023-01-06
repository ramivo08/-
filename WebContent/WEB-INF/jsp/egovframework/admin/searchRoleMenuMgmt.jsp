<%
 /****************************************************************************************
***	ID				: searchRoleMenuMgmt.jsp
***	Title			: 롤(권한) 메뉴 관리
***	Description		: 롤(권한) 메뉴 관리 화면
***
***	-----------------------------    Modified Log   --------------------------------------
***	ver				date					author					description
***  -----------------------------------------------------------------------------------------
***	1.0			2019-10-30					NJS					First Coding.
*****************************************************************************************/
%>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt" %>
<%@ taglib uri="/WEB-INF/tld/app.tld" prefix="app" %>
<%@ taglib uri="/WEB-INF/tld/f.tld" prefix="f"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<!-- <script>
$(function(){
    $('input:checkbox[name="menuArr"]').change(function(){
    	console.log(this.value);

    });
});
</script> -->

<c:forEach var="data" items="${menuList}" varStatus="state">
	<c:set var="flag" value="false" />
	<c:forEach items="${searchRoleMgmt }" var="item" varStatus="idx">
		<c:if test="${data.menuId eq item.menuId }">
			<c:set var="flag" value="true" />
		</c:if>
	</c:forEach>

	<li>
		<input type="checkbox" name="menuArr" id="menuList${state.index }" value="${data.menuId }" onclick="javascript:fn_Check_Menulist(this);" <c:if test="${flag eq true }">checked</c:if> />
<%-- 		<label for="authority${state.index }"> --%>
		<label for="menuList${state.index }">
			<span style="cursor:pointer"><c:out value="${data.menuNm}" /></span>
			<%-- <a href="javascript:searchFunc();"><span><c:out value="${data.menuNm}" /></span></a> --%>
		</label>
	</li>
</c:forEach>

