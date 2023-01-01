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
  sectionMappingId: number;
  modeHide: number;
  numberHide: number;
}
interface SectionMapping {
  id: number;
  modeHide: number;
  numberHide: number;
  position: string;
  checked: boolean;
}
const UpdateSectionInPage = () => {
  const location = useLocation();
  const state = location.state as CustomState;
  const history = useHistory();
  const [sectionEnabled, setSectionEnabled] = useState<Section[]>([]);
  const [sectionArray, setSectionArray] = useState<SectionMapping[]>([]);

  const pageId = state.detail;
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    SectionService.getListSectionInPageByPageId(pageId).then((response) => {
      setSectionEnabled(response.data);
    });
  };
  const saveToSectionMapping = () => {
    sectionArray.map((item) => {
      sectionEnabled.map((temp) => {
        if (temp.id === item.id) {
          if (temp.numberHide !== item.numberHide || temp.modeHide !== item.modeHide) {
            let newItem = {
              id: temp.sectionMappingId,
              sectionId: item.id,
              pageId: pageId,
              modeHide: item.modeHide,
              numberHide: item.numberHide,
              lastModifiedBy: 'Luong Minh',
            };
            SectionService.updateSectionMapping(newItem);
          }
        }
      });
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
            onClick={saveToSectionMapping}
          >
            Lưu chỉnh sửa
          </Button>
        </Box>
      </Toolbar>
      {sectionEnabled.length === 0 ? (
        <Box sx={{ m: 3 }} style={BoxStyle}>
          <Typography variant="h5">Chưa có khu vực</Typography>
        </Box>
      ) : (
        <Box style={BoxStyle} sx={{ m: 3 }}>
          <Typography variant="h5" mb={2}>
            Danh sách các khu vực
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#e6e8ea' }}>
                  <TableCell align="center" sx={{ width: '10%' }}>
                    Mã
                  </TableCell>
                  <TableCell align="center" sx={{ width: '10%' }}>
                    Id Thẻ Div
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ width: '20%', textOverflow: 'ellipsis', overflow: 'hidden' }}
                  >
                    {' '}
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
                  <TableCell align="center" sx={{ width: '10%' }}>
                    Xác Nhận
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
export default UpdateSectionInPage;
