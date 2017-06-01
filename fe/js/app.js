(function (window) {
	'use strict';

	var todos = [];

	var $todoList = $('.todo-list');
	var $todoCount = $('.todo-count');

	var li = '<li>';
	var liCompleted = '<li class="completed">';
	var input = '<input class="toggle" type="checkbox">';
	var inputChecked = '<input class="toggle" type="checkbox" checked>';
	var inputEdit = '<input class="edit" value="Rule the web">';
	var btnDestroy = '<button class="destroy"></button>';

	//이벤트 핸들러
	$('.new-todo').keydown(addTodo);
	$(document).on('click', '.todo-list li', changeTodo);
	$('.clear-completed').click(clearTodo);
	$('.filters li a').click(filterTodo);

	function addTodo(e) {
		var text = e.target.value;
    if(!text || e.keyCode !== 13) {
      return;
    }
		var _todo = {
			id: 0,
			text: text,
			done: false
		}
		addData(JSON.stringify(_todo));
		e.target.value = '';
	}

	function changeTodo(e) {
		var index = $(this).index();
		if(e.target.className === 'destroy'){
			deleteTodo(index);
		}
		else if(e.target.className === 'toggle'){
			toggleTodo(index);
		}
	}

	function deleteTodo(_id) {
		todos.reverse();
		deleteData(todos[_id].id);
		todos.splice(_id, 1);
		todos.reverse();
	}

	function toggleTodo(_id) {
		todos.reverse();
		todos[_id].done = !todos[_id].done;
		updatedata(JSON.stringify(todos[_id]), todos[_id].id);
		todos.reverse();
	}

	function clearTodo() {
		var completedId = [];
		var key = 0;
		for(var i=todos.length-1; i>=0; i--)
		{
			if(todos[i].done === true) {
				completedId[key] = todos[i].id;
				todos.splice(i, 1);
				key++;
			}
		}
		for(var i in completedId) {
			deleteData(completedId[i]);
		}
	}

	function filterTodo(e) {
		e.preventDefault();
		$('.filters li a').attr('class', '');
		e.target.className = 'selected';
		if(e.target.id === 'all') {
			refreshTodo();
		}
		else if(e.target.id === 'active') {
			activeTodo();
		}
		else if(e.target.id === 'completed') {
			completedTodo();
		}
	}

	function activeTodo() {
		$todoList.contents().remove();
		for(var i=0; i<todos.length; i++)
		{
			var tagLi = todos[i].done ? '<li hidden>' : li;
			var tagInput = todos[i].done ? inputChecked : input;

			var strTodoList = tagLi+'<div class="view">'
			+tagInput+'<label>'+todos[i].text+'</label>'
			+btnDestroy+'</div>'+inputEdit+'</li>';
			$todoList.prepend(strTodoList);
		}
		$todoCount.contents().remove();
		var strCount = makeCount();
		$todoCount.prepend(strCount);
	}

	function completedTodo() {
		$todoList.contents().remove();
		for(var i=0; i<todos.length; i++)
		{
			var tagLi = todos[i].done ? liCompleted : '<li hidden>';
			var tagInput = todos[i].done ? inputChecked : input;

			var strTodoList = tagLi+'<div class="view">'
			+tagInput+'<label>'+todos[i].text+'</label>'
			+btnDestroy+'</div>'+inputEdit+'</li>';
			$todoList.prepend(strTodoList);
		}
		$todoCount.contents().remove();
		var strCount = makeCount();
		$todoCount.prepend(strCount);
	}

	function refreshTodo() {
		$todoList.contents().remove();
		for(var i=0; i<todos.length; i++)
		{
			var tagLi = todos[i].done ? liCompleted : li;
			var tagInput = todos[i].done ? inputChecked : input;

			var strTodoList = tagLi+'<div class="view">'
			+tagInput+'<label>'+todos[i].text+'</label>'
			+btnDestroy+'</div>'+inputEdit+'</li>';
			$todoList.prepend(strTodoList);
		}
		$todoCount.contents().remove();
		var strCount = makeCount();
		$todoCount.prepend(strCount);
	}

	function makeCount() {
		var activeLength = todos.filter(function(v) {
			return !v.done;
		}).length;
		var strCount = '<strong>'+activeLength+'</strong> item'
		+(activeLength === 1 ? '' : 's')+' left';
		return strCount;
	}

	function getData() {
		$.ajax({
			url: 'http://localhost:8080/api/todos/',
			dataType: 'json',
			success: function(data){
				for(var i in data){
					todos[i] = data[i];
				}
				refreshTodo();
			}
		});
	}

	function addData(data) {
		$.ajax({
			url: 'http://localhost:8080/api/todos/',
			type: 'post',
			data: data,
			contentType : "application/json; charset=UTF-8",
			success: function(data){
				todos.push(data);
				refreshTodo();
			}
		});
	}

	function updatedata(data, id) {
		$.ajax({
			url: 'http://localhost:8080/api/todos/'+id,
			type: 'put',
			data: data,
			contentType : "application/json; charset=UTF-8",
			success: function(data){
				refreshTodo();
			}
		});
	}

	function deleteData(id) {
		$.ajax({
			url: 'http://localhost:8080/api/todos/'+id,
			type: 'delete',
			success: function(data){
				refreshTodo();
			}
		});
	}

	getData();

})(window);
