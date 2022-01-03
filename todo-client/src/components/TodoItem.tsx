import { VFC } from "react";

import {
  Checkbox,
  Box,
  Flex,
  Spacer,
  Button,
  Divider
} from "@chakra-ui/react";

import { Todo } from "../types/TodoItems";


type Props = {
  todo: Todo;
  onChangeComplete: (todo: Todo) => void;
  onClickDelete: (todo: Todo) => void;
};

export const TodoItem: VFC<Props> = (props) => {
  const { todo, onChangeComplete, onClickDelete } = props;

  return (
    <>
      <Box my="0.5em">
        <Flex>
          <Checkbox
            isChecked={todo.isCompleted}
            onChange={() => onChangeComplete(todo)}
          >
            { todo.isCompleted ? <del>{todo.name}</del> : todo.name}
          </Checkbox>
          <Spacer />
          <Button
              h="2em"
              bg="#E53E3E"
              color="#FFFFFF"
              shadow="md"
              onClick={() => onClickDelete(todo)}
          >
              削除
          </Button>
        </Flex>
      </Box>
      <Divider />
    </>
  );
};
