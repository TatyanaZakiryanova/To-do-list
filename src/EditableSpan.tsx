import { TextField } from "@mui/material";
import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
  title: string,
  onChange: (newValue: string) => void
};

export function EditableSpan(props: EditableSpanPropsType) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");


  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  }
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  }

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);
  return editMode ? (
    <TextField id="standard-basic" variant="standard" value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus />
  ) : (
    <span className="tasktitle" onDoubleClick={activateEditMode}>{props.title}</span>
  );
}
