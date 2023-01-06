package common.base;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.beanutils.PropertyUtils;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import commf.message.Message;
import common.user.UserInfo;
import common.util.CommUtils;

/**
 * Program Name : BaseController
 * Description :
 * Programmer Name : ntarget
 * Creation Date : 2017-01-09
 * Used Table :
 */

@Aspect
@SuppressWarnings("all")
public abstract class BaseController {

	protected final Logger logger = LoggerFactory.getLogger(getClass());

	public BaseController() {
	}

	@Autowired
	protected UserInfo userInfo;

	@Resource(name="message")
	protected Message message;

	public HttpServletRequest request = null;

	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}

	protected int BASE_PAGE = 1;
	protected int CURR_PAGE = 1;
	protected int PAGE_SIZE = 15;
	protected int PAGE_BBS_SIZE = 10;
	protected int PAGE_YS_SIZE = 25;
	protected int FILE_SIZE = 20;


	protected String GRID_DATA = null;
	protected String USER_DATA = null;

	protected String ajaxView = "jsonView";	// default "jsonView", another "xmlView"

    public String getErrMessage(Exception ex) {
    	String msg = "";

    	if (ex.toString().indexOf("EgovBizException") >= 0) {
    		msg = ex.getMessage();
    	} else {
    		msg = "Error !! : "+ex.toString();
    	}

    	return msg;
    }

	protected HashMap getParameterMap(HttpServletRequest req, boolean sessionFlag) {
		setRequest(req);

		HashMap map = new HashMap();

		map = getParameterMap(req);

		if (sessionFlag) {
			userInfo = (UserInfo) req.getSession().getValue("userInfo");
			if(userInfo == null) return null;
			setPropertyUtilsBean(map, userInfo);	// UserInfo Bean -> Map Setting(Rename)
		}
		return map;
	}


	protected HashMap getParameterMap(HttpServletRequest req) {
		setRequest(req);

		HashMap map = new HashMap();

		Enumeration enm = req.getParameterNames();

		String name = null;
		String value = null;
		String[] arr = null;

		while (enm.hasMoreElements()) {
			name = (String) enm.nextElement();
			arr = req.getParameterValues(name);

			if (name.startsWith("arr")) {
				map.put(name, arr);
			} else {
				if (arr != null && arr.length > 0) {
					value = arr[0];
				} else {
					value = req.getParameter(name);
				}

				map.put(name, value);
			}
		}

		// Request Parameters For GRID
		this.GRID_DATA = (String) map.get("jqGridParams");
		JSONArray jsonArray = null;
		List listGrid = new ArrayList();

		if (this.GRID_DATA != null) {
			JSONObject jsonObject = JSONObject.fromObject(this.GRID_DATA);
			String mode = "";
			for (Iterator<String> names = jsonObject.keySet().iterator(); names.hasNext();) {
				mode = names.next();

				if (mode != null) {
					if (jsonObject.containsKey(mode)) {
						jsonArray = jsonObject.getJSONArray(mode);

						Map jmap = null;
						JSONObject object = null;
						for (int i = 0; i < jsonArray.size(); i++) {
							object = (JSONObject) jsonArray.getJSONObject(i);

							jmap = (HashMap) JSONObject.toBean(object, java.util.HashMap.class);

							listGrid.add(jmap);
						}

						map.put(mode, listGrid);
					}
				}
			}
			map.remove("jqGridParams");
		}

		// Request Parameters For GRID -> jqUserParams
		this.USER_DATA = (String) map.get("jqUserParams");
		if (this.USER_DATA != null) {
			JSONObject jsonObject = JSONObject.fromObject(this.USER_DATA);
			Map jmap = (HashMap) JSONObject.toBean(jsonObject, java.util.HashMap.class);

			if (!jmap.isEmpty()) {
				Iterator k = jmap.keySet().iterator();
				String key = "";
				while (k.hasNext()) {
					key = (String) k.next();
					map.put(key, jmap.get(key));
				}
			}
			map.remove("jqUserParams");
		}

		// Return View (ajax)
		if (!CommUtils.nvlTrim((String)map.get("returnType")).equals("")
				&& !CommUtils.nvlTrim((String)map.get("oper")).equals("")) {
			ajaxView = CommUtils.nvlTrim((String)map.get("returnType"));
		} else {
			ajaxView = "jsonView";
		}

		return map;
	}

	// Get Method Name
	protected String getMethodName(Throwable trb) {
		StackTraceElement[] stacks = trb.getStackTrace();
		StackTraceElement currentStack = stacks[0];
		return currentStack.getMethodName();
	}

	protected void setPropertyUtilsBean(Map map, UserInfo user) {
		try {
			Map userMap = new HashMap();
			userMap = PropertyUtils.describe(user);
			// Serializable Object excluded.
			userMap.remove("advisors");
			userMap.remove("class");
			userMap.remove("callbacks");
			userMap.remove("exposeProxy");
			userMap.remove("frozen");
			userMap.remove("preFiltered");
			userMap.remove("proxiedInterfaces");
			userMap.remove("proxyTargetClass");
			userMap.remove("targetClass");
			userMap.remove("targetObject");
			userMap.remove("targetSource");

			Iterator k = userMap.keySet().iterator();
			String key = "";
			while (k.hasNext()) {
				key = (String) k.next();
				map.put("gs"+CommUtils.toUpper(CommUtils.substring(key, 0, 1))+CommUtils.substring(key, 1)
						, userMap.get(key));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void resultFlag(String msg) {
		request.getSession().setAttribute("PROCFLAG", msg);
	}

}
