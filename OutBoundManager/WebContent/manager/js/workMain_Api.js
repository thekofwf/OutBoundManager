function apiGetAgentId() {
	return _uieTextboxGetValue("agentId");
}

function apiAddTab(id, title, action) {
	var idTabs = IdTabs_Main;
	if (_uieTabsIsTabExist(idTabs, title)) {
		_uieTabsSetSelectTab(idTabs, title);
	} else {
		_uieTabsAddTab(idTabs, title, title, getHref(action), true, true);
	}
}

