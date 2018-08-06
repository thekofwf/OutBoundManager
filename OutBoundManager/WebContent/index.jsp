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

<title>Outbound 2.0</title>

<script type="text/javascript">
	var s1 = window.document.location.href;
	var s2 = window.document.location.pathname;
	var n = s1.indexOf(s2);
	var s3 = s2.substring(0, s2.substr(1).indexOf('/') + 1);
	var LocalHostPath = s1.substring(0, n) + s3 + "/";

	function getHref(path) {
		return LocalHostPath + path;
	}

	document.write("<scr" + "ipt type='text/javascript'  src='" + getHref('_global/_Base.js') + "'></s" + "cript>");

	document.write("<scr" + "ipt type='text/javascript'  src='" + getHref('index.js') + "'></s" + "cript>");
</script>

</head>

<body onload="initialize()">
	<div id="divBackground">
		<img id="imgBackground" style="display: block; width: 100%; height: 100%" />
	</div>
	<div id="divLogin" style="width: 250px; height: 200px">
		<table>
			<tr>
				<td style="width: 100px"></td>
				<td style="width: 150px"></td>
			</tr>
			<tr>
				<td colspan="2" style="text-align: center; font-size: 40">外拨管理系统</td>
			</tr>
			<tr>
				<td style="text-align: center;">用户</td>
				<td><input type="text" class="easyui-textbox" style="width: 100%" id="userName" name="userName" value="" /></td>
			</tr>
			<tr>
				<td style="text-align: center;">密码</td>
				<td><input type="password" class="easyui-textbox" style="width: 100%" id="agentPwd" name="agentPwd" value="" /></td>
			</tr>
			<tr>
				<td style="text-align: center;"></td>
				<td style="text-align: left"><a id="btn" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-add'" onclick="doLogin()">登陆</a></td>
			</tr>
		</table>
	</div>
	<div style="display: none;">
		<form name="loginForm" method="post">
			<input type="text" class="easyui-textbox" id="agentId" name="agentId" value="" />
		</form>
	</div>
</body>
</html>