package business.biz;

import java.util.Map;

import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.apache.commons.mail.SimpleEmail;
import org.springframework.mail.MailException;

import common.util.CommUtils;
import common.util.properties.ApplicationProperty;

@SuppressWarnings({"rawtypes"})
public class MailManager {

	// ComboList Create (Map)
	public static String sendMail(Map mailInfo) throws MailException  {

		String result			= "";
		String senderEmail		= CommUtils.nvlTrim((String)mailInfo.get("senderEmail"),    ApplicationProperty.get("mail.senderEmail"));
		String senderNm			= CommUtils.nvlTrim((String)mailInfo.get("senderNm"), 		ApplicationProperty.get("mail.senderNm"));
		String receiverEmail	= CommUtils.nvlTrim((String)mailInfo.get("receiverEmail"));
		String receiverNm		= CommUtils.nvlTrim((String)mailInfo.get("receiverNm"));
		String subject			= CommUtils.nvlTrim((String)mailInfo.get("subject"));
		String contents			= CommUtils.nvlTrim((String)mailInfo.get("contents"));

		try {
			SimpleEmail email = new SimpleEmail();
			email.setCharset("utf-8");
			email.setHostName(ApplicationProperty.get("mail.host"));

			if (receiverNm.equals(""))
				email.addTo(receiverEmail);
			else
				email.addTo(receiverEmail, receiverNm);

			email.setFrom(senderEmail, senderNm);
			email.setSubject(subject);
			email.setContent(contents, "text/plain; charset=utf-8");
			email.send();

			result = "OK";
		} catch (EmailException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			result = "NOK";
		}

		return result;
	}

	// ComboList Create (Map)
	public static String sendHtmlEmail(Map mailInfo) {
		String result	= "";

		String senderEmail		= CommUtils.nvlTrim((String)mailInfo.get("senderEmail"),    ApplicationProperty.get("mail.senderEmail"));
		String senderNm			= CommUtils.nvlTrim((String)mailInfo.get("senderNm"), 		ApplicationProperty.get("mail.senderNm"));
		String receiverEmail	= CommUtils.nvlTrim((String)mailInfo.get("receiverEmail"));
		String receiverNm		= CommUtils.nvlTrim((String)mailInfo.get("receiverNm"));
		String subject			= CommUtils.nvlTrim((String)mailInfo.get("subject"));
		String contents			= CommUtils.nvlTrim((String)mailInfo.get("contents"));
		String domain			= CommUtils.nvlTrim((String)mailInfo.get("domain"));

		StringBuffer str = new StringBuffer();
		str.append("<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN'>");
		str.append("<html lang='ko'>");
		str.append("<head>");
		str.append("<title>Welcome to Sample</title>");
		str.append("<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>");
		str.append("<style type='text/css'>");
		str.append("<!--.text12 {");
		str.append("	font-family: '굴림', '돋움';");
		str.append("	font-size: 12px;");
		str.append("	line-height: 17px;");
		str.append("	color: #666666;");
		str.append("	letter-spacing: -1px;");
		str.append("}.text12-b {");
		str.append("	font-family: '굴림', '돋움';");
		str.append("	font-size: 12px;");
		str.append("	line-height: 18px;");
		str.append("	font-weight: bold;");
		str.append("	color: #666666;");
		str.append("}-->");
		str.append("</style>");
		str.append("</head>");
		str.append("<body leftmargin='0' topmargin='0' align='center'>");
		str.append("	<table width='80%'>");
		str.append("		<tr>");
		str.append("			<td align='center'><img src='"+domain+"/images/loading/cloading801.gif'></td> ");
		str.append("		</tr>");
		str.append("		<tr>");
		str.append("			<td>"+contents+"</td> ");
		str.append("		</tr>");
		str.append("	</table>");
		str.append("</body>");
		str.append("</html>");

		try {

			HtmlEmail email = new HtmlEmail();
			email.setCharset("utf-8");
			email.setHostName(ApplicationProperty.get("mail.host"));

			if (receiverNm.equals(""))
				email.addTo(receiverEmail);
			else
				email.addTo(receiverEmail, receiverNm);

			email.setFrom(senderEmail, senderNm);
			email.setSubject(subject);
			email.setHtmlMsg(str.toString());
			email.send();

			result = "OK";
		} catch (EmailException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			result = "NOK";
		}

		return result;
	}

}



