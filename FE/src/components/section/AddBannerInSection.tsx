import * as React from 'react';
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
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BannerStatus from '../banners/BannerStatus';
import BannerService from '../../services/BannerService';
import { useHistory } from 'react-router-dom';
import { BoxStyle, ToolbarStyle } from '../../styles/style';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

type SectionInfo = {
  id: number;
  code: string;
  desc: string;
  mode: number;
  divId: string;
  width: number;
  height: number;
};
interface CustomState {
  detail: SectionInfo;
  setBannerList: React.Dispatch<React.SetStateAction<[]>>;
}
interface Banner {
  id: number;
  code: string;
  title: string;
  imgUrl: string;
}
interface BannerMapping {
  id: number;
  percentage: number;
  checked: boolean;
}
const AddBannerOnSection: React.FC = () => {
  const location = useLocation();
  const state = location.state as CustomState;
  const history = useHistory();
  const [bannerEnabled, setBannerEnabled] = useState<Banner[]>([]);
  const [bannerArray, setBannerArray] = useState<BannerMapping[]>([]);

  const displayUtil = state.detail.mode;
  const id = state.detail.id;
  const scale = state.detail.width / state.detail.height;
  useEffect(() => {
    getData();
  }, [bannerArray]);

  const getData = () => {
    BannerService.getListBannerFilterBySectionSize(scale, id).then((response) => {
      setBannerEnabled(response.data);
    });
  };

  const saveToBannerMapping = () => {
    if (displayUtil === 0) {
      bannerArray.map((item) => {
        if (item.checked === true) {
          let newItem = {
            bannerId: item.id,
            sectionId: id,
            pageId: 0,
            percentage: 0,
            position: '0',
            positionValue: '0',
            createdBy: 'Luong Minh',
          };
          BannerService.saveBannerMapping(newItem);
        }
      });
      history.push({
        pathname: '/section/detail/' + id,
        state: { detail: state.detail },
      });
    } else {
      bannerArray.map((item) => {
        if (item.checked === true) {
          let newItem = {
            bannerId: item.id,
            sectionId: id,
            pageId: 0,
            position: '0',
            positionValue: '0',
            percentage: typeof item.percentage === 'object' ? 0 : item.percentage,
            createdBy: 'Luong Minh',
          };
          BannerService.saveBannerMapping(newItem);
        }
      });
      history.push({
        pathname: '/section/detail/' + id,
        state: { detail: state.detail },
      });
    }
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
          Quay lại danh sách các khu vực
        </Button>
        <Box sx={{ justifyContent: 'space-between', display: 'inline-flex', gap: 2 }}>
          <Button
            sx={{ minWidth: '100px' }}
            variant="outlined"
            color="error"
            onClick={() => {
              history.push('/section');
            }}
          >
            Hủy
          </Button>
          <Button
            sx={{ minWidth: '100px' }}
            variant="contained"
            onClick={() => saveToBannerMapping()}
          >
            Thêm
          </Button>
        </Box>
      </Toolbar>
      {bannerEnabled.length === 0 ? (
        <Box sx={{ m: 5 }} style={BoxStyle}>
          <Typography variant="h5">Không còn banner nào phù hợp</Typography>
        </Box>
      ) : (
        <Box style={BoxStyle} sx={{ m: 5 }}>
          <Typography variant="h5" mb={2}>
            Danh sách các banner phù hợp{' '}
          </Typography>

          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              {displayUtil === 0 ? (
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#e6e8ea' }}>
                    <TableCell align="center" sx={{ width: '20%' }}>
                      Mã
                    </TableCell>
                    <TableCell align="center" sx={{ width: '35%' }}>
                      Chủ đề
                    </TableCell>
                    <TableCell align="center" sx={{ width: '35%' }}>
                      Ảnh banner
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell align="center" sx={{ width: '10%' }}>
                      Thêm
                    </TableCell>
                  </TableRow>
                </TableHead>
              ) : (
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#e6e8ea' }}>
                    <TableCell align="center" sx={{ width: '15%' }}>
                      Mã
                    </TableCell>
                    <TableCell align="center" sx={{ width: '30%' }}>
                      Chủ đề
                    </TableCell>
                    <TableCell align="center" sx={{ width: '30%' }}>
                      Ảnh banner
                    </TableCell>
                    <TableCell align="center" sx={{ width: '15%' }}>
                      Tỉ trọng(%)
                    </TableCell>
                    <TableCell align="center" sx={{ width: '10%' }}>
                      Thêm
                    </TableCell>
                  </TableRow>
                </TableHead>
              )}
              <TableBody>
                {bannerEnabled.map((temp, index) => (
                  <BannerStatus
                    key={index}
                    item={temp}
                    displayUtil={displayUtil}
                    bannerArray={bannerArray}
                    setBannerArray={setBannerArray}
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
export default AddBannerOnSection;
