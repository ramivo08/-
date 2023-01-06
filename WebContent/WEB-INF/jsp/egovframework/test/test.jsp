<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<%@ include file="../header.jsp"%>

<app:layout mode="stylescript" type="main" title="main"/>
<!-- Plugin CSS -->
<link href="/assets/plugins/nestable2/jquery.nestable.min.css" rel="stylesheet" />
</head>
<body>
  <!-- MAIN -->
    <div class="main">

      <!-- MAIN CONTENT -->
      <div class="main-content">

        <div class="content-heading">
          <div class="heading-left">
            <h1 class="page-title">Nestable</h1>
            <p class="page-subtitle">Drag & drop hierarchical list with mouse and touch compatibility.</p>
          </div>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#"><i class="fa fa-home"></i> Home</a></li>
              <li class="breadcrumb-item"><a href="#">Parent</a></li>
              <li class="breadcrumb-item active">Current</li>
            </ol>
          </nav>
        </div>

        <div class="container-fluid">
          <div class="row">
            <div class="col-md-6">
              <div class="dd" id="nestable1">
                <ol class="dd-list">
                  <li class="dd-item" data-id="1">
                    <div class="dd-handle">Item 1</div>
                  </li>
                  <li class="dd-item" data-id="2">
                    <div class="dd-handle">Item 2</div>
                  </li>
                  <li class="dd-item" data-id="3">
                    <div class="dd-handle">Item 3</div>
                    <ol class="dd-list">
                      <li class="dd-item" data-id="4">
                        <div class="dd-handle">Item 4</div>
                      </li>
                      <li class="dd-item" data-id="5">
                        <div class="dd-handle">Item 5</div>
                      </li>
                    </ol>
                  </li>
                  <li class="dd-item" data-id="6">
                    <div class="dd-handle">Item 6</div>
                  </li>
                  <li class="dd-item" data-id="7">
                    <div class="dd-handle">Item 7</div>
                  </li>
                </ol>
              </div>
              <br>
              <h4>Serialized Output (JSON)</h4>
              <p>Drag and drop items above and see below output changing.</p>
              <textarea id="outputDD1" class="form-control" rows="5" disabled="disabled"></textarea>
            </div>
            <div class="col-md-6">
              <div class="dd" id="nestable2">
                <ol class="dd-list">
                  <li class="dd-item custom-item" data-id="8">
                    <div class="dd-handle custom-handle"><i class="ti-menu"></i></div>
                    <div class="custom-content">Item 8</div>
                  </li>
                  <li class="dd-item custom-item" data-id="9">
                    <div class="dd-handle custom-handle"><i class="ti-menu"></i></div>
                    <div class="custom-content">Item 9</div>
                  </li>
                  <li class="dd-item custom-item" data-id="10">
                    <div class="dd-handle custom-handle"><i class="ti-menu"></i></div>
                    <div class="custom-content">Item 10</div>
                    <ol class="dd-list">
                      <li class="dd-item custom-item" data-id="11">
                        <div class="dd-handle custom-handle"><i class="ti-menu"></i></div>
                        <div class="custom-content">Item 11</div>
                      </li>
                      <li class="dd-item custom-item" data-id="12">
                        <div class="dd-handle custom-handle"><i class="ti-menu"></i></div>
                        <div class="custom-content">Item 12</div>
                      </li>
                    </ol>
                  </li>
                  <li class="dd-item custom-item" data-id="13">
                    <div class="dd-handle custom-handle"><i class="ti-menu"></i></div>
                    <div class="custom-content">Item 13</div>
                  </li>
                  <li class="dd-item custom-item" data-id="14">
                    <div class="dd-handle custom-handle"><i class="ti-menu"></i></div>
                    <div class="custom-content">Item 14</div>
                  </li>
                </ol>
              </div>
              <br>
              <h4>Serialized Output (JSON)</h4>
              <p>Drag and drop items above and see below output changing.</p>
              <textarea id="outputDD2" class="form-control" rows="5" disabled="disabled"></textarea>
            </div>
          </div>
        </div>
      </div>
      <!-- END MAIN CONTENT -->

    <!-- footer -->
    <footer>
      <div class="container-fluid">
        <p class="copyright">&copy; 2020 <a href="https://www.themeineed.com" target="_blank">Theme I Need</a>. All Rights Reserved.</p>
      </div>
    </footer>
    <!-- end footer -->

  </div>
  <!-- END WRAPPER -->

  <!-- Vendor -->
  <script src="assets/js/vendor.min.js"></script>

  <!-- jQuery UI Plugin -->
  <script src="assets/plugins/nestable2/jquery.nestable.min.js"></script>

  <!-- Drag Drop Panel Init -->
  <script src="assets/js/pages/nestable2.init.min.js"></script>

  <!-- App -->
  <script src="assets/js/app.min.js"></script>
</body>
</html>