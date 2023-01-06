function pdfmake() {
	  // 현재 document.body의 html을 A4 크기에 맞춰 PDF로 변환
	window.jsPDF = window.jspdf.jsPDF;
/*	var doc = new jsPDF();
	doc.text(20, 20, 'Hello world!');
	doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
	doc.addPage();
	doc.text(20, 20, 'Do you like that?');

	doc.save('Test.pdf');*/
   html2canvas(document.getElementById("testpdf"), {
        onrendered: function (canvas) {

            // 캔버스를 이미지로 변환
            var imgData = canvas.toDataURL('image/png');

            var imgWidth = 210; // 이미지 가로 길이(mm) A4 기준
            var pageHeight = imgWidth * 1.414;  // 출력 페이지 세로 길이 계산 A4 기준
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;

            var doc = new jsPDF('p', 'mm');
            var position = 0;

            // 첫 페이지 출력
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            // 한 페이지 이상일 경우 루프 돌면서 출력
            while (heightLeft >= 20) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            // 파일 저장
            doc.save('sample.pdf');


            //이미지로 표현
            //document.write('<img src="'+imgData+'" />');
        }
        
    });

}; 

 

function savePDF(){
	window.jsPDF = window.jspdf.jsPDF;
    //저장 영역 div id
    html2canvas($('#testPdf')[0] ,{	
      //logging : true,		// 디버그 목적 로그
      //proxy: "html2canvasproxy.php",
      allowTaint : true,	// cross-origin allow 
      useCORS: true,		// CORS 사용한 서버로부터 이미지 로드할 것인지 여부
      scale : 5	// 기본 96dpi에서 해상도를 두 배로 증가
      
    }).then(function(canvas) {	
      // 캔버스를 이미지로 변환
      var imgData = canvas.toDataURL('image/png');
      var doc = new jsPDF('p', 'mm','a4'); 
      //var imgWidth = 190; // 이미지 가로 길이(mm) / A4 기준 210mm
      //margin 값 빼기 
      var imgWidth = doc.internal.pageSize.getWidth()-20; // 이미지 가로 길이(mm) / A4 기준 210mm
      var pageHeight = imgWidth * 1.414;  // 출력 페이지 세로 길이 계산 A4 기준
     // var imgHeight = canvas.height * imgWidth / canvas.width;
      // margin 값 빼기 
      var imgHeight = doc.internal.pageSize.getHeight()-10;
      var heightLeft = imgHeight;
      var margin = 10; // 출력 페이지 여백설정
      var position = 0;

      // 첫 페이지 출력
      //doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      doc.addImage(imgData, 'JPEG', margin, 0, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // 한 페이지 이상일 경우 루프 돌면서 출력
      while (heightLeft >= 20) {			// 35
      position = heightLeft - imgHeight;
      position = position - 20 ;		// -25

      doc.addPage();
      //doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      doc.addImage(imgData, 'JPEG', margin, 0, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      }

      // 파일 저장 (파일이름)
      doc.save('조기폐차대상검사확인서_.pdf');
    });
  }