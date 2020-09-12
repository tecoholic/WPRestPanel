import React from 'react';
import Typography from '@material-ui/core/Typography';
import {useParams} from 'react-router-dom';

export default function Explorer() {
  let { site_url } = useParams();
  site_url = decodeURIComponent(site_url);
  console.log(site_url);

  return (
    <div>
      <Typography component="h1" variant="h5">
        Exploring {site_url}
      </Typography>
    </div>
  );
};