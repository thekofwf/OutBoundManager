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

<title>任务数据管理</title>

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
	document.write("<script type='text/javascript'  src='" + getHref('_global/js/tools/_Const_Batch.js') + "'></s" + "cript>");
	document.write("<script type='text/javascript'  src='" + getHref('_global/js/tools/_Const_Data.js') + "'></s" + "cript>");

	document.write("<script type='text/javascript'  src='" + getHref('manager/outboundTask/js/outboundTaskData.js') + "'></s" + "cript>");
</script>
</head>

<body onload="initialize()" class="easyui-layout">
	<div data-options="region:'west',title:'任务列表',split:true" style="width: 300px">
		<table id="tableDataGridTasks">
		</table>
	</div>
	<div data-options="region:'center',title:'',split:true">
		<div id="divLayoutBatchsDatas" class="easyui-layout">
			<div data-options="region:'west',title:'批次列表',split:true" style="width: 400px">
				<table id="tableDataGridBatchs">
				</table>
			</div>
			<div data-options="region:'center',title:'数据列表',split:true">
				<table id="tableDataGridDatas">
				</table>
			</div>
		</div>
	</div>

	<div id="divWindowBatchAdd" style="display: none">
		<input type="hidden" class="easyui-textbox" id="batchIdEdit" name="batchEdit" value="" />
		<table style="width: 100%; table-layout: fixed;">
			<tr>
				<td style="width: 15%; text-align: center">批次名称</td>
				<td style="width: 30%"><input type="text" class="easyui-textbox" id="batchNameNew" name="batchNameNew" style="width: 100%" /></td>
				<td style="width: 15%; text-align: center">批次状态</td>
				<td style="width: 30%"><select class="easyui-combobox" name="batchStateNew" id="batchStateNew" style="width: 100%">
						<option value="Run">运行</option>
						<option value="Stop" selected="selected">停止</option>
						<option value="Delete">删除</option>
				</select></td>
				<td style="width: 10%; text-align: center"></td>
			</tr>
			<tr>
				<td colspan="5" align="center"><a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-add'" style="width: 100px" onclick="doAddBatch()">添加</a></td>
			</tr>
		</table>
	</div>

	<div id="divWindowBatchEdit" style="display: none">
		<table style="width: 100%; table-layout: fixed;">
			<tr>
				<td style="width: 40%; text-align: center">批次名称</td>
				<td style="width: 50%"><input type="text" class="easyui-textbox" id="batchNameEdit" name="batchNameEdit" style="width: 100%" /></td>
				<td style="width: 10%; text-align: center"></td>
			</tr>
			<tr>
				<td colspan="3" align="center"><a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-save'" style="width: 100px" onclick="doSaveBatch()">修改</a></td>
			</tr>
		</table>
	</div>

	<div id="divWindowUploadFile" style="display: none">
		<form id="formUploadFile" name="formUploadFile" action="" method="post" enctype="multipart/form-data">
			<div style="display: none">
				<input type="hidden" class="easyui-textbox" id="taskIdImport" name="taskIdImport" value="" /> <input type="hidden" class="easyui-textbox" id="batchIdImport" name="batchIdImport" value="" />
			</div>
			<table style="width: 100%; table-layout: fixed;">
				<tr>
					<td>&nbsp;</td>
				</tr>
				<tr>
					<td style="width: 100%; text-align: center"><input type="file" id="fileUpload" name="fileUpload" style="width: 90%"></td>
				</tr>
				<tr>
					<td align="center"><a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-save'" style="width: 100px" onclick="doUploadFile()">上传</a></td>
				</tr>
			</table>
		</form>
	</div>

</body>
</html>