package sunin.outbound.model.mapper;

import java.util.List;
import java.util.Map;

import sunin.outbound.model.JobList;

public interface IJobListMapper {
	void insert(Map<String, Object> map);

	void changeState(Map<String, String> map);

	int selectJobListsCount(Map<String, String> map);

	List<JobList> selectJobLists(Map<String, String> map);
}
