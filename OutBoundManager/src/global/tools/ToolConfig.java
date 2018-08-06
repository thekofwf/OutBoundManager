package global.tools;

import global.tools.ToolLog.LevelEx;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Properties;

public class ToolConfig {
	private static String FILE_NAME = "configEx.properties";
	private static String CURRENT_PATH;
	static {
		CURRENT_PATH = System.getProperty("user.dir") + "/webapps/OutBoundManager/WEB-INF";
	}

	public static String getCurrentPath() {
		return CURRENT_PATH;
	}

	private static String getBase(String sKey, String sDefault) {
		String sValue = sDefault;
		try {
			Properties props = new Properties();
			// System.out.println(UnisonConfig.class.getClassLoader().getResource(""));
			// System.out.println(System.getProperty("java.class.path"));
			// System.out.println(System.getProperty("user.dir"));
			InputStream is = new FileInputStream(CURRENT_PATH + "/" + FILE_NAME);
			props.load(is);
			sValue = props.getProperty(sKey);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sValue;
	}

	public static String getByLog(String sKey) {
		String sValue = getBase(sKey, "");
		System.out.println("get key : " + sKey + ", value : " + sValue);
		return sValue;
	}

	public static String get(String sKey, String sDefault) {
		String sValue = getBase(sKey, sDefault);
		ToolLog.log(LevelEx.KEY, "get key : " + sKey + ", value : " + sValue);
		return sValue;
	}

	public static String get(String strKey) {
		return get(strKey, "");
	}

}
