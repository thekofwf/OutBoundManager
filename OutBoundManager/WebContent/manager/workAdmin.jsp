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

<title>Main</title>

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

	document.write("<script type='text/javascript'  src='" + getHref('_global/js/tools/_Map.js') + "'></s" + "cript>");

	document.write("<script type='text/javascript'  src='" + getHref('manager/js/workAdmin_Accordion.js') + "'></s" + "cript>");
	document.write("<script type='text/javascript'  src='" + getHref('manager/js/workAdmin_Api.js') + "'></s" + "cript>");
	document.write("<script type='text/javascript'  src='" + getHref('manager/js/workAdmin_Tab.js') + "'></s" + "cript>");

	document.write("<script type='text/javascript'  src='" + getHref('manager/js/workAdmin.js') + "'></s" + "cript>");
</script>

</head>

<body onload="initialize()" class="easyui-layout">
	<input type="hidden" class="easyui-textbox" id="agentId" name="agentId" value="${agentId}" />
	<input type="hidden" class="easyui-textbox" id="userInfo" name="userInfo" value="${userInfo}" />

	<div data-options="region:'north',title:'',split:false" style="height: 100px">
		<img id="imgBackground" style="display: block; width: 100%; height: 100%" />
		<div id="divInfo" style="width: 250px; height: 200px">
			<label>${agentId} 您好! </label>
		</div>
	</div>
	<div id="divLayoutWest" data-options="region:'west',title:'功能列表',split:true" style="width: 200px">
		<div id="divAccordion" class="easyui-accordion"></div>
	</div>
	<div id="divLayoutCenter" data-options="region:'center',split:true">
		<div id="divTabsMain" class="easyui-tabs"></div>
	</div>
</body>
</html>