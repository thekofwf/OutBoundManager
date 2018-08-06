package sunin.outbound.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface IPublicMapper {
	
	int selectPublicCount(@Param("sql") String sql);

	List<Map<String, Object>> selectPublic(@Param("sql") String sql);
}
