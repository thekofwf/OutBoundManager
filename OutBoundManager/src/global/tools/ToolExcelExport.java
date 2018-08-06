package global.tools;

import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFPalette;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;

public class ToolExcelExport {

	private HSSFCellStyle tdLabel;
	private HSSFCellStyle tdItem;

	private int rowBase;

	public Workbook print(String sFileName, List<String> listColumnHead, List<Object[]> listData, boolean bAddLineIndex) throws Exception {
		HSSFWorkbook workbook = new HSSFWorkbook();
		this.InitializeXLS(workbook);

		HSSFSheet sheet = workbook.createSheet(sFileName);
		HSSFRow headerXLS = sheet.createRow(this.rowBase);
		this.rowBase++;
		int nColumnIndex = 0;
		if (bAddLineIndex) {
			HSSFRichTextString txt = new HSSFRichTextString("编号");
			HSSFCell hCell = headerXLS.createCell(0);
			hCell.setCellStyle(this.tdLabel);
			hCell.setCellValue(txt);
			nColumnIndex = 1;
		}
		for (int i = nColumnIndex; i < (nColumnIndex + listColumnHead.size()); i++) {
			sheet.setColumnWidth(i, (short) 5000);

			HSSFRichTextString txt = new HSSFRichTextString(listColumnHead.get(i - nColumnIndex));
			HSSFCell hCell = headerXLS.createCell(i);
			hCell.setCellStyle(this.tdLabel);
			hCell.setCellValue(txt);
		}

		String sCellValue;
		for (Object[] objs : listData) {
			HSSFRow rowXLS = sheet.createRow(this.rowBase);
			this.rowBase++;
			if (bAddLineIndex) {
				sCellValue = Integer.toString(this.rowBase - 1);
				HSSFRichTextString txt = new HSSFRichTextString(sCellValue);
				HSSFCell hCell = rowXLS.createCell(0);
				hCell.setCellStyle(this.tdItem);
				hCell.setCellValue(txt);
			}

			for (int i = nColumnIndex; i < (nColumnIndex + listColumnHead.size()); i++) {
				sCellValue = String.valueOf(objs[i - nColumnIndex]);
				HSSFRichTextString txt = new HSSFRichTextString(sCellValue);
				HSSFCell hCell = rowXLS.createCell(i);
				hCell.setCellStyle(this.tdItem);
				hCell.setCellValue(txt);
			}
		}

		return workbook;
	}

	private void InitializeXLS(HSSFWorkbook workbook) {
		this.rowBase = 0;
		HSSFPalette palette = workbook.getCustomPalette();
		palette.setColorAtIndex((short) 9, (byte) (0xC0), (byte) (0xC0), (byte) (0xC0));
		palette.setColorAtIndex((short) 10, (byte) (0x00), (byte) (0x00), (byte) (0x00));
		this.tdLabel = workbook.createCellStyle();
		this.tdLabel.setBorderTop((short) 1);
		this.tdLabel.setBorderBottom((short) 1);
		this.tdLabel.setBorderLeft((short) 1);
		this.tdLabel.setBorderRight((short) 1);
		this.tdLabel.setLeftBorderColor((short) 10);
		this.tdLabel.setTopBorderColor((short) 10);
		this.tdLabel.setRightBorderColor((short) 10);
		this.tdLabel.setBottomBorderColor((short) 10);
		this.tdLabel.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
		this.tdLabel.setFillForegroundColor((short) 9);
		this.tdLabel.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
		this.tdItem = workbook.createCellStyle();
		this.tdItem.setBorderTop((short) 1);
		this.tdItem.setBorderBottom((short) 1);
		this.tdItem.setBorderLeft((short) 1);
		this.tdItem.setBorderRight((short) 1);
		this.tdItem.setLeftBorderColor((short) 10);
		this.tdItem.setTopBorderColor((short) 10);
		this.tdItem.setRightBorderColor((short) 10);
		this.tdItem.setBottomBorderColor((short) 10);
	}

}