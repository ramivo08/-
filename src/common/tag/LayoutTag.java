/*
 * Created on 2011. 5. 30.
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package common.tag;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.exception.VelocityException;
import org.springframework.ui.velocity.VelocityEngineUtils;
import org.springframework.web.context.support.WebApplicationContextUtils;

import commf.message.Message;
import common.util.CommUtils;
import common.util.properties.ApplicationProperty;

@SuppressWarnings("all")
public class LayoutTag extends TagSupport {

	private final Log logger = LogFactory.getLog(getClass());

	private String mode 	= "header";
	private String type 	= "normal";
	private String title 	= "";
	private String style	= "";	//화면 레이아웃   STYLE CLASS KEY
	private String icon		= "";   //화면 제목아이콘 CLASS KEY
	
	private final String TEMPLATE_HEADER			= "common/templates/layout_header.vm";
	private final String TEMPLATE_HEADER_POPUP		= "common/templates/layout_header_popup.vm";
	private final String TEMPLATE_FOOTER			= "common/templates/layout_footer.vm";
	private final String TEMPLATE_FOOTER_POPUP		= "common/templates/layout_footer_popup.vm";
	private final String TEMPLATE_STYLESCRIPT		= "common/templates/layout_stylescript.vm";

	/*
	 * (non-Javadoc)
	 *
	 * @see javax.servlet.jsp.tagext.Tag#doEndTag()
	 */
	public int doStartTag() throws JspException {
		try {
			if (mode == null) {
				return SKIP_BODY; // Nothing to output
			}
			HttpServletRequest request 	= (HttpServletRequest)pageContext.getRequest();
			Map pageMap = (HashMap)request.getSession().getAttribute(ApplicationProperty.get("SESS.PAGEINFO"));
			List menuList = (List)request.getSession().getAttribute(ApplicationProperty.get("SESS.MENUINFO"));

			Map reqMap = getParameterMap(request);

			Map params = new HashMap();

			if (reqMap != null)
				params.put("param", reqMap);			// Request 정보
			if (pageMap != null)
				params.put("pageInfo", pageMap);		// 페이지정보 및 세션정보
			if (menuList != null)
				params.put("menuList", menuList);		// 메뉴정보

			String str = "";
			if		("header".equals(mode))				str = header(params);
			else if	("headerPopup".equals(mode))		str = headerPopup(params);
			else if	("footer".equals(mode))				str = footer(params);
			else if	("footerPopup".equals(mode))		str = footerPopup(params);
			else if	("stylescript".equals(mode)) 		str = stylescript(params);

		    JspWriter out = pageContext.getOut();
		    out.println(str);

		} catch (Exception e) {
			throw new Error("LayoutTag("+mode+") Error!", e);
		}
		return SKIP_BODY;
	}

	private String header(Map params) {
		params.put("contextPath", ((HttpServletRequest) pageContext.getRequest()).getContextPath());
		params.put("type" , this.type);
		params.put("icon" , this.icon);
		params.put("style", this.style);
		params.put("title", _getHeaderTitle(params));

		return _merge(params, TEMPLATE_HEADER);
	}

	private String headerPopup(Map params) {
		params.put("contextPath", ((HttpServletRequest) pageContext.getRequest()).getContextPath());
		params.put("type" , this.type);
		params.put("icon" , this.icon);
		params.put("style", this.style);
		params.put("title", _getHeaderTitle(params));

		return _merge(params, TEMPLATE_HEADER_POPUP);
	}

	private String footerPopup(Map params) {
		Map map = new HashMap();
		map.put("contextPath", ((HttpServletRequest) pageContext.getRequest()).getContextPath());
		return _merge(map, TEMPLATE_FOOTER_POPUP);
	}

	private String footer(Map params) {
		Map map = new HashMap();
		map.put("contextPath", ((HttpServletRequest) pageContext.getRequest()).getContextPath());
		map.put("type" , this.type);
		map.put("footerTxt", Message.getMessage("title.com.footerTxt"));
		return _merge(map, TEMPLATE_FOOTER);
	}

	private String stylescript(Map params) {
		HttpServletRequest request 	= (HttpServletRequest)pageContext.getRequest();
		Map map = new HashMap();
		String requestUri 	= request.getRequestURI();
		String currPage		= requestUri.substring(requestUri.lastIndexOf("/"));
		currPage			= currPage.substring(0, currPage.lastIndexOf("."));

		String currPath		= requestUri.substring(0, requestUri.lastIndexOf("/"));
		currPath			= currPath.substring(currPath.lastIndexOf("/")+1);

		String contextPath 	= request.getContextPath();

		map.put("currPage", 	currPath + currPage);
		map.put("contextPath", 	contextPath);
		map.put("type", 		this.type);
		map.put("locale", 		CommUtils.substring(request.getLocale().toString(), 0, 2));

		return _merge(map, TEMPLATE_STYLESCRIPT);
	}

	//VELOCITY 템플릿과 MERGE
	@SuppressWarnings("rawtypes")
	private String _merge(Map params, String template) {
		StringWriter writer	= new StringWriter();

		try {
			VelocityEngine velocityEngine = (VelocityEngine) WebApplicationContextUtils
			.getRequiredWebApplicationContext(pageContext.getServletContext()).getBean("velocityEngine");

			VelocityEngineUtils.mergeTemplate(velocityEngine, template, params, writer);
		} catch (VelocityException e) {
			e.printStackTrace();
		}
		return writer.toString();
	}

	private String _getHeaderTitle(Map params) {
		String titleNm = "";

		if ((Map)params.get("pageInfo") != null)
				titleNm = (String)((Map)params.get("pageInfo")).get("titleNm");

		if (this.title != null && !"".equals(this.title)) {
			if ((String)Message.getMessage(this.title) == null)
				titleNm = this.title;
			else
				titleNm = (String)Message.getMessage(this.title);
		}

		return titleNm;
	}

	private HashMap getParameterMap(HttpServletRequest req) {
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
		return map;
	}

	public String getMode() {
		return mode;
	}
	public void setMode(String mode) {
		this.mode = mode;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getStyle() {
		return style;
	}
	public void setStyle(String style) {
		this.style = style;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
}
