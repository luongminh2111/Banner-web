import { Button, Toolbar, Box, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { BoxStyle, ToolbarStyle } from '../styles/style';

import BannerList from '../components/banners/BannerList';

const Banner: React.FC = () => {
  const history = useHistory();
  return (
    <div>
      <Toolbar variant='dense' sx={ToolbarStyle}>
        <h2>Quản lý Banner</h2>
        <Button variant="contained" onClick={() => history.push('/banner/create')}> Tạo Mới </Button>
      </Toolbar>
      <Box sx={{ m:3 }}>
        <Typography  variant="h5">Danh sách các banner</Typography>
        <Box sx={{ mt:2 }} style={BoxStyle}>
          <BannerList/> 
        </Box>
      </Box>
    </div>
  );
};

export default Banner;
