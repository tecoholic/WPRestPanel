import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import FolderIcon from '@material-ui/icons/FolderOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import grey from '@material-ui/core/colors/grey';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import Config from '../config';
import {useHistory} from 'react-router-dom';

function Footer() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link href="https://material-ui.com/">
      {'Source @ Github'}
      </Link>
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: yellow[500],
    color: '#666',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  title: {
    marginTop: theme.spacing(3)
  },
  subtitle: {
    color: grey[600]
  },
}));

export default function Home() {
  const classes = useStyles();
  const [url, setUrl] = useState('');
  const [exploreError, setExploreError] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    setUrl(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${Config.apiBase}/onboard`, {site_url: url})
    .then(res => {
      if (res.data.is_wp_site) {
        history.push(`/explorer/${encodeURIComponent(res.data.site_url)}`);
      } else {
        setExploreError(true);
      }
    }).catch(() => {
      setExploreError(true);
    });
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FolderIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.title}>
          WPRestPanel
        </Typography>
        <Typography component="h2" variant="h6" className={classes.subtitle}>
          Explore WordPress Sites using metadata
        </Typography>
        <form className={classes.form}>
          <TextField
            type="url"
            variant="outlined"
            margin="normal"
            fullWidth
            id="url"
            label="Wordpress Website URL"
            name="url"
            autoFocus
            value={url}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Explore
          </Button>
        </form>
      </div>
      {exploreError ? (
        <Box mt={4}>
          <Alert severity="error">
            Sorry! <strong>{url}</strong> is not am explorable WordPress installation.
          </Alert>
        </Box>
      ) : (
        ""
      )}
      <Box mt={8}>
        <Footer />
      </Box>
    </Container>
  );
}