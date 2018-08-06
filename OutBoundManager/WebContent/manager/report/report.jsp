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

<title>报表管理</title>

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
	document.write("<script type='text/javascript'  src='" + getHref('_global/js/tools/_Const_Data.js') + "'></s" + "cript>");
	document.write("<script type='text/javascript'  src='" + getHref('_global/js/tools/_Map.js') + "'></s" + "cript>");
	document.write("<script type='text/javascript'  src='" + getHref('_global/js/tools/_String.js') + "'></s" + "cript>");
	document.write("<script type='text/javascript'  src='" + getHref('_global/js/tools/_DateTime.js') + "'></s" + "cript>");
	document.write("<script type='text/javascript'  src='" + getHref('_global/js/tools/_HighCharts.js') + "'></s" + "cript>");
	document.write("<script type='text/javascript'  src='" + getHref('_global/js/tools/_WindowPlayRecords.js') + "'></s" + "cript>");

	document.write("<script type='text/javascript'  src='" + getHref('highcharts/code/highcharts.js') + "'></s" + "cript>");
	document.write("<script type='text/javascript'  src='" + getHref('highcharts/code/modules/series-label.js') + "'></s" + "cript>");
	document.write("<script type='text/javascript'  src='" + getHref('highcharts/code/modules/exporting.js') + "'></s" + "cript>");
	document.write("<script type='text/javascript'  src='" + getHref('highcharts/code/modules/export-data.js') + "'></s" + "cript>");

	document.write("<script type='text/javascript'  src='" + getHref('manager/report/js/reportQuery.js') + "'></s" + "cript>");
	document.write("<script type='text/javascript'  src='" + getHref('manager/report/js/reportShow.js') + "'></s" + "cript>");
	document.write("<script type='text/javascript'  src='" + getHref('manager/report/js/report.js') + "'></s" + "cript>");
</script>
</head>

<body onload="initialize()" class="easyui-layout">
	<div data-options="region:'west',title:'任务列表',split:true" style="width: 300px">
		<table id="tableDataGridTasks">
		</table>
	</div>
	<div data-options="region:'center',title:'',split:true">
		<div id="divLayoutReport" class="easyui-layout">
			<div data-options="region:'west',title:'报表列表',split:true" style="width: 300px">
				<table id="tableDataGridReportTypes">
				</table>
			</div>
			<div data-options="region:'center',title:'报表展示',split:true">
				<div id="chartContainer" style="width: 100%; height: 100%">
					<div id="container1" style="width: 95%; height: 45%"></div>
					<br>
					<div id="container2" style="width: 95%; height: 45%"></div>
				</div>
				<div id="container3" style="width: 100%; height: 100%">
					<table id="tableDataGridReportDatas">
					</table>
				</div>
			</div>
		</div>
	</div>

	<div id="divWindowSetParams01" style="display: none">
		<table style="width: 100%; table-layout: fixed;">
			<tr>
				<td style="width: 20%"></td>
				<td style="width: 35%"></td>
				<td style="width: 5%"></td>
				<td style="width: 35%"></td>
				<td style="width: 5%"></td>
			</tr>
			<tr>
				<td style="text-align: center">时间类型</td>
				<td colspan="3" style="text-align: center"><input type="radio" name="dtType01" checked="checked" value="1" />当天<input type="radio" name="dtType01" value="7" />近7天<input type="radio" name="dtType01" value="15" />近15天<input type="radio" name="dtType01" value="30" />近30天<input type="radio"
					name="dtType01" value="100" />近100天<input type="radio" name="dtType01" value="0" />自定义</td>
			</tr>
			<tr>
				<td style="text-align: center">自定义时间</td>
				<td><input type="text" class="easyui-datebox" id="startDate01" name="startDate01" style="width: 100%" /></td>
				<td style="text-align: center">-</td>
				<td><input type="text" class="easyui-datebox" id="endDate01" name="endDate01" style="width: 100%" /></td>
			</tr>

			<tr>
				<td colspan="5" align="center"><a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-search'" style="width: 100px" onclick="doQuery('divWindowSetParams01')">查询</a></td>
			</tr>
		</table>
	</div>

	<div id="divWindowSetParams04" style="display: none">
		<table style="width: 100%; table-layout: fixed;">
			<tr>
				<td style="width: 20%"></td>
				<td style="width: 75%"></td>
				<td style="width: 5%"></td>
			</tr>
			<tr>
				<td style="text-align: center">数据状态</td>
				<td style="text-align: center"><select class="easyui-combobox" name="dataType04" id="dataType04" style="width: 100%">
						<option value="0" selected="selected">所有</option>
						<option value="1">已完成通话</option>
						<option value="2">通话失败</option>
						<option value="3">未进行的通话</option>
				</select></td>
			</tr>
			<tr>
				<td colspan="3" align="center"><a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-search'" style="width: 100px" onclick="doQuery('divWindowSetParams04')">查询</a></td>
			</tr>
		</table>
	</div>

	<div id="divWindowSetParams05" style="display: none">
		<table style="width: 100%; table-layout: fixed;">
			<tr>
				<td style="width: 20%"></td>
				<td style="width: 75%"></td>
				<td style="width: 5%"></td>
			</tr>
			<tr>
				<td style="text-align: center">通话时长</td>
				<td style="text-align: center"><input type="text" class="easyui-numberbox" name="lengthMin05" id="lengthMin05" style="width: 45%" />&nbsp;-&nbsp;<input type="text" class="easyui-numberbox" name="lengthMax05" id="lengthMax05" style="width: 45%" /></td>
			</tr>
			<tr>
				<td style="text-align: center">回复关键字</td>
				<td style="text-align: center"><input type="text" class="easyui-textbox" name="keyWord05" id="keyWord05" style="width: 95%" /></td>
			</tr>
			<tr>
				<td colspan="3" align="center"><a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-search'" style="width: 100px" onclick="doQuery('divWindowSetParams05')">查询</a></td>
			</tr>
		</table>
	</div>


	<div id="baseWindowPlayRecords" style="display: none">
		<div id="baseLayoutPlayRecords" class="easyui-layout">
			<div data-options="region:'north',title:'',split:false" style="height: 260px">
				<table style="width: 100%; height: 100%; table-layout: fixed;">
					<tr>
						<td style="width: 100%; height: 250px; text-align: center"><object id="ctrlMediaPlayer" classid="CLSID:6BF52A52-394A-11D3-B153-00C04F79FAA6" width="100%" height="100%" style="display: block;">
								<param name='volume' value='100'>
							</object></td>
					</tr>
				</table>
			</div>
			<div data-options="region:'center',title:'',split:true">
				<table id="baseDataGridPlayRecords">
				</table>
			</div>
		</div>
	</div>

</body>
</html>