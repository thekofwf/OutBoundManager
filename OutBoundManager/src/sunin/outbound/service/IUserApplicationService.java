package sunin.outbound.service;

import java.util.List;

import sunin.outbound.model.UserApplication;

public interface IUserApplicationService {

	public boolean insert(UserApplication userApplication);

	public boolean delete(UserApplication userApplication);

	public List<UserApplication> selectUserApplications(String condition);

}
