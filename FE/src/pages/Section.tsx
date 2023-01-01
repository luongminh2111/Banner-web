
import { Toolbar, Box, Typography, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import SectionList from '../components/section/SectionList';
import { BoxStyle, ToolbarStyle } from '../styles/style';

const Section: React.FC = () => {
  const history = useHistory();
  return (
    <div>
      <Toolbar variant='dense' sx={ToolbarStyle}>
        <h2>Quản lý Khu vực</h2>
        <Button variant="contained" onClick={() => history.push('/section/create')}> Tạo Mới </Button>
      </Toolbar>
      <Box sx={{ m:3 }}>
        <Typography variant="h5">Danh sách các khu vực</Typography>
        <Box sx={{ mt:2 }} style={BoxStyle}>
          <SectionList/> 
        </Box>
      </Box>
    </div>
  );
};

export default Section;
