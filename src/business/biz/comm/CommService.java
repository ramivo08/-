package business.biz.comm;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import commf.dao.CommonDAOImpl;
import common.base.BaseService;


@Service
@SuppressWarnings({"rawtypes"})
public class CommService extends BaseService {

	@Autowired
	private CommonDAOImpl dao;

	/**
	 * Combo Code List Search
	 */
    public List listComboCode(Map reqMap) throws Exception {
	    return dao.list("Comm.listCode", reqMap);
	}

    /**
     * Code List Search
     */
    public List listCode(Map reqMap) throws Exception {
    	return dao.list("Comm.listCode", reqMap);
    }

}
