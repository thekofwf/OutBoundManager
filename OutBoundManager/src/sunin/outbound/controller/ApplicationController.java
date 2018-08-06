package sunin.outbound.controller;

import global.tools.ToolConvert;
import global.tools.ToolDB;
import global.tools.ToolString;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import sunin.outbound.model.Application;
import sunin.outbound.model.User;
import sunin.outbound.model.define.ConstApplication;
import sunin.outbound.model.define.ConstUser;
import sunin.outbound.model.define._RespDefine;
import sunin.outbound.service.IApplicationService;
import sunin.outbound.service.IUserService;

@Controller
@RequestMapping("/application")
public class ApplicationController {
	// 日志实例
	private static final Logger logger = Logger.getLogger(ApplicationController.class);

	@Autowired
	private IUserService userServiceImpl;
	@Autowired
	private IApplicationService applicationServiceImpl;

	@RequestMapping(value = "/manager")
	public String applicationManager() {
		logger.info(this.getClass().getName() + " applicationManager : ");

		return "/manager/application/application";
	}

	@RequestMapping(value = "/applications", method = RequestMethod.POST, produces = "application/json;charset=UTF-8", consumes = "application/xml;charset=UTF-8")
	public @ResponseBody
	String applicationApplications(String agentId, String userInfo, String pageNumber, String pageSize) {
		logger.info(this.getClass().getName() + " applicationApplications : agentId " + agentId + ", userInfo " + userInfo + ", pageNumber " + pageNumber + ", pageSize " + pageSize);

		if (!checkOperator(agentId, userInfo)) {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "applicationApplications", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "未授权!");

			return jsonObject.toString();
		}

		int nCount = applicationServiceImpl.selectApplicationsCount();

		Map<String, Integer> map = ToolDB.mapPagingParams(pageNumber, pageSize, nCount);

		String sPaging = ToolDB.mysqlPaging(map);

		String sCondition = " ORDER BY " + ConstApplication.name;

		List<Application> listApplications = applicationServiceImpl.selectApplications(sCondition + sPaging);

		List<Object> listReturn = new ArrayList<Object>();
		listReturn.add(map);
		listReturn.add(listApplications);

		JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Success, "applicationApplications", _RespDefine.ErrorCode_Default, "");
		jsonObject.put(_RespDefine.Data, listReturn);

		return jsonObject.toString();
	}

	@RequestMapping(value = "/add", method = RequestMethod.POST, produces = "application/json;charset=UTF-8", consumes = "application/xml;charset=UTF-8")
	public @ResponseBody
	String applicationAdd(String agentId, String userInfo, String name, String status, String description) {
		logger.info(this.getClass().getName() + " applicationAdd : agentId " + agentId + ", userInfo " + userInfo + ", name " + name + ", status " + status + ", description " + description);

		if (!checkOperator(agentId, userInfo)) {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "applicationAdd", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "未授权!");

			return jsonObject.toString();
		}

		Application application = new Application();
		application.setName(name);
		application.setStatus(status);
		application.setDescription(description);
		if (applicationServiceImpl.insert(application)) {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Success, "applicationAdd", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "");

			return jsonObject.toString();
		} else {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "applicationAdd", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "");

			return jsonObject.toString();
		}
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST, produces = "application/json;charset=UTF-8", consumes = "application/xml;charset=UTF-8")
	public @ResponseBody
	String applicationSave(String agentId, String userInfo, String id, String name, String description) {
		logger.info(this.getClass().getName() + " applicationSave : agentId " + agentId + ", userInfo " + userInfo + ", id " + id + ", name " + name + ", description " + description);

		if (!checkOperator(agentId, userInfo)) {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "applicationSave", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "未授权!");

			return jsonObject.toString();
		}

		Application application = new Application();
		application.setId(ToolConvert.toInt(id));
		application.setName(name);
		application.setDescription(description);
		if (applicationServiceImpl.update(application)) {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Success, "applicationSave", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "");

			return jsonObject.toString();
		} else {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "applicationSave", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "");

			return jsonObject.toString();
		}
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST, produces = "application/json;charset=UTF-8", consumes = "application/xml;charset=UTF-8")
	public @ResponseBody
	String applicationDelete(String agentId, String userInfo, String id) {
		logger.info(this.getClass().getName() + " applicationDelete : agentId " + agentId + ", userInfo " + userInfo + ", id " + id);

		if (!checkOperator(agentId, userInfo)) {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "applicationDelete", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "未授权!");

			return jsonObject.toString();
		}

		Application application = new Application();
		application.setId(ToolConvert.toInt(id));
		application.setStatus(ConstApplication.status_Deleted);
		if (applicationServiceImpl.delete(application)) {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Success, "applicationDelete", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "");

			return jsonObject.toString();
		} else {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "applicationDelete", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "");

			return jsonObject.toString();
		}
	}

	private boolean checkOperator(String agentId, String userInfo) {
		User user = userServiceImpl.selectByName(agentId);
		if (user != null && userInfo.compareToIgnoreCase(ToolString.EncoderByMd5(user.getUserPwd())) == 0 && user.getUserLevel().compareToIgnoreCase(ConstUser.userLevel_Admin) == 0) {
			return true;
		}
		return false;
	}
}
