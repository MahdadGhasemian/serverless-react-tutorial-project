import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from './amplifyconfiguration.json';
import { createTodo, updateTodo, deleteTodo } from './graphql/mutations';
import { listTodos } from './graphql/queries';
import { useEffect, useState } from 'react';
import { Stack, Grid, Container, AppBar, Toolbar, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { AddCircle, Edit, DeleteForever } from '@mui/icons-material';


Amplify.configure(config);


const client = generateClient();

function App({ signOut, user }) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');


  useEffect(() => {
    fetchList()
  }, [])

  const createItem = async () => {
    if (!newTodo || newTodo.trim() === '') {
      alert('Please enter a valid todo name.');
      return;
    }
    await client.graphql({
      query: createTodo,
      variables: {
        input: {
          name: newTodo
        }
      }
    });

    fetchList()
    setNewTodo('');

  }

  const updateItem = async (id, newName) => {
    if (!newName || newName.trim() === '') {
      alert('Please enter a valid todo name.');
      return;
    }
    await client.graphql({
      query: updateTodo,
      variables: {
        input: {
          id,
          name: newName
        }
      }
    });
    fetchList();
  }

  const deleteItem = async (id) => {
    await client.graphql({
      query: deleteTodo,
      variables: {
        input: {
          id
        }
      }
    });
    fetchList();
  }

  const fetchList = async () => {
    try {
      const result = await client.graphql({ query: listTodos });
      setTodos(result.data.listTodos.items);
    } catch (error) {
      console.log(error)
    }

  }

  const handleInputChange = (e, id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, name: e.target.value } : todo
    );
    setTodos(updatedTodos);
  };

  return (

    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Hello {user.username}</Typography>
          <Button color="inherit" onClick={signOut}>Sign Out</Button>
        </Toolbar>
      </AppBar>

      <Container>
        <Typography variant="h4">Todos</Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={9}>
            <TextField
              fullWidth
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="New Todo"
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              color="success"
              variant="contained"
              onClick={createItem}
              startIcon={<AddCircle />}
            >
              Create New
            </Button>
          </Grid>
        </Grid>

        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todos.map((todo) => (
                <TableRow key={todo.id}>
                  <TableCell>
                    <Stack spacing={2} direction={'row'}>
                      <TextField
                        fullWidth
                        value={todo.name}
                        onChange={(e) => handleInputChange(e, todo.id)}
                        placeholder={todo.name}
                      />
                      {/* </TableCell> */}
                      {/* <TableCell> */}
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => updateItem(todo.id, todo.name)}
                        startIcon={<Edit />}
                      >
                        Save
                      </Button>
                      {/* </TableCell> */}
                      {/* <TableCell> */}
                      <Button
                        color="error"
                        variant="contained"
                        onClick={() => deleteItem(todo.id)}
                        startIcon={<DeleteForever />}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Container>

  );
}

export default withAuthenticator(App);
