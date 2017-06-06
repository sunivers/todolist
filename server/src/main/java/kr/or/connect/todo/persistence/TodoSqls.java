package kr.or.connect.todo.persistence;

public class TodoSqls {
	static final String COUNT_TODO = 
			"SELECT COUNT(*) FROM todo";
	
	static final String SELECT_BY_ID = 
			"SELECT * FROM todo where id = :id";
	
	static final String SELECT_ALL =
			"SELECT * FROM todo";
	
	static final String DELETE_BY_ID = 
			"DELETE FROM todo WHERE id = :id";
	
	static final String UPDATE = "UPDATE todo SET\n"
										+ "text = :text,"
										+ "done = :done\n"
										+ "WHERE id = :id";
}
