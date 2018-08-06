package sunin.outbound.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sunin.outbound.model.Batch;
import sunin.outbound.model.mapper.IBatchMapper;
import sunin.outbound.service.IBatchService;

@Service
@Transactional
// 此处不再进行创建SqlSession和提交事务，都已交由spring去管理了。
public class BatchServiceImpl implements IBatchService {

	@Resource
	private IBatchMapper iBatchMapper;

	public boolean insert(Batch batch) {
		System.out.println(this.getClass().getName() + " insert : " + batch.toString());
		try {
			iBatchMapper.insert(batch);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public Batch selectById(String batchId) {
		System.out.println(this.getClass().getName() + " selectById : " + batchId);

		Batch batch = null;
		try {
			batch = iBatchMapper.selectById(batchId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return batch;
	}

	public boolean delete(Map<String, String> map) {
		System.out.println(this.getClass().getName() + " delete : " + map.toString());
		try {
			iBatchMapper.delete(map);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean update(Batch batch) {
		System.out.println(this.getClass().getName() + " update : " + batch.toString());
		try {
			iBatchMapper.update(batch);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public boolean changeState(Map<String, String> map) {
		System.out.println(this.getClass().getName() + " changeState : " + map.toString());
		try {
			iBatchMapper.changeState(map);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public int selectBatchsCount(String condition) {
		System.out.println(this.getClass().getName() + " selectBatchsCount : " + condition);
		int nCount = 0;
		try {
			nCount = iBatchMapper.selectBatchsCount(condition);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return nCount;
	}

	public List<Batch> selectBatchs(String condition) {
		System.out.println(this.getClass().getName() + " selectBatchs : " + condition);
		try {
			List<Batch> listBatchs = iBatchMapper.selectBatchs(condition);
			return listBatchs;
		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

}
