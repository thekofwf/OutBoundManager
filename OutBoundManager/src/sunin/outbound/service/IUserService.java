package sunin.outbound.service;

import java.util.List;

import sunin.outbound.model.User;

public interface IUserService {

	public boolean insert(User user);

	User selectByName(String userName);

	public boolean delete(User user);

	public boolean resetPwd(User user);

	public boolean changePwd(User user);
	
	public boolean save(User user);
	
	public int selectUsersCount();

	public List<User> selectUsers(String condition);
}
