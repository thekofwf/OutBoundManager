package sunin.outbound.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import sunin.outbound.model.UserApplication;

public interface IUserApplicationMapper {

	void insert(UserApplication userApplication);

	void delete(UserApplication userApplication);

	List<UserApplication> selectUserApplications(@Param("condition") String condition);
}
