package kr.or.connect.todo.domain;

public class Todo {
	private Integer id;
	private String text;
	private Boolean done;
	
	public Todo() {
		
	}
	
	public Todo(String text, Boolean done) {
		this.text = text;
		this.done = done;
	}
	
	public Todo(Integer id, String text, Boolean done) {
		this.id = id;
		this.text = text;
		this.done = done;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public boolean isDone() {
		return done;
	}

	public void setDone(Boolean done) {
		this.done = done;
	}

}
