import { useState, useEffect } from 'react';
import './index.css';
import { FormControl, InputLabel, OutlinedInput, Grid, createStyles, makeStyles, Typography, TextField, MenuItem } from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import GitHubIcon from '@material-ui/icons/GitHub';
import UserList from './components/UserList';

function App() {
  const [users, setUsers] = useState([])
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('lastName')

  useEffect(() => { //fetch users on page load
    const getUsers = async () => {
        const newUsers = await fetchUsers()
        setUsers(newUsers)
    }
    getUsers()
  }, [])

  const setChecked = (id) => { //checks/unchecks user with given ID
    setUsers(users.map((user) => (user.id === id ? {...user, checked: !user.checked} : user)))
  }

  //Maybe I am missing something but I couldn't write proper GET request to get only specified data. Instead of that I removed properties from response.
  const fetchUsers = async () => { 
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`, {
        method: 'GET',
        headers: {
          'Content-type' : 'application/json; charset=UTF-8',
        },
    })
    const usersData = await response.json()
    const selectedData = usersData.map(({username, email, address, website, company, ...selectedAttributes}) => selectedAttributes)
    return selectedData.map((user) => ({...user, checked: false}))
  }

  const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      marginBottom: 15,
      minWidth: 300,
    },
    gitIcon: {
      fontSize: 40,
      color: '#34612F',
      '&:hover': {
        color: '#6BE05C',
      },
    },
  }))

  const classes = useStyles();

  return (
    <div className="App">
      
      <Typography variant="h3" style={{color: '#E4FAE1', marginTop: '20px', marginBottom: '20px'}} component="h3">
        User List <AccountBoxIcon style={{fontSize: '40px'}}/>
      </Typography>

      <Grid container direction="row" justify="center" alignItems="stretch">  

        <Grid style={{margin: '15px'}}>
          <TextField select label="Sort by" value={sort} onChange={(e) => setSort(e.target.value)} variant="outlined" className={classes.formControl}>
            <MenuItem value={'firstName'}>
              First name
            </MenuItem>
            <MenuItem value={'lastName'}>
              Last name
            </MenuItem>
          </TextField>
        </Grid>

        <Grid style={{margin: '15px'}}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="component-outlined">Filter names</InputLabel>
            <OutlinedInput id="component-outlined" onChange={(e) => setQuery(e.target.value)} label="Filter names"/>
          </FormControl>
        </Grid>

      </Grid>

      <UserList users={users} query={query} setChecked={setChecked} sort={sort}/>

      <div style={{width: '100%', marginTop: '50px', marginBottom: '10px'}}>
          <a href="https://github.com/greed-hub">
            <GitHubIcon className={classes.gitIcon}/>
          </a>
      </div>
      
    </div>
  );
}

export default App;
