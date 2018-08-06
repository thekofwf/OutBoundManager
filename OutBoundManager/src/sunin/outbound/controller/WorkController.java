package sunin.outbound.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/work")
public class WorkController {
	// 日志实例
	private static final Logger logger = Logger.getLogger(WorkController.class);

	@RequestMapping(value = "/main", method = RequestMethod.POST)
	public String workMain(String agentId, HttpServletRequest request) {
		logger.info(this.getClass().getName() + " workMain : agentId " + agentId);

		request.setAttribute("agentId", agentId);
		return "/manager/workMain";
	}

	@RequestMapping(value = "/admin", method = RequestMethod.POST)
	public String workAdmin(String agentId, String userInfo, HttpServletRequest request) {
		logger.info(this.getClass().getName() + " workAdmin : agentId " + agentId + ", userInfo " + userInfo);

		request.setAttribute("agentId", agentId);
		request.setAttribute("userInfo", userInfo);
		return "/manager/workAdmin";
	}

}
