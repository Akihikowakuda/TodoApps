import { useState,useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react"
import { Divider,Center, Spinner } from "@chakra-ui/react"
import axios, {AxiosResponse} from 'axios';
import { InputTodo } from "./components/InputTodo";
import { TodoList } from "./components/TodoList";
import { Todo } from "./types/TodoItems";

export default function App() {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    axios
      .get<Array<Todo>>("http://127.0.0.1:5000/api/TodoItems")
    .then((res: AxiosResponse<Todo[]>) => {
      setTodos(res.data);
    }).finally(() => setLoading(false))
  },[]);
  
  return (
    <ChakraProvider>
      {loading ? (
        <Center h="100vh">
          <Spinner color="teal.200" />
        </Center>
      ) : (
      <>
      <TodoList setTodos={setTodos} todos={todos} />
      <Divider />
      <InputTodo setTodos={setTodos} todos={todos} />
      </>)}
    </ChakraProvider>
  );
}



