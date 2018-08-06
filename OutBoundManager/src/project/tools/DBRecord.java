package project.tools;

import global.tools.ToolConfig;
import global.tools.ToolConvert;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import sunin.outbound.model.Orktape;
import sunin.outbound.model.define.ConstOrktape;

public class DBRecord {
	private static String driver;
	private static String url;
	private static String user;
	private static String password;
	private static String type;
	private static String filePrefix;

	static {
		try {
			url = ToolConfig.get("RecordDBUrl");
			user = ToolConfig.get("RecordDBUser");
			password = ToolConfig.get("RecordDBPassword");
			driver = ToolConfig.get("RecordDBDriver");
			type = ToolConfig.get("RecordDBType");

			filePrefix = ToolConfig.get("RecordFilePrefix");

			// 注册驱动(注册一次)
			Class.forName(driver);
			System.out.println("Class.forName success : " + driver);
		} catch (ClassNotFoundException e) {
			System.out.println("Class.forName failed : " + driver);
			System.out.println(e.getMessage());
			throw new RuntimeException("驱动注册失败");
		}
	}

	public static String getType() {
		return type;
	}

	// 连接数据库
	public Connection getConnection() {
		Connection conn = null;
		try {
			conn = DriverManager.getConnection(url, user, password);
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("连接失败");
		}
		return conn;
	}

	// 关闭有结果集数据库
	public void close(ResultSet rs, Statement stat, Connection conn) {
		try {
			if (rs != null) {
				rs.close();
			}
			if (stat != null) {
				stat.close();
			}
			if (conn != null) {
				conn.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("关闭失败 1");
		}
	}

	// 关闭没有结果集
	public void close(Statement stat, Connection conn) {
		try {
			if (stat != null) {
				stat.close();
			}
			if (conn != null) {
				conn.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("关闭失败 2");
		}
	}

	public List<Orktape> getRecord(String sUUID) {
		Connection connection = null;
		Statement statement = null;
		ResultSet resultset = null;
		String sSql = "";
		List<Orktape> listOrktapes = new ArrayList<Orktape>();
		try {
			connection = getConnection();
			statement = connection.createStatement();

			sSql = "SELECT " + ConstOrktape.id + " id, " + ConstOrktape.direction + " direction, " + ConstOrktape.duration + " duration, DATE_FORMAT(" + ConstOrktape.expiryTimestamp
					+ ",'%Y-%m-%d %H:%i:%S')" + " expiryTimestamp, " + ConstOrktape.fileName + " fileName, " + ConstOrktape.localEntryPoint + " localEntryPoint, " + ConstOrktape.localParty
					+ " localParty, " + ConstOrktape.portName + " portName, " + ConstOrktape.remoteParty + " remoteParty, " + ConstOrktape.timestamp + " timestamp, " + ConstOrktape.portId
					+ " portId, " + ConstOrktape.serviceId + " serviceId";
			sSql += " FROM " + ConstOrktape.TableName_Real;
			sSql += " WHERE " + ConstOrktape.fileName + " LIKE '%" + sUUID + "%'";
			sSql += " ORDER BY " + ConstOrktape.timestamp;

			System.out.println(sSql);

			resultset = statement.executeQuery(sSql);
			while (resultset.next()) {
				Orktape orktape = new Orktape();
				int index = 1;
				orktape.setId(ToolConvert.toInt(resultset.getObject(index++)));
				orktape.setDirection(ToolConvert.toInt(resultset.getObject(index++)));
				orktape.setDuration(ToolConvert.toLong(resultset.getObject(index++)));
				orktape.setExpiryTimestamp(ToolConvert.toString(resultset.getObject(index++)));
				orktape.setFileName(filePrefix + "/" + ToolConvert.toString(resultset.getObject(index++)));
				orktape.setLocalEntryPoint(ToolConvert.toString(resultset.getObject(index++)));
				orktape.setLocalParty(ToolConvert.toString(resultset.getObject(index++)));
				orktape.setPortName(ToolConvert.toString(resultset.getObject(index++)));
				orktape.setRemoteParty(ToolConvert.toString(resultset.getObject(index++)));
				orktape.setTimestamp(ToolConvert.toString(resultset.getObject(index++)));
				orktape.setPortId(ToolConvert.toInt(resultset.getObject(index++)));
				orktape.setServiceId(ToolConvert.toInt(resultset.getObject(index++)));

				listOrktapes.add(orktape);
			}

			resultset.close();
			resultset = null;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			close(resultset, statement, connection);
		}

		return listOrktapes;
	}

}
