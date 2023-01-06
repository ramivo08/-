package business.biz.comm;

import java.util.Random;

import javax.mail.Message.RecipientType;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class UserMailSendService {

	@Autowired
	private JavaMailSender mailSender;

	// 이메일 난수 만드는 메서드
	private String init() {
		Random ran = new Random();
		StringBuffer sb = new StringBuffer();
		int num = 0;

		do {
			num = ran.nextInt(75) + 48;
			if ((num >= 48 && num <= 57) || (num >= 65 && num <= 90) || (num >= 97 && num <= 122)) {
				sb.append((char) num);
			} else {
				continue;
			}

		} while (sb.length() < size);
		if (lowerCheck) {
			return sb.toString().toLowerCase();
		}
		return sb.toString();
	}

	// 난수를 이용한 키 생성
	private boolean lowerCheck;
	private int size;

	public String getKey(boolean lowerCheck, int size) {
		this.lowerCheck = lowerCheck;
		this.size = size;
		return init();
	}

	// 회원가입 발송 이메일(인증키 발송)
	public String mailSendWithUserKey(String e_mail, String user_id, HttpServletRequest request) {
		
		String key = getKey(false, 20);
		MimeMessage mail = mailSender.createMimeMessage();
		String htmlStr = "<h2>안녕하세요!</h2><br><br>" 
				+ "<h3>" + user_id + "님</h3><br><br>" + "<p>귀하의 가입 인증번호 : " 
				+ "<a href='http://localhost:8080" + request.getContextPath() + "/verifyAuthEmailCode.do?userId="+ user_id +"&authCode="+key+"'>인증하기</a></p>"
				+ "(혹시 잘못 전달된 메일이라면 이 이메일을 무시하셔도 됩니다)";
		System.out.println("contextPath : " + request.getContextPath());
		try {
			mail.setSubject("[본인인증] 가입 인증 메일", "utf-8");
			mail.setText(htmlStr, "utf-8", "html");
			mail.addRecipient(RecipientType.TO, new InternetAddress(e_mail));
			mailSender.send(mail);
			
		} catch (MessagingException e) {
			e.printStackTrace();
			
		} finally {
			return key;
		}
		
		
		
		// 아마존 주소 : http://54.180.117.142/MS/user/key_alter?user_id=
	}
	
	public String mailSendUserPwd(String e_mail, HttpServletRequest request) {
		String key = getKey(false, 10);
		MimeMessage mail = mailSender.createMimeMessage();
		String htmlStr = "<h2>변경된 비밀번호 : "+ key + "</h2><br><br>" 
				+ "(혹시 잘못 전달된 메일이라면 이 이메일을 무시하셔도 됩니다)";
		
		try {
			mail.setSubject("[본인인증] 비밀번호 초기화", "utf-8");
			mail.setText(htmlStr, "utf-8", "html");
			mail.addRecipient(RecipientType.TO, new InternetAddress(e_mail));
			mailSender.send(mail);
			
		} catch (MessagingException e) {
			e.printStackTrace();
			
		} finally {
			return key;
		}
	}
}