import { FilterValuesType } from "./App";
import { ChangeEvent } from "react";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, Card, Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

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
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
  filter: FilterValuesType;
  id: string,
  removeTodolist: (todolistId: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
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

  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle);
  }

  return (
    <div>
      <Card variant="outlined" className="card-style">
      <h3 className="header"> <EditableSpan title={props.title} onChange={changeTodolistTitle} />
      <IconButton aria-label="delete" onClick={removeTodolist}>
      <Delete />
      </IconButton>
      </h3>
     <AddItemForm addItem={addTask} />
      <ul>
        {props.tasks.map((t) => {
          const onClickHandler = () => props.removeTask(t.id, props.id);
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
          let newIsDoneValue = e.currentTarget.checked;
          props.changeTaskStatus(t.id, newIsDoneValue, props.id);
          };
          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id);
            };
          return (
            <li key={t.id} className="taskline">
              <Checkbox
                onChange={onChangeStatusHandler}
                checked={t.isDone}
              />
              <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
              <IconButton aria-label="delete" onClick={onClickHandler}>
              <Delete />
              </IconButton>
            </li>
          );
        })}
      </ul>
      <div>
        <Button variant={props.filter === "all" ? "outlined" : "text"} 
        onClick={onAllClickHandler}>All</Button>
        <Button variant={props.filter === "active" ? "outlined" : "text"}
        onClick={onActiveClickHandler}>Active</Button>
        <Button variant={props.filter === "completed" ? "outlined" : "text"}
        onClick={onCompletedClickHandler}>Completed</Button>
      </div>
      </Card>
    </div>
  );
}
