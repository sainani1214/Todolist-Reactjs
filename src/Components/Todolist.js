import React, { useReducer, useState } from 'react';

const reducerFunction = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, { text: action.text, id: action.id, completed: false }];
    case 'DELETE_TASK':
      return state.filter((item) => item.id !== action.id);
    case 'TOGGLE_COMPLETE':
      return state.map((item) =>
        item.id === action.id ? { ...item, completed: !item.completed } : item
      );
    default:
      return state;
  }
};

function Todolist() {
  const [input, setInput] = useState('');
  const [complete, setComplete] = useState(false);
  const initialState = [];
  const [state, dispatch] = useReducer(reducerFunction, initialState);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch({
      type: 'ADD_TASK',
      text: input,
      id: state.length + 1,
    });
    setInput('');
  };

  const deleteHandler = (id) => {
    dispatch({
      type: 'DELETE_TASK',
      id: id,
    });
  };

  const completeHandler = (id) => {
    dispatch({
      type: 'TOGGLE_COMPLETE',
      id: id,
    });
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <input type="text" value={input} onChange={(event) => setInput(event.target.value)} />
        <input type="submit" value={'Add Task'} />
      </form>

      {state.map((res) => {
        return (
          <div key={res.id}>
            <li style={res.completed ? { textDecoration: 'line-through' } : { textDecoration: 'none' }}>
              {res.text}
            </li>
            <button onClick={() => deleteHandler(res.id)}>Delete</button>
            <button onClick={() => completeHandler(res.id)}>Complete</button>
          </div>
        );
      })}
    </>
  );
}

export default Todolist;
