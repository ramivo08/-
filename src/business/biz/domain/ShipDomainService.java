package business.biz.domain;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import commf.dao.CommonDAOImpl;
import common.base.BaseService;


/**
 * @author USER
 *
 */
@Service
@SuppressWarnings({"rawtypes"})
public class ShipDomainService extends BaseService {

	@Autowired
	private CommonDAOImpl dao;

    public List getDomainList(Map paramMap) throws Exception {
	    return dao.list("Domain.getDomainList", paramMap);
	}

    public boolean updateDomain(Map paramMap) throws Exception {
    	return dao.update("Domain.updateDomain", paramMap) == 1 ? true : false;
    }
    public boolean removeDomain(Map paramMap) throws Exception {
    	return dao.delete("Domain.removeDomain", paramMap) == 1 ? true : false;
    }
    
    
    public boolean addDomain(Map paramMap){
    	try {
    		dao.insert("Domain.addDomain", paramMap);
    		return true;
    	} catch(Exception e) {
    		e.printStackTrace();
    		
    		return false;
    	}
    }
    
}
