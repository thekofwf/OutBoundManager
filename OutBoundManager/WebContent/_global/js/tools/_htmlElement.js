// 表
function deleteTableRow(idTable, index) {
	var oTable = document.getElementById(idTable);
	if (oTable.rows.length > index) {
		oTable.deleteRow(index);
	}
};

function deleteTableRowById(idTable, idTr) {
	var oTable = document.getElementById(idTable);
	var lengthRow = getTableRowLength(idTable);
	for ( var i = 0; i < lengthRow; i++) {
		var oTr = oTable.rows[i];
		var id = oTr.getAttribute("id");
		if (id == idTr) {
			deleteTableRow(idTable, i);
			return;
		}
	}
};

function clearTable(idTable) {
	var oTable = document.getElementById(idTable);
	while (oTable.rows.length > 0) {
		oTable.deleteRow(0);
	}
};

function getTableRowLength(idTable) {
	var oTable = document.getElementById(idTable);
	return oTable.rows.length;
};

function getTdByRowCellIndex(idTable, rowIndex, cellIndex) {
	var oTable = document.getElementById(idTable);
	return oTable.rows[rowIndex].cells[cellIndex];
};

function getNewTr(idTable) {
	var oTable = document.getElementById(idTable);
	var oTr = oTable.insertRow();
	return oTr;
};

function getNewTrEx(idTable) {
	var oTable = document.getElementById(idTable);
	var oTr = oTable.insertRow();
	if (oTable.rows.length % 2 == 1) {
		// 灰
		oTr.setAttribute("bgColor", "#E8E8E8");
		// golden
		oTr.setAttribute("bgColor", "#F6F6E1");
		// clouds
		oTr.setAttribute("bgColor", "#D5E7FE");
	}
	return oTr;
};

function getNewTrWithIndex(idTable, index) {
	var oTable = document.getElementById(idTable);
	var oTr = oTable.insertRow(index);
	return oTr;
};

function insertTdTitle(oTr, width, innerHtml) {
	var oTd = oTr.insertCell();
	oTd.setAttribute("className", "td_title");
	oTd.setAttribute("width", width);
	oTd.style.setAttribute("textAlign", "center");

	oTd.innerHTML = innerHtml;
	return oTd;
};

function insertTdTitleEx09(oTr, idTd, innerHtml, width, height, rowSpan, colSpan, textAlign, fontSize, backgroundColor, fontColor) {
	var oTd = oTr.insertCell();
	oTd.setAttribute("className", "td_title");
	if (idTd.length > 0) {
		oTd.setAttribute("id", tdId);
	}
	oTd.innerHTML = innerHtml;
	if (width.length > 0) {
		oTd.setAttribute("width", width);
	}
	if (height.length > 0) {
		oTd.setAttribute("height", height);
	}
	if (textAlign.length > 0) {
		oTd.style.setAttribute("textAlign", textAlign);
	}
	if (fontSize.length > 0) {
		oTd.style.setAttribute("fontSize", fontSize);
	}
	if (backgroundColor.length > 0) {
		oTd.style.setAttribute("backgroundColor", backgroundColor);
	}
	if (fontColor.length > 0) {
		oTd.style.setAttribute("color", fontColor);
	}
	oTd.rowSpan = rowSpan;
	oTd.colSpan = colSpan;
	return oTd;
};

function insertNewTd(oTr, width, innerHtml) {
	var oTd = oTr.insertCell();
	oTd.setAttribute("className", "td_item");
	if (width.length > 0) {
		oTd.setAttribute("width", width);
	}
	oTd.innerHTML = innerHtml;
	return oTd;
};

function insertNewTdEx01(oTr, width, height, rowSpan, colSpan, innerHtml) {
	var oTd = oTr.insertCell();
	oTd.setAttribute("className", "td_item");
	oTd.setAttribute("width", width);
	oTd.setAttribute("height", height);
	oTd.rowSpan = rowSpan;
	oTd.colSpan = colSpan;
	oTd.innerHTML = innerHtml;
	return oTd;
};

function insertNewTdEx09(oTr, tdId, innerHtml, width, height, rowSpan, colSpan, textAlign, fontSize, backgroundColor, fontColor) {
	var oTd = oTr.insertCell();
	oTd.setAttribute("className", "td_item");
	oTd.setAttribute("id", tdId);
	if (width.length > 0) {
		oTd.setAttribute("width", width);
	}
	if (height.length > 0) {
		oTd.setAttribute("height", height);
	}
	if (textAlign.length > 0) {
		oTd.style.setAttribute("textAlign", textAlign);
	}
	if (fontSize.length > 0) {
		oTd.style.setAttribute("fontSize", fontSize);
	}
	if (backgroundColor.length > 0) {
		oTd.style.setAttribute("backgroundColor", backgroundColor);
	}
	if (fontColor.length > 0) {
		oTd.style.setAttribute("color", fontColor);
	}
	oTd.rowSpan = rowSpan;
	oTd.colSpan = colSpan;
	oTd.innerHTML = innerHtml;
	return oTd;
};

function insertNewTdEx10(oTr, tdId, innerHtml, width, height, rowSpan, colSpan, textAlign, fontSize, fontWeight, backgroundColor, fontColor) {
	var oTd = oTr.insertCell();
	oTd.setAttribute("className", "td_item");
	oTd.setAttribute("id", tdId);
	if (width.length > 0) {
		oTd.setAttribute("width", width);
	}
	if (height.length > 0) {
		oTd.setAttribute("height", height);
	}
	if (textAlign.length > 0) {
		oTd.style.setAttribute("textAlign", textAlign);
	}
	if (fontSize.length > 0) {
		oTd.style.setAttribute("fontSize", fontSize);
	}
	if (fontWeight.length > 0) {
		oTd.style.setAttribute("fontWeight", fontWeight);
	}
	if (backgroundColor.length > 0) {
		oTd.style.setAttribute("backgroundColor", backgroundColor);
	}
	if (fontColor.length > 0) {
		oTd.style.setAttribute("color", fontColor);
	}
	oTd.rowSpan = rowSpan;
	oTd.colSpan = colSpan;
	oTd.innerHTML = innerHtml;
	return oTd;
};

function insertNewTdBlank(oTr, width, height) {
	var oTd = oTr.insertCell();
	if (width.length > 0) {
		oTd.setAttribute("width", width);
	}
	if (height.length > 0) {
		oTd.setAttribute("height", height);
	}
	return oTd;
};

function insertNewTdWithFontColor(oTr, width, innerHtml, fontColor) {
	var oTd = oTr.insertCell();
	var styleAttribute = oTd.getAttribute("style");
	styleAttribute.setAttribute("color", fontColor);
	oTd.setAttribute("className", "td_item");
	oTd.setAttribute("width", width);
	oTd.innerHTML = innerHtml;
	return oTd;
};

function setTdInnerHTML(oTd, innerHtml) {
	if (oTd == null)
		return;
	oTd.innerHTML = innerHtml;
};

function setTdBackGroupColor(oTd, backgroundColor) {
	if (oTd == null)
		return;
	oTd.style.setAttribute("backgroundColor", backgroundColor);
};

// department tree 生成部门树
function setDepartmentTree(listOrgDepartmentsSize, listOrgDepartments, treeDepartment) {
	if (listOrgDepartmentsSize > 0) {
		var listOrgDepartmentsAdded = new Array();
		var listOrgDepartmentsUnAdded = new Array();
		for ( var i = 0; i < listOrgDepartments.length;) {
			var orgDepartment = listOrgDepartments[i];
			var nParentIndex = treeDepartment.getIndexById(orgDepartment.pid);
			if (nParentIndex == null) {
				// 没有父节点
				listOrgDepartmentsUnAdded.push(orgDepartment);
			} else {
				// 有父节点
				treeDepartment.insertNewItem(orgDepartment.pid, orgDepartment.id, orgDepartment.name, 0, 0, 0, 0);
				treeDepartment.setUserData(orgDepartment.id, "object", orgDepartment);

				listOrgDepartmentsAdded.push(orgDepartment);
			}
			if (i == (listOrgDepartments.length - 1)) {
				if (listOrgDepartmentsAdded.length == 0) {
					for ( var j = 0; j < listOrgDepartmentsUnAdded.length; j++) {
						var orgDepartment = listOrgDepartments[j];
						treeDepartment.insertNewItem(-1, orgDepartment.id, orgDepartment.name, 0, 0, 0, 0);
						treeDepartment.setUserData(orgDepartment.id, "object", orgDepartment);
					}
					break;
				}
				listOrgDepartments = listOrgDepartmentsUnAdded;
				i = 0;
				listOrgDepartmentsAdded = new Array();
				listOrgDepartmentsUnAdded = new Array();
			} else {
				i++;
			}
		}
	}
}
