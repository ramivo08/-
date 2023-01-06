<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<%-- @(#)listBbs.jsp 1.0  2014.11.17                               												      		  --%>
<%--                                                                        														  --%>
<%-- COPYRIGHT (C) 2014 SUNDOSOFT CO., INC.                                     											  --%>
<%-- ALL RIGHTS RESERVED.                                                                                                   --%>
<!DOCTYPE HTML>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<% pageContext.setAttribute("newLine", "\n"); %>
<html lang="ko">
<head>

<%@ include file ="../header.jsp" %>

<app:layout mode="stylescript" type="normal" />
</head>

<body id="top">

	<app:layout mode="header" />

	<div class="contents">

            <div class="con">
				<div class="expand_title">OIE (국제수역사무국)</div>
                <div class="expand_contents">
                	<a href="#href" onclick="window.open('http://www.oie.int/wahis_2/public/wahid.php/Diseaseinformation/diseasehome', '', ''); return false;" style="cursor:pointer" title="OIE 국제수역사무국">- OIE 국제수역사무국 사이트로 이동합니다.</a>
                </div>
                <div class="expand_title">농림축산검역본부</div>
                <div class="expand_contents">
                	<a href="#href" onclick="window.open('http://www.qia.go.kr/livestock/clean/listwebQiaCom.do?type=1_5hwwsdx&clear=1', '', ''); return false;" style="cursor:pointer" title="농림축산검역본부">- 농림축산검역본부 사이트로 이동합니다.</a>
                </div>
                <div class="expand_title">질병관리본부</div>
                <div class="expand_contents">
                	<a href="#href"  onclick="window.open('http://www.cdc.go.kr/CDC/map/news_list.jsp?menuIds=HOME006-MNU2801-MNU2854', '', ''); return false;" style="cursor:pointer" title="질병관리본부">- 질병관리본부 사이트로 이동합니다.</a>
                </div>
                <div class="expand_title">EFSA (유럽식품안전청)</div>
                <div class="expand_contents">
                	<a href="#href"  onclick="window.open('http://www.efsa.europa.eu/', '', ''); return false;" style="cursor:pointer" title="유럽식품안전청">- 유럽식품안전청 사이트로 이동합니다.</a>
                </div>

            </div><!-- //con -->
        </div><!-- //contents -->

	<app:layout mode="footer" type="normal"/>

</body>
</html>
