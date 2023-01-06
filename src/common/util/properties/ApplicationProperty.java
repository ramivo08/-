package common.util.properties;

import java.io.IOException;
import java.util.Properties;

public class ApplicationProperty
{
	static Properties props = new Properties();

	static {
		try {
			props.load(Thread.currentThread().getContextClassLoader().getResourceAsStream("/egovframework/config/app.properties"));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static String get(String key) {
		return props.getProperty(key);
	}

	public static int getInt(String key) {
		return Integer.parseInt(props.getProperty(key));
	}

	public static boolean getBoolean(String key) {
	    return Boolean.valueOf(props.getProperty(key)).booleanValue();
	}

	private String daoConfig;

	/**
	 * @return
	 */
	public String getDaoConfig() {
		return daoConfig;
	}

	/**
	 * @param string
	 */
	public void setDaoConfig(String string) {
		daoConfig = string;
	}
}
