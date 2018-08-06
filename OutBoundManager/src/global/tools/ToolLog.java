package global.tools;

import java.io.BufferedOutputStream;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ToolLog {
	public enum LevelEx {
		ERR, WRN, KEY, INF
	}

	private static String logDefaultPath;
	private static String logFilePrefix;
	private static String logWrite;
	static {
		logDefaultPath = ToolConfig.getByLog(ToolConst.logDefaultPath);
		logFilePrefix = ToolConfig.getByLog(ToolConst.logFilePrefix);
		logWrite = ToolConfig.getByLog(ToolConst.logWrite);
	}

	public static String getLogDefaultPath() {
		return logDefaultPath;
	}

	public static void testWrite(String strBuffer) {
		int count = 1000000;
		// 写文件行数
		// FileOutputStream 执行耗时:3412 豪秒
		// BufferedOutputStream 执行耗时:480 豪秒
		// FileWriter 执行耗时:638 豪秒
		// BufferedWriter 1 执行耗时:1173 豪秒
		// BufferedWriter 2 执行耗时:803 豪秒
		// BufferedWriter 3 执行耗时:697 豪秒

		String s = "测试java 文件操作测试java 文件操作测试java 文件操作测试java 文件操作测试java 文件操作\r\n";
		try {
			{
				long begin = System.currentTimeMillis();
				FileOutputStream fileOutputStream = new FileOutputStream(new File("C:/test1.txt"));
				for (int i = 0; i < count; i++) {
					fileOutputStream.write(s.getBytes());
				}
				fileOutputStream.close();
				long end = System.currentTimeMillis();
				System.out.println("FileOutputStream 执行耗时:" + (end - begin) + " 豪秒");
			}

			{
				long begin = System.currentTimeMillis();
				FileOutputStream fileOutputStream = new FileOutputStream(new File("C:/test2.txt"));
				BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(fileOutputStream);
				for (int i = 0; i < count; i++) {
					bufferedOutputStream.write(s.getBytes());
				}
				bufferedOutputStream.flush();
				bufferedOutputStream.close();
				long end = System.currentTimeMillis();
				System.out.println("BufferedOutputStream 执行耗时:" + (end - begin) + " 豪秒");
			}

			{
				long begin = System.currentTimeMillis();
				FileWriter fw = new FileWriter("C:/test3.txt");
				for (int i = 0; i < count; i++) {
					fw.write(s);
				}
				fw.close();
				long end = System.currentTimeMillis();
				System.out.println("FileWriter 执行耗时:" + (end - begin) + " 豪秒");
			}

			{
				long begin = System.currentTimeMillis();
				File file = new File("C:/test4.txt");
				OutputStream outputStream = new FileOutputStream(file);
				OutputStreamWriter outputStreamWriter = new OutputStreamWriter(outputStream);
				BufferedWriter bufferedWriter = new BufferedWriter(outputStreamWriter);
				for (int i = 0; i < count; i++) {
					bufferedWriter.write(s);
				}
				bufferedWriter.flush();
				bufferedWriter.close();
				long end = System.currentTimeMillis();
				System.out.println("BufferedWriter 1 执行耗时:" + (end - begin) + " 豪秒");
			}

			{
				long begin = System.currentTimeMillis();
				File file = new File("C:/test5.txt");
				OutputStream outputStream = new FileOutputStream(file);
				BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(outputStream);
				OutputStreamWriter outputStreamWriter = new OutputStreamWriter(bufferedOutputStream);
				BufferedWriter bufferedWriter = new BufferedWriter(outputStreamWriter);
				for (int i = 0; i < count; i++) {
					bufferedWriter.write(s);
				}
				bufferedWriter.flush();
				bufferedWriter.close();
				long end = System.currentTimeMillis();
				System.out.println("BufferedWriter 2 执行耗时:" + (end - begin) + " 豪秒");
			}

			{
				long begin = System.currentTimeMillis();
				File file = new File("C:/test6.txt");
				FileWriter fileWriter = new FileWriter(file);
				BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);
				for (int i = 0; i < count; i++) {
					bufferedWriter.write(s);
				}
				bufferedWriter.flush();
				bufferedWriter.close();
				long end = System.currentTimeMillis();
				System.out.println("BufferedWriter 3 执行耗时:" + (end - begin) + " 豪秒");
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void log(LevelEx level, String sLog) {
		if (logWrite.compareToIgnoreCase("false") == 0) {
			String strDT = ToolDateTime.getDT();
			System.out.println(strDT + " : " + getLevel(level) + " " + sLog);
			return;
		}

		SimpleDateFormat sdf = new SimpleDateFormat("YYYYMMddHH");
		String sFileTime = sdf.format(new Date());

		String strFilePath = logDefaultPath + "/" + logFilePrefix + sFileTime + ".log";
		log(strFilePath, level, sLog);
	}

	public static void log(String sFile, LevelEx level, String sLog) {
		String strDT = ToolDateTime.getDT();
		System.out.println(strDT + " : " + getLevel(level) + " " + sLog);

		FileOutputStream fileOutputStream = null;
		try {
			fileOutputStream = new FileOutputStream(sFile, true);
			BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(fileOutputStream);
			bufferedOutputStream.write(ToolDateTime.getDT().getBytes());
			bufferedOutputStream.write(" ".getBytes());
			bufferedOutputStream.write(getLevel(level).getBytes());
			bufferedOutputStream.write(" ".getBytes());
			bufferedOutputStream.write(sLog.getBytes());
			bufferedOutputStream.write("\r\n".getBytes());
			bufferedOutputStream.flush();
			bufferedOutputStream.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (fileOutputStream != null)
					fileOutputStream.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	private static String getLevel(LevelEx level) {
		switch (level) {
		case ERR:
			return ToolConst.ERR;
		case WRN:
			return ToolConst.WRN;
		case KEY:
			return ToolConst.KEY;
		case INF:
			return ToolConst.INF;
		default:
			return ToolConst.INF;
		}
	}
}
