package sunin.outbound.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import sunin.outbound.model.User;

public interface IUserMapper {

	void insert(User user);

	User selectByName(String userName);

	void delete(User user);

	void resetPwd(User user);

	void changePwd(User user);
	
	void save(User user);
	
	int selectUsersCount();

	List<User> selectUsers(@Param("condition") String condition);
}
