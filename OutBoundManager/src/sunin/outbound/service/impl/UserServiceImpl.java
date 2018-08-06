package sunin.outbound.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sunin.outbound.model.User;
import sunin.outbound.model.mapper.IUserMapper;
import sunin.outbound.service.IUserService;

@Service
@Transactional
// 此处不再进行创建SqlSession和提交事务，都已交由spring去管理了。
public class UserServiceImpl implements IUserService {

	@Resource
	private IUserMapper iUserMapper;

	public boolean insert(User user) {
		System.out.println(this.getClass().getName() + " insert : " + user.toString());
		try {
			iUserMapper.insert(user);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public User selectByName(String userName) {
		System.out.println(this.getClass().getName() + " selectByName : " + userName);

		User user = null;
		try {
			user = iUserMapper.selectByName(userName);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return user;
	}

	public boolean delete(User user) {
		System.out.println(this.getClass().getName() + " delete : " + user.toString());
		try {
			iUserMapper.delete(user);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean resetPwd(User user) {
		System.out.println(this.getClass().getName() + " resetPwd : " + user.toString());
		try {
			iUserMapper.resetPwd(user);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean changePwd(User user) {
		System.out.println(this.getClass().getName() + " changePwd : " + user.toString());
		try {
			iUserMapper.changePwd(user);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean save(User user) {
		System.out.println(this.getClass().getName() + " save : " + user.toString());
		try {
			iUserMapper.save(user);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public int selectUsersCount() {
		System.out.println(this.getClass().getName() + " selectUsersCount : ");
		int nCount = 0;
		try {
			nCount = iUserMapper.selectUsersCount();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return nCount;
	}

	public List<User> selectUsers(String condition) {
		System.out.println(this.getClass().getName() + " selectUsers : " + condition);
		try {
			List<User> listUsers = iUserMapper.selectUsers(condition);
			return listUsers;
		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

}
