import {Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Checkbox} from '@material-ui/core';
import { useEffect, useState } from 'react';

const UserList = ({users, query, setChecked, sort}) => {
  const [sortUsers, setSortUsers] = useState(users)

  useEffect(() => { //sorts users on sort value/users list change
    const getLastName = (x) => {
      const y = x.split(' ')
      if (y[0].includes('.')) {return y[2]}
      return y[1]
    }
    const getFirstName = (x) => {
      const y = x.split(' ')
      if (y[0].includes('.')) {return y[1]} 
      return y[0]
    }

    sort === 'lastName' && setSortUsers([...users].sort((a, b) => getLastName(a.name) >  getLastName(b.name) ? 1 : -1))
    sort === 'firstName' && setSortUsers([...users].sort((a, b) => getFirstName(a.name) >  getFirstName(b.name) ? 1 : -1))
  }, [sort, users])

  const handleChange = (id) => { //prints ID in console and runs setChecked function
    console.log(`User ID : ${id}`)
    setChecked(id)
  }

  return (
    <Container fixed style={{padding: '0px'}}>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">CheckBox</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortUsers.filter(user => user.name.toLowerCase().includes(query.toLowerCase())).map((user) => (
              <TableRow key={user.id} onClick={() => handleChange(user.id)}>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.phone}</TableCell>
                <TableCell align="center"><Checkbox style={{color: "#6BE05C"}} checked={user.checked}/></TableCell>
              </TableRow>
            ))}
          </TableBody>
          
        </Table>
      </TableContainer>
    </Container>
  )
}

export default UserList

