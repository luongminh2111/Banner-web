import * as React from 'react';
import { Link } from 'react-router-dom';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import WebIcon from '@mui/icons-material/Web';
import ArticleIcon from '@mui/icons-material/Article';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import BarChartIcon from '@mui/icons-material/BarChart';
import { CropSquare } from '@mui/icons-material';

const text = {
  fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif',
  fontSize: '16px'
}
const itemStyle = {
  pl: 2,
  opacity: '0.7',
  '&:hover': {
    backgroundColor: '#2a3a51',
    color: 'whitesmoke',
    opacity: '1',
  },
};
const listIcon = {
  minWidth: '40px',
};

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/website" sx={itemStyle}>
      <ListItemIcon sx={listIcon}>
        <WebIcon sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText disableTypography primary="Quản lý Website" sx={text} />
    </ListItemButton>

    <ListItemButton component={Link} to="/page" sx={itemStyle}>
      <ListItemIcon sx={listIcon}>
        <ArticleIcon sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText disableTypography primary="Quản lý Trang" sx={text} />
    </ListItemButton>

    {/* <ListItemButton component={Link} to="/section" sx={itemStyle}>
      <ListItemIcon sx={listIcon}>
        <CropSquare sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText disableTypography primary="Quản lý khu vực" sx={text} />
    </ListItemButton> */}

    <ListItemButton component={Link} to="/banner" sx={itemStyle}>
      <ListItemIcon sx={listIcon}>
        <ViewCarouselIcon sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText disableTypography primary="Quản lý banner" sx={text} />
    </ListItemButton>

    <ListItemButton component={Link} to="/report" sx={itemStyle}>
      <ListItemIcon sx={listIcon}>
        <BarChartIcon sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText disableTypography primary="Báo cáo" sx={text} />
    </ListItemButton>
  </React.Fragment>
);
