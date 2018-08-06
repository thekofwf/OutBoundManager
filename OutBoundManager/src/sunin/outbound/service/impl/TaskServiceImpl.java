package sunin.outbound.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sunin.outbound.model.Task;
import sunin.outbound.model.mapper.ITaskMapper;
import sunin.outbound.service.ITaskService;

@Service
@Transactional
// 此处不再进行创建SqlSession和提交事务，都已交由spring去管理了。
public class TaskServiceImpl implements ITaskService {

	@Resource
	private ITaskMapper iTaskMapper;

	public boolean insert(Task task) {
		System.out.println(this.getClass().getName() + " insert : " + task.toString());
		try {
			iTaskMapper.insert(task);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public Task selectById(String taskId) {
		System.out.println(this.getClass().getName() + " selectById : " + taskId);

		Task task = null;
		try {
			task = iTaskMapper.selectById(taskId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return task;
	}

	public boolean delete(Map<String, String> map) {
		System.out.println(this.getClass().getName() + " delete : " + map.toString());
		try {
			iTaskMapper.delete(map);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean update(Task task) {
		System.out.println(this.getClass().getName() + " update : " + task.toString());
		try {
			iTaskMapper.update(task);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public int selectTasksCount(String condition) {
		System.out.println(this.getClass().getName() + " selectTasksCount : " + condition);
		int nCount = 0;
		try {
			nCount = iTaskMapper.selectTasksCount(condition);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return nCount;
	}

	public List<Task> selectTasks(String condition) {
		System.out.println(this.getClass().getName() + " selectTasks : " + condition);
		try {
			List<Task> listTasks = iTaskMapper.selectTasks(condition);
			return listTasks;
		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

	// public User findById(int id) {
	// System.out.println(this.getClass().getName() + " findById");
	// User user = iUserMapper.findById(id);
	// return user;
	// }
	//

}
