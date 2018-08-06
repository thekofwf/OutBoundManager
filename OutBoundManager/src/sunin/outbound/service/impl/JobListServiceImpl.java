package sunin.outbound.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sunin.outbound.model.JobList;
import sunin.outbound.model.mapper.IJobListMapper;
import sunin.outbound.service.IJobListService;

@Service
@Transactional
// 此处不再进行创建SqlSession和提交事务，都已交由spring去管理了。
public class JobListServiceImpl implements IJobListService {

	@Resource
	private IJobListMapper iJobListMapper;

	public boolean insert(Map<String, Object> map) {
		System.out.println(this.getClass().getName() + " insert : " + map.toString());
		try {
			iJobListMapper.insert(map);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public boolean changeState(Map<String, String> map) {
		System.out.println(this.getClass().getName() + " changeState : " + map.toString());
		try {
			iJobListMapper.changeState(map);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public int selectJobListsCount(Map<String, String> map) {
		System.out.println(this.getClass().getName() + " selectBatchsCount : " + map.toString());
		int nCount = 0;
		try {
			nCount = iJobListMapper.selectJobListsCount(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return nCount;
	}

	public List<JobList> selectJobLists(Map<String, String> map) {
		System.out.println(this.getClass().getName() + " selectBatchs : " + map.toString());
		try {
			List<JobList> listJobLists = iJobListMapper.selectJobLists(map);
			return listJobLists;
		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

}
