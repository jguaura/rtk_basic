import React from 'react';
import {
  useGetTasksQuery,
  useDeleteTaskMutation,
  useUpdateTaskMutation
} from '../api/apiSlice';

function TasksList() {
  const { data: tasks, isError, isLoading, error } = useGetTasksQuery();
  const [deleteTaks] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <h3>{task.name}</h3>
          <p>{task.description}</p>
          <button onClick={() => deleteTaks(task.id)}>delete</button>
          <input
            type='checkbox'
            id={task.id}
            checked={task.completed}
            onChange={(e) =>
              updateTask({ ...task, completed: e.target.checked })
            }
          />
          <label htmlFor={task.id}>completed</label>
        </li>
      ))}
    </ul>
  );
}

export default TasksList;
