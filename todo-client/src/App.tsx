import { useState, useEffect } from "react";

import axios, { AxiosResponse } from 'axios';
import { ChakraProvider } from "@chakra-ui/react"
import { Text,Center, Spinner, Container } from "@chakra-ui/react"

import { InputTodo } from "./components/InputTodo";
import { TodoList } from "./components/TodoList";
import { Todo } from "./types/TodoItems";


export default function App() {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    axios
    .get<Array<Todo>>("https://todoapi-2112.azurewebsites.net/api/TodoItems")
    .then((res: AxiosResponse<Todo[]>) => {
      setTodos(res.data);
    }).finally(() => setLoading(false))
  },[]);
  
  return (
    <ChakraProvider>
      <Container maxW="50em" my="1em">
        <Text fontSize="4xl" alignItems="center">
        React Todo
      </Text>
        {loading ? (
          <Center h="100vh">
            <Spinner color="teal.200" />
          </Center>
        ) : (
        <>
          <InputTodo setTodos={setTodos} todos={todos} />
          <TodoList setTodos={setTodos} todos={todos} />
        </>
        )}
        </Container>
    </ChakraProvider>
  );
}



