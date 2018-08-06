package global.tools;

import java.text.DecimalFormat;

public class ToolConvert {

	public static String toString(Object obj) {
		if (obj == null)
			return "";
		return obj.toString();
	}

	public static String toString(String s) {
		if (s == null)
			return "";
		return s;
	}

	public static String toString(int n) {
		return n + "";
	}

	public static String fixLength(String sSource, int nLength, char cFix) {
		while (sSource.length() < nLength) {
			sSource = cFix + sSource;
		}
		return sSource;
	}

	public static String toString(float f) {
		DecimalFormat df = new DecimalFormat("##0.00");
		String s = df.format(f);
		return s;
	}

	public static String toString(long l) {
		return l + "";
	}

	public static int toInt(int n) {
		return n;
	}

	public static int toInt(String s) {
		int n = 0;
		try {
			n = Integer.parseInt(s);
		} catch (Exception e) {
		} finally {
		}
		return n;
	}

	public static int toInt(Object obj) {
		int n = 0;
		try {
			n = Integer.parseInt(obj.toString());
		} catch (Exception e) {
		} finally {
		}
		return n;
	}

	public static long toLong(String s) {
		long l = 0L;
		try {
			l = Long.parseLong(s);
		} catch (Exception e) {
		} finally {
		}
		return l;
	}

	public static long toLong(Object obj) {
		long l = 0L;
		try {
			l = Long.parseLong(obj.toString());
		} catch (Exception e) {
		} finally {
		}
		return l;
	}

	public static float toFloat(String s) {
		float f = 0f;
		try {
			f = Float.parseFloat(s);
		} catch (Exception e) {
		} finally {
		}
		return f;
	}

	public static float toFloat(Object obj) {
		float f = 0f;
		try {
			f = Float.parseFloat(obj.toString());
		} catch (Exception e) {
		} finally {
		}
		return f;
	}

	public static long getIntFromString(String s) {
		String sValue = "0";
		for (int i = 0; i < s.length(); i++) {
			char c = s.charAt(i);
			if (Character.isDigit(c)) {
				sValue += c;
			} else {
				break;
			}
		}
		return toLong(sValue);
	}

	public static float getFloatFromString(String s) {
		boolean bDot = false;
		String sValue = "0";
		for (int i = 0; i < s.length(); i++) {
			char c = s.charAt(i);
			if (Character.isDigit(c)) {
				sValue += c;
			} else if (c == '.') {
				if (bDot) {
					break;
				}
				sValue += c;
			}
		}
		return toFloat(sValue);
	}

	public static byte[] toBytes(int num) {
		byte[] byteNum = new byte[4];
		for (int ix = 0; ix < 4; ++ix) {
			int offset = 32 - (ix + 1) * 8;
			byteNum[3 - ix] = (byte) ((num >> offset) & 0xff);
		}
		return byteNum;
	}

	// public static int toInt(byte[] byteNum) {
	// int num = 0;
	// for (int ix = 0; ix < 4; ++ix) {
	// num <<= 8;
	// num |= (byteNum[ix] & 0xff);
	// }
	// return num;
	// }
	//
	// public static byte int2OneByte(int num) {
	// return (byte) (num & 0x000000ff);
	// }
	//
	// public static int oneByte2Int(byte byteNum) {
	// // 针对正数的int
	// return byteNum > 0 ? byteNum : (128 + (128 + byteNum));
	// }
	//
	// public static byte[] toBytes(long num) {
	// byte[] byteNum = new byte[8];
	// for (int ix = 0; ix < 8; ++ix) {
	// int offset = 64 - (ix + 1) * 8;
	// byteNum[ix] = (byte) ((num >> offset) & 0xff);
	// }
	// return byteNum;
	// }
	//
	// public static long toLong(byte[] byteNum) {
	// long num = 0;
	// for (int ix = 0; ix < 8; ++ix) {
	// num <<= 8;
	// num |= (byteNum[ix] & 0xff);
	// }
	// return num;
	// }
}
