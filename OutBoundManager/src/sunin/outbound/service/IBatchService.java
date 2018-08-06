package sunin.outbound.service;

import java.util.List;
import java.util.Map;

import sunin.outbound.model.Batch;

public interface IBatchService {
	public boolean insert(Batch batch);

	public Batch selectById(String batchId);

	public boolean delete(Map<String, String> map);

	public boolean update(Batch batch);
	
	public boolean changeState(Map<String, String> map);

	public int selectBatchsCount(String condition);

	public List<Batch> selectBatchs(String condition);
}
