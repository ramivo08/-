<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en" class="fullscreen-bg">
<head>
  <title>404 Page Not Found | BWMS 실시간 모니터링 시스템</title>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
  <!-- App css -->
  <link href="/assets/css/bootstrap-custom.min.css" rel="stylesheet" type="text/css" />
  <link href="/assets/css/app.min.css" rel="stylesheet" type="text/css" />

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">

  <!-- Favicon -->
  <link rel="shortcut icon" href="/assets/images/favicon.png">
</head>
<body>
  <!-- WRAPPER -->
  <div id="wrapper" class="d-flex align-items-center justify-content-center">
    <div class="container-fluid page-error">
      <h1>
        <span class="title">
          <span class="number left">404</span> <span class="text">Oops! <br/>Page Not Found</span>
        </span>
      </h1>
      <p>페이지를 찾지 못했습니다 . <a href="/board/searchQNA.do">Q&A</a>를 통하여 해당이슈를 등록해주세요.</p>

<!--       <form class="searchbox"> -->
<!--         <div class="input-group input-group-lg"> -->
<!--           <input class="form-control" type="text"> -->
<!--           <span class="input-group-append"> -->
<!--             <button class="btn btn-primary" type="button"><i class="fa fa-search"></i> <span>Search</span></button> -->
<!--           </span> -->
<!--         </div> -->
<!--       </form> -->

      <div>
        <a href="javascript:history.go(-1)" class="btn btn-outline-light"><i class="fa fa-arrow-left"></i> <span>Go Back</span></a>
        <a href="/main.do" class="btn btn-outline-light"><i class="fa fa-home"></i> <span>Home</span></a>
      </div>
    </div>
  </div>
  <!-- END WRAPPER -->
</html>