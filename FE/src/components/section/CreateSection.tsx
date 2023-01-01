import React, { FC, ChangeEvent, MouseEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Divider, SelectChangeEvent } from '@mui/material';
import axios from 'axios';
import { Toolbar, Typography, Box } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { BoxStyle, BoxStyle1, ToolbarStyle } from '../../styles/style';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import PageService from '../../services/PageService';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Modal from '@mui/material/Modal';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import SectionService from '../../services/SectionService';
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
type WebsiteInfo = {
  id: number;
  code: string;
  domain: string;
  createdDate?: Date;
  lastModifiedDate?: Date;
  createdBy?: string;
  lastModifiedBy?: string;
};
type PageInfo = {
  id: number;
  websiteId: number;
  pageName: string;
  pageUrl: string;
  webDomain?: string;
  createdDate?: Date;
  lastModifiedDate?: Date;
  createdBy?: string;
  lastModifiedBy?: string;
};
interface CustomState {
  detail: WebsiteInfo;
}
const styleModal = {
  position: 'absolute' as 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid green',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};
const CreateSection: React.FC = () => {
  let history = useHistory();
  const location = useLocation();
  const websiteInfo = location.state as CustomState;
  const [modeHide, setModeHide] = React.useState<number>(0);
  const [numberHide, setNumberHide] = React.useState<number>(0);
  const [code, setCode] = React.useState('');
  const [divId, setDivId] = React.useState('');
  const [displayMode, setDisplayMode] = React.useState<number>();
  const [desc, setDesc] = React.useState('');
  const [errorCode, setErrorCode] = React.useState<String>();
  const [errorDivId, setErrorDivId] = React.useState<String>();
  const [width, setWidth] = React.useState<number>(0);
  const [height, setHeight] = React.useState<number>(0);
  const [display, setDisplay] = React.useState('none');
  const [displayDemo, setDisplayDemo] = React.useState('none');
  const [errorName, setErrorName] = React.useState<String>();
  const [errorUrl, setErrorUrl] = React.useState<String>();
  const [displayDemoString, setDisplayDemoString] = React.useState('none');
  const [widthString, setWidthString] = React.useState('');
  const [heightString, setHeightString] = React.useState('');
  const [pageList, setPageList] = React.useState([] as PageInfo[]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [pageName, setPageName] = React.useState('');
  const [pageUrl, setPageUrl] = React.useState('');
  const [openDiv, setOpenDiv] = useState(false);
  const [errOpen, setErrOpen] = useState(false);
  const [disableHideInput, setDisableHideInput] = React.useState<boolean>(true);

  const handleOpen = () => {
    setOpen(true as boolean);
  };
  const handleClose = () => {
    setOpen(false as boolean);
  };

  const handleChangeModeHide = (e: any) => {
    setModeHide(e.target.value);
    if (e.target.value === '0') {
      setDisableHideInput(true);
    } else {
      setDisableHideInput(false);
    }
  };
  const handleChangeNumberHide = (e: any) => {
    setNumberHide(e.target.value);
  };

  const savePageInfo = (event: MouseEvent<HTMLElement>): void => {
    const PageInfo = {
      id: 0,
      websiteId: websiteInfo.detail.id,
      pageName: pageName,
      pageUrl: pageUrl,
      createdDate: new Date(),
      createdBy: '',
    };
    PageService.savePage(PageInfo, setOpenDiv).then((response) => {
      if (typeof response === 'undefined') {
        setOpen(false as boolean);
        setErrOpen(true);
      } else {
        setOpen(false as boolean);
        setOpenDiv(true);
      }
    });
  };
  const handleCloseDiv = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenDiv(false);
    setErrOpen(false);
  };
  const changePageName = (event: ChangeEvent<HTMLInputElement>): void => {
    setPageName((event.target as HTMLInputElement).value);
    // setErrorName(handleValidateNameAndUrl(event));
  };


  const changePageUrl = (event: ChangeEvent<HTMLInputElement>): void => {
    setPageUrl((event.target as HTMLInputElement).value);
    // setErrorUrl(handleValidateNameAndUrl(event));
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  useEffect(() => {
    getPageInWebsite();
  }, []);
  const getPageInWebsite = () => {
    PageService.getPageByWebsiteId(websiteInfo.detail.id).then((response) => {
      setPageList(response.data);
    });
  };
  const [pageNameList, setPageNameList] = React.useState<string[]>([]);
  const handleChange = (event: SelectChangeEvent<typeof pageNameList>) => {
    const {
      target: { value },
    } = event;
    setPageNameList(typeof value === 'string' ? value.split(',') : value);
  };

  const handleValidateNameAndUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 0) {
      let format = /[`!@#$%^&*()_+\-=[]{};':"\\|,.<>\/?~]/;
      let check = format.test(event.target.value);
      if (check) {
        return 'Nội dung không được chứa kí tự đặc biệt';
      } else if (event.target.value.length < 2 || event.target.value.length > 50) {
        return 'Nội dung tối thiểu 1 kí tự, tối đa 50 kí tự';
      }
    }
  };
  const handleChangeDefinition = (event: SelectChangeEvent) => {
    if (event.target.value !== '0') {
      setDisplay('none');
      setDisplayDemo('block');
      setDisplayDemoString('none');
      const value = event.target.value as string;
      let indexX = value.indexOf('x');
      let width = parseInt(value.slice(0, indexX));
      let height = parseInt(value.slice(indexX + 1, value.length));
      setWidth(width);
      setHeight(height);
    } else {
      setDisplay('flex');
      setDisplayDemo('none');
    }
  };

  const handleChangeWidth = (e: any) => {
    setWidth(e.target.value);
    setWidthString(e.target.value + 'px');
  };
  const handleChangeHeight = (e: any) => {
    setHeight(e.target.value);
    setHeightString(e.target.value + 'px');
  };
  const handleChangeSize = () => {
    setDisplayDemoString('block');
  };

  const handleChangeDisplayMode = (event: SelectChangeEvent) => {
    setDisplayMode(event.target.value as unknown as number);
  };
  const handleValidateDivId = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 0) {
      let format = /[`!@#$%^&*()_+\-=[]{};':"\\|,.<>\/?~]/;
      let check = format.test(event.target.value);
      if (check) {
        return 'Nội dung không được chứa kí tự đặc biệt, dấu cách';
      } else if (event.target.value.length < 2 || event.target.value.length > 50) {
        return 'Nội dung tối thiểu 2 kí tự, tối đa 50 kí tự';
      }
    }
  };
  const handleValidateCode = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    setErrorDivId(handleValidateDivId(event));
  };
  const handleChangeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value as string);
    setErrorCode(handleValidateCode(event));
  };
  const handleChangeDesc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(event.target.value as string);
  };

  const saveSection = (event: any) => {
    event.preventDefault();
    let sectionItem = {
      divId: divId,
      desc: desc,
      mode: displayMode,
      code: code,
      width: width,
      height: height,
      createdBy: 'Lương Minh',
    };
    axios.post('/api/sections', sectionItem).then((response) => {
      if (response.status === 201) {
        pageList.map((pageItem) => {
          pageNameList.map((pageNameItem) => {
            if (pageItem.pageName === pageNameItem) {
              let newItem = {
                pageId: pageItem.id,
                divId: divId,
                sectionCode: code,
                modeHide: modeHide,
                numberHide: numberHide,
                createdBy: '',
              };
              console.log(' check item : ', newItem);
              SectionService.saveSectionMapping(newItem).then((res) => {
                if (res.status === 201) {
                  setOpenDiv(true);
                } else {
                  setOpenDiv(false);
                }
              });
            }
          });
        });
      }
      history.goBack();
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
          Quay lại website
        </Button>
        <Box sx={{ justifyContent: 'space-between', display: 'inline-flex', gap: 2 }}>
          <Button
            sx={{ minWidth: '100px' }}
            variant="outlined"
            color="error"
            onClick={() => {
              // history.push({
              //   pathname: '/website/' + websiteInfo.detail.id + '/page',
              //   state: { id: websiteInfo.detail.id },
              // });
              history.goBack();
            }}
          >
            Hủy
          </Button>
          <Button
            sx={{ minWidth: '100px' }}
            variant="contained"
            onClick={(e) => saveSection(e)}
          >
            Lưu lại
          </Button>
        </Box>
      </Toolbar>
      <Box sx={{ m: 5 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Thêm khu vực mới
        </Typography>
        <Box sx={{ display: 'inline-flex', flexWrap: 'wrap' }}>
          <Box
            component="form"
            sx={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              gap: '2%',
              width: '70%',
            }}
            style={BoxStyle}
          >
            <TextField
              label="Nhập div_id"
              autoComplete="off"
              required
              inputProps={{ maxLength: 50 }}
              type="text"
              error={Boolean(errorDivId)}
              helperText={errorDivId}
              value={divId || ''}
              onChange={handleChangeDivId}
              sx={{ width: '49%', height: '40px' }}
            />
            <TextField
              label="Nhập mã khu vực"
              autoComplete="off"
              required
              inputProps={{ maxLength: 50 }}
              type="text"
              error={Boolean(errorCode)}
              helperText={errorCode}
              value={code || ''}
              onChange={handleChangeCode}
              sx={{ width: '49%', height: '40px' }}
            />
            <TextField
              label="Mô tả"
              type="text"
              onChange={handleChangeDesc}
              sx={{ width: '49%', height: '40px' }}
            />
            <FormControl sx={{ width: '49%', height: '40px' }}>
              <InputLabel required>Trạng thái hiển thị</InputLabel>
              <Select onChange={handleChangeDisplayMode} label="Trạng thái hiển thị *">
                <MenuItem value={'0'}>Hiển thị ngẫu nhiên</MenuItem>
                <MenuItem value={'1'}>Hiển thị theo tỉ trọng</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: '49%', height: '40px' }}>
              <InputLabel id="demo-simple-select-label" required>
                Kích cỡ khu vực
              </InputLabel>
              <Select
                defaultValue=""
                label="Kích cỡ khu vực *"
                onChange={handleChangeDefinition}
              >
                <MenuItem value={'300x100'}>300x100 px</MenuItem>
                <MenuItem value={'728x90'}>728x90 px</MenuItem>
                <MenuItem value={'300x200'}>300x200 px</MenuItem>
                <MenuItem value={'240x400'}>240x400 px</MenuItem>
                <MenuItem value={'180x150'}>180x150 px</MenuItem>
                <MenuItem value={'336x280'}>336x280 px</MenuItem>
                <MenuItem value={'120x600'}>120x600 px</MenuItem>
                <MenuItem value={'160x600'}>160x600 px</MenuItem>
                <MenuItem value={'300x600'}>300x600 px</MenuItem>
                <MenuItem value={'720x300'}>720x300 px</MenuItem>
                <MenuItem value={'468x60'}>468x60 px</MenuItem>
                <MenuItem value={'234x60'}>234x60 px</MenuItem>
                <MenuItem value={'120x240'}>120x240 px</MenuItem>
                <MenuItem value={'250x250'}>250x250 px</MenuItem>
                <MenuItem value={'0'}>Khác</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: '24%', height: '40px' }}>
              <InputLabel required>Cho phép ẩn</InputLabel>
              <Select
                onChange={handleChangeModeHide}
                value={modeHide || ''}
                label="Cho phép ẩn *"
              >
                <MenuItem value={'0'}>Không</MenuItem>
                <MenuItem value={'1'}>Có</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Nhập số lần ẩn"
              autoComplete="off"
              disabled={disableHideInput}
              type="number"
              value={numberHide || ''}
              onChange={handleChangeNumberHide}
              sx={{ width: '23%', height: '40px' }}
            />
          </Box>
          <Box
            component="form"
            sx={{
              display: 'inline-block',
              marginLeft: '20px',
              width: '28%',
              height: '300px',
            }}
            style={BoxStyle1}
          >
            <div>
              <p className="text-center mt-2 mb-2 fs-5">Thông tin website</p>
            </div>
            <Divider />
            <TextField
              InputProps={{ readOnly: true }}
              label="Mã website"
              type="text"
              sx={{ width: '100%', marginTop: '25px' }}
              value={websiteInfo.detail.code}
            />
            <FormControl sx={{ width: 300, height: 100, mt: 3 }}>
              <InputLabel id="demo-multiple-checkbox-label">Chọn page</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={pageNameList}
                onChange={handleChange}
                input={<OutlinedInput label="Chọn page" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                <div>
                  <button
                    className="btn success text-center text-primary fs-6 "
                    style={{ width: '100%' }}
                    onClick={handleOpen}
                  >
                    <AddCircleOutlineIcon />
                      Thêm page mới
                    </button>
                  <Modal open={open}>
                    <Box sx={styleModal}>
                      <Typography variant="h6" component="h2">
                        Thêm page mới
                      </Typography>
                      <TextField
                        label="Tên page"
                        type="text"
                        sx={{ width: '100%', marginTop: '20px' }}
                        margin="dense"
                        onChange={changePageName}
                        error={Boolean(errorName)}
                        helperText={errorName}
                        value={pageName || ''}
                      />
                      
                      <TextField
                        label="Page url"
                        type="text"
                        sx={{ width: '100%', marginTop: '20px' }}
                        onChange={changePageUrl}
                        error={Boolean(errorUrl)}
                        helperText={errorUrl}
                        value={pageUrl || ''}
                      />
                      <Box
                        sx={{
                          width: '100%',
                          justifyContent: 'end',
                          display: 'inline-flex',
                          gap: 2,
                          marginTop: '20px',
                        }}
                      >
                        <Button
                          sx={{ minWidth: '100px' }}
                          variant="outlined"
                          color="error"
                          onClick={handleClose}
                        >
                          Hủy
                        </Button>
                        <Button
                          sx={{ minWidth: '100px' }}
                          variant="contained"
                          onClick={savePageInfo}
                        >
                          Thêm page
                        </Button>
                      </Box>
                    </Box>
                  </Modal>
                </div>
                {pageList.map((item) => (
                  <MenuItem key={item.pageName} value={item.pageName}>
                    <Checkbox checked={pageNameList.indexOf(item.pageName) > -1} />
                    <ListItemText primary={item.pageName} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box
            sx={{
              display: display,
              flexDirection: 'column',
              mt: 3,
              width: '30%',
              gap: 3,
              mr: 3,
              height: 'fit-content',
            }}
            style={BoxStyle}
          >
            <TextField
              label="Nhập chiều dài"
              required
              type="number"
              value={width}
              fullWidth
              onChange={handleChangeWidth}
            />
            <TextField
              label="Nhập chiều cao"
              required
              type="number"
              value={height}
              fullWidth
              onChange={handleChangeHeight}
            />
            <Button variant="contained" onClick={() => handleChangeSize()}>
              Demo
            </Button>
          </Box>
          <Box sx={{ mt: 3, display: displayDemo }} style={BoxStyle}>
            <Typography variant="h6">Demo khu vực</Typography>
            <Divider sx={{ m: 1 }} />
            <Box
              sx={{
                width: width,
                height: height,
                backgroundColor: 'lightgray',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {width}x{height}
            </Box>
          </Box>
          <Box sx={{ mt: 3, display: displayDemoString }} style={BoxStyle}>
            <Typography variant="h6">Demo khu vực</Typography>
            <Divider sx={{ m: 1 }} />
            <Box
              sx={{
                width: widthString,
                height: heightString,
                backgroundColor: 'lightgray',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {width}x{height}px
            </Box>
          </Box>
        </Box>
      </Box>
      <Snackbar open={openDiv} autoHideDuration={5000} onClose={handleCloseDiv}>
        <Alert onClose={handleCloseDiv} severity="success" sx={{ width: '100%' }}>
          Thêm thành công!
        </Alert>
      </Snackbar>
      <Snackbar open={errOpen} autoHideDuration={5000} onClose={handleCloseDiv}>
        <Alert onClose={handleCloseDiv} severity="error" sx={{ width: '100%' }}>
          Thêm thất bại
        </Alert>
      </Snackbar>
    </div>
  );
};
export default CreateSection;
