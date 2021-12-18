import React, { VFC } from "react";
import { TodoItem } from "./TodoItem";
import { Todo } from "../types/TodoItems";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import { useMessage } from "../hooks/useMessage";

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const TodoList: VFC<Props> = (props) => {
  const { todos, setTodos } = props;
  const { showMessage } = useMessage();
  
  const onChangeComplete = (todo: Todo) => {
    const newTodo: Todo = {
      id: todo.id,
      name: todo.name,
      isCompleted: !todo.isCompleted
    };

    setTodos((prev) =>
      prev.map((t) =>
        t.id === todo.id ? { ...todo, isCompleted: !todo.isCompleted } : t
      )
    );

    axios
      .put(`http://127.0.0.1:5000/api/TodoItems/${todo.id}`, newTodo
        // {
        //   id: todo.id,
        //   name: todo.name,
        //   isCompleted: !todo.isCompleted
        // }
      )
      .then(() => showMessage({ title: "更新しました", status: "success" })
      ).catch(() => showMessage({ title: "更新に失敗しました", status: "error" }))
  };

  const onClickDelete = (todo: Todo) => {
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));

    axios
      .delete(`http://127.0.0.1:5000/api/TodoItems/${todo.id}`)
      .then(() => showMessage({ title: "削除しました", status: "success" })
      ).catch(() => showMessage({ title: "削除に失敗しました", status: "error" }));
  };

  return (
    <Box>
      {todos.length <= 0 ? (
        "登録されたTODOはありません。"
      ) : (
        <ul>
          {todos.map((todo) => (
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
