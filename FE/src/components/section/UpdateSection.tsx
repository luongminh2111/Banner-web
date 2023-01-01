import { useEffect } from 'react';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import BannerService from '../../services/BannerService';
import { Toolbar, Typography, Box } from '@mui/material';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import { BoxStyle, ToolbarStyle } from '../../styles/style';

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
const UpdateSection: React.FC = () => {
  const location = useLocation();
  const state = location.state as CustomState;
  let history = useHistory();
  const [code, setCode] = React.useState<string>(state.detail.code);
  const [divId, setDivId] = React.useState<string>(state.detail.divId);
  const [displayMode, setDisplayMode] = React.useState<number>(state.detail.mode);
  const [desc, setDesc] = React.useState<string>(state.detail.desc);
  const [width, setWidth] = React.useState<number>(state.detail.width);
  const [height, setHeight] = React.useState<number>(state.detail.height);
  const [errorCode, setErrorCode] = React.useState<String>();
  const [errorDivId, setErrorDivId] = React.useState<String>();
  const [bannerList, setBannerList] = React.useState([] as any[]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    BannerService.getListBannerFilterBySectionId(state.detail.id).then((res) => {
      setBannerList(res.data);
    });
  };
  const handleChangeDisplayMode = (event: SelectChangeEvent) => {
    setDisplayMode(event.target.value as unknown as number);
  };
  const handleGoToUpdateBanner = (sectionInfo: SectionInfo) => {
    history.push({
      pathname: '/section/update-banner/' + sectionInfo.id,
      state: { detail: sectionInfo },
    });
  };
  const handleValidateDivIdAndCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 0) {
      let format = /[`!@#$%^&*()_+\-=[]{};':"\\|,.<>\/?~]/;
      let check = format.test(event.target.value);
      if (check) {
        return 'Nội dung không được chứa kí tự đặc biệt';
      } else if (event.target.value.length < 2 || event.target.value.length > 50) {
        return 'Nội dung tối thiểu 2 kí tự, tối đa 50 kí tự';
      }
    }
  };

  const handleChangeDivId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDivId(event.target.value as string);
    setErrorDivId(handleValidateDivIdAndCode(event));
  };
  const handleChangeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value as string);
    setErrorCode(handleValidateDivIdAndCode(event));
  };
  const handleChangeDesc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(event.target.value as string);
  };

  const saveSection = (event: any) => {
    event.preventDefault();
    let sectionItem = {
      id: state.detail.id,
      divId: divId,
      mode: displayMode,
      desc: desc,
      code: code,
      width: width,
      height: height,
      lastModifiedBy: 'Lương Minh',
    };

    axios
      .put('/api/sections/' + state.detail.id, sectionItem)
      .then(() => {
        history.push('/section');
      });
  };
  const columns: GridColumns = [
    {
      field: 'code',
      headerName: 'Code',
      width: 100,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'title',
      headerName: 'Tên banner',
      width: 250,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'url',
      headerName: 'URL',
      width: 250,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'imgUrl',
      headerClassName: 'super-app-theme--header',
      headerName: 'Ảnh',
      width: 350,
      editable: true,
      renderCell: (params) => <img src={params.value} alt="" />,
      cellClassName: 'img-field-css',
    },
  ];
  return (
    <div>
      <Toolbar variant="dense" style={ToolbarStyle}>
        <Button
          onClick={()=> history.goBack()}
          variant="text"
          sx={{
            color: '#637381',
            fontSize: '14px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'inherit',
            },
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
            onClick={(e) => saveSection(e)}
          >
            Lưu
          </Button>
        </Box>
      </Toolbar>
      <Box sx={{ mx: 5, my:3 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Chỉnh sửa khu vực
        </Typography>
        <Grid container sx={{ mx: 0 }}>
          <Grid item md={12} lg={4} sx={{ pr: 3,pb: 3 }}>
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
                label="Nhập div_id"
                required
                inputProps={{ minLength: 2, maxLength: 10 }}
                type="text"
                error={Boolean(errorDivId)}
                helperText={errorDivId}
                value={divId || ''}
                onChange={handleChangeDivId}
              />
              <TextField
                label="Nhập mã khu vực"
                required
                inputProps={{ minLength: 2, maxLength: 10 }}
                type="text"
                error={Boolean(errorCode)}
                helperText={errorCode}
                value={code || ''}
                onChange={handleChangeCode}
              />
              <TextField
                label="Mô tả"
                type="text"
                value={desc}
                onChange={handleChangeDesc}
              />
              <FormControl sx={{ width: '100%' }}>
                <InputLabel required>Trạng thái hiển thị</InputLabel>
                <Select
                  label='Trạng thái hiển thị *'
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={handleChangeDisplayMode}
                >
                  <MenuItem value={'0'}>Hiển thị ngẫu nhiên</MenuItem>
                  <MenuItem value={'1'}>Hiển thị theo tỉ trọng</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Kích thước khu vực"
                type="text"
                value={width + ' x ' + height + ' px'}
                disabled
              />
            </Box>
          </Grid>
          <Grid item md={12} lg={8}>
            <Box style={BoxStyle}>
              <Typography variant='h5' color='red'>Mô tả kích thước thẻ div</Typography>
            </Box>
            <Box sx={{mt:3, display:'flex', justifyContent: 'center'}} style={BoxStyle}>
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
      <Box sx={{ mx:5, mb:5, gap:3, display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'inline-flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
          style={BoxStyle}
        >
          <Typography variant='h6' color='blue'>Các banner đã có trong khu vực</Typography>
          <Button
            variant="contained"
            onClick={() => handleGoToUpdateBanner(state.detail)}
            sx={{ minWidth: '150px' }}
          >
            Chỉnh sửa
          </Button>
        </Box>
        <Box sx={{ height: '500px' }} style={BoxStyle}>
          <DataGrid
            rows={bannerList}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            checkboxSelection
          />
        </Box>
      </Box>
    </div>
  );
};
export default UpdateSection;
