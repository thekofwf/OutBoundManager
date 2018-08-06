package global.tools;

import java.io.StringReader;
import java.util.List;

import org.jdom.Attribute;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;
import org.xml.sax.InputSource;

public class ToolXml {
	public Element getRoot(String sXml) {
		try {
			// 创建一个新的字符串
			StringReader read = new StringReader(sXml);
			// 创建新的输入源SAX 解析器将使用 InputSource 对象来确定如何读取 XML 输入
			InputSource source = new InputSource(read);
			// 创建一个新的SAXBuilder
			SAXBuilder sb = new SAXBuilder();
			// 通过输入源构造一个Document
			Document doc = sb.build(source);

			// 取的根元素
			return doc.getRootElement();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@SuppressWarnings("rawtypes")
	public String getElementAttributeValue(Element element, String sAttributeName) {
		if (element == null || sAttributeName == null)
			return null;

		try {
			List list = element.getAttributes();
			for (int i = 0; i < list.size(); i++) {
				Attribute attribute = (Attribute) list.get(i);
				String attributeName = attribute.getName();
				String attributeValue = attribute.getValue();

				if (sAttributeName.compareToIgnoreCase(attributeName) == 0) {
					return attributeValue;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

	public String getElementText(Element element) {
		if (element == null)
			return null;

		try {
			return element.getText();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

	@SuppressWarnings("rawtypes")
	public Element getSubElement(Element element, String sSubElementName) {
		if (element == null || sSubElementName == null)
			return null;

		try {
			List listElementsSub = element.getChildren();
			for (int i = 0; i < listElementsSub.size(); i++) {
				Element elementSub = (Element) listElementsSub.get(i);
				if (elementSub.getName() == null)
					continue;
				if (sSubElementName.compareToIgnoreCase(elementSub.getName()) == 0) {
					return elementSub;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

	@SuppressWarnings({ "rawtypes" })
	public String getSubElementText(Element element, String sSubElementName) {
		if (element == null || sSubElementName == null)
			return null;

		try {
			List listElementsSub = element.getChildren();
			for (int i = 0; i < listElementsSub.size(); i++) {
				Element elementSub = (Element) listElementsSub.get(i);
				if (elementSub.getName() == null)
					continue;
				if (sSubElementName.compareToIgnoreCase(elementSub.getName()) == 0) {
					return elementSub.getText();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

}
