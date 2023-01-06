/*
 * Created on 2011. 7. 21.
 *
 * ntarget
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */

package common.tag;

import java.io.StringWriter;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.exception.VelocityException;
import org.springframework.ui.velocity.VelocityEngineUtils;
import org.springframework.web.context.support.WebApplicationContextUtils;

import commf.message.Message;

@SuppressWarnings("all")
public class ButtonTag extends TagSupport {

	private String name;
	private String id;
	private String jsFunction;
	private String width;
	private String icon;
	private String style;

	private String TEMPLATE_BUTTON			= "common/templates/button_list.vm";

	/*
	 * (non-Javadoc)
	 *
	 * @see javax.servlet.jsp.tagext.Tag#doEndTag()
	 */
	public int doStartTag() throws JspException {
		int page = 1;

		HttpServletRequest request = (HttpServletRequest)pageContext.getRequest();

		try {
			if (id == null) {
				return SKIP_BODY; // Nothing to output
			}

			String pagingIndex = buttonListStr();

			JspWriter out = pageContext.getOut();
			out.println(pagingIndex);

		} catch (Exception e) {
            throw new JspException(e);
		}

		return SKIP_BODY;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String buttonListStr() throws Exception {

		// get button name
		String btnName	= "";
		if (name == null)
			btnName = (String)Message.getMessage("btn."+id);
		else
			btnName = name;

		// get style	(Default gray, blue)
		String styleName 	= "";
		if (style == null || style == "blue") {
			if (icon == null)
				styleName = "button middle_bt";
			else
				styleName = "button middle_bt icon";
		} else if (style == "gray") {
			styleName = "button gray_bt mgt_1";
		} else
			styleName	= style;

		String widthName = "";
		if(width != null)
			widthName = "style='width:"+width+"px'";



		HashMap model = new HashMap();
		model.put("id",		 			id);
		model.put("name", 				btnName);
		model.put("jsFunction",			jsFunction);
		model.put("width",				widthName);
		model.put("icon",				icon);
		model.put("style",				styleName);

		StringWriter writer = new StringWriter();

		VelocityEngine velocityEngine = (VelocityEngine) WebApplicationContextUtils.getRequiredWebApplicationContext(pageContext.getServletContext()).getBean("velocityEngine");

		try {
			VelocityEngineUtils.mergeTemplate(velocityEngine, TEMPLATE_BUTTON, model, writer);
		} catch (VelocityException e) {
			e.printStackTrace();
		}

		return writer.toString();
	}

	/**
	 * @return
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param string
	 */
	public void setName(String string) {
		name = string;
	}



	public String getJsFunction() {
		return jsFunction;
	}

	public void setJsFunction(String jsFunction) {
		this.jsFunction = jsFunction;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTEMPLATE_BUTTON() {
		return TEMPLATE_BUTTON;
	}

	public void setTEMPLATE_BUTTON(String tEMPLATEBUTTON) {
		TEMPLATE_BUTTON = tEMPLATEBUTTON;
	}

	public String getStyle() {
		return style;
	}

	public void setStyle(String style) {
		this.style = style;
	}

	public String getWidth() {
		return width;
	}

	public void setWidth(String width) {
		this.width = width;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}



}
