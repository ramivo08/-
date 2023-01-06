package business.sys.authority;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import commf.dao.CommonDAOImpl;

/**
 * AuthorityService
 * ntarget :
 * 2017-01-01 : registration authority check
 */
@Service

@SuppressWarnings("all")
public class AuthorityService {

	@Autowired
	private CommonDAOImpl dao;

	public Map getAuthorityUser(Map map) {
		return (HashMap)dao.view("Authority.getAuthorityUser", map);
	}

}
