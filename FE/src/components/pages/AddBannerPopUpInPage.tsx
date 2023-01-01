import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BoxStyle, ToolbarStyle } from '../../styles/style';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import BannerService from '../../services/BannerService';
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
  SelectChangeEvent,
} from '@mui/material';
import PageBanner from './PageBanner';
type Banner = {
  id: number;
  title: string;
  imgUrl: string;
  url: string;
};
type BannerMapping = {
  id: number;
  position: string;
  positionValue: string;
  checked: boolean;
};

const AddBannerPopUpInPage: React.FC = (props: any) => {
  const pageId = props.match.params.id;
  const history = useHistory();
  const [bannerList, setBannerList] = useState([] as Banner[]);
  const [bannerArray, setBannerArray] = useState([] as BannerMapping[]);

  useEffect(() => {
    fetchDataBanner();
  }, []);

  const fetchDataBanner = () => {
    BannerService.getListBannerPopUpNotInPage(Number(pageId)).then((res) => {
      setBannerList(res.data);
    });
  };
  const saveToBannerMapping = () => {
    bannerArray.map((item) => {
      if (item.checked === true) {
        let newItem = {
          bannerId: item.id,
          sectionId: 0,
          pageId: pageId,
          position: item.position === 'undefined' ? 0 : item.position,
          positionValue: item.positionValue === 'undefined' ? 0 : item.positionValue,
          percentage: 0,
          lastModifiedBy: 'Luong Minh',
        };
        BannerService.saveBannerMapping(newItem);
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
          Quay lại page
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
            onClick={() => saveToBannerMapping()}
          >
            Thêm
          </Button>
        </Box>
      </Toolbar>
      {bannerList.length === 0 ? (
        <Box sx={{ m: 5 }} style={BoxStyle}>
          <Typography variant="h5">Không có banner nào phù hợp</Typography>
        </Box>
      ) : (
        <Box style={BoxStyle} sx={{ m: 5 }}>
          <Typography variant="h5" mb={2}>
            Danh sách các banner phù hợp{' '}
          </Typography>

          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#e6e8ea' }}>
                  <TableCell align="center" sx={{ width: '10%' }}>
                    Mã
                  </TableCell>
                  <TableCell align="center" sx={{ width: '25%' }}>
                    Chủ đề
                  </TableCell>
                  <TableCell align="center" sx={{ width: '25%' }}>
                    Ảnh banner
                  </TableCell>
                  <TableCell align="center" sx={{ width: '15%' }}>
                    Vị trí điều chỉnh
                  </TableCell>
                  <TableCell align="center" sx={{ width: '20%' }}>
                    Giá trị
                  </TableCell>
                  <TableCell align="center" sx={{ width: '5%' }}>
                    Thêm
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {bannerList.map((item, index) => (
                  <PageBanner
                    key={index}
                    item={item}
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
export default AddBannerPopUpInPage;
