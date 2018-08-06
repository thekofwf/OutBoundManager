package sunin.outbound.controller;

import global.tools.ToolConvert;
import global.tools.ToolDB;
import global.tools.ToolString;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import sunin.outbound.model.Batch;
import sunin.outbound.model.JobList;
import sunin.outbound.model.define.ConstBatch;
import sunin.outbound.model.define.ConstJobList;
import sunin.outbound.model.define._RespDefine;
import sunin.outbound.service.IBatchService;
import sunin.outbound.service.IJobListService;

@Controller
@RequestMapping("/taskdata")
public class TaskDataController {
	// 日志实例
	private static final Logger logger = Logger.getLogger(TaskDataController.class);

	@Autowired
	private IBatchService batchServiceImpl;
	@Autowired
	private IJobListService jobListServiceImpl;

	@RequestMapping(value = "/manager")
	public String taskdataManager() {
		logger.info(this.getClass().getName() + " taskdataManager : ");

		return "/manager/outboundTask/outboundTaskData";
	}

	@RequestMapping(value = "/batchs", method = RequestMethod.POST, produces = "application/json;charset=UTF-8", consumes = "application/xml;charset=UTF-8")
	public @ResponseBody
	String taskdataBatchs(String taskId, String pageNumber, String pageSize) {
		logger.info(this.getClass().getName() + " taskUserTasks : taskId " + taskId + ", pageNumber " + pageNumber + ", pageSize " + pageSize);

		String sCondition = "";
		{
			sCondition = " WHERE " + ConstBatch.taskId + "='" + ToolString.toString(taskId) + "'";
		}

		int nCount = batchServiceImpl.selectBatchsCount(sCondition);

		Map<String, Integer> map = ToolDB.mapPagingParams(pageNumber, pageSize, nCount);

		String sPaging = ToolDB.mysqlPaging(map);

		String sOrderBy = " ORDER BY " + ConstBatch.batchId + " DESC";

		List<Batch> listBatchs = batchServiceImpl.selectBatchs(sCondition + sOrderBy + sPaging);

		List<Object> listReturn = new ArrayList<Object>();
		listReturn.add(map);
		listReturn.add(listBatchs);

		JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Success, "taskdataBatchs", _RespDefine.ErrorCode_Default, "");
		jsonObject.put(_RespDefine.Data, listReturn);

		return jsonObject.toString();
	}

	@RequestMapping(value = "/batch/add", method = RequestMethod.POST, produces = "application/json;charset=UTF-8", consumes = "application/xml;charset=UTF-8")
	public @ResponseBody
	String taskdataBatchAdd(String taskId, String batchName, String batchState) {
		logger.info(this.getClass().getName() + " taskdataBatchAdd : taskId " + taskId + ", batchName " + batchName + ", batchState " + batchState);

		Batch batch = new Batch();
		batch.setBatchId(0);
		batch.setTaskId(ToolConvert.toInt(taskId));
		batch.setBatchName(batchName);
		batch.setBatchState(batchState);
		if (batchServiceImpl.insert(batch)) {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Success, "taskdataBatchAdd", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "");

			return jsonObject.toString();
		} else {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "taskdataBatchAdd", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "");

			return jsonObject.toString();
		}
	}

	@RequestMapping(value = "/batch/save", method = RequestMethod.POST, produces = "application/json;charset=UTF-8", consumes = "application/xml;charset=UTF-8")
	public @ResponseBody
	String taskdataBatchSave(String batchId, String batchName) {
		logger.info(this.getClass().getName() + " taskdataBatchSave : batchId " + batchId + ", batchName " + batchName);

		Batch batch = new Batch();
		batch.setBatchId(ToolConvert.toInt(batchId));
		batch.setBatchName(batchName);
		if (batchServiceImpl.update(batch)) {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Success, "taskdataBatchSave", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "");

			return jsonObject.toString();
		} else {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "taskdataBatchSave", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "");

			return jsonObject.toString();
		}
	}

	@RequestMapping(value = "/batch/start", method = RequestMethod.POST, produces = "application/json;charset=UTF-8", consumes = "application/xml;charset=UTF-8")
	public @ResponseBody
	String taskdataBatchStart(String taskId, String batchId) {
		logger.info(this.getClass().getName() + " taskdataBatchStart : taskId " + taskId + ", batchId " + batchId);

		Map<String, String> map = new HashMap<String, String>();
		map.put("batchId", batchId);
		map.put("batchState", ConstBatch.batchState_Run);
		if (batchServiceImpl.changeState(map)) {
			map.clear();
			map.put("table", ConstJobList.TableName_Real_Prefix + taskId);
			map.put("state", ConstJobList.currentStatus_Run);
			map.put("stateOld1", ConstJobList.currentStatus_Stop);
			map.put("stateOld2", ConstJobList.currentStatus_Run);
			map.put("batchId", batchId);
			if (jobListServiceImpl.changeState(map)) {
				JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Success, "taskdataBatchStart", _RespDefine.ErrorCode_Default, "");
				jsonObject.put(_RespDefine.Data, "");

				return jsonObject.toString();
			} else {
				JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "taskdataBatchStart", _RespDefine.ErrorCode_Default, "");
				jsonObject.put(_RespDefine.Data, "");

				return jsonObject.toString();
			}
		} else {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "taskdataBatchStart", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "");

			return jsonObject.toString();
		}
	}

	@RequestMapping(value = "/batch/stop", method = RequestMethod.POST, produces = "application/json;charset=UTF-8", consumes = "application/xml;charset=UTF-8")
	public @ResponseBody
	String taskdataBatchStop(String taskId, String batchId) {
		logger.info(this.getClass().getName() + " taskdataBatchStop : taskId " + taskId + ", batchId " + batchId);

		Map<String, String> map = new HashMap<String, String>();
		map.put("batchId", batchId);
		map.put("batchState", ConstBatch.batchState_Stop);
		if (batchServiceImpl.changeState(map)) {
			map.clear();
			map.put("table", ConstJobList.TableName_Real_Prefix + taskId);
			map.put("state", ConstJobList.currentStatus_Stop);
			map.put("stateOld1", ConstJobList.currentStatus_Stop);
			map.put("stateOld2", ConstJobList.currentStatus_Run);
			map.put("batchId", batchId);
			if (jobListServiceImpl.changeState(map)) {
				JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Success, "taskdataBatchStop", _RespDefine.ErrorCode_Default, "");
				jsonObject.put(_RespDefine.Data, "");

				return jsonObject.toString();
			} else {
				JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "taskdataBatchStop", _RespDefine.ErrorCode_Default, "");
				jsonObject.put(_RespDefine.Data, "");

				return jsonObject.toString();
			}
		} else {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "taskdataBatchStop", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "");

			return jsonObject.toString();
		}
	}

	@RequestMapping(value = "/batch/delete", method = RequestMethod.POST, produces = "application/json;charset=UTF-8", consumes = "application/xml;charset=UTF-8")
	public @ResponseBody
	String taskdataBatchDelete(String taskId, String batchId) {
		logger.info(this.getClass().getName() + " taskdataBatchDelete : taskId " + taskId + ", batchId " + batchId);

		Map<String, String> map = new HashMap<String, String>();
		map.put("batchId", batchId);
		map.put("batchState", ConstBatch.batchState_Delete);
		if (batchServiceImpl.changeState(map)) {
			map.clear();
			map.put("table", ConstJobList.TableName_Real_Prefix + taskId);
			map.put("state", ConstJobList.currentStatus_Delete);
			map.put("stateOld1", ConstJobList.currentStatus_Stop);
			map.put("stateOld2", ConstJobList.currentStatus_Run);
			map.put("batchId", batchId);
			if (jobListServiceImpl.changeState(map)) {
				JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Success, "taskdataBatchDelete", _RespDefine.ErrorCode_Default, "");
				jsonObject.put(_RespDefine.Data, "");

				return jsonObject.toString();
			} else {
				JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "taskdataBatchDelete", _RespDefine.ErrorCode_Default, "");
				jsonObject.put(_RespDefine.Data, "");

				return jsonObject.toString();
			}
		} else {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "taskdataBatchDelete", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "");

			return jsonObject.toString();
		}
	}

	@RequestMapping(value = "/batch/datas", method = RequestMethod.POST, produces = "application/json;charset=UTF-8", consumes = "application/xml;charset=UTF-8")
	public @ResponseBody
	String taskdataBatchDatas(String taskId, String batchId, String pageNumber, String pageSize) {
		logger.info(this.getClass().getName() + " taskUserTasks : taskId " + taskId + ", batchId " + batchId + ", pageNumber " + pageNumber + ", pageSize " + pageSize);

		String sTableName = ConstJobList.TableName_Real_Prefix + taskId;
		String sCondition = "";
		{
			sCondition = " WHERE " + ConstJobList.taskId + "='" + ToolString.toString(taskId) + "'";
			sCondition += " AND " + ConstJobList.taskBatchId + "='" + ToolString.toString(batchId) + "'";
		}

		int nCount = jobListServiceImpl.selectJobListsCount(ConstJobList.getSelectJobListsCountParam(sTableName, sCondition));

		Map<String, Integer> map = ToolDB.mapPagingParams(pageNumber, pageSize, nCount);

		String sPaging = ToolDB.mysqlPaging(map);

		String sOrderBy = " ORDER BY " + ConstJobList.id + " ASC";

		List<JobList> listJobLists = jobListServiceImpl.selectJobLists(ConstJobList.getSelectJobListsParam(sTableName, sCondition + sOrderBy + sPaging));

		List<Object> listReturn = new ArrayList<Object>();
		listReturn.add(map);
		listReturn.add(listJobLists);

		JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Success, "taskdataBatchDatas", _RespDefine.ErrorCode_Default, "");
		jsonObject.put(_RespDefine.Data, listReturn);

		return jsonObject.toString();
	}

	@RequestMapping(value = "/datas/upload", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public void taskdataDatasUpload(String taskIdImport, String batchIdImport, @RequestPart("fileUpload") MultipartFile file, HttpServletResponse response) throws IOException {
		// 导入第一行为标头,不导入数据库
		// 导入第一列为编号,不使用
		// 导入第二列为号码

		boolean bSuccess = false;
		String sResult = "";
		int nTotal = 0;
		int nTotalSuccess = 0;
		int nTotalFailed = 0;
		try {
			sResult = "生成文件失败！";
			File fileNew = new File("/" + UUID.randomUUID() + file.getOriginalFilename());
			file.transferTo(fileNew);

			sResult = "读取 " + file.getName() + " 失败！";
			XSSFWorkbook xssfWorkbook = new XSSFWorkbook(new FileInputStream(fileNew));
			int nSheets = xssfWorkbook.getNumberOfSheets();
			for (int nSheet = 0; nSheet < nSheets; nSheet++) {
				XSSFSheet xssfSheet = xssfWorkbook.getSheetAt(nSheet);

				int nColumnCount = 0;
				if (xssfSheet.getRow(0) != null) {
					nColumnCount = xssfSheet.getRow(0).getLastCellNum() - xssfSheet.getRow(0).getFirstCellNum();
				}

				if (nColumnCount > 0) {
					boolean bFirst = true;
					for (Row row : xssfSheet) {
						if (bFirst) {
							bFirst = false;
							continue;
						}
						String[] sRow = new String[nColumnCount];
						int n = 0;
						for (int i = 0; i < nColumnCount; i++) {
							Cell cell = row.getCell(i, Row.CREATE_NULL_AS_BLANK);
							switch (cell.getCellType()) {
							case Cell.CELL_TYPE_BLANK:
								sRow[n] = "";
								// if (cell == null || cell.equals("") || cell.getCellType() == HSSFCell.CELL_TYPE_BLANK) {
								// System.out.print("<Null>|");
								// } else {
								// System.out.print(sRow[n] + "|");
								// }
								break;
							case Cell.CELL_TYPE_BOOLEAN:
								sRow[n] = Boolean.toString(cell.getBooleanCellValue());
								break;
							case Cell.CELL_TYPE_NUMERIC:
								if (DateUtil.isCellDateFormatted(cell)) {
									SimpleDateFormat sdf = null;
									if (cell.getCellStyle().getDataFormat() == HSSFDataFormat.getBuiltinFormat("h:mm")) {
										sdf = new SimpleDateFormat("HH:mm");
									} else {
										sdf = new SimpleDateFormat("yyyy-MM-dd");
									}
									Date date = cell.getDateCellValue();
									sRow[n] = sdf.format(date);
								} else {
									cell.setCellType(Cell.CELL_TYPE_STRING);
									String temp = cell.getStringCellValue();
									if (temp.indexOf(".") > -1) {
										sRow[n] = String.valueOf(new Double(temp)).trim();
									} else {
										sRow[n] = temp.trim();
									}
								}
								break;
							case Cell.CELL_TYPE_STRING:
								sRow[n] = cell.getStringCellValue();
								break;
							case Cell.CELL_TYPE_ERROR:
								sRow[n] = "";
								break;
							case Cell.CELL_TYPE_FORMULA:
								cell.setCellType(Cell.CELL_TYPE_STRING);
								String temp = cell.getStringCellValue();
								if (temp.indexOf(".") > -1) {
									temp = String.valueOf(new Double(temp)).trim();
									Double cny = Double.parseDouble(temp);
									DecimalFormat df = new DecimalFormat("0.00");
									sRow[n] = df.format(cny);
								} else {
									sRow[n] = temp.trim();
								}
							}
							System.out.print(sRow[n] + " ");
							n++;
						}

						JobList jobList = new JobList();
						jobList.initializeValue(sRow, taskIdImport, batchIdImport);
						Map<String, Object> map = new HashMap<String, Object>();
						map.put("table", ConstJobList.TableName_Real_Prefix + taskIdImport);
						map.put("jobList", jobList);

						System.out.println(jobList.toString());
						nTotal++;
						if (jobListServiceImpl.insert(map)) {
							nTotalSuccess++;
							System.out.println("-->success");
						} else {
							nTotalFailed++;
							System.out.println("-->failed");
						}
					}
				}
			}

			fileNew.delete();

			sResult = "";
			bSuccess = true;
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			JSONObject jsonObject = null;
			if (bSuccess) {
				jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Success, "taskdataDatasUpload", _RespDefine.ErrorCode_Default, "");
				jsonObject.put(_RespDefine.Data, "total " + nTotal + " success " + nTotalSuccess + " failed " + nTotalFailed);
			} else {
				jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "taskdataDatasUpload", _RespDefine.ErrorCode_Default, "");
				jsonObject.put(_RespDefine.Data, sResult);
			}

			try {
				// response.setContentType("application/json");
				PrintWriter out = response.getWriter();
				out.write(jsonObject.toString());
			} catch (Exception e1) {
				e1.printStackTrace();
			}
		}
	}
}
