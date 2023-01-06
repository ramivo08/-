package commf.view;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jxls.transformer.XLSTransformer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.view.AbstractView;

import common.util.FileUtil;
import common.util.properties.ApplicationProperty;

/**
 * 2010-12-02 File Download View Resolver
 * @author ntarget
 *
 */

@SuppressWarnings("all")
public class ExcelTempView extends AbstractView {
	/** Logger for this class */
	protected final Logger logger = LoggerFactory.getLogger(getClass());

	@Override
	protected void renderMergedOutputModel(Map model, HttpServletRequest request, HttpServletResponse response)
	throws Exception {

		String tempPath		= ApplicationProperty.get("excel.templete.dir");
		String pcFilename	= (String)model.get("pcFilename");

		if (pcFilename == null || "".equals(pcFilename))
			pcFilename	= (String)model.get("filename");


		Random random = new Random(System.currentTimeMillis());
		StringBuffer sb = null;
		sb = new StringBuffer();
		sb.append(String.valueOf(System.currentTimeMillis()));
		sb.append(String.valueOf(random.nextLong()));

		String fileName		= sb.toString() +"_"+pcFilename+".xls";

		String realPcFileName	= pcFilename+".xls";

		String tempFileName = (String)model.get("filename")+"_Template.xls";
		List   excelList	= (List)model.get("excelList");
		Map    paramMap		= (HashMap)model.get("paramMap");

		// Excel File Create
		Map<String, Object> beans = new HashMap<String, Object>();
		beans.put("excelList",  excelList);
		beans.put("paramMap", 	paramMap);

		XLSTransformer transformer = new XLSTransformer();
		transformer.transformXLS(tempPath +"/"+ tempFileName, beans, tempPath +"/"+ fileName);

		// File Download
		File f = new File(tempPath +"/"+ fileName);

		if (f.exists()) {
			logger.info("response charset : " + response.getCharacterEncoding());
			// 파일명 인코딩 처리
			String downFilename = (request.getHeader("User-Agent").indexOf("MSIE") == -1) ?
					new String(realPcFileName.getBytes(), "8859_1") : // FF
						URLEncoder.encode(realPcFileName, "UTF-8");		// IE
			logger.info("disposition filename : " + downFilename);

			response.setContentType("application/octet-stream");
			response.setHeader("Content-Transfer-Encoding", "binary;");
			response.setHeader("Content-Disposition", "attachment; filename=\"" + downFilename + "\"");

			byte[] buffer = new byte[1024];
			BufferedInputStream ins = new BufferedInputStream(new FileInputStream(f));
			BufferedOutputStream outs = new BufferedOutputStream(response.getOutputStream());

			try {
				int read = 0;
				while ((read = ins.read(buffer)) != -1) {
					outs.write(buffer, 0, read);
				}
				outs.close();
				ins.close();
			} catch (IOException e) {
				logger.info("EXCEL DOWNLOAD ERROR : FILE NAME = "+tempPath +"/"+  fileName+" ");
			} finally {
				// Download Excel : File Remove
				FileUtil.deleteFile(tempPath +"/"+ fileName);
				if(outs!=null) outs.close();
				if(ins!=null) ins.close();
			}
		}


	}

}
