package sunin.outbound.controller;

import global.tools.ToolString;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


import sunin.outbound.model.User;
import sunin.outbound.model.define.ConstUser;
import sunin.outbound.model.define._RespDefine;
import sunin.outbound.service.IUserService;

@Controller
@RequestMapping("/main")
public class MainController {
	// 日志实例
	private static final Logger logger = Logger.getLogger(MainController.class);

	@Autowired
	private IUserService userServiceImpl;

	@RequestMapping("/index")
	public String mainIndex() {
		return "/index";
	}

	@RequestMapping("/admin")
	public String mainAdmin() {
		return "/admin";
	}

	// _System._post("test/login", "userName=" + _uieTextboxGetValue("userName") + "&agentPwd=" + _uieTextboxGetValue("agentPwd"), callbackQueryInboundTasks);
	// @RequestMapping(value = "/login", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")

	@RequestMapping(value = "/login", method = RequestMethod.POST, produces = "application/json;charset=UTF-8", consumes = "application/xml;charset=UTF-8")
	public @ResponseBody
	String mainLogin(String userName, String agentPwd) {
		logger.info(this.getClass().getName() + " mainLogin : userName " + userName + ", agentPwd " + agentPwd);

		User user = userServiceImpl.selectByName(userName);

		if (user != null && user.getUserPwd().compareToIgnoreCase(agentPwd) == 0 && user.getUserLevel().compareToIgnoreCase(ConstUser.userLevel_User) == 0) {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Success, "mainLogin", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "");
			jsonObject.put("agentId", userName);

			jsonObject.put("userLevel", user.getUserLevel());
			return jsonObject.toString();
		} else {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "mainLogin", _RespDefine.ErrorCode_Default, "error");
			jsonObject.put(_RespDefine.Data, "用户名 / 密码错误，请重新输入！");
			return jsonObject.toString();
		}
	}

	@RequestMapping(value = "/loginEx", method = RequestMethod.POST, produces = "application/json;charset=UTF-8", consumes = "application/xml;charset=UTF-8")
	public @ResponseBody
	String mainLoginEx(String userName, String agentPwd) {
		logger.info(this.getClass().getName() + " mainLoginEx : userName " + userName + ", agentPwd " + agentPwd);

		User user = userServiceImpl.selectByName(userName);

		if (user != null && user.getUserPwd().compareToIgnoreCase(agentPwd) == 0 && user.getUserLevel().compareToIgnoreCase(ConstUser.userLevel_Admin) == 0) {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Success, "mainLoginEx", _RespDefine.ErrorCode_Default, "");
			jsonObject.put(_RespDefine.Data, "");
			jsonObject.put("agentId", userName);
			jsonObject.put("userInfo", ToolString.EncoderByMd5(user.getUserPwd()));

			return jsonObject.toString();
		} else {
			JSONObject jsonObject = _RespDefine.getJsonObject(_RespDefine.Result_Error, "mainLoginEx", _RespDefine.ErrorCode_Default, "error");
			jsonObject.put(_RespDefine.Data, "用户名 / 密码错误，请重新输入！");
			return jsonObject.toString();
		}
	}
}
