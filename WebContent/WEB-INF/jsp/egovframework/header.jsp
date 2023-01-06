<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="app" uri="/WEB-INF/tld/app.tld" %>

<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>

<%@ page import="java.util.*" %>
<%@ page import="common.util.CommUtils" %>
<%@ page import="common.util.properties.ApplicationProperty"%>



<%
//저장처리 결과 메시지
String PROC_FLAG 	= (String)request.getSession().getAttribute(ApplicationProperty.get("SESS.PROCFLAG"));
PROC_FLAG 			= CommUtils.nvlTrim(PROC_FLAG);
request.getSession().removeAttribute(ApplicationProperty.get("SESS.PROCFLAG"));

String loginPage	= ApplicationProperty.get("LOGIN.PAGE");

//인증서및로그인 Return 처리
Map returnMap 	= (HashMap)request.getSession().getAttribute("CERT_RETURN");
request.getSession().removeAttribute("CERT_RETURN");

String returnFlag		= "";

if (returnMap != null && returnMap.size() > 0) {
	returnFlag 		= CommUtils.nvlTrim((String)returnMap.get("returnFlag"));
}
%>

<!DOCTYPE html>
<html lang="ko">
<head>

	
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<meta name="title" content="<spring:message code="title.sysname"/>" />
	<meta name="author" content="<spring:message code="title.sysname"/>" />
	<meta name="keywords" content="<spring:message code="title.sysname"/>" />
	<meta name="description" content="<spring:message code="title.sysname"/>" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	
	<title><spring:message code="title.sysname"/></title>
	
	
<script type="text/javascript">
	var PROC_FLAG = "<%=PROC_FLAG%>";
	var ROOT_PATH = "${pageContext.request.contextPath}";
</script>

</head>

