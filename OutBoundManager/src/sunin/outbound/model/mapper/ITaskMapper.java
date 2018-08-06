package sunin.outbound.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import sunin.outbound.model.Task;

public interface ITaskMapper {

	void insert(Task task);

	Task selectById(String taskId);

	void delete(Map<String, String> map);

	void update(Task task);
	
	int selectTasksCount(@Param("condition") String condition);
	
	List<Task> selectTasks(@Param("condition") String condition);
}
