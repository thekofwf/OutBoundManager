package sunin.outbound.service;

import java.util.List;
import java.util.Map;

import sunin.outbound.model.Task;

public interface ITaskService {
	public boolean insert(Task task);

	public Task selectById(String taskId);

	public boolean delete(Map<String, String> map);

	public boolean update(Task task);
	
	public int selectTasksCount(String condition);
	
	public List<Task> selectTasks(String condition);
}
