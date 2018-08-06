package sunin.outbound.controller;

import global.tools.ToolConst;
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
import sunin.outbound.model.UserApplication;
import sunin.outbound.model.define.ConstApplication;
import sunin.outbound.model.define.ConstUser;
import sunin.outbound.model.define.ConstUserApplication;
import sunin.outbound.model.define._RespDefine;
import sunin.outbound.service.IApplicationService;
import sunin.outbound.service.IUserApplicationService;
import sunin.outbound.service.IUserService;

@Controller
@RequestMapping("/user")
public class UserController {
	// 日志实例
	private static final Logger logger = Logger.getLogger(UserController.class);

	@Autowired
	private IUserService userServiceImpl;
	@Autowired
	private IUserApplicationService userApplicationServiceImpl;
	@Autowired
	private IApplicationService applicationServiceImpl;

	@RequestMapping(value = "/manager")
	public String userManager() {
		logger.info(this.getClass().getName() + " userManager : ");

		return "/manager/user/user";
	}

	@RequestMapping(value = "/pwd")
	public String userPwd() {
		logger.info(this.getClass().getName() + " userPwd : ");

		return "/manager/user/pwd";
	}

	@RequestMapping(value = "/users", method = RequestMethod.POST, produces = "application/json;charset=UTF-8", consumes = "application/xml;charset=UTF-8")
	public @ResponseBody
	String userUsers(String agentId, String userInfo, String pageNumber, String pageSize) {
		logger.info(this.getClass().getName() + " userUsers : agentId " + agentId + ", userInfo " + userInfo + ", pageNumber " + pageNumber + ", pageSize " + pageSize);

		if (!checkOperator(agentId, userInfo)) {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "userUsers", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "未授权!");

			return jsonObject.toString();
		}

		int nCount = userServiceImpl.selectUsersCount();

		Map<String, Integer> map = ToolDB.mapPagingParams(pageNumber, pageSize, nCount);

		String sPaging = ToolDB.mysqlPaging(map);

		List<User> listUsers = userServiceImpl.selectUsers(sPaging);

		List<Object> listReturn = new ArrayList<Object>();
		listReturn.add(map);
		listReturn.add(listUsers);

		JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Success, "userUsers", _RespDefine.ErrorCode_Default, "");
		jsonObject.put(_RespDefine.Data, listReturn);

		return jsonObject.toString();
	}

	@RequestMapping(value = "/add", method = RequestMethod.POST, produces = "application/json;charset=UTF-8", consumes = "application/xml;charset=UTF-8")
	public @ResponseBody
	String userAdd(String agentId, String userInfo, String userName, String userLevel, String maxConcurrent) {
		logger.info(this.getClass().getName() + " userAdd : agentId " + agentId + ", userInfo " + userInfo + ", userName " + userName + ", userLevel " + userLevel + ", maxConcurrent " + maxConcurrent);

		if (!checkOperator(agentId, userInfo)) {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "userAdd", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "未授权!");

			return jsonObject.toString();
		}

		User user = new User();
		user.setUserName(userName);
		user.setUserPwd(ConstUser.userPwd_Default);
		user.setUserLevel(userLevel);
		user.setMaxConcurrent(ToolConvert.toInt(maxConcurrent));
		if (userServiceImpl.insert(user)) {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Success, "userAdd", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "");

			return jsonObject.toString();
		} else {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "userAdd", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "");

			return jsonObject.toString();
		}
	}

	@RequestMapping(value = "/resetPwd", method = RequestMethod.POST, produces = "application/json;charset=UTF-8", consumes = "application/xml;charset=UTF-8")
	public @ResponseBody
	String userResetPwd(String agentId, String userInfo, String userName) {
		logger.info(this.getClass().getName() + " userResetPwd : agentId " + agentId + ", userInfo " + userInfo + ", userName " + userName);

		if (!checkOperator(agentId, userInfo)) {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "userResetPwd", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "未授权!");

			return jsonObject.toString();
		}

		User user = new User();
		user.setUserName(userName);
		user.setUserPwd(ConstUser.userPwd_Default);
		if (userServiceImpl.resetPwd(user)) {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Success, "userResetPwd", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "");

			return jsonObject.toString();
		} else {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "userResetPwd", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "");

			return jsonObject.toString();
		}
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST, produces = "application/json;charset=UTF-8", consumes = "application/xml;charset=UTF-8")
	public @ResponseBody
	String userDelete(String agentId, String userInfo, String userName) {
		logger.info(this.getClass().getName() + " userDelete : agentId " + agentId + ", userInfo " + userInfo + ", userName " + userName);

		if (!checkOperator(agentId, userInfo)) {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "userDelete", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "未授权!");

			return jsonObject.toString();
		}

		User user = new User();
		user.setUserName(userName);
		user.setUserLevel(ConstUser.userLevel_Delete);
		if (userServiceImpl.delete(user)) {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Success, "userDelete", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "");

			return jsonObject.toString();
		} else {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "userDelete", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "");

			return jsonObject.toString();
		}
	}

	@RequestMapping(value = "/changePwd", method = RequestMethod.POST, produces = "application/json;charset=UTF-8", consumes = "application/xml;charset=UTF-8")
	public @ResponseBody
	String userChangePwd(String agentId, String userPwdOld, String userPwdNew) {
		logger.info(this.getClass().getName() + " userChangePwd : agentId " + agentId + ", userPwdOld " + userPwdOld + ", userPwdNew " + userPwdNew);

		{
			User user = userServiceImpl.selectByName(agentId);
			if (user == null || userPwdOld.compareToIgnoreCase(user.getUserPwd()) != 0) {
				JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "userChangePwd", _RespDefine.ErrorCode_Default, "");
				jsonObject.put(_RespDefine.Data, "未授权!");

				return jsonObject.toString();
			}
		}

		User user = new User();
		user.setUserName(agentId);
		user.setUserPwd(userPwdNew);
		if (userServiceImpl.changePwd(user)) {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Success, "userChangePwd", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "");

			return jsonObject.toString();
		} else {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "userChangePwd", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "");

			return jsonObject.toString();
		}
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST, produces = "application/json;charset=UTF-8", consumes = "application/xml;charset=UTF-8")
	public @ResponseBody
	String userSave(String agentId, String userInfo, String userName,  String maxConcurrent) {
		logger.info(this.getClass().getName() + " userSave : agentId " + agentId + ", userInfo " + userInfo + ", userName " + userName  + ", maxConcurrent " + maxConcurrent);

		if (!checkOperator(agentId, userInfo)) {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "userAdd", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "未授权!");

			return jsonObject.toString();
		}

		User user = new User();
		user.setUserName(userName);
		user.setUserPwd("");
		user.setUserLevel("");
		user.setMaxConcurrent(ToolConvert.toInt(maxConcurrent));
		if (userServiceImpl.save(user)) {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Success, "userSave", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "");

			return jsonObject.toString();
		} else {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "userSave", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "");

			return jsonObject.toString();
		}
	}

	@RequestMapping(value = "/applications", method = RequestMethod.POST, produces = "application/json;charset=UTF-8", consumes = "application/xml;charset=UTF-8")
	public @ResponseBody
	String userApplications(String userName) {
		logger.info(this.getClass().getName() + " userApplications : userName " + userName);

		String sCondition = " WHERE " + ConstUserApplication.userName + "='" + userName + "'";
		List<UserApplication> listUserApplications = userApplicationServiceImpl.selectUserApplications(sCondition);

		List<Application> listApplications = null;
		if (listUserApplications.size() > 0) {
			for (int i = 0; i < listUserApplications.size(); i++) {
				UserApplication userApplication = listUserApplications.get(i);
				if (i == 0) {
					sCondition = " WHERE " + ConstApplication.id + "='" + userApplication.getApplicationId() + "'";
				} else {
					sCondition += " OR " + ConstApplication.id + "='" + userApplication.getApplicationId() + "'";
				}
			}
			listApplications = applicationServiceImpl.selectApplications(sCondition);
		} else {
			listApplications = new ArrayList<Application>();
		}

		List<Object> listReturn = new ArrayList<Object>();
		listReturn.add(listUserApplications);
		listReturn.add(listApplications);

		JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Success, "userApplications", _RespDefine.ErrorCode_Default, "");
		jsonObject.put(_RespDefine.Data, listReturn);

		return jsonObject.toString();
	}

	@RequestMapping(value = "/application/change", method = RequestMethod.POST, produces = "application/json;charset=UTF-8", consumes = "application/xml;charset=UTF-8")
	public @ResponseBody
	String userApplicationChange(String agentId, String userInfo, String userName, String applicationIdsDelete, String applicationIdsAdd) {
		logger.info(this.getClass().getName() + " userApplicationChange : agentId " + agentId + ", userInfo " + userInfo + ", userName " + userName + ", applicationIdsDelete " + applicationIdsDelete
				+ ", applicationIdsAdd " + applicationIdsAdd);

		if (!checkOperator(agentId, userInfo)) {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "userApplicationChange", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "未授权!");

			return jsonObject.toString();
		}

		{
			String[] sApplicationIds = applicationIdsDelete.split(ToolConst.Separator_Default);
			for (int i = 0; i < sApplicationIds.length; i++) {
				String sApplicationId = ToolConvert.toString(sApplicationIds[i]);
				if (sApplicationId.isEmpty()) {
					continue;
				}

				UserApplication userApplication = new UserApplication();
				userApplication.setId("");
				userApplication.setUserName(userName);
				userApplication.setApplicationId(ToolConvert.toInt(sApplicationId));
				userApplicationServiceImpl.delete(userApplication);
			}
		}

		{
			String[] sApplicationIds = applicationIdsAdd.split(ToolConst.Separator_Default);
			for (int i = 0; i < sApplicationIds.length; i++) {
				String sApplicationId = ToolConvert.toString(sApplicationIds[i]);
				if (sApplicationId.isEmpty()) {
					continue;
				}

				UserApplication userApplication = new UserApplication();
				userApplication.setId(ToolString.generateUUID());
				userApplication.setUserName(userName);
				userApplication.setApplicationId(ToolConvert.toInt(sApplicationId));
				userApplicationServiceImpl.insert(userApplication);
			}
		}

		JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Success, "userApplicationChange", _RespDefine.ErrorCode_Default, "");
		jsonObject.put(_RespDefine.Data, "");

		return jsonObject.toString();
	}

	private boolean checkOperator(String agentId, String userInfo) {
		User user = userServiceImpl.selectByName(agentId);
		if (user != null && userInfo.compareToIgnoreCase(ToolString.EncoderByMd5(user.getUserPwd())) == 0 && user.getUserLevel().compareToIgnoreCase(ConstUser.userLevel_Admin) == 0) {
			return true;
		}
		return false;
	}
}
