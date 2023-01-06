package business.sys.log;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import commf.dao.CommonDAOImpl;

/**
 * AcessControlService
 * ntarget :
 * 2017-01-03 : registration access log
 */
@Service
@SuppressWarnings("all")
public class AccessControlService {

	@Autowired
	private CommonDAOImpl dao;

	public void regiAccessLog(Map map){
		dao.update("AccessControl.regiAccessLog", map);
	}

	public void regiLoginInfo(Map map) {
		dao.update("AccessControl.regiLoginInfo", map);
	}

}
