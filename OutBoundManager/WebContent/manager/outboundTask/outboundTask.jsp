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

<title>外拨任务管理</title>

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

	document.write("<script type='text/javascript'  src='" + getHref('_global/js/tools/_Const_Task.js') + "'></s" + "cript>");

	document.write("<script type='text/javascript'  src='" + getHref('manager/outboundTask/js/outboundTask.js') + "'></s" + "cript>");
</script>
</head>

<body onload="initialize()" class="easyui-layout">
	<div data-options="region:'center',title:'任务列表',split:true">
		<table id="tableDataGridTasks">
		</table>
	</div>
	<div data-options="region:'south',title:'任务信息',split:true" style="height: 250px">
		<input type="hidden" class="easyui-textbox" id="taskId" name="taskId" value="" />
		<table style="width: 100%; table-layout: fixed;">
			<tr>
				<td style="width: 9%; text-align: center">任务名称</td>
				<td style="width: 15%"><input type="text" class="easyui-textbox" name="taskName" id="taskName" style="width: 100%" /></td>
				<td style="width: 9%; text-align: center">当前状态</td>
				<td style="width: 15%"><select class="easyui-combobox" name="currentState" id="currentState" style="width: 100%">
						<option value="Run">运行</option>
						<option value="Stop" selected="selected">停止</option>
						<option value="Delete">删除</option>
				</select></td>
				<td style="width: 9%; text-align: center">应用业务</td>
				<td style="width: 15%"><select class="easyui-combobox" name="applicationName" id="applicationName" style="width: 100%">
				</select></td>
				<td style="width: 9%; text-align: center">外显号码</td>
				<td style="width: 15%"><input type="text" class="easyui-textbox" name="ani" id="ani" style="width: 100%" /></td>
				<td style="width: 4%; text-align: center"></td>
			</tr>
			<tr>
				<td style="text-align: center">最大并发</td>
				<td><select class="easyui-combobox" name="maxConcurrentCall" id="maxConcurrentCall" style="width: 100%">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5" selected="selected">5</option>
						<option value="10">10</option>
						<option value="20">20</option>
						<option value="30">30</option>
						<option value="40">40</option>
						<option value="50">50</option>
						<option value="100">100</option>
				</select></td>
				<td style="text-align: center">重拨次数</td>
				<td><select class="easyui-combobox" name="maxAttempts" id="maxAttempts" style="width: 100%">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3" selected="selected">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
				</select></td>
				<td style="text-align: center">重拨间隔</td>
				<td><select class="easyui-combobox" name="retryIntervalHour" id="retryIntervalHour" style="width: 30%"></select>&nbsp;:&nbsp;<select class="easyui-combobox" name="retryIntervalMinute" id="retryIntervalMinute" style="width: 30%"></select>&nbsp;:&nbsp;<select class="easyui-combobox"
					name="retryIntervalSecond" id="retryIntervalSecond" style="width: 30%"></select></td>
				<td style="text-align: center">无应答放弃时长(s)</td>
				<td><input type="text" class="easyui-numberbox" name="rna" id="rna" style="width: 100%" /></td>
			</tr>
			<tr>
				<td style="text-align: center">开始日期</td>
				<td><input type="text" class="easyui-datebox" name="startDate" id="startDate" style="width: 100%" /></td>
				<td style="text-align: center">结束日期</td>
				<td><input type="text" class="easyui-datebox" name="endDate" id="endDate" style="width: 100%" /></td>
				<td style="text-align: center">有效星期</td>
				<td colspan="3" align="left"><input type="checkbox" name="mondayFlag" id="mondayFlag">星期一&nbsp; <input type="checkbox" name="tuesdayFlag" id="tuesdayFlag">星期二&nbsp; <input type="checkbox" name="wednesdayFlag" id="wednesdayFlag">星期三&nbsp; <input type="checkbox"
					name="thursdayFlag" id="thursdayFlag">星期四&nbsp; <input type="checkbox" name="fridayFlag" id="fridayFlag">星期五&nbsp;<input type="checkbox" name="saturdayFlag" id="saturdayFlag">星期六&nbsp;<input type="checkbox" name="sundayFlag" id="sundayFlag">星期日</td>
			</tr>
			<tr>
				<td style="text-align: center">时段一开始</td>
				<td><select class="easyui-combobox" name="beginHour1" id="beginHour1" style="width: 47%"></select>&nbsp;:&nbsp;<select class="easyui-combobox" name="beginMinute1" id="beginMinute1" style="width: 47%"></select></td>
				<td style="text-align: center">时段一结束</td>
				<td><select class="easyui-combobox" name="endHour1" id="endHour1" style="width: 47%"></select>&nbsp;:&nbsp;<select class="easyui-combobox" name="endMinute1" id="endMinute1" style="width: 47%"></select></td>
				<td style="text-align: center">时段二开始</td>
				<td><select class="easyui-combobox" name="beginHour2" id="beginHour2" style="width: 47%"></select>&nbsp;:&nbsp;<select class="easyui-combobox" name="beginMinute2" id="beginMinute2" style="width: 47%"></select></td>
				<td style="text-align: center">时段二结束</td>
				<td><select class="easyui-combobox" name="endHour2" id="endHour2" style="width: 47%"></select>&nbsp;:&nbsp;<select class="easyui-combobox" name="endMinute2" id="endMinute2" style="width: 47%"></select></td>
			</tr>
			<tr>
				<td style="text-align: center">时段三开始</td>
				<td><select class="easyui-combobox" name="beginHour3" id="beginHour3" style="width: 47%"></select>&nbsp;:&nbsp;<select class="easyui-combobox" name="beginMinute3" id="beginMinute3" style="width: 47%"></select></td>
				<td style="text-align: center">时段三结束</td>
				<td><select class="easyui-combobox" name="endHour3" id="endHour3" style="width: 47%"></select>&nbsp;:&nbsp;<select class="easyui-combobox" name="endMinute3" id="endMinute3" style="width: 47%"></select></td>
				<td style="text-align: center">时段四开始</td>
				<td><select class="easyui-combobox" name="beginHour4" id="beginHour4" style="width: 47%"></select>&nbsp;:&nbsp;<select class="easyui-combobox" name="beginMinute4" id="beginMinute4" style="width: 47%"></select></td>
				<td style="text-align: center">时段四结束</td>
				<td><select class="easyui-combobox" name="endHour4" id="endHour4" style="width: 47%"></select>&nbsp;:&nbsp;<select class="easyui-combobox" name="endMinute4" id="endMinute4" style="width: 47%"></select></td>
			</tr>
			<tr>
				<td style="text-align: center">&nbsp;</td>
				<td></td>
			</tr>
			<tr>
				<td colspan="9" align="center"><a id="btn" href="javascript:void(0);" class="easyui-linkbutton" style="width: 100px" data-options="iconCls:'icon-add'" onclick="doAddTask()">添加</a>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <a id="btn" href="javascript:void(0);"
					class="easyui-linkbutton" style="width: 100px" data-options="iconCls:'icon-edit'" onclick="doSaveTask()">更新</a>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <a id="btn" href="javascript:void(0);" class="easyui-linkbutton" style="width: 100px" data-options="iconCls:'icon-remove'"
					onclick="doDeleteTask()">删除</a></td>
			</tr>
		</table>
	</div>
	<div data-options="region:'east', title:'查询参数',split:true" style="width: 300px">
		<table style="width: 100%; table-layout: fixed;">
			<tr>
				<td style="width: 30%; text-align: center">开始日期</td>
				<td style="width: 60%"><input type="text" class="easyui-datebox" id="conditionStartDate" name="conditionStartDate" style="width: 100%" /></td>
				<td style="width: 10%; text-align: center"></td>
			</tr>
			<tr>
				<td style="text-align: center">结束日期</td>
				<td><input type="text" class="easyui-datebox" id="conditionEndDate" name="conditionEndDate" style="width: 100%" /></td>
			</tr>
			<tr>
				<td style="text-align: center">当前状态</td>
				<td><select class="easyui-combobox" id="currentStateCondition" name="currentStateCondition" style="width: 100%;">
						<option value="" selected="selected">全部</option>
						<option value="Run">运行</option>
						<option value="Stop">停止</option>
						<option value="Delete">删除</option>
				</select></td>
			</tr>
			<tr>
				<td colspan="3" align="center"><a id="btn" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="doQueryTasks()">查询</a></td>
			</tr>
		</table>
	</div>
</body>
</html>