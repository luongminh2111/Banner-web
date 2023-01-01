import * as React from 'react';

import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BoxStyle, ToolbarStyle } from '../../styles/style';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SectionService from '../../services/SectionService';
import SectionStatus from '../section/SectionStatus';
import {
  Toolbar,
  Box,
  Button,
  Typography,
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
type PageInfo = {
  id: number;
  websiteId: number;
  pageName: string;
  pageUrl: string;
};
interface CustomState {
  detail: PageInfo;
}
interface Section {
  id: number;
  code: string;
  desc: string;
  width: number;
  height: number;
}
interface SectionMapping {
  id: number;
  pageId: number;
  divId: string;
  sectionCode: string;
  sectionId: number;
  modeHide: number;
  numberHide: number;
  checked: boolean;
}
const AddSectionInPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as CustomState;
  const history = useHistory();
  const [sectionEnabled, setSectionEnabled] = useState<Section[]>([]);
  const [sectionArray, setSectionArray] = useState<SectionMapping[]>([]);

  const id = state.detail.id;
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    SectionService.getSectionAvailable(id).then((response) => {
      setSectionEnabled(response.data);
    });
  };

  const saveToSectionMapping = () => {
    sectionArray.map((item) => {
      if (item.checked === true) {
        let newItem = {
          pageId: id,
          divId: item.divId,
          sectionCode: item.sectionCode,
          sectionId: item.id,
          modeHide: item.modeHide,
          numberHide: typeof item.numberHide === 'object' ? 0 : item.numberHide,
          createdBy: 'Luong Minh',
        };
        console.log(' check item : ', newItem);
        SectionService.saveSectionMapping(newItem);
      }
    });
    history.goBack();
  };
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
          Quay lại
        </Button>
        <Box sx={{ justifyContent: 'space-between', display: 'inline-flex', gap: 2 }}>
          <Button
            sx={{ minWidth: '100px' }}
            variant="outlined"
            color="error"
            onClick={() => {
              history.goBack();
            }}
          >
            Hủy
          </Button>
          <Button
            sx={{ minWidth: '100px' }}
            variant="contained"
            onClick={() => saveToSectionMapping()}
          >
            Thêm
          </Button>
        </Box>
      </Toolbar>
      {sectionEnabled.length === 0 ? (
        <Box sx={{ m: 5, justifyContent: 'space-between' }} style={BoxStyle}>
          <Typography variant="h5">Chưa có khu vực</Typography>
          <Button
            sx={{ minWidth: '100px' }}
            variant="contained"
            onClick={() =>
              history.push({
                pathname: '/section/create',
              })
            }
          >
            Thêm một khu vực mới
          </Button>
        </Box>
      ) : (
        <Box style={BoxStyle} sx={{ m: 5 }}>
          <Box
            sx={{
              justifyContent: 'space-between',
              display: 'inline-flex',
              width: '100%',
              mb: 2,
            }}
          >
            <Typography variant="h5" mb={2}>
              Danh sách các khu vực
            </Typography>
            <Button
              sx={{ minWidth: '100px' }}
              variant="contained"
              onClick={() =>
                history.push({
                  pathname: '/section/create',
                })
              }
            >
              Thêm một khu vực mới
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#e6e8ea' }}>
                  <TableCell align="center" sx={{ width: '15%' }}>
                    Mã
                  </TableCell>
                  <TableCell align="center" sx={{ width: '15%' }}>
                    Id Thẻ Div
                  </TableCell>
                  <TableCell align="center" sx={{ width: '15%' }}>
                    Mô tả
                  </TableCell>
                  <TableCell align="center" sx={{ width: '15%' }}>
                    Định nghĩa
                  </TableCell>
                  <TableCell align="center" sx={{ width: '15%' }}>
                    Cho phép ẩn
                  </TableCell>
                  <TableCell align="center" sx={{ width: '15%' }}>
                    Số lần ẩn
                  </TableCell>
                  <TableCell align="center" sx={{ width: '15%' }}>
                    Thêm
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sectionEnabled.map((temp, index) => (
                  <SectionStatus
                    key={index}
                    item={temp}
                    sectionArray={sectionArray}
                    setSectionArray={setSectionArray}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </div>
  );
};
export default AddSectionInPage;
