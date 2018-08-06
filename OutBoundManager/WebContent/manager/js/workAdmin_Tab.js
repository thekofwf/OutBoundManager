var IdTabs_Main = "divTabsMain";

function initializeTab() {
	_uieTabsInitialize(IdTabs_Main, false, true, tabsOnSelect);

	$('#' + IdTabs_Main).tabs({
		// 右键tab头事件
		onContextMenu : function(e, title, index) {
			e.preventDefault();
			// alert(title);
			// alert(index);
		}
	});
}

function tabsOnSelect(title) {
	// tab被选中事件
	// alert(title);
}
