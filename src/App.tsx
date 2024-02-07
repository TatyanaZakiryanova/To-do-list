import { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import { Card } from "@mui/material";

export type FilterValuesType = "all" | "completed" | "active";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: "LIST I", filter: "all" },
    { id: todolistId2, title: "LIST II", filter: "all" },
  ]);

  let [tasksObj, setTasks] = useState<TasksStateType>({
    [todolistId1]: [{ id: v1(), title: "Create to-do list", isDone: false }],
    [todolistId2]: [{ id: v1(), title: "Learn programming", isDone: false }],
  });

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter((t) => t.id !== id);
    tasksObj[todolistId] = filteredTasks,
    setTasks({...tasksObj});
  }

  function addTask(title: string, todolistId: string) {
    let task = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todolistId];
    let newTasks = [task, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({...tasksObj});
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({...tasksObj});
  }
}

function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
  let tasks = tasksObj[todolistId];
  let task = tasks.find((t) => t.id === taskId);
  if (task) {
    task.title = newTitle;
    setTasks({...tasksObj});
}
}

let removeTodolist = (todolistId: string) => {
  let filteredTodolist = todolists.filter((tl) => tl.id !== todolistId);
  setTodolists(filteredTodolist);
  delete tasksObj[todolistId];
  setTasks({...tasksObj});
}

function addTodolist(title: string) {
  let todolist: TodolistType = {
    id: v1(),
    filter: "all",
    title: title
  }
  setTodolists([todolist, ...todolists]);
  setTasks({...tasksObj, [todolist.id]: []})
}

function changeTodolistTitle(id: string, newTitle: string) {
  const todolist = todolists.find(tl => tl.id == id);
  if(todolist) {
    todolist.title = newTitle;
    setTodolists([...todolists]);
  }
}

  return (
    <div className="App">
      <Card variant="outlined" className="card-style">
      <AddItemForm addItem={addTodolist} />
      </Card>
      {todolists.map((tl) => {
        let tasksForTodoList = tasksObj[tl.id];
        if (tl.filter === "completed") {
          tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === true);
        }
        if (tl.filter === "active") {
          tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === false);
        }
        return (
          <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            changeTaskTitle={changeTaskTitle}
            filter={tl.filter}
            removeTodolist={removeTodolist}
            changeTodolistTitle={changeTodolistTitle}
          />
        );
      })}
    </div>
  );
}

export default App;
