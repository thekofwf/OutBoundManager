package sunin.outbound.service;

import java.util.List;

import sunin.outbound.model.Application;

public interface IApplicationService {

	public boolean insert(Application application);

	public boolean delete(Application application);

	public boolean update(Application application);

	public int selectApplicationsCount();

	public List<Application> selectApplications(String condition);

}
