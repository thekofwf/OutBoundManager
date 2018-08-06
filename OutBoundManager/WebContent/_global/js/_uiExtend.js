var _uiEasyUI = "easyui";
var _uiCurrentUI = _uiEasyUI;

/* global */
function _uieIsIdValid(id) {
	if (_uiCurrentUI == _uiEasyUI) {
		if ($("#" + id) == null)
			return false;
		else
			return true;
	}
	return false;
}

function _uieGetObjectById(id) {
	if (_uiCurrentUI == _uiEasyUI) {
		return $("#" + id);
	}
	return null;
}

/* a */
function _uieLinkButtonEnable(idLinkButton, bEnable) {
	var linkbutton = _uieGetObjectById(idLinkButton);
	if (linkbutton == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		if (bEnable)
			linkbutton.linkbutton("enable");
		else
			linkbutton.linkbutton("disable");
	}
}

/* layout */
function _uieLayoutInitialize(idLayout, bFit) {
	var layout = _uieGetObjectById(idLayout);
	if (layout == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		layout.layout({
			fit : bFit
		});
	}
}

/* accordion */
function _uieAccordionInitialize(idAccordion, bFit, bAnimate) {
	var accordion = _uieGetObjectById(idAccordion);
	if (accordion == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		accordion.accordion({
			fit : bFit,
			animate : bAnimate
		});
	}
}

function _uieAccordionRemove(idAccordion, idRemove) {
	var accordion = _uieGetObjectById(idAccordion);
	if (accordion == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		accordion.accordion("remove", idRemove);
	}
}

function _uieAccordionAddPanel(idAccordion, sTitle, sContent, bSelect) {
	var accordion = _uieGetObjectById(idAccordion);
	if (accordion == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		accordion.accordion("add", {
			title : sTitle,
			content : sContent,
			selected : bSelect
		});
	}
}

function _uieAccordionGenerateOnePanelContent(sTitle, funOnClick, sDataUser, sIcon) {
	if (_uiCurrentUI == _uiEasyUI) {
		return "<div style=\"width:100%\"><a href=\"javascript:void(0);\" class=\"easyui-linkbutton\" data-options=\"iconCls:'" + sIcon + "'\" onclick=\"" + funOnClick + "('" + sDataUser
				+ "')\" style=\"width:100%\">" + sTitle + "</a></div>";
	}
}

/* tabs */
function _uieTabsInitialize(idTabs, bBorder, bFit, funOnSelect) {
	var tabs = _uieGetObjectById(idTabs);
	if (tabs == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		tabs.tabs({
			border : bBorder,
			fit : bFit,
			onSelect : function(title) {
				if (funOnSelect != null) {
					funOnSelect(title);
				}
			}
		});
	}
}

function _uieTabsIsTabExist(idTabs, idTab) {
	var tabs = _uieGetObjectById(idTabs);
	if (tabs == null)
		return false;

	if (_uiCurrentUI == _uiEasyUI) {
		return tabs.tabs("exists", idTab);
	}

	return false;
}

function _uieTabsSetSelectTab(idTabs, idTab) {
	var tabs = _uieGetObjectById(idTabs);
	if (tabs == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		tabs.tabs("select", idTab);
	}
}

function _uieTabsAddTab(idTabs, idTab, sTitle, iframeUrl, bFit, bClosable) {
	var tabs = _uieGetObjectById(idTabs);
	if (tabs == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		tabs.tabs("add", {
			title : idTab,
			fit : bFit,
			content : "<iframe frameborder='0' src='" + iframeUrl + "' width='100%' height='100%'></iframe>",
			closable : bClosable
		});
	}
}

/* panel */
function _uiePanelInitialize(idPanel, sTitle, sIcon, bFit, nWidth, nHeight, bBorder, sContent, bCollapsible, bMinimizable, bMaximizable, bClosable) {
	var panel = _uieGetObjectById(idPanel);
	if (panel == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		panel.panel({
			title : sTitle,
			iconCls : sIcon,
			fit : bFit,
			width : nWidth,
			height : nHeight,
			border : bBorder,
			content : sContent,
			collapsible : bCollapsible,
			minimizable : bMinimizable,
			maximizable : bMaximizable,
			closable : bClosable
		});
	}
}

function _uiePanelMove(idPanel, nLeft, nTop) {
	var panel = _uieGetObjectById(idPanel);
	if (panel == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		panel.panel('move', {
			left : nLeft,
		});
	}
}
/* textbox */
function _uieTextboxSetValue(idTextbox, sValue) {
	var textbox = _uieGetObjectById(idTextbox);
	if (textbox == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		textbox.textbox("setValue", sValue);
	}
}

function _uieTextboxGetValue(idTextbox) {
	var textbox = _uieGetObjectById(idTextbox);
	if (textbox == null)
		return "";

	if (_uiCurrentUI == _uiEasyUI) {
		return textbox.textbox("getValue");
	}

	return "";
}

function _uieTextboxChangeReadOnly(idTextbox, bReadOnly) {
	var textbox = _uieGetObjectById(idTextbox);
	if (textbox == null)
		return "";

	if (_uiCurrentUI == _uiEasyUI) {
		if (bReadOnly)
			textbox.textbox("textbox").attr("readonly", "readonly");
		else
			textbox.textbox("textbox").removeAttr("readonly");
	}
}

/* numberbox */
function _uieNumberboxSetValue(idNumberbox, sValue) {
	var numberbox = _uieGetObjectById(idNumberbox);
	if (numberbox == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		numberbox.numberbox("setValue", sValue);
	}
}

function _uieNumberboxGetValue(idNumberbox) {
	var numberbox = _uieGetObjectById(idNumberbox);
	if (numberbox == null)
		return "";

	if (_uiCurrentUI == _uiEasyUI) {
		return numberbox.numberbox("getValue");
	}

	return "";
}

/* combobox */
function _uieComboboxInitializeHour(idCombobox) {
	var combobox = _uieGetObjectById(idCombobox);
	if (combobox == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		var optionsNew = [];
		for ( var i = 0; i < 24; i++) {
			if (i < 10) {
				optionsNew.push({
					"text" : "0" + i,
					"value" : "0" + i
				});
			} else {
				optionsNew.push({
					"text" : i,
					"value" : i
				});
			}
		}
		combobox.combobox("loadData", optionsNew);
	}

	return;
}

function _uieComboboxInitializeMinute(idCombobox) {
	var combobox = _uieGetObjectById(idCombobox);
	if (combobox == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		var optionsNew = [];
		for ( var i = 0; i < 60; i++) {
			if (i < 10) {
				optionsNew.push({
					"text" : "0" + i,
					"value" : "0" + i
				});
			} else {
				optionsNew.push({
					"text" : i,
					"value" : i
				});
			}
		}
		combobox.combobox("loadData", optionsNew);
	}

	return;
}

function _uieComboboxSetEventOnChange(idCombobox, funOnChange) {
	var combobox = _uieGetObjectById(idCombobox);
	if (combobox == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		combobox.combobox({
			onChange : function(newValue, oldValue) {
				if (funOnChange != null)
					funOnChange(newValue, oldValue);
			}
		});
	}
}

function _uieComboboxGetOptions(idCombobox) {
	var combobox = _uieGetObjectById(idCombobox);
	if (combobox == null)
		return null;

	if (_uiCurrentUI == _uiEasyUI) {
		return combobox.combobox("getData");
	}

	return null;
}

function _uieComboboxLoadOptions(idCombobox, options) {
	var combobox = _uieGetObjectById(idCombobox);
	if (combobox == null)
		return "";

	if (_uiCurrentUI == _uiEasyUI) {
		return combobox.combobox("loadData", options);
	}

	return "";
}

function _uieComboboxClearOptions(idCombobox) {
	var combobox = _uieGetObjectById(idCombobox);
	if (combobox == null)
		return "";

	if (_uiCurrentUI == _uiEasyUI) {
		var options = [];
		return combobox.combobox("loadData", options);
	}

	return "";
}

function _uieComboboxAddOption(idCombobox, value, text) {
	var combobox = _uieGetObjectById(idCombobox);
	if (combobox == null)
		return "";

	if (_uiCurrentUI == _uiEasyUI) {
		var options = combobox.combobox("getData");
		var optionsNew = [];
		for ( var i = 0; i < options.length; i++) {
			optionsNew.push({
				"text" : options[i]["text"],
				"value" : options[i]["value"]
			});
		}
		optionsNew.push({
			"text" : text,
			"value" : value
		});
		return combobox.combobox("loadData", optionsNew);
	}

	return "";
}

function _uieComboboxGetSelectIndex(idCombobox, value) {
	var combobox = _uieGetObjectById(idCombobox);
	if (combobox == null)
		return -1;

	if (_uiCurrentUI == _uiEasyUI) {
		var options = combobox.combobox("getData");
		if (options.length == 0) {
			return -1;
		}
		for ( var i = 0; i < options.length; i++) {
			if (options[i]["value"] == value) {
				return i;
			}
		}
	}

	return -1;
}

function _uieComboboxSetSelectByIndex(idCombobox, index) {
	var combobox = _uieGetObjectById(idCombobox);
	if (combobox == null)
		return "";

	if (_uiCurrentUI == _uiEasyUI) {
		var options = combobox.combobox("getData");
		if (options.length == 0) {
			return;
		}
		if (index >= options.length) {
			index = 0;
		}
		combobox.combobox("setValue", options[index]["value"]);
		combobox.combobox("setText", options[index]["text"]);
	}

	return "";
}

function _uieComboboxSetSelectByValue(idCombobox, value, text) {
	var combobox = _uieGetObjectById(idCombobox);
	if (combobox == null)
		return "";

	if (_uiCurrentUI == _uiEasyUI) {
		var options = combobox.combobox("getData");
		for ( var i = 0; i < options.length; i++) {
			if (value == options[i]["value"]) {
				combobox.combobox("setValue", value);
				combobox.combobox("setText", text);
				return;
			}
		}

		if (options.length == 0) {
			_uieComboboxAddOption(idCombobox, value, text);
			combobox.combobox("setValue", value);
			combobox.combobox("setText", text);
		}
	}

	return "";
}

function _uieComboboxGetValue(idCombobox) {
	var combobox = _uieGetObjectById(idCombobox);
	if (combobox == null)
		return "";

	if (_uiCurrentUI == _uiEasyUI) {
		return combobox.combobox("getValue");
	}

	return "";
}

function _uieComboboxSetValue(idCombobox, sValue) {
	var combobox = _uieGetObjectById(idCombobox);
	if (combobox == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		combobox.combobox("setValue", sValue);
	}
}

function _uieComboboxGetText(idCombobox) {
	var combobox = _uieGetObjectById(idCombobox);
	if (combobox == null)
		return "";

	if (_uiCurrentUI == _uiEasyUI) {
		return combobox.combobox("getText");
	}

	return "";
}

function _uieComboboxSetText(idCombobox, sText) {
	var combobox = _uieGetObjectById(idCombobox);
	if (combobox == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		combobox.combobox("setText", sText);
	}
}

/* datebox */
function _uieDateboxGetValue(idDatebox) {
	var datebox = _uieGetObjectById(idDatebox);
	if (datebox == null)
		return "";

	if (_uiCurrentUI == _uiEasyUI) {
		return datebox.datebox("getValue");
	}

	return "";
}

function _uieDateboxSetValue(idDatebox, sValue) {
	var datebox = _uieGetObjectById(idDatebox);
	if (datebox == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		datebox.datebox("setValue", sValue);
	}
}

/* datetimebox */
function _uieDateTimeboxGetValue(idDateTimebox) {
	var datetimebox = _uieGetObjectById(idDateTimebox);
	if (datetimebox == null)
		return "";

	if (_uiCurrentUI == _uiEasyUI) {
		return datetimebox.datetimebox("getValue");
	}

	return "";
}

function _uieDateTimeboxSetValue(idDateTimebox, sValue) {
	var datetimebox = _uieGetObjectById(idDateTimebox);
	if (datetimebox == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		datetimebox.datetimebox("setValue", sValue);
	}
}

/* slider */
function _uieSliderGetValue(idSlider) {
	var slider = _uieGetObjectById(idSlider);
	if (slider == null)
		return "";

	if (_uiCurrentUI == _uiEasyUI) {
		return slider.slider("getValue");
	}

	return "";
}

function _uieSliderSetValue(idSlider, sValue) {
	var slider = _uieGetObjectById(idSlider);
	if (slider == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		slider.slider("setValue", sValue);
	}
}

function _uieSliderInitialize(idSlider, funHandle) {
	var slider = _uieGetObjectById(idSlider);
	if (slider == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		slider.slider({
			onSlideStart : function(value) {
				funHandle("start", null, value);
			}
		});
		slider.slider({
			onSlideEnd : function(value) {
				funHandle("end", value, null);
			}
		});
		slider.slider({
			onChange : function(newValue, oldValue) {
				funHandle("change", newValue, oldValue);
			}
		});
	}
}

function _uieSliderChangeRule(idSlider, nMin, nMax) {
	var slider = _uieGetObjectById(idSlider);
	if (slider == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		slider.slider({
			min : nMin,
			max : nMax,
			rule : [ nMin, '|', nMax ]
		});
	}
}

/* datagrid */
function _uieDataGridCreateToolbarButton(sText, sIcon, funHandler) {
	if (_uiCurrentUI == _uiEasyUI) {
		var toolbarButton = {
			text : sText,
			iconCls : sIcon,
			handler : function() {
				funHandler();
			}
		};
		return toolbarButton;
	}
	return null;
}

function _uieDataGridCreateColumn(sField, sTitle, bHidden, lWidth, bCheckBox, sAlign, sHAlign, bSortable, sOrder) {
	if (_uiCurrentUI == _uiEasyUI) {
		var column = {
			field : sField,
			checkbox : bCheckBox,
			title : sTitle,
			hidden : bHidden,
			width : lWidth,
			align : sAlign,
			halign : sHAlign,
			sortable : bSortable,
			order : sOrder
		};
		return column;
	}
	return null;
}

function _uieDataGridCreateColumnEx01(sField, sTitle, bHidden, lWidth, bCheckBox, sAlign, sHAlign, bSortable, sOrder, funStyler) {
	if (_uiCurrentUI == _uiEasyUI) {
		var column = {
			field : sField,
			checkbox : bCheckBox,
			title : sTitle,
			hidden : bHidden,
			width : lWidth,
			align : sAlign,
			halign : sHAlign,
			sortable : bSortable,
			order : sOrder,
			styler : funStyler
		};
		return column;
	}
	return null;
}

function _uieDataGridAsToolbar(idDataGrid, toolbarButtons) {
	var datagrid = _uieGetObjectById(idDataGrid);
	if (datagrid == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		datagrid.datagrid({
			fit : true,
			toolbar : toolbarButtons
		});
	}
}

function _uieDataGridAsToolbarInitialize(idDataGrid, idToolbar) {
	var datagrid = _uieGetObjectById(idDataGrid);
	if (datagrid == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		datagrid.datagrid({
			fit : true,
			toolbar : "#" + idToolbar
		});
	}
}

function _uieDataGridAsToolbarAddButton(idToolbar, sText, sIcon, sProcessCode) {
	if (_uiCurrentUI == _uiEasyUI) {
		var div = document.getElementById(idToolbar);
		var button = "<a href=\"javascript:void(0);\" class=\"easyui-linkbutton\" data-options=\"iconCls:\'" + sIcon + "\',plain:true\" onclick=\"" + sProcessCode + "\">" + sText + "</a>";
		div.innerHTML += button;
	}
}

function _uieDataGridAsToolbarClearButton(idToolbar) {
	if (_uiCurrentUI == _uiEasyUI) {
		var div = document.getElementById(idToolbar);
		div.innerHTML = "";
	}
}

function _uieDataGridInitialize(idDataGrid, sTitle, sIcon, bSingleSelect, bPagination, sIdField, toolbarButtons, frozenColumns, columns) {
	var datagrid = _uieGetObjectById(idDataGrid);
	if (datagrid == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		datagrid.datagrid({
			title : sTitle,
			iconCls : sIcon,
			fit : true,
			striped : true,// 斑马线
			remoteSort : false,
			singleSelect : bSingleSelect,// 是否单选
			pagination : bPagination,// 分页控件
			pageSize : 20,// 分页属性初始化页面大小
			pageList : [ 10, 20, 30, 40, 50 ],// 分页属性初始化页面大小选择列表
			idField : sIdField,// 标示字段
			toolbar : toolbarButtons,
			frozenColumns : [ frozenColumns ],
			columns : [ columns ]
		});
	}
}

function _uieDataGridPaginationInitialize(idDataGrid, funOnSelectPage) {
	var datagrid = _uieGetObjectById(idDataGrid);
	if (datagrid == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		var pagination = datagrid.datagrid("getPager");
		pagination.pagination({
			beforePageText : "第",
			afterPageText : "页 共{pages}页",
			displayMsg : "当前显示 {from} - {to} 条记录，共{total}条记录",
			onSelectPage : function(pageNumber, pageSize) {
				if (funOnSelectPage != null) {
					funOnSelectPage();
				}
			}
		});
	}
}

function _uieDataGridPaginationInitializeSimple(idDataGrid, funOnSelectPage) {
	var datagrid = _uieGetObjectById(idDataGrid);
	if (datagrid == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		var pagination = datagrid.datagrid("getPager");
		pagination.pagination({
			beforePageText : "",
			afterPageText : "/{pages}",
			displayMsg : "{total}",
			onSelectPage : function(pageNumber, pageSize) {
				if (funOnSelectPage != null) {
					funOnSelectPage();
				}
			}
		});
	}
}

function _uieDataGridPaginationGetPageNumber(idDataGrid) {
	var datagrid = _uieGetObjectById(idDataGrid);
	if (datagrid == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		var pagination = datagrid.datagrid("getPager");
		var options = pagination.pagination('options');
		return options.pageNumber;
		var pageSize = options.pageSize;
	}

	return 1;
}

function _uieDataGridPaginationGetPageSize(idDataGrid) {
	var datagrid = _uieGetObjectById(idDataGrid);
	if (datagrid == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		var pagination = datagrid.datagrid("getPager");
		var options = pagination.pagination('options');
		return options.pageSize;
	}

	return 10;
}

function _uieDataGridPaginationRefresh(idDataGrid, nTotal, nPageNumber) {
	var datagrid = _uieGetObjectById(idDataGrid);
	if (datagrid == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		var pagination = datagrid.datagrid("getPager");
		pagination.pagination('refresh', {
			total : parseInt(nTotal),
			pageNumber : parseInt(nPageNumber)
		});
	}
}

function _uieDataGridOnClickRow(idDataGrid, funOnClickRow) {
	var datagrid = _uieGetObjectById(idDataGrid);
	if (datagrid == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		datagrid.datagrid({
			onClickRow : function(rowIndex, rowData) {
				if (funOnClickRow != null) {
					funOnClickRow(rowIndex, rowData);
				}
			}
		});
	}
}

function _uieDataGridOnCheckAll(idDataGrid, funOnCheckAll) {
	var datagrid = _uieGetObjectById(idDataGrid);
	if (datagrid == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		datagrid.datagrid({
			onCheckAll : function(rows) {
				if (funOnCheckAll != null) {
					funOnCheckAll(rows);
				}
			}
		});
	}
}

function _uieDataGridOnUncheckAll(idDataGrid, funOnUncheckAll) {
	var datagrid = _uieGetObjectById(idDataGrid);
	if (datagrid == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		datagrid.datagrid({
			onUncheckAll : function(rows) {
				if (funOnUncheckAll != null) {
					funOnUncheckAll(rows);
				}
			}
		});
	}
}

function _uieDataGridResize(idDataGrid) {
	var datagrid = _uieGetObjectById(idDataGrid);
	if (datagrid == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		datagrid.datagrid("resize");
	}
}

function _uieDataGridAppendRow(idDataGrid, row) {
	var datagrid = _uieGetObjectById(idDataGrid);
	if (datagrid == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		datagrid.datagrid("appendRow", row);
	}
}

function _uieDataGridDeleteAllRows(idDataGrid) {
	var datagrid = _uieGetObjectById(idDataGrid);
	if (datagrid == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		datagrid.datagrid("clearSelections");

		datagrid.datagrid("loadData", {
			total : 0,
			rows : []
		});
	}
}

function _uieDataGridUnselectAllRows(idDataGrid) {
	var datagrid = _uieGetObjectById(idDataGrid);
	if (datagrid == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		datagrid.datagrid("clearSelections");

		datagrid.datagrid("unselectAll");
	}
}

function _uieDataGridGetSelectRowsCount(idDataGrid) {
	var datagrid = _uieGetObjectById(idDataGrid);
	if (datagrid == null)
		return 0;

	if (_uiCurrentUI == _uiEasyUI) {
		var rows = datagrid.datagrid("getSelections");
		return rows.length;
	}

	return 0;
}

function _uieDataGridGetSelectRowId(idDataGrid, idColumn) {
	var datagrid = _uieGetObjectById(idDataGrid);
	if (datagrid == null)
		return "";

	if (_uiCurrentUI == _uiEasyUI) {
		var rows = datagrid.datagrid("getSelections");
		if (rows.length > 0) {
			var row = rows[0];
			return row[idColumn];
		}
	}

	return "";
}

function _uieDataGridGetSelectRowIds(idDataGrid, idColumn) {
	var datagrid = _uieGetObjectById(idDataGrid);
	if (datagrid == null)
		return "";

	if (_uiCurrentUI == _uiEasyUI) {
		var rows = datagrid.datagrid("getSelections");
		var ids = new Array();
		for ( var i = 0; i < rows.length; i++) {
			var row = rows[i];
			ids[i] = row[idColumn];
		}
		return ids;
	}

	return "";
}

function _uieDataGridIsRowSelected(idDataGrid, idColumn, idValue) {
	var datagrid = _uieGetObjectById(idDataGrid);
	if (datagrid == null)
		return false;

	if (_uiCurrentUI == _uiEasyUI) {
		var rows = datagrid.datagrid("getSelections");
		for ( var i = 0; i < rows.length; i++) {
			var row = rows[i];
			if (row[idColumn] == idValue)
				return true;
		}
	}

	return false;
}

function _uieDataGridSetRowSelect(idDataGrid, idRow) {
	var datagrid = _uieGetObjectById(idDataGrid);
	if (datagrid == null)
		return "";

	if (_uiCurrentUI == _uiEasyUI) {
		var index = datagrid.datagrid("getRowIndex", idRow);
		return datagrid.datagrid("selectRow", index);
	}
}

function _uieDataGridSetRowUnselect(idDataGrid, idRow) {
	var datagrid = _uieGetObjectById(idDataGrid);
	if (datagrid == null)
		return "";

	if (_uiCurrentUI == _uiEasyUI) {
		var index = datagrid.datagrid("getRowIndex", idRow);
		return datagrid.datagrid("unselectRow", index);
	}
}

function _uieDataGridGetColumnValue(idDataGrid, idRow, idColumn) {
	var datagrid = _uieGetObjectById(idDataGrid);
	if (datagrid == null)
		return "";

	if (_uiCurrentUI == _uiEasyUI) {
		var index = datagrid.datagrid("getRowIndex", idRow);
		return datagrid.datagrid("getData").rows[index][idColumn];
	}

	return "";
}

function _uieDataGridGetColumnValueByIndex(idDataGrid, index, idColumn) {
	var datagrid = _uieGetObjectById(idDataGrid);
	if (datagrid == null)
		return "";

	if (_uiCurrentUI == _uiEasyUI) {
		if (datagrid.datagrid("getData").rows.length > index)
			return datagrid.datagrid("getData").rows[index][idColumn];
		else
			return "";
	}

	return "";
}

/* tree */
function _uieTreeInitialize(idTree, bAnimate, bCheckbox, bCascadeCheck, bOnlyLeafCheck, bLines) {
	var tree = _uieGetObjectById(idTree);
	if (tree == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		tree.tree({
			animate : bAnimate,
			checkbox : bCheckbox,
			cascadeCheck : bCascadeCheck,
			onlyLeafCheck : bOnlyLeafCheck,
			lines : bLines
		});
	}
}

function _uieTreeOnClick(idTree, funOnClick) {
	var tree = _uieGetObjectById(idTree);
	if (tree == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		tree.tree({
			onClick : function(node) {
				funOnClick(node);
			}
		});
	}
}

function _uieTreeExpand(idTree, idNode) {
	var tree = _uieGetObjectById(idTree);
	if (tree == null)
		return "";

	if (_uiCurrentUI == _uiEasyUI) {
		if (idNode == "" || idNode == null) {
			tree.tree("expandAll");
		} else {
			var node = tree.tree("find", idNode);
			if (node != null) {
				tree.tree("expand", node.target);
			}
		}
	}

	return "";
}

function _uieTreeCollapse(idTree, idNode) {
	var tree = _uieGetObjectById(idTree);
	if (tree == null)
		return "";

	if (_uiCurrentUI == _uiEasyUI) {
		if (idNode == "" || idNode == null) {
			tree.tree("collapseAll");
		} else {
			var node = tree.tree("find", idNode);
			if (node != null) {
				tree.tree("collapse", node.target);
			}
		}
	}

	return "";
}

function _uieTreeClear(idTree) {
	var tree = _uieGetObjectById(idTree);
	if (tree == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		var root = null;
		while ((root = tree.tree("getRoot")) != null) {
			tree.tree("remove", root.target);
		}
	}
}

function _uieTreeFind(idTree, idNode) {
	var tree = _uieGetObjectById(idTree);
	if (tree == null)
		return false;

	if (_uiCurrentUI == _uiEasyUI) {
		var node = tree.tree("find", idNode);
		if (node != null) {
			return true;
		}
	}

	return false;
}

function _uieTreeAppend(idTree, idParent, idAdd, sText, sIcon) {
	var tree = _uieGetObjectById(idTree);
	if (tree == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		var node = tree.tree("find", idParent);
		if (node == null) {
			tree.tree("append", {
				data : [ {
					id : idAdd,
					text : sText,
					iconCls : sIcon
				} ]
			});
		} else {
			tree.tree("append", {
				parent : node.target,
				data : [ {
					id : idAdd,
					text : sText,
					iconCls : sIcon
				} ]
			});
		}
	}
}

function _uieTreeUpdate(idTree, idNode, sText, sIcon) {
	var tree = _uieGetObjectById(idTree);
	if (tree == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		var node = tree.tree("find", idNode);
		if (node != null) {
			tree.tree("update", {
				target : node.target,
				text : sText,
				iconCls : sIcon
			});
		}
	}
}

function _uieTreeRemove(idTree, idRemove) {
	var tree = _uieGetObjectById(idTree);
	if (tree == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		var node = tree.tree("find", idRemove);
		if (node != null) {
			tree.tree("remove", node.target);
		}
	}
}

function _uieTreeGetCheckedNodes(idTree) {
	var tree = _uieGetObjectById(idTree);
	if (tree == null)
		return null;

	if (_uiCurrentUI == _uiEasyUI) {
		var nodes = tree.tree("getChecked");
		if (nodes.length == 0) {
			return null;
		}

		return nodes;
	}

	return null;
}

function _uieTreeGetChecked(idTree) {
	var tree = _uieGetObjectById(idTree);
	if (tree == null)
		return "";

	if (_uiCurrentUI == _uiEasyUI) {
		var nodes = tree.tree("getChecked");
		if (nodes.length == 0) {
			return "";
		}

		var ids = new Array();
		for ( var i = 0; i < nodes.length; i++) {
			ids[i] = nodes[i].id;
		}
		return ids;
	}

	return "";
}

function _uieTreeGetSelectedNode(idTree) {
	var tree = _uieGetObjectById(idTree);
	if (tree == null)
		return null;

	if (_uiCurrentUI == _uiEasyUI) {
		var node = tree.tree("getSelected");
		if (node != null) {
			return node;
		}
	}

	return null;
}

function _uieTreeGetSelected(idTree) {
	var tree = _uieGetObjectById(idTree);
	if (tree == null)
		return "";

	if (_uiCurrentUI == _uiEasyUI) {
		var node = tree.tree("getSelected");
		if (node != null) {
			return node.id;
		}
	}

	return "";
}

/* 重新渲染整个页面 */
function _uieRefreshAll() {
	if (_uiCurrentUI == _uiEasyUI) {
		$.parser.parse();
	}
}

/* 重新渲染单个 */
function _uieRefreshOne(id) {
	if (_uiCurrentUI == _uiEasyUI) {
		$.parser.parse("#" + id);
	}
}

/* window */
function _uieWindowCreate(idWindow, sTitle, sIcon, bFit, nWidth, nHeight, bCollapsible, bMinimizable, bMaximizable, bClosable, bModal) {
	var window = _uieGetObjectById(idWindow);
	if (window == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		window.window({
			title : sTitle,
			iconCls : sIcon,
			fit : bFit,// 填充容器
			width : nWidth,
			height : nHeight,
			collapsible : bCollapsible,// 是否显示可折叠按钮
			minimizable : bMinimizable,// 是否显示最小化按钮
			maximizable : bMaximizable,// 是否显示最大化按钮
			closable : bClosable,// 是否显示关闭按钮
			modal : bModal
		});
	}
}

function _uieWindowOnClose(idWindow, funOnClose) {
	var window = _uieGetObjectById(idWindow);
	if (window == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		window.window({
			onClose : function() {
				if (funOnClose != null) {
					funOnClose();
				}
			}
		});
	}
}

function _uieWindowShow(idWindow) {
	var window = _uieGetObjectById(idWindow);
	if (window == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		window.window("open");
	}
}

function _uieWindowClose(idWindow) {
	var window = _uieGetObjectById(idWindow);
	if (window == null)
		return;

	if (_uiCurrentUI == _uiEasyUI) {
		window.window("close");
	}
}

/* messager */
function _uieMessagerShow(sTitle, sMsg, nTimeout, sShowType) {
	// slide\fade\show\null
	if (_uiCurrentUI == _uiEasyUI) {
		$.messager.show({
			title : sTitle,
			msg : sMsg,
			timeout : nTimeout,
			showType : sShowType
		});
	}
}

function _uieMessagerAlert(sTitle, sContent) {
	if (_uiCurrentUI == _uiEasyUI) {
		$.messager.alert(sTitle, sContent, 'warning');
	}
}

function _uieMessagerError(sTitle, sContent) {
	if (_uiCurrentUI == _uiEasyUI) {
		$.messager.alert(sTitle, sContent, 'error');
	}
}

function _uieMessagerInfo(sTitle, sContent) {
	if (_uiCurrentUI == _uiEasyUI) {
		$.messager.alert(sTitle, sContent, 'info');
	}
}

function _uieMessagerConfirm(sTitle, sContent, funConfirm) {
	if (_uiCurrentUI == _uiEasyUI) {
		$.messager.confirm(sTitle, sContent, function(r) {
			if (r) {
				if (funConfirm != null) {
					funConfirm();
				}
			}
		});
	}
}
