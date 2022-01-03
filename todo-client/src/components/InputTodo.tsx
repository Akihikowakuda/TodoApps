import React, { useState, VFC } from "react";

import axios from "axios";
import {
  Box,
  Input,
  Button,
  Flex
} from "@chakra-ui/react";

import { Todo } from "../types/TodoItems";
import { useMessage } from "../hooks/useMessage";


type Props = {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
};

export const InputTodo: VFC<Props> = (props) => {
  const { todos, setTodos } = props; 
  const { showMessage } = useMessage();
  const [inputTodo, setInputTodo] = useState<string>("");
  const [count, setCount] = useState<number>(Math.max(...todos.map((t)=>t.id)) + 1);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTodo(e.target.value);
  };

  const onClickSubmit = () => {
    if (inputTodo === "") {
      showMessage({ title: "タスクを入力してください。", status: "error" })
      return
    };
    setCount(count + 1);

    const newTodo: Todo = {
      id: count,
      name: inputTodo,
      isCompleted: false
    };

    setTodos([newTodo, ...todos]);
    setInputTodo("");

    axios
      .post("https://todoapi-2112.azurewebsites.net/api/TodoItems", newTodo)
      .then(() => showMessage({ title: "登録しました", status: "success" }))
      .catch(() => showMessage({ title: "登録に失敗しました", status: "error" })); 
  };

  return (
    <Box my="1em">
      <Flex>
        <Input
          onChange={onChangeInput}
          value={inputTodo}
          placeholder="新しいタスクを追加"
        />
        <Button
          w="8em"
          bg="#4299E1"
          color="#FFFFFF"
          shadow="md"
          onClick={onClickSubmit}
        >
          追加
        </Button>
      </Flex>
    </Box>
  );
};
