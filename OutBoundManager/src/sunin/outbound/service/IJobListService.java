package sunin.outbound.service;

import java.util.List;
import java.util.Map;

import sunin.outbound.model.JobList;

public interface IJobListService {
	public boolean insert(Map<String, Object> map);

	public boolean changeState(Map<String, String> map);
	
	public int selectJobListsCount(Map<String, String> map);

	public List<JobList> selectJobLists(Map<String, String> map);
}
