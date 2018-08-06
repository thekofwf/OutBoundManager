package sunin.outbound.controller;

import global.tools.ToolDB;
import global.tools.ToolString;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import sunin.outbound.model.Task;
import sunin.outbound.model.define.ConstTask;
import sunin.outbound.model.define._RespDefine;
import sunin.outbound.service.ITaskService;

@Controller
@RequestMapping("/task")
public class TaskController {
	// 日志实例
	private static final Logger logger = Logger.getLogger(TaskController.class);

	@Autowired
	private ITaskService taskServiceImpl;

	@RequestMapping(value = "/manager")
	public String taskManager() {
		logger.info(this.getClass().getName() + " taskManager : ");

		return "/manager/outboundTask/outboundTask";
	}

	@RequestMapping(value = "/user/tasks", method = RequestMethod.POST, produces = "application/json;charset=UTF-8", consumes = "application/xml;charset=UTF-8")
	public @ResponseBody
	String taskUserTasks(String agentId, String pageNumber, String pageSize, String startDate, String endDate, String currentState) {
		logger.info(this.getClass().getName() + " taskUserTasks : agentId " + agentId + ", pageNumber " + pageNumber + ", pageSize " + pageSize + ", startDate " + startDate + ", endDate " + endDate
				+ ", currentState " + currentState);

		String sCondition = "";
		{
			if (ToolString.isEmpty(startDate)) {
				startDate = "2000-01-01";
			}
			if (ToolString.isEmpty(endDate)) {
				endDate = "2099-12-31";
			}

			sCondition = " WHERE " + ConstTask.userId + "='" + ToolString.toString(agentId) + "'";
			sCondition += " AND (";
			sCondition += "(" + ConstTask.startDate + ">='" + startDate + "' AND " + ConstTask.startDate + "<='" + endDate + "')";
			sCondition += " OR (" + ConstTask.endDate + ">='" + startDate + "' AND " + ConstTask.endDate + "<='" + endDate + "')";
			sCondition += " OR (" + ConstTask.startDate + "<='" + startDate + "' AND " + ConstTask.endDate + ">='" + endDate + "')";
			sCondition += ")";
			if (!ToolString.isEmpty(currentState)) {
				if (ConstTask.currentState_Run.compareToIgnoreCase(currentState) == 0) {
					sCondition += " AND " + ConstTask.currentState + "='" + ConstTask.currentState_Run + "'";
				} else if (ConstTask.currentState_Stop.compareToIgnoreCase(currentState) == 0) {
					sCondition += " AND " + ConstTask.currentState + "='" + ConstTask.currentState_Stop + "'";
				} else if (ConstTask.currentState_Delete.compareToIgnoreCase(currentState) == 0) {
					sCondition += " AND " + ConstTask.currentState + "='" + ConstTask.currentState_Delete + "'";
				}
			}
		}

		int nCount = taskServiceImpl.selectTasksCount(sCondition);

		Map<String, Integer> map = ToolDB.mapPagingParams(pageNumber, pageSize, nCount);

		String sPaging = ToolDB.mysqlPaging(map);

		String sOrderBy = " ORDER BY " + ConstTask.taskName;

		List<Task> listTasks = taskServiceImpl.selectTasks(sCondition + sOrderBy + sPaging);

		List<Object> listReturn = new ArrayList<Object>();
		listReturn.add(map);
		listReturn.add(listTasks);

		JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Success, "taskUserTasks", _RespDefine.ErrorCode_Default, "");
		jsonObject.put(_RespDefine.Data, listReturn);

		return jsonObject.toString();
	}

	@RequestMapping(value = "/add", method = RequestMethod.POST, produces = "application/json;charset=UTF-8", consumes = "application/xml;charset=UTF-8")
	public @ResponseBody
	String taskAdd( Task task) {
		logger.info(this.getClass().getName() + " taskAdd : task " + task.toString());

		task.setRealTimeConcurrentCall("0");
		if (taskServiceImpl.insert(task)) {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Success, "taskAdd", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "");

			return jsonObject.toString();
		} else {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "taskAdd", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "");

			return jsonObject.toString();
		}
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST, produces = "application/json;charset=UTF-8", consumes = "application/xml;charset=UTF-8")
	public @ResponseBody
	String taskSave(Task task) {
		logger.info(this.getClass().getName() + " taskSave : task " + task.toString());

		if (taskServiceImpl.update(task)) {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Success, "taskSave", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "");

			return jsonObject.toString();
		} else {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "taskSave", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "");

			return jsonObject.toString();
		}
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST, produces = "application/json;charset=UTF-8", consumes = "application/xml;charset=UTF-8")
	public @ResponseBody
	String taskDelete(String userId, String taskId) {
		logger.info(this.getClass().getName() + " taskDelete : userId " + userId+", taskId "+taskId);

		Map<String, String> map = new HashMap<String, String>();
		map.put("userId", userId);
		map.put("taskId", taskId);
		map.put("currentState", ConstTask.currentState_Delete);
		if (taskServiceImpl.delete(map)) {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Success, "taskDelete", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "");

			return jsonObject.toString();
		} else {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "taskDelete", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "");

			return jsonObject.toString();
		}
	}

}
