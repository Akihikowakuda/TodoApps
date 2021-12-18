import { VFC } from "react";
import { Todo } from "../types/TodoItems";
import {
  Checkbox,
  Box,
  Flex,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

type Props = {
  todo: Todo;
  onChangeComplete: (todo: Todo) => void;
  onClickDelete: (todo: Todo) => void;
};

export const TodoItem: VFC<Props> = (props) => {
  const { todo, onChangeComplete, onClickDelete } = props;

  return (
    <Box
      marginBlockStart={2}
      p={1}
      my={3}
      maxW="lg"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Flex>
        <Checkbox
          isChecked={todo.isCompleted}
          onChange={() => onChangeComplete(todo)}
        >
          { todo.isCompleted ? <del>{todo.name}</del> : todo.name}
        </Checkbox>
        <Spacer />
        <IconButton
          mx={1}
          aria-label="Edit Todo"
          isRound={true}
          icon={<DeleteIcon />}
          onClick={() => onClickDelete(todo)}
        />
      </Flex>
    </Box>
  );
};
