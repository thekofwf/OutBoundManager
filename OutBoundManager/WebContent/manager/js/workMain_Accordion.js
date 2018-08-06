var MapId2Url = new _Map();

var Id_ChangeUserPwd = "修改密码";

var Id_TaskManager = "任务管理";
var Id_DataManager = "数据管理";

var Id_Report = "统计报表";

function initializeAccordion() {
	_uieAccordionInitialize("divAccordion", true, false);

	MapId2Url._put(Id_ChangeUserPwd, getHref("user/pwd"));

	MapId2Url._put(Id_TaskManager, getHref("task/manager"));
	MapId2Url._put(Id_DataManager, getHref("taskdata/manager"));

	MapId2Url._put(Id_Report, getHref("report/test"));

	var sContent = "";
	sContent += _uieAccordionGenerateOnePanelContent(Id_ChangeUserPwd, "funAddTab", Id_ChangeUserPwd, "icon-search");
	_uieAccordionAddPanel("divAccordion", "个人管理", sContent, false);

	sContent = "";
	sContent += _uieAccordionGenerateOnePanelContent(Id_TaskManager, "funAddTab", Id_TaskManager, "icon-search");
	sContent += _uieAccordionGenerateOnePanelContent(Id_DataManager, "funAddTab", Id_DataManager, "icon-search");
	_uieAccordionAddPanel("divAccordion", "外拨管理", sContent, false);

	sContent = "";
	sContent += _uieAccordionGenerateOnePanelContent(Id_Report, "funAddTab", Id_Report, "icon-search");
	_uieAccordionAddPanel("divAccordion", "统计报表", sContent, false);
}

function funAddTab(id) {
	if (_uieTabsIsTabExist(IdTabs_Main, id)) {
		_uieTabsSetSelectTab(IdTabs_Main, id);
	} else {
		_uieTabsAddTab(IdTabs_Main, id, id, MapId2Url._get(id), true, true);
	}
}
