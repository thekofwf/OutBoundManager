package global.tools;

import java.security.MessageDigest;
import java.util.UUID;

import sun.misc.BASE64Encoder;

public class ToolString {
	public static boolean isEmpty(String s) {
		if (s == null || s.isEmpty()) {
			return true;
		}
		return false;
	}

	public static String toString(Object o) {
		if (o == null) {
			return "";
		}

		return o.toString();
	}

	public static String EncoderByMd5(String s) {
		try {
			// 确定计算方法
			MessageDigest md5 = MessageDigest.getInstance("MD5");
			BASE64Encoder base64en = new BASE64Encoder();
			// 加密后的字符串
			String newstr = base64en.encode(md5.digest(s.getBytes("utf-8")));
			return newstr;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "";
	}

	public static String generateUUID() {
		String s = UUID.randomUUID().toString().replace("-", "");

		return s;
	}
}
