package business.sys.user;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibatis.common.jdbc.exception.RuntimeSQLException;

import commf.dao.CommonDAOImpl;
import common.base.BaseService;
import common.user.UserInfo;
import common.util.paging.PaginatedArrayList;


@Service
@SuppressWarnings("all")
public class UserInfoService extends BaseService {

	@Autowired
	private CommonDAOImpl dao;

	/* USERINFO GET */
	public UserInfo getUserInfo(Map user) {
		UserInfo userInfo = (UserInfo)dao.view("UserInfo.getUserInfo", user);
		return userInfo;
	}
	
	public List getUserInfoList() {
		return dao.list("UserInfo.getUserInfoList");
	}
	
	public PaginatedArrayList getUserInfoList(Map paramMap, int currPage, int pageSize) throws Exception {
		return dao.pageList("UserInfo.getUserInfoList", paramMap, currPage, pageSize);
	}
	
	public String getRoleName(String roleId) {
		return (String) dao.select("UserInfo.getRoleName", roleId);
	}
	
	public List getRoleList() {
		return dao.list("UserInfo.getRoleList");
	}
	
	public Boolean checkUserInfo(Map paramMap){
		return (Boolean) dao.select("UserInfo.checkUserInfo", paramMap);
	}
	
	public boolean registerUser(Map paramMap) {
		try {
			dao.insert("UserInfo.registerUser", paramMap);
			return true;
		} catch(Exception e) {
			System.out.println("sql error");
			return false;
		}
	}
	
	public String getUserId(Map paramMap) {
		return (String) dao.view("UserInfo.getUserId", paramMap);
	}
	
	public boolean deleteRememberId(Map paramMap) {
		return dao.delete("UserInfo.deleteRmemberId", paramMap) == 1 ? true : false;
	}
	
	public String rememberId(Map paramMap) {
		String cookieId = (String) dao.select("UserInfo.randomCookieId");
		
		paramMap.put("cookieId", cookieId);
		try {
			dao.insert("UserInfo.rememberId", paramMap);
		} catch(Exception e) {
			e.printStackTrace();
			return null;
		}
		
		
		return cookieId;
	}
	
	public String getUserEmail(Map paramMap) {
		return (String) dao.view("UserInfo.getUserEmail", paramMap);
	}
	
	public boolean initPwd(Map paramMap) {
		return dao.update("UserInfo.initPwd", paramMap) == 1 ? true : false;
	}
	
	
	public boolean deleteUser(String userId) {
		return dao.delete("UserInfo.deleteUser", userId) == 1 ? true : false;
	}
	
	public boolean changeUserInfo(Map paramMap) {
		return dao.update("UserInfo.changeUserInfo", paramMap) == 1 ? true : false;
	}

	public int checkId(Map paramMap) {
		// TODO Auto-generated method stub
		return (int) dao.select("UserInfo.checkId",paramMap);
	}
	

}