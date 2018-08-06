package sunin.outbound.model.define;

import net.sf.json.JSONObject;

public class _RespDefine {
	// {
	// "result":"",
	// "request":"",
	// "errorcode":"",
	// "errormsg":"",
	//
	// "data":""
	// }

	public static final String Result = "result";
	public static final String Result_Success = "success";
	public static final String Result_Failed = "failed";
	public static final String Result_Error = "error";

	public static final String Request = "request";
	public static final String Request_GetSysInfo = "getSysInfo";
	public static final String Request_PutAgent = "putAgent";
	public static final String Request_GetAgent = "getAgent";
	public static final String Request_DeleteAgent = "deleteAgent";
	public static final String Request_PostAgent = "postAgent";

	public static final String ErrorCode = "errorcode";
	public static final int ErrorCode_Default = -1;

	public static final String ErrorMsg = "errormsg";
	public static final String ErrorMsg_Default = "";

	public static final String Data = "data";

	public static JSONObject getJsonObject(String sResult, String sRequest, int nErrorCode, String sErrorMsg) {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put(_RespDefine.Result, sResult);
		jsonObject.put(_RespDefine.Request, sRequest);
		jsonObject.put(_RespDefine.ErrorCode, nErrorCode + "");
		jsonObject.put(_RespDefine.ErrorMsg, sErrorMsg);
		return jsonObject;
	}

}
