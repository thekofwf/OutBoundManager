package sunin.outbound.model;


public class Application {
	private int id;
	private String name;
	private String description;
	private String status;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Application() {
		super();
	}

	public Application(int id, String name, String description, String status) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.status = status;
	}

	@Override
	public String toString() {
		return "Application [id=" + id + ", name=" + name + ", description=" + description + ", status=" + status + "]";
	}

}
