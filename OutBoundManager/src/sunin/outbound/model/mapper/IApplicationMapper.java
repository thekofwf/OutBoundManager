package sunin.outbound.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import sunin.outbound.model.Application;

public interface IApplicationMapper {

	void insert(Application application);

	void delete(Application application);

	void update(Application application);

	int selectApplicationsCount();

	List<Application> selectApplications(@Param("condition") String condition);
}
