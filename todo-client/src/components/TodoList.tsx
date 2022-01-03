import React, { VFC } from "react";

import axios from "axios";
import { Box } from "@chakra-ui/react";

import { Todo } from "../types/TodoItems";
import { TodoItem } from "./TodoItem";
import { useMessage } from "../hooks/useMessage";


type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const TodoList: VFC<Props> = (props) => {
  const { todos, setTodos } = props;
  const { showMessage } = useMessage();
  
  // タスクの完了フラグを変更
  const onChangeComplete = (todo: Todo) => {
    const newTodo: Todo = {
      id: todo.id,
      name: todo.name,
      isCompleted: !todo.isCompleted
    };

    setTodos((prev: Todo[]) =>
      prev.map((t) =>
        t.id === todo.id ? { ...todo, isCompleted: !todo.isCompleted } : t
      )
    );

    axios
      .put(`https://todoapi-2112.azurewebsites.net/api/TodoItems/${todo.id}`, newTodo)
      .then(() => showMessage({ title: "更新しました", status: "success" }))
      .catch(() => showMessage({ title: "更新に失敗しました", status: "error" }))
  };

  // タスクの削除
  const onClickDelete = (todo: Todo) => {
    setTodos((prev: Todo[]) => prev.filter((t) => t.id !== todo.id));

    axios
      .delete(`https://todoapi-2112.azurewebsites.net/api/TodoItems/${todo.id}`)
      .then(() => showMessage({ title: "削除しました", status: "success" }))
      .catch(() => showMessage({ title: "削除に失敗しました", status: "error" }));
  };

  return (
    <Box>
      {todos.length <= 0 ? (
        "登録されたTODOはありません。"
      ) : (
        <ul>
          {todos.map((todo: Todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onChangeComplete={onChangeComplete}
              onClickDelete={onClickDelete}
            />
          ))}
        </ul>
      )}
    </Box>
  );
};
