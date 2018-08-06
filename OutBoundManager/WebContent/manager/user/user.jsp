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

<title>用户管理</title>

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

	document.write("<script type='text/javascript'  src='" + getHref('manager/user/js/user.js') + "'></s" + "cript>");
</script>
</head>

<body onload="initialize()" class="easyui-layout">
	<div data-options="region:'center',title:'用户列表',split:true">
		<table id="tableDataGridUsers">
		</table>
	</div>
	<div data-options="region:'east',title:'用户应用列表',split:true" style="width: 600px">
		<table id=tableDataGridApplications>
		</table>
	</div>

	<div id="divWindowUserAdd" style="display: none">
		<table style="width: 100%; table-layout: fixed;">
			<tr>
				<td style="width: 15%; text-align: center">用户名</td>
				<td style="width: 30%"><input type="text" class="easyui-textbox" id="userNameNew" name="userNameNew" style="width: 100%" /></td>
				<td style="width: 15%; text-align: center">级别</td>
				<td style="width: 30%"><select class="easyui-combobox" name="userLevelNew" id="userLevelNew" style="width: 100%">
						<option value="11">管理员</option>
						<option value="21" selected="selected">用户</option>
				</select></td>
				<td style="width: 10%; text-align: center"></td>
			</tr>
			<tr>
				<td style="text-align: center">并发数量</td>
				<td><input type="text" class="easyui-numberbox" id="maxConcurrentNew" name="maxConcurrentNew" style="width: 100%" /></td>
			</tr>
			<tr>
				<td colspan="5" align="center"><a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-add'" style="width: 100px" onclick="doAddUser()">添加</a></td>
			</tr>
		</table>
	</div>

	<div id="divWindowUserEdit" style="display: none">
		<table style="width: 100%; table-layout: fixed;">
			<tr>
				<td style="width: 45%; text-align: center">并发数量</td>
				<td style="width: 50%"><input type="text" class="easyui-numberbox" id="maxConcurrentEdit" name="maxConcurrentEdit" style="width: 100%" /></td>
				<td style="width: 5%; text-align: center"></td>
			</tr>
			<tr>
				<td style="text-align: center"></td>
				<td></td>
			</tr>
			<tr>
				<td colspan="3" align="center"><a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-edit'" style="width: 100px" onclick="doEditUser()">修改</a></td>
			</tr>
		</table>
	</div>

</body>
</html>