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

	document.write("<script type='text/javascript'  src='" + getHref('manager/user/js/pwd.js') + "'></s" + "cript>");
</script>
</head>

<body onload="initialize()" class="easyui-layout">
	<div data-options="region:'center',title:'修改密码',split:true">
		<div id="divChangePwd" style="width: 250px; height: 200px">
			<table>
				<tr>
					<td style="width: 100px"></td>
					<td style="width: 150px"></td>
				</tr>
				<tr>
					<td style="text-align: center;">原密码</td>
					<td><input type="password" class="easyui-textbox" style="width: 100%" id="userPwdOld" name="userPwdOld" value="" /></td>
				</tr>
				<tr>
					<td style="text-align: center;">新密码</td>
					<td><input type="password" class="easyui-textbox" style="width: 100%" id="userPwdNew1" name="userPwdNew1" value="" /></td>
				</tr>
				<tr>
					<td style="text-align: center;">确认新密码</td>
					<td><input type="password" class="easyui-textbox" style="width: 100%" id="userPwdNew2" name="userPwdNew2" value="" /></td>
				</tr>
				<tr>
					<td colspan="2" style="text-align: center;"><a id="btn" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-save'" style="width: 100px" onclick="doChangePwd()">修改密码</a></td>
				</tr>
			</table>
		</div>
	</div>

</body>
</html>