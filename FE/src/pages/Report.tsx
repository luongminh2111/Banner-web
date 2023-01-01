import { Toolbar, Box } from '@mui/material'
import React from 'react';
import { BoxStyle, ToolbarStyle } from '../styles/style';
import { Report } from '@mui/icons-material';
// import { useHistory } from 'react-router-dom';

const Reports: React.FC = () => {
  // const history = useHistory();
  return (
    <div>
      <Toolbar variant='dense' sx={ToolbarStyle}>
        <h2>Báo cáo</h2>
      </Toolbar>
      <Box sx={{m:5}} style={BoxStyle}><Report/> Chưa có báo cáo </Box>
    </div>
  )
}

export default Reports;
