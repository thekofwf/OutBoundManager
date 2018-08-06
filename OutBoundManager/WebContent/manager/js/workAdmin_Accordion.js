var MapId2Url = new _Map();

var Id_ChangeUserPwd = "修改密码";

var Id_ApplicationManager = "应用管理";
var Id_UserManager = "用户管理";

function initializeAccordion() {
	_uieAccordionInitialize("divAccordion", true, false);

	MapId2Url._put(Id_ChangeUserPwd, getHref("user/pwd"));

	MapId2Url._put(Id_ApplicationManager, getHref("application/manager"));
	MapId2Url._put(Id_UserManager, getHref("user/manager"));

	var sContent = "";
	sContent += _uieAccordionGenerateOnePanelContent(Id_ChangeUserPwd, "funAddTab", Id_ChangeUserPwd, "icon-search");
	_uieAccordionAddPanel("divAccordion", "个人管理", sContent, false);

	sContent = "";
	sContent += _uieAccordionGenerateOnePanelContent(Id_ApplicationManager, "funAddTab", Id_ApplicationManager, "icon-search");
	sContent += _uieAccordionGenerateOnePanelContent(Id_UserManager, "funAddTab", Id_UserManager, "icon-search");
	_uieAccordionAddPanel("divAccordion", "系统管理", sContent, false);
}

function funAddTab(id) {
	if (_uieTabsIsTabExist(IdTabs_Main, id)) {
		_uieTabsSetSelectTab(IdTabs_Main, id);
	} else {
		_uieTabsAddTab(IdTabs_Main, id, id, MapId2Url._get(id), true, true);
	}
}
