import { FilterValuesType } from "./App";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { AddItemForm } from "./AddItemForm";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  filter: FilterValuesType;
  id: string,
  removeTodolist: (todolistId: string) => void;
};

export function Todolist(props: PropsType) {

  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
  const removeTodolist = () => {
    props.removeTodolist(props.id);
  }

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  }

  return (
    <div>
      <h3 className="header">{props.title} <button onClick={removeTodolist}>X</button></h3>
     <AddItemForm addItem={addTask} />
      <ul className="taskline">
        {props.tasks.map((t) => {
          const onClickHandler = () => props.removeTask(t.id, props.id);
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
          props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
          };
          return (
            <li key={t.id}>
              <input
                type="checkbox"
                onChange={onChangeHandler}
                checked={t.isDone}
              />
              <span className="tasktitle">{t.title}</span>
              <button onClick={onClickHandler}>
                X
              </button>
            </li>
          );
        })}
      </ul>
      <div>
        <button className={props.filter === 'all' ? "active-filter" : ""}onClick={onAllClickHandler}>All</button>
        <button className={props.filter === 'active' ? "active-filter" : ""}onClick={onActiveClickHandler}>Active</button>
        <button className={props.filter === 'completed' ? "active-filter" : ""}onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  );
}
