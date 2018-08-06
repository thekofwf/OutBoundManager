package global.tools;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

public class ToolDateTime {
	public static String getDate() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String strDate = sdf.format(new Date());

		return strDate;
	}

	public static String getTime() {
		SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
		String strTime = sdf.format(new Date());

		return strTime;
	}

	public static String getDT() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String strDT = sdf.format(new Date());

		return strDT;
	}

	public static String getYear() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy");
		String strYear = sdf.format(new Date());

		return strYear;
	}

	public static String getDT(long lDTL) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return sdf.format(new Date(lDTL));
	}

	public static String getDTyyyyMMddHHmmss() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		String strDT = sdf.format(new Date());

		return strDT;
	}

	public static long getDTL() {
		long lDTL = System.currentTimeMillis();
		return lDTL;
	}

	public static long getDTL(String sDT) {
		long lDTL = 0L;
		try {
			if (sDT != null) {
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				lDTL = sdf.parse(sDT).getTime();
			}
		} catch (ParseException e) {
			lDTL = 0L;
		}
		return lDTL;
	}

	public static long getSeconds(String sDTBegin, String sDTEnd) {
		if (sDTBegin == null || sDTBegin.length() == 0 || sDTEnd == null || sDTEnd.length() == 0)
			return 0L;

		long lDTLBegin = getDTL(sDTBegin);
		long lDTLEnd = getDTL(sDTEnd);

		if (lDTLBegin == 0 || lDTLEnd == 0)
			return 0L;

		return (lDTLEnd - lDTLBegin) / 1000;
	}

	// 0 1 2 3 4 5 6
	// 日一二三四五六
	public static int getWeekDay(String sDT) {
		try {
			Calendar calendar = Calendar.getInstance();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date date;
			date = sdf.parse(sDT);
			calendar.setTime(date);
			return calendar.get(Calendar.DAY_OF_WEEK) - 1;
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return -1;
	}

	public static String getWeek() {
		SimpleDateFormat sdf = new SimpleDateFormat("E", Locale.US);
		String week = sdf.format(new Date());
		return week;
	}

}
