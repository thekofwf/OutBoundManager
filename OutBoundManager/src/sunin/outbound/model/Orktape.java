package sunin.outbound.model;

public class Orktape {
	private int id;
	private int direction;
	private long duration;
	private String expiryTimestamp;
	private String fileName;
	private String localEntryPoint;
	private String localParty;
	private String portName;
	private String remoteParty;
	private String timestamp;
	private int portId;
	private int serviceId;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getDirection() {
		return direction;
	}

	public void setDirection(int direction) {
		this.direction = direction;
	}

	public long getDuration() {
		return duration;
	}

	public void setDuration(long duration) {
		this.duration = duration;
	}

	public String getExpiryTimestamp() {
		return expiryTimestamp;
	}

	public void setExpiryTimestamp(String expiryTimestamp) {
		this.expiryTimestamp = expiryTimestamp;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getLocalEntryPoint() {
		return localEntryPoint;
	}

	public void setLocalEntryPoint(String localEntryPoint) {
		this.localEntryPoint = localEntryPoint;
	}

	public String getLocalParty() {
		return localParty;
	}

	public void setLocalParty(String localParty) {
		this.localParty = localParty;
	}

	public String getPortName() {
		return portName;
	}

	public void setPortName(String portName) {
		this.portName = portName;
	}

	public String getRemoteParty() {
		return remoteParty;
	}

	public void setRemoteParty(String remoteParty) {
		this.remoteParty = remoteParty;
	}

	public String getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}

	public int getPortId() {
		return portId;
	}

	public void setPortId(int portId) {
		this.portId = portId;
	}

	public int getServiceId() {
		return serviceId;
	}

	public void setServiceId(int serviceId) {
		this.serviceId = serviceId;
	}

	public Orktape() {
		super();
	}

	public Orktape(int id, int direction, long duration, String expiryTimestamp, String fileName, String localEntryPoint, String localParty, String portName, String remoteParty, String timestamp,
			int portId, int serviceId) {
		super();
		this.id = id;
		this.direction = direction;
		this.duration = duration;
		this.expiryTimestamp = expiryTimestamp;
		this.fileName = fileName;
		this.localEntryPoint = localEntryPoint;
		this.localParty = localParty;
		this.portName = portName;
		this.remoteParty = remoteParty;
		this.timestamp = timestamp;
		this.portId = portId;
		this.serviceId = serviceId;
	}

	@Override
	public String toString() {
		return "Orktape [id=" + id + ", direction=" + direction + ", duration=" + duration + ", expiryTimestamp=" + expiryTimestamp + ", fileName=" + fileName + ", localEntryPoint=" + localEntryPoint
				+ ", localParty=" + localParty + ", portName=" + portName + ", remoteParty=" + remoteParty + ", timestamp=" + timestamp + ", portId=" + portId + ", serviceId=" + serviceId + "]";
	}

}
