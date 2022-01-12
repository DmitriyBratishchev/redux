import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { titleChanged, taskRemoved, completeTask, getTasks, loadTasks, getTasksLoadingStatus, createTask} from './store/task';
import configureStore from './store/store';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { getError } from './store/errors';

const store = configureStore();

const App = () => {
  const state = useSelector(getTasks())
  const isLoading = useSelector(getTasksLoadingStatus())
  const error = useSelector(getError())
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadTasks())
  }, [])

  const changeTitle = (id) => {
    dispatch(titleChanged(id));
  }
  const taskDeleted = (id) => {
    dispatch(taskRemoved(id));
  }

  if (isLoading) {
    return <h1>Loading ...</h1>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <>
      <h1>Hi</h1>
      <button onClick={() => dispatch(createTask({title: "new task", completed: false, userId: 1})) }>Создать задачу</button>
      <ul>
        { state.map(el => {
          return (
            <li key={ el.id }>
              <p>{el.title}</p>
              <p>{ `Completed: ${el.completed}` }</p>
              <button onClick={ () => dispatch(completeTask(el.id)) }>Complited</button>
              <button onClick={ () => changeTitle(el.id) }>Change</button>
              <button onClick={ () => taskDeleted(el.id) }>Delete</button>
              <hr/>
            </li>
          )
        })}
      </ul>
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
