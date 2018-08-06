package sunin.outbound.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sunin.outbound.model.mapper.IPublicMapper;
import sunin.outbound.service.IPublicService;

@Service
@Transactional
// 此处不再进行创建SqlSession和提交事务，都已交由spring去管理了。
public class PublicServiceImpl implements IPublicService {

	@Resource
	private IPublicMapper iPublicMapper;

	public int selectPublicCount(String sql) {
		System.out.println(this.getClass().getName() + " selectPublicCount : " + sql);
		int nCount = 0;
		try {
			nCount = iPublicMapper.selectPublicCount(sql);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return nCount;
	}

	public List<Map<String, Object>> selectPublic(String sql) {
		System.out.println(this.getClass().getName() + " selectPublic : " + sql);
		try {
			List<Map<String, Object>> listMap = iPublicMapper.selectPublic(sql);
			return listMap;
		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

}
