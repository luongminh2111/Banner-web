import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Toolbar, Typography, Box } from '@mui/material';
import { DataGrid, GridColumns, GridRowId, GridActionsCellItem } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import BannerService from '../../services/BannerService';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { BoxStyle, ToolbarStyle } from '../../styles/style';
import { LinkStyle, Url } from '../../styles/style';
import DeleteIcon from '@mui/icons-material/Delete';

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
}
const SectionDetail: React.FC = () => {
  let history = useHistory();
  const location = useLocation();
  const state = location.state as CustomState;
  const [open, setOpen] = React.useState(false);
  const [errOpen, setErrOpen] = React.useState(false);
  const [bannerList, setBannerList] = React.useState([] as any[]);
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setErrOpen(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    BannerService.getListBannerFilterBySectionId(state.detail.id).then((res) => {
      setBannerList(res.data);
    });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    var choice = window.confirm('Xác nhận Xóa banner?');
    if (choice === true) {
      setBannerList(bannerList.filter((row: { id: GridRowId }) => row.id !== id));
      BannerService.deleteOnBannerMapping(Number(id), state.detail.id);
      setOpen(true);
    }
  };
  const handleViewDetailClick = (id: GridRowId) => () => {
    const bannerInfo = bannerList.find((item: { id: GridRowId }) => item.id === id);
    history.push({
      pathname: '/banner/detail/' + id,
      state: { detail: bannerInfo },
    });
  };
  const openInNewTab = (url: any) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  const columns: GridColumns = [
    {
      field: 'code',
      headerName: 'Code',
      width: 150,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Typography onClick={handleViewDetailClick(params.id)} sx={LinkStyle}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'title',
      headerName: 'Tên banner',
      width: 250,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Typography onClick={handleViewDetailClick(params.id)} sx={Url}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'url',
      headerName: 'URL',
      width: 400,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Typography onClick={() => openInNewTab(params.value)} sx={Url}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'imgUrl',
      headerClassName: 'super-app-theme--header',
      headerName: 'Ảnh',
      width: 250,
      editable: true,
      renderCell: (params) => <img src={params.value} alt="" />,
      cellClassName: 'img-field-css',
    },
    {
      field: 'actions1',
      type: 'actions',
      headerClassName: 'super-app-theme--header',
      headerName: 'Xóa',
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          color="error"
          label="Delete"
          onClick={handleDeleteClick(id)}
        />,
      ],
    },
  ];
  const handleGoToAddBaner = (sectionInfo: SectionInfo) => {
    history.push({
      pathname: '/section/add-banner/' + sectionInfo.id,
      state: { detail: sectionInfo },
    });
  };
  const handleGoToUpdateSection = (section: any) => {
    history.push({
      pathname: '/section/update/' + section.id,
      state: { detail: section },
    });
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
            Quay lại
          </Button>
          <Button
            sx={{ minWidth: '100px' }}
            variant="contained"
            onClick={() => handleGoToUpdateSection(state.detail)}
          >
            Chỉnh sửa
          </Button>
        </Box>
      </Toolbar>
      <Box sx={{ mx: 5, my: 3 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Chi tiết khu vực
        </Typography>
        <Grid container sx={{ mx: 0 }}>
          <Grid item md={12} lg={4} sx={{ pr: 3, pb: 2 }}>
            <Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                '& .MuiTextField-root': {
                  width: '100%',
                },
              }}
              style={BoxStyle}
            >
              <TextField
                label="Mã code"
                type="text"
                value={state.detail.code}
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Div Id"
                type="text"
                value={state.detail.divId}
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Mô tả"
                type="text"
                value={state.detail.desc}
                InputProps={{ readOnly: true }}
              />
              <TextField
                InputProps={{ readOnly: true }}
                label="Trạng thái hiển thị"
                type="text"
                value={state.detail.mode === 0 ? 'Ngẫu nhiên' : 'Tỉ trọng'}
              />
              <TextField
                InputProps={{ readOnly: true }}
                label="Kích cỡ"
                type="text"
                value={state.detail.width + 'x' + state.detail.height + ' px'}
              />
            </Box>
          </Grid>
          <Grid item md={12} lg={8}>
            <Box style={BoxStyle}>
              <Typography variant="h6">Mô tả kích thước thẻ div</Typography>
            </Box>
            <Box
              sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
              style={BoxStyle}
            >
              <Box
                sx={{
                  width: state.detail.width,
                  height: state.detail.height,
                  backgroundColor: 'lightgray',
                }}
              ></Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mx: 5, mb: 5, gap: 3, display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'inline-flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
          style={BoxStyle}
        >
          <Typography variant="h6" color="blue">
            Các banner đã có trong khu vực
          </Typography>
          <Button
            variant="contained"
            onClick={() => handleGoToAddBaner(state.detail)}
            sx={{ minWidth: '150px' }}
          >
            Thêm Mới
          </Button>
        </Box>
        <Box sx={{ height: '500px' }} style={BoxStyle}>
          <DataGrid
            rows={bannerList}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
          />
        </Box>
      </Box>
    </div>
  );
};
export default SectionDetail;
