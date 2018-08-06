package sunin.outbound.service;

import java.util.List;
import java.util.Map;

public interface IPublicService {
	
	public int selectPublicCount(String sql);

	public List<Map<String, Object>> selectPublic(String sql);

}
