import React, { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { v4 } from 'isipaddress';

//Styles for the form
const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  h2: {
    textAlign: 'center'
  }
}

const SubnetForm = (props) => {
  const [ipaddr, setIpaddr] = useState('')
  const [numhost, setNumhost] = useState('')
  const [cidr, setCidr] = useState('')

  function handleSubmit(event) {
    event.preventDefault();
    console.log(ipaddr, "/", cidr, " - numhost: ", numhost)

    //disable the two fields: ipaddr and cidr
    document.getElementById('ipaddr').disabled = true;
    document.getElementById('cidr').disabled = true;

    props.OnSubmit(ipaddr, numhost, cidr)
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} style={styles.form}>
        <Stack spacing={2} direction="column" sx={{ marginBottom: 4 }}>
        <h2 style={styles.h2}>Create a new subnet</h2>
          <Stack direction="row" spacing={2}>
            <TextField
              id='ipaddr'
              type="text"
              variant='outlined'
              color='secondary'
              label="Starting IPv4 address"
              onChange={e => setIpaddr(e.target.value)}
              error={ipaddr.length > 0 && !v4(ipaddr)}
              value={ipaddr}
              helperText="e.g. 192.168.0.0"
              required
            />
            <TextField
              id='cidr'
              type="text"
              variant='outlined'
              color='secondary'
              label="CIDR notation"
              onChange={e => setCidr(e.target.value)}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              error={cidr.length > 0 && (cidr < 1 || cidr > 32)}
              value={cidr}
              helperText="e.g. 24"
              required
            />
          </Stack>
          <TextField
            type="text"
            variant='outlined'
            color='secondary'
            label="Number of hosts"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            error={numhost.length > 0 && (numhost < 1 || numhost > 4294967295)}
            helperText="must be greater than 1"
            onChange={e => setNumhost(e.target.value)}
            value={numhost}
            required
          />
        </Stack>
        <Button color="secondary" variant="outlined" type="submit">Add Subnet</Button>
      </form>
    </React.Fragment>
  )
}

export default SubnetForm;