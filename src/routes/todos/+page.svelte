<script lang="ts">
	import { Query } from 'zero-svelte';

	import { getUserId } from '$lib/stores/user.svelte';
	import { createZInstance } from '$lib/zero/index.svelte';

	const z = createZInstance(getUserId());
	const todos = new Query(z.current.query.todo);

	function onsubmit(event: Event) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const newTodo = formData.get('newTodo') as string;
		const id = crypto.randomUUID();
		if (newTodo) {
			z.current.mutate.todo.insert({ completed: false, id, title: newTodo });
			(event.target as HTMLFormElement).reset();
		}
	}

	function toggleTodo(event: Event) {
		const checkbox = event.target as HTMLInputElement;
		const id = checkbox.value;
		const completed = checkbox.checked;
		z.current.mutate.todo.update({ completed, id });
	}
</script>

<div>
	<h1>Todo</h1>
	<form {onsubmit}>
		<input type="text" id="newTodo" name="newTodo" />
		<button type="submit">Add</button>
	</form>
	<ul>
		{#each todos.current as todo (todo.id)}
			<li>
				<input type="checkbox" value={todo.id} checked={todo.completed} oninput={toggleTodo} />
				{todo.title}
			</li>
		{/each}
	</ul>
</div>
