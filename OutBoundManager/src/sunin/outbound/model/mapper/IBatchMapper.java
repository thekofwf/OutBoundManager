package sunin.outbound.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import sunin.outbound.model.Batch;

public interface IBatchMapper {

	void insert(Batch batch);

	Batch selectById(String batchId);

	void delete(Map<String, String> map);

	void update(Batch batch);
	
	void changeState(Map<String, String> map);

	int selectBatchsCount(@Param("condition") String condition);

	List<Batch> selectBatchs(@Param("condition") String condition);
}
