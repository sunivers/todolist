package kr.or.connect.todo.persistence;

public class TodoSqls {
	static final String DELETE_BY_ID =
			"DELETE FROM todo WHERE id= :id";
	private static final String COUNT_BOOK = 
			"SELECT COUNT(*) FROM book";
}
