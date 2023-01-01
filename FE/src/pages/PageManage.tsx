import { Button, Typography, Box, Toolbar } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { BoxStyle, ToolbarStyle } from '../styles/style';

import PageList from '../components/pages/PageList';

const PageManage: React.FC = () => {
  const history = useHistory();
  return (
    <div>
      <Toolbar variant='dense' sx={ToolbarStyle}>
        <h2>Quản lý Trang</h2>
        <Button variant="contained" onClick={()=> history.push("/page/add")} >Tạo Mới</Button>  
      </Toolbar>
      <Box sx={{ m:3 }}>
        <Typography variant="h5">Danh sách các trang</Typography>
        <Box sx={{ mt:2 }} style={BoxStyle}>
          <PageList />
        </Box>
      </Box>
    </div>
  );
};

export default PageManage;
