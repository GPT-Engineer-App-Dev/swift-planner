import { useState } from 'react';
import { Box, Button, Input, List, ListItem, ListIcon, IconButton, useToast, Text } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaCheckCircle, FaRegCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Box p={5}>
      <Box mb={4}>
        <Input
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          size="lg"
        />
        <Button leftIcon={<FaPlus />} colorScheme="green" onClick={addTask} ml={2}>
          Add Task
        </Button>
      </Box>
      <List spacing={3}>
        {tasks.map(task => (
          <ListItem key={task.id} d="flex" alignItems="center">
            <ListIcon
              as={task.isCompleted ? FaCheckCircle : FaRegCircle}
              color={task.isCompleted ? 'green.500' : 'gray.500'}
              cursor="pointer"
              onClick={() => toggleTaskCompletion(task.id)}
            />
            <Box flex="1" as="span" ml={2} textDecoration={task.isCompleted ? 'line-through' : 'none'}>
              {task.text}
            </Box>
            <IconButton
              icon={<FaTrash />}
              colorScheme="red"
              onClick={() => deleteTask(task.id)}
            />
          </ListItem>
        ))}
      </List>
    <Box as="footer" p={4} bg="gray.100" textAlign="center">
      <Text fontSize="sm">&copy; {new Date().getFullYear()} Todo App. All rights reserved.</Text>
    </Box>
  </Box>
  );
};

export default Index;