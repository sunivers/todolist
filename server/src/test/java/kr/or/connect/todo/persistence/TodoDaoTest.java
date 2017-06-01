package kr.or.connect.todo.persistence;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.junit.Assert.*;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import kr.or.connect.todo.AppConfig;
import kr.or.connect.todo.domain.Todo;
import kr.or.connect.todo.persistence.TodoDao;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = AppConfig.class)
@Transactional
public class TodoDaoTest {
	@Autowired
	private TodoDao dao;

	@Test
	public void shouldCount() {
		int count = dao.countBooks();
		System.out.println(count);
	}
	
	@Test
	public void shouldInsertAndSelect() {
		// given
		Todo todo = new Todo(1, "Java 웹개발", false);

		// when
		Integer id = dao.insert(todo);

		// then
		Todo selected = dao.selectById(id);
		assertThat(selected.getText(), is("Java 웹개발"));
	}
	
	@Test
	public void shouldDelete() {
		// given
		Todo todo = new Todo(2, "자바 공부", true);
		Integer id = dao.insert(todo);

		// when
		int affected = dao.deleteById(id);

		// Then
		assertThat(affected, is(1));
	}
	
	@Test
	public void shouldUpdate() {
		// Given
		Todo todo = new Todo(3, "react 공부", false);
		Integer id = dao.insert(todo);

		// When
		todo.setId(id);
		todo.setText("네이버 자바2");
		int affected = dao.update(todo);

		// Then
		assertThat(affected, is(1));
		Todo updated = dao.selectById(id);
		assertThat(updated.getText(), is("네이버 자바2"));
	}
	
	@Test
	public void shouldSelectAll() {
		List<Todo> allBooks = dao.selectAll();
		assertThat(allBooks, is(notNullValue()));
	}
}
