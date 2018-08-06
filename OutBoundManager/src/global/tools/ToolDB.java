package global.tools;

import java.util.HashMap;
import java.util.Map;

public class ToolDB {
	public final static String DtType_Define = "0";

	public static String getStartDT(String dtType, String startDate) {
		String sStartDT = ToolDateTime.getDate() + " 00:00:00";
		if (DtType_Define.compareToIgnoreCase(dtType) == 0) {
			return startDate + " 00:00:00";
		}

		long lDtType = ToolConvert.toLong(dtType);
		long lStartDTL = ToolDateTime.getDTL(sStartDT);
		lStartDTL -= (lDtType - 1) * 24 * 3600 * 1000;
		sStartDT = ToolDateTime.getDT(lStartDTL);

		return sStartDT;
	}

	public static String getEndDT(String dtType, String endDate) {
		String sEndDT = ToolDateTime.getDate() + " 23:59:59";
		if (DtType_Define.compareToIgnoreCase(dtType) == 0) {
			return endDate + " 23:59:59";
		}

		return sEndDT;
	}

	public static Map<String, Integer> mapPagingParams(String pageNumber, String pageSize, int count) {
		int nPageNumber = ToolConvert.toInt(pageNumber);
		if (nPageNumber < 1) {
			nPageNumber = 1;
		}
		int nPageSize = ToolConvert.toInt(pageSize);
		if (nPageSize < 1) {
			nPageSize = 20;
		}

		int nPageCount = count / nPageSize + ((count % nPageSize) != 0 ? 1 : 0);
		if (nPageCount < 1) {
			nPageCount = 1;
		}

		if (nPageNumber > nPageCount) {
			nPageNumber = nPageCount;
		}

		int nFirst = (nPageNumber - 1) * nPageSize + 1;
		int nLast = nFirst + nPageSize - 1;
		if (nLast > count) {
			nLast = count;
		}

		Map<String, Integer> map = new HashMap<String, Integer>();
		map.put("pageNumber", nPageNumber);
		map.put("pageSize", nPageSize);
		map.put("pageCount", nPageCount);
		map.put("first", nFirst);
		map.put("last", nLast);
		map.put("count", count);

		return map;
	}

	public static String mysqlPaging(Map<String, Integer> map) {
		int nFirst = 0;
		if (map.containsKey("first")) {
			nFirst = map.get("first") - 1;
		}

		int nPageSize = 20;
		if (map.containsKey("pageSize")) {
			nPageSize = map.get("pageSize");
		}

		String s = " LIMIT " + nFirst + ", " + nPageSize;

		return s;
	}
}
