import React, { useState, VFC } from "react";
import { Todo } from "../types/TodoItems";
import {
  IconButton,
  Box,
  Input,
  InputGroup,
  InputRightElement
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useMessage } from "../hooks/useMessage";

type Props = {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
};
export const InputTodo: VFC<Props> = (props) => {
  const { todos, setTodos } = props; 
  const [inputTodo, setInputTodo] = useState<string>("");
  const { showMessage } = useMessage();
  const [count, setCount] = useState<number>(Math.max(...todos.map((t)=>t.id)) + 1);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTodo(e.target.value);
  };

  const onClickSubmit = () => {
    setCount(count + 1);

    const newTodo: Todo = {
      id: count,
      name: inputTodo,
      isCompleted: false
    };

    setTodos([newTodo, ...todos]);
    setInputTodo("");

    axios
      .post("http://127.0.0.1:5000/api/TodoItems", newTodo)
      .then(() => showMessage({ title: "登録しました", status: "success" })
    ).catch(() => showMessage({ title: "登録に失敗しました", status: "error" })); 
  };

  return (
    <Box
      marginBlockStart={2}
      p={1}
      maxW="lg"
      borderRadius="lg"
      overflow="hidden"
    >
      <InputGroup size="md">
        <Input
          onChange={onChangeInput}
          value={inputTodo}
          pr="4.5rem"
          py={5}
          placeholder="タスクを入力"
        />
        <InputRightElement width="4.5rem">
          <IconButton
            aria-label="Add Todo"
            onClick={onClickSubmit}
            isRound={true}
            icon={<AddIcon />}
          />
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};
