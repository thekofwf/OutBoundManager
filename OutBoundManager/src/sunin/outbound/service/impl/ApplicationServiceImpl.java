package sunin.outbound.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sunin.outbound.model.Application;
import sunin.outbound.model.mapper.IApplicationMapper;
import sunin.outbound.service.IApplicationService;

@Service
@Transactional
// 此处不再进行创建SqlSession和提交事务，都已交由spring去管理了。
public class ApplicationServiceImpl implements IApplicationService {

	@Resource
	private IApplicationMapper iApplicationMapper;

	public boolean insert(Application application) {
		System.out.println(this.getClass().getName() + " insert : " + application.toString());
		try {
			iApplicationMapper.insert(application);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean delete(Application application) {
		System.out.println(this.getClass().getName() + " delete : " + application.toString());
		try {
			iApplicationMapper.delete(application);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean update(Application application) {
		System.out.println(this.getClass().getName() + " update : " + application.toString());
		try {
			iApplicationMapper.update(application);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public int selectApplicationsCount() {
		System.out.println(this.getClass().getName() + " selectApplicationsCount : ");
		int nCount = 0;
		try {
			nCount = iApplicationMapper.selectApplicationsCount();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return nCount;
	}

	public List<Application> selectApplications(String condition) {
		System.out.println(this.getClass().getName() + " selectApplications : " + condition);
		try {
			List<Application> listApplications = iApplicationMapper.selectApplications(condition);
			return listApplications;
		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

}
