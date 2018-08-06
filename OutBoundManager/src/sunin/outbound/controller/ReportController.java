package sunin.outbound.controller;

import global.tools.ToolConfig;
import global.tools.ToolConvert;
import global.tools.ToolDB;
import global.tools.ToolDateTime;
import global.tools.ToolExcelExport;

import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import project.tools.DBRecord;
import sunin.outbound.model.Orktape;
import sunin.outbound.model.define.ConstApplicationDetail;
import sunin.outbound.model.define.ConstCallDetail;
import sunin.outbound.model.define.ConstJobList;
import sunin.outbound.model.define._RespDefine;
import sunin.outbound.service.IPublicService;

@Controller
@RequestMapping("/report")
public class ReportController {
	// 日志实例
	private static final Logger logger = Logger.getLogger(ReportController.class);

	@Autowired
	private IPublicService publicServiceImpl;

	@RequestMapping(value = "/test")
	public String reportTest() {
		logger.info(this.getClass().getName() + " reportTest : ");

		return "/manager/report/report";
	}

	@RequestMapping(value = "/query01", method = RequestMethod.POST, produces = "application/json;charset=UTF-8", consumes = "application/xml;charset=UTF-8")
	public @ResponseBody
	String reportQuery01(String taskId, String dtType, String startDate, String endDate) {
		// 拨打结果统计
		logger.info(this.getClass().getName() + " reportQuery01 : taskId " + taskId + ", dtType " + dtType + ", startDate " + startDate + ", endDate " + endDate);

		String sSql = "";
		String sStartDT = "";
		String sEndDT = "";
		{
			sStartDT = ToolDB.getStartDT(dtType, startDate);
			sEndDT = ToolDB.getEndDT(dtType, endDate);

			sSql = "SELECT " + ConstJobList.reasonCode + " reasonCode, COUNT(*) count";
			sSql += " FROM " + ConstJobList.TableName_Real_Prefix + taskId;
			sSql += " WHERE " + ConstJobList.reasonCode + "<>''";
			sSql += " AND " + ConstJobList.startTime + ">='" + sStartDT + "' AND " + ConstJobList.startTime + "<='" + sEndDT + "'";
			sSql += " GROUP BY " + ConstJobList.reasonCode;
		}

		System.out.println(sSql);

		List<Map<String, Object>> listMap = publicServiceImpl.selectPublic(sSql);

		List<Object> listReturn = new ArrayList<Object>();
		listReturn.add(listMap);
		listReturn.add(sStartDT);
		listReturn.add(sEndDT);

		JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Success, "reportQuery01", _RespDefine.ErrorCode_Default, "");
		jsonObject.put(_RespDefine.Data, listReturn);

		return jsonObject.toString();
	}

	@RequestMapping(value = "/query02", method = RequestMethod.POST, produces = "application/json;charset=UTF-8", consumes = "application/xml;charset=UTF-8")
	public @ResponseBody
	String reportQuery02(String taskId) {
		// 实时数据监控
		logger.info(this.getClass().getName() + " reportQuery02 : taskId " + taskId);

		String sSql = "";
		{
			sSql = "SELECT " + ConstJobList.currentStatus + " currentStatus, COUNT(*) count";
			sSql += " FROM " + ConstJobList.TableName_Real_Prefix + taskId;
			sSql += " WHERE " + ConstJobList.currentStatus + "='" + ConstJobList.currentStatus_OutDialInProgress + "' OR " + ConstJobList.currentStatus + "='"
					+ ConstJobList.currentStatus_OutDialPending + "'";
			sSql += " GROUP BY " + ConstJobList.currentStatus;
		}

		System.out.println(sSql);

		List<Map<String, Object>> listMap = publicServiceImpl.selectPublic(sSql);

		List<Object> listReturn = new ArrayList<Object>();
		listReturn.add(listMap);

		JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Success, "reportQuery02", _RespDefine.ErrorCode_Default, "");
		jsonObject.put(_RespDefine.Data, listReturn);

		return jsonObject.toString();
	}

	@RequestMapping(value = "/query03", method = RequestMethod.POST, produces = "application/json;charset=UTF-8", consumes = "application/xml;charset=UTF-8")
	public @ResponseBody
	String reportQuery03(String taskId) {
		// 48小时统计
		logger.info(this.getClass().getName() + " reportQuery03 : taskId " + taskId);

		List<String> listX = new ArrayList<String>();
		Map<String, Integer> mapX2Index = new HashMap<String, Integer>();

		String sEndDT = ToolDateTime.getDT();
		String sBeginDT = ToolDateTime.getDT(ToolDateTime.getDTL(sEndDT) - 2L * 24 * 3600 * 1000);

		long lBeginDTL = ToolDateTime.getDTL(sBeginDT);
		for (int i = 0; i < 49; i++) {
			String sTemp = ToolDateTime.getDT(lBeginDTL + 1L * 3600 * 1000 * i);
			sTemp = sTemp.substring(0, 13);
			listX.add(sTemp);
			mapX2Index.put(sTemp, i);
		}

		String sSql = "";
		{
			sSql = "SELECT LEFT(DATE_FORMAT(" + ConstJobList.startTime + ",'%Y-%m-%d %H'),13) startTime," + ConstJobList.currentStatus + " currentStatus, COUNT(*) count";
			sSql += " FROM " + ConstJobList.TableName_Real_Prefix + taskId;
			sSql += " WHERE (" + ConstJobList.currentStatus + "='" + ConstJobList.currentStatus_NotEligible + "' OR " + ConstJobList.currentStatus + "='"
					+ ConstJobList.currentStatus_OutDialAttemptesExhausted + "')";
			sSql += " AND " + ConstJobList.startTime + ">='" + sBeginDT + "' AND " + ConstJobList.startTime + "<='" + sEndDT + "'";
			sSql += " GROUP BY LEFT(" + ConstJobList.startTime + ",13), " + ConstJobList.currentStatus;
		}

		System.out.println(sSql);

		List<Map<String, Object>> listMap = publicServiceImpl.selectPublic(sSql);

		List<Object> listReturn = new ArrayList<Object>();
		listReturn.add(listX);
		listReturn.add(listMap);

		JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Success, "reportQuery03", _RespDefine.ErrorCode_Default, "");
		jsonObject.put(_RespDefine.Data, listReturn);

		return jsonObject.toString();
	}

	@RequestMapping(value = "/query04", method = RequestMethod.POST, produces = "application/json;charset=UTF-8", consumes = "application/xml;charset=UTF-8")
	public @ResponseBody
	String reportQuery04(String taskId, String dataType, String pageNumber, String pageSize) {
		// 通话详单
		logger.info(this.getClass().getName() + " reportQuery04 : taskId " + taskId + ", dataType " + dataType + ", pageNumber " + pageNumber + ", pageSize " + pageSize);

		System.out.println(ToolConfig.getCurrentPath());
		String sSql = "";
		{
			sSql = "SELECT COUNT(*)";
			sSql += " FROM " + ConstJobList.TableName_Real_Prefix + taskId;
			if ("0".compareToIgnoreCase(dataType) == 0) {
				// 所有
			} else if ("1".compareToIgnoreCase(dataType) == 0) {
				// 已完成通话
				sSql += " WHERE " + ConstJobList.currentStatus + "='" + ConstJobList.currentStatus_NotEligible + "'";
			} else if ("2".compareToIgnoreCase(dataType) == 0) {
				// 通话失败
				sSql += " WHERE " + ConstJobList.currentStatus + "='" + ConstJobList.currentStatus_OutDialAttemptesExhausted + "'";
			} else if ("3".compareToIgnoreCase(dataType) == 0) {
				// 未进行的通话
				sSql += " WHERE " + ConstJobList.currentStatus + "='" + ConstJobList.currentStatus_OutDialPending + "'";
			}
		}
		System.out.println(sSql);

		int nCount = publicServiceImpl.selectPublicCount(sSql);
		Map<String, Integer> map = ToolDB.mapPagingParams(pageNumber, pageSize, nCount);
		String sPaging = ToolDB.mysqlPaging(map);

		{
			sSql = "SELECT " + ConstJobList.id + " id, " + ConstJobList.dnis + " dnis, " + ConstJobList.currentStatus + " currentStatus, " + ConstJobList.reasonCode + " reasonCode, "
					+ ConstJobList.uui + " uui, DATE_FORMAT(" + ConstJobList.startTime + ",'%Y-%m-%d %H:%i:%S') startTime, DATE_FORMAT(" + ConstJobList.endTime
					+ ",'%Y-%m-%d %H:%i:%S') endTime, TIMESTAMPDIFF(SECOND," + ConstJobList.startTime + "," + ConstJobList.endTime + ") timeLength, " + ConstJobList.attempts + " attempts, "
					+ ConstJobList.callId + " callId";
			sSql += " FROM " + ConstJobList.TableName_Real_Prefix + taskId;
			if ("0".compareToIgnoreCase(dataType) == 0) {
				// 所有
			} else if ("1".compareToIgnoreCase(dataType) == 0) {
				// 已完成通话
				sSql += " WHERE " + ConstJobList.currentStatus + "='" + ConstJobList.currentStatus_NotEligible + "'";
			} else if ("2".compareToIgnoreCase(dataType) == 0) {
				// 通话失败
				sSql += " WHERE " + ConstJobList.currentStatus + "='" + ConstJobList.currentStatus_OutDialAttemptesExhausted + "'";
			} else if ("3".compareToIgnoreCase(dataType) == 0) {
				// 未进行的通话
				sSql += " WHERE " + ConstJobList.currentStatus + "='" + ConstJobList.currentStatus_OutDialPending + "'";
			}
			sSql += " ORDER BY " + ConstJobList.lastUpdated;
			sSql += sPaging;
		}
		List<Map<String, Object>> listMap = publicServiceImpl.selectPublic(sSql);

		List<List<Orktape>> listListOrktapes = new ArrayList<List<Orktape>>();
		DBRecord dbRecord = new DBRecord();

		for (int i = 0; i < listMap.size(); i++) {
			Map<String, Object> mapTemp = listMap.get(i);
			String callId = ToolConvert.toString(mapTemp.get("callId"));
			if (callId.isEmpty()) {
				listListOrktapes.add(new ArrayList<Orktape>());
			} else {
				listListOrktapes.add(dbRecord.getRecord(callId));
			}
		}

		List<Object> listReturn = new ArrayList<Object>();
		listReturn.add(map);
		listReturn.add(listMap);
		listReturn.add(listListOrktapes);

		JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Success, "reportQuery04", _RespDefine.ErrorCode_Default, "");
		jsonObject.put(_RespDefine.Data, listReturn);

		return jsonObject.toString();
	}

	@RequestMapping(value = "/excel04", method = RequestMethod.GET, produces = "application/vnd.ms-excel;charset=UTF-8")
	public @ResponseBody
	void reportExcel04(String taskId, String dataType, HttpServletRequest request, HttpServletResponse response) {
		// 通话详单
		logger.info(this.getClass().getName() + " reportExcel04 : taskId " + taskId + ", dataType " + dataType);

		String sSql = "";
		{
			sSql = "SELECT " + ConstJobList.id + " id, " + ConstJobList.dnis + " dnis, " + ConstJobList.currentStatus + " currentStatus, " + ConstJobList.reasonCode + " reasonCode, "
					+ ConstJobList.uui + " uui, DATE_FORMAT(" + ConstJobList.startTime + ",'%Y-%m-%d %H:%i:%S') startTime, DATE_FORMAT(" + ConstJobList.endTime
					+ ",'%Y-%m-%d %H:%i:%S') endTime, TIMESTAMPDIFF(SECOND," + ConstJobList.startTime + "," + ConstJobList.endTime + ") timeLength, " + ConstJobList.attempts + " attempts";
			sSql += " FROM " + ConstJobList.TableName_Real_Prefix + taskId;
			if ("0".compareToIgnoreCase(dataType) == 0) {
				// 所有
			} else if ("1".compareToIgnoreCase(dataType) == 0) {
				// 已完成通话
				sSql += " WHERE " + ConstJobList.currentStatus + "='" + ConstJobList.currentStatus_NotEligible + "'";
			} else if ("2".compareToIgnoreCase(dataType) == 0) {
				// 通话失败
				sSql += " WHERE " + ConstJobList.currentStatus + "='" + ConstJobList.currentStatus_OutDialAttemptesExhausted + "'";
			} else if ("3".compareToIgnoreCase(dataType) == 0) {
				// 未进行的通话
				sSql += " WHERE " + ConstJobList.currentStatus + "='" + ConstJobList.currentStatus_OutDialPending + "'";
			}
			sSql += " ORDER BY " + ConstJobList.lastUpdated;
		}
		List<Map<String, Object>> listMap = publicServiceImpl.selectPublic(sSql);

		List<String> listTitle = new ArrayList<String>();
		listTitle.add("号码");
		listTitle.add("号码状态");
		listTitle.add("拨打结果");
		listTitle.add("标签");
		listTitle.add("开始时间");
		listTitle.add("结束时间");
		listTitle.add("时长");
		listTitle.add("拨打次数");

		List<Object[]> listDatas = new ArrayList<Object[]>();
		for (int i = 0; i < listMap.size(); i++) {
			Map<String, Object> map = listMap.get(i);
			Object[] datas = new Object[listTitle.size()];
			int index = 0;
			datas[index++] = map.get("dnis");
			datas[index++] = ConstJobList.getCurrentStatusName(ToolConvert.toString(map.get("currentStatus")));
			datas[index++] = ConstJobList.getReasonCodeName(ToolConvert.toString(map.get("reasonCode")));
			datas[index++] = map.get("uui");
			datas[index++] = map.get("startTime");
			datas[index++] = map.get("endTime");
			datas[index++] = map.get("timeLength");
			datas[index++] = map.get("attempts");

			listDatas.add(datas);
		}

		OutputStream out = null;
		try {
			ToolExcelExport toolExcelExport = new ToolExcelExport();
			Workbook workbook = toolExcelExport.print("通话详单", listTitle, listDatas, true);

			response.reset();
			response.setContentType("application/vnd.ms-excel;chartset=utf-8");
			// 报头用于提供一个推荐的文件名，并强制浏览器显示保存对话框
			// attachment表示以附件方式下载。如果要在页面中打开，则改为 inline
			response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("通话详单-" + ToolDateTime.getDTyyyyMMddHHmmss() + ".xls", "UTF-8"));

			out = response.getOutputStream();

			workbook.write(out);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (out != null) {
					out.flush();
					out.close();
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	@RequestMapping(value = "/query05", method = RequestMethod.POST, produces = "application/json;charset=UTF-8", consumes = "application/xml;charset=UTF-8")
	public @ResponseBody
	String reportQuery05(String taskId, String lengthMin, String lengthMax, String keyWord, String pageNumber, String pageSize) {
		// 客户回复
		logger.info(this.getClass().getName() + " reportQuery05 : taskId " + taskId + ", lengthMin " + lengthMin + ", lengthMax " + lengthMax + ", keyWord " + keyWord + ", pageNumber " + pageNumber
				+ ", pageSize " + pageSize);

		int nLengthMin = ToolConvert.toInt(lengthMin);
		int nLengthMax = ToolConvert.toInt(lengthMax);

		keyWord = ToolConvert.toString(keyWord);

		String sSql = "";
		{
			sSql = "SELECT COUNT(*)";
			sSql += " FROM " + ConstJobList.TableName_Real_Prefix + taskId + " a, " + ConstCallDetail.TableName_Real_Prefix + taskId + " b, " + ConstApplicationDetail.TableName_Real + " c";
			sSql += " WHERE a." + ConstJobList.id + "=b." + ConstCallDetail.id;
			sSql += " AND b." + ConstCallDetail.contentId + "=c." + ConstApplicationDetail.contentId;
			if (nLengthMin > 0) {
				sSql += " AND TIMESTAMPDIFF(SECOND, a." + ConstJobList.startTime + ", a." + ConstJobList.endTime + ")>=" + nLengthMin;
			}
			if (nLengthMax > 0) {
				sSql += " AND TIMESTAMPDIFF(SECOND, a." + ConstJobList.startTime + ", a." + ConstJobList.endTime + ")<=" + nLengthMin;
			}
			if (!keyWord.isEmpty()) {
				sSql += " AND b." + ConstCallDetail.callerInput + " LIKE '%" + keyWord + "%'";
			}
		}
		System.out.println(sSql);

		int nCount = publicServiceImpl.selectPublicCount(sSql);
		Map<String, Integer> map = ToolDB.mapPagingParams(pageNumber, pageSize, nCount);
		String sPaging = ToolDB.mysqlPaging(map);

		{
			sSql = "SELECT a." + ConstJobList.dnis + " dnis, c." + ConstApplicationDetail.content + " ivrContent, b." + ConstCallDetail.callerInput + " callerInput, DATE_FORMAT(a."
					+ ConstJobList.startTime + ",'%Y-%m-%d %H:%i:%S') startTime, DATE_FORMAT(a." + ConstJobList.endTime + ",'%Y-%m-%d %H:%i:%S') endTime, TIMESTAMPDIFF(SECOND, a."
					+ ConstJobList.startTime + ", a." + ConstJobList.endTime + ") timeLength, a." + ConstJobList.attempts + " attempts";
			sSql += " FROM " + ConstJobList.TableName_Real_Prefix + taskId + " a, " + ConstCallDetail.TableName_Real_Prefix + taskId + " b, " + ConstApplicationDetail.TableName_Real + " c";
			sSql += " WHERE a." + ConstJobList.id + "=b." + ConstCallDetail.id;
			sSql += " AND b." + ConstCallDetail.contentId + "=c." + ConstApplicationDetail.contentId;
			if (nLengthMin > 0) {
				sSql += " AND TIMESTAMPDIFF(SECOND, a." + ConstJobList.startTime + ", a." + ConstJobList.endTime + ")>=" + nLengthMin;
			}
			if (nLengthMax > 0) {
				sSql += " AND TIMESTAMPDIFF(SECOND, a." + ConstJobList.startTime + ", a." + ConstJobList.endTime + ")<=" + nLengthMin;
			}
			if (!keyWord.isEmpty()) {
				sSql += " AND b." + ConstCallDetail.callerInput + " LIKE '%" + keyWord + "%'";
			}
			sSql += " ORDER BY a." + ConstJobList.lastUpdated;
			sSql += sPaging;
		}
		List<Map<String, Object>> listMap = publicServiceImpl.selectPublic(sSql);

		List<Object> listReturn = new ArrayList<Object>();
		listReturn.add(map);
		listReturn.add(listMap);

		JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Success, "reportQuery05", _RespDefine.ErrorCode_Default, "");
		jsonObject.put(_RespDefine.Data, listReturn);

		return jsonObject.toString();
	}

	@RequestMapping(value = "/excel05", method = RequestMethod.GET, produces = "application/vnd.ms-excel;charset=UTF-8")
	public @ResponseBody
	void reportExcel05(String taskId, String lengthMin, String lengthMax, String keyWord, HttpServletRequest request, HttpServletResponse response) {
		// 客户回复
		logger.info(this.getClass().getName() + " reportExcel05 : taskId " + taskId + ", lengthMin " + lengthMin + ", lengthMax " + lengthMax + ", keyWord " + keyWord);

		int nLengthMin = ToolConvert.toInt(lengthMin);
		int nLengthMax = ToolConvert.toInt(lengthMax);

		keyWord = ToolConvert.toString(keyWord);

		String sSql = "";
		{
			sSql = "SELECT a." + ConstJobList.dnis + " dnis, c." + ConstApplicationDetail.content + " ivrContent, b." + ConstCallDetail.callerInput + " callerInput, DATE_FORMAT(a."
					+ ConstJobList.startTime + ",'%Y-%m-%d %H:%i:%S') startTime, DATE_FORMAT(a." + ConstJobList.endTime + ",'%Y-%m-%d %H:%i:%S') endTime, TIMESTAMPDIFF(SECOND, a."
					+ ConstJobList.startTime + ", a." + ConstJobList.endTime + ") timeLength, a." + ConstJobList.attempts + " attempts";
			sSql += " FROM " + ConstJobList.TableName_Real_Prefix + taskId + " a, " + ConstCallDetail.TableName_Real_Prefix + taskId + " b, " + ConstApplicationDetail.TableName_Real + " c";
			sSql += " WHERE a." + ConstJobList.id + "=b." + ConstCallDetail.id;
			sSql += " AND b." + ConstCallDetail.contentId + "=c." + ConstApplicationDetail.contentId;
			if (nLengthMin > 0) {
				sSql += " AND TIMESTAMPDIFF(SECOND, a." + ConstJobList.startTime + ", a." + ConstJobList.endTime + ")>=" + nLengthMin;
			}
			if (nLengthMax > 0) {
				sSql += " AND TIMESTAMPDIFF(SECOND, a." + ConstJobList.startTime + ", a." + ConstJobList.endTime + ")<=" + nLengthMin;
			}
			if (!keyWord.isEmpty()) {
				sSql += " AND b." + ConstCallDetail.callerInput + " LIKE '%" + keyWord + "%'";
			}
			sSql += " ORDER BY a." + ConstJobList.lastUpdated;
		}
		List<Map<String, Object>> listMap = publicServiceImpl.selectPublic(sSql);

		List<String> listTitle = new ArrayList<String>();
		listTitle.add("号码");
		listTitle.add("信息");
		listTitle.add("回复信息");
		listTitle.add("开始时间");
		listTitle.add("结束时间");
		listTitle.add("时长");
		listTitle.add("拨打次数");

		List<Object[]> listDatas = new ArrayList<Object[]>();
		for (int i = 0; i < listMap.size(); i++) {
			Map<String, Object> map = listMap.get(i);
			Object[] datas = new Object[listTitle.size()];
			int index = 0;
			datas[index++] = map.get("dnis");
			datas[index++] = map.get("ivrContent");
			datas[index++] = map.get("callerInput");
			datas[index++] = map.get("startTime");
			datas[index++] = map.get("endTime");
			datas[index++] = map.get("timeLength");
			datas[index++] = map.get("attempts");

			listDatas.add(datas);
		}

		OutputStream out = null;
		try {
			ToolExcelExport toolExcelExport = new ToolExcelExport();
			Workbook workbook = toolExcelExport.print("客户回复", listTitle, listDatas, true);

			response.reset();
			response.setContentType("application/vnd.ms-excel;chartset=utf-8");
			// 报头用于提供一个推荐的文件名，并强制浏览器显示保存对话框
			// attachment表示以附件方式下载。如果要在页面中打开，则改为 inline
			response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode("客户回复-" + ToolDateTime.getDTyyyyMMddHHmmss() + ".xls", "UTF-8"));

			out = response.getOutputStream();

			workbook.write(out);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (out != null) {
					out.flush();
					out.close();
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
}
