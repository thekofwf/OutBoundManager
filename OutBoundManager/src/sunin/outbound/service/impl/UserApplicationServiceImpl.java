package sunin.outbound.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sunin.outbound.model.UserApplication;
import sunin.outbound.model.mapper.IUserApplicationMapper;
import sunin.outbound.service.IUserApplicationService;

@Service
@Transactional
// 此处不再进行创建SqlSession和提交事务，都已交由spring去管理了。
public class UserApplicationServiceImpl implements IUserApplicationService {

	@Resource
	private IUserApplicationMapper iUserApplicationMapper;

	public boolean insert(UserApplication userApplication) {
		System.out.println(this.getClass().getName() + " insert : " + userApplication.toString());
		try {
			iUserApplicationMapper.insert(userApplication);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean delete(UserApplication userApplication) {
		System.out.println(this.getClass().getName() + " delete : " + userApplication.toString());
		try {
			iUserApplicationMapper.delete(userApplication);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public List<UserApplication> selectUserApplications(String condition) {
		System.out.println(this.getClass().getName() + " selectUserApplications : " + condition);
		try {
			List<UserApplication> listUserApplications = iUserApplicationMapper.selectUserApplications(condition);
			return listUserApplications;
		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

}
