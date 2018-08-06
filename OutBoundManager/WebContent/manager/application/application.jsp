<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

<html>
<head>
<base href="<%=basePath%>">

<title>应用管理</title>

<script type="text/javascript">
	var s1 = window.document.location.href;
	var s2 = window.document.location.pathname;
	var n = s1.indexOf(s2);
	var s3 = s2.substring(0, s2.substr(1).indexOf('/') + 1);
	var LocalHostPath = s1.substring(0, n) + s3 + "/";

	function getHref(path) {
		return LocalHostPath + path;
	}

	document.write("<script type='text/javascript'  src='" + getHref('_global/_Base.js') + "'></s" + "cript>");

	document.write("<script type='text/javascript'  src='" + getHref('_global/js/tools/_Const.js') + "'></s" + "cript>");
	document.write("<script type='text/javascript'  src='" + getHref('_global/js/tools/_Map.js') + "'></s" + "cript>");
	document.write("<script type='text/javascript'  src='" + getHref('_global/js/tools/_String.js') + "'></s" + "cript>");
	document.write("<script type='text/javascript'  src='" + getHref('_global/js/tools/_DateTime.js') + "'></s" + "cript>");

	document.write("<script type='text/javascript'  src='" + getHref('_global/js/tools/_Const_Application.js') + "'></s" + "cript>");

	document.write("<script type='text/javascript'  src='" + getHref('manager/application/js/application.js') + "'></s" + "cript>");
</script>
</head>

<body onload="initialize()" class="easyui-layout">
	<div data-options="region:'center',title:'应用列表',split:true">
		<table id="tableDataGridApplications">
		</table>
	</div>

	<div id="divWindowApplicationAdd" style="display: none">
		<table style="width: 100%; table-layout: fixed;">
			<tr>
				<td style="width: 15%; text-align: center">名称</td>
				<td style="width: 30%"><input type="text" class="easyui-textbox" id="applicationNameNew" name="applicationNameNew" style="width: 100%" /></td>
				<td style="width: 15%; text-align: center">状态</td>
				<td style="width: 30%"><select class="easyui-combobox" name="applicationStatusNew" id="applicationStatusNew" style="width: 100%">
						<option value="Normal" selected="selected">正常</option>
						<option value="Deleted">删除</option>
				</select></td>
				<td style="width: 10%; text-align: center"></td>
			</tr>
			<tr>
				<td style="text-align: center">描述</td>
				<td colspan="3"><input type="text" class="easyui-textbox" id="applicationDescriptionNew" name="applicationDescriptionNew" style="width: 100%" /></td>
			</tr>
			<tr>
				<td colspan="5" align="center"><a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-add'" style="width: 100px" onclick="doAddApplication()">添加</a></td>
			</tr>
		</table>
	</div>

	<div id="divWindowApplicationEdit" style="display: none">
		<table style="width: 100%; table-layout: fixed;">
			<tr>
				<td style="width: 15%; text-align: center">名称</td>
				<td style="width: 30%"><input type="text" class="easyui-textbox" id="applicationNameEdit" name="applicationNameEdit" style="width: 100%" /></td>
				<td style="width: 15%; text-align: center"></td>
				<td style="width: 30%"></td>
				<td style="width: 10%; text-align: center"></td>
			</tr>
			<tr>
				<td style="text-align: center">描述</td>
				<td colspan="3"><input type="text" class="easyui-textbox" id="applicationDescriptionEdit" name="applicationDescriptionEdit" style="width: 100%" /></td>
			</tr>
			<tr>
				<td colspan="5" align="center"><a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-edit'" style="width: 100px" onclick="doEditApplication()">修改</a></td>
			</tr>
		</table>
	</div>

</body>
</html>