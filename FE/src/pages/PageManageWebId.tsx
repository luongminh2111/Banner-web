import { Button, Typography, Box, Toolbar } from '@mui/material';
import { useHistory } from 'react-router-dom';
import PageListByWebId from '../components/pages/PageWebsite';
import { ToolbarStyle } from '../styles/style';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const PageManageWebId: React.FC = () => {
  const history = useHistory();
  return (
    <div>
      <Toolbar variant="dense" style={ToolbarStyle}>
        <Button
          onClick={() => history.goBack()}
          variant="text"
          sx={{
            color: '#637381',
            fontSize: '14px',
            textTransform: 'none',
          }}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: '14px', mr: '5px' }} />
          Quay lại danh sách các trang
        </Button>
      </Toolbar>
      <Box sx={{ m: 5 }}>
        <Typography variant="h4"> Danh sách page của website </Typography>
        <PageListByWebId />
      </Box>
    </div>
  );
};

export default PageManageWebId;
