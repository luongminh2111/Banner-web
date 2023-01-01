import * as React from 'react';
import { styled } from '@mui/material/styles';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../configs/FireBase';
import { SelectChangeEvent } from '@mui/material';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import {
  Toolbar,
  Typography,
  Box,
  TextField,
  Grid,
  Card,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  CardMedia,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { BoxStyle, ToolbarStyle } from '../../styles/style';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Input = styled('input')({
  display: 'none',
});

const CreateBanner: React.FC = () => {
  let history = useHistory();
  const [code, setCode] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [type, setType] = React.useState('');
  const [popUp, setPopUp] = React.useState('Không');
  const [campaignMedium, setCampaigMedium] = React.useState('');
  const [fileName, setFileName] = React.useState('');
  const [linkUrl, setLinkUrl] = React.useState('');
  const [imageUpload, setImageUpload] = React.useState(null);
  const [preViewImage, setPreViewImage] = React.useState('');
  const [display, setDisplay] = React.useState('none');
  const [errorCode, setErrorCode] = React.useState<String>();
  const [errorTitle, setErrorTitle] = React.useState<String>();
  const [widthImg, setWidthImg] = React.useState(400);
  const [heightImg, setHeightImg] = React.useState(550);
  const [open, setOpen] = React.useState(false);
  const [errOpen, setErrOpen] = React.useState(false);
  const [webUrl, setWebUrl] = React.useState('');
  const [source, setSource] = React.useState('');
  const [campaignName, setCampaigName] = React.useState('');
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setErrOpen(false);
  };

  const handleChangeType = (event: SelectChangeEvent) => {
    if (event.target.value !== 'Khac') {
      setDisplay('block');
    } else {
      setDisplay('none');
    }
    setType(event.target.value as string);
  };

  const onLoadImg = () => {
    let imgLoad = document.getElementById('imgUpload') as HTMLImageElement;
    setWidthImg(imgLoad.naturalWidth);
    setHeightImg(imgLoad.naturalHeight);
  };

  const handleValidateCodeAndTittle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 0) {
      let format = /[`!@#$%^&*()_+\-=[]{};':"\\|,.<>\/?~]/;
      let check = format.test(event.target.value);
      if (check) {
        return 'Nội dung không được chứa kí tự đặc biệt';
      } else if (event.target.value.length < 6 || event.target.value.length > 50) {
        return 'Nội dung tối thiểu 6 kí tự, tối đa 50 kí tự';
      }
    }
  };

  const handleChangeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value as string);
    setErrorCode(handleValidateCodeAndTittle(event));
  };
  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value as string);
    setErrorTitle(handleValidateCodeAndTittle(event));
  };

  const handleChangewebsiteURL = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWebUrl(event.target.value as string);
  };
  const handleChangeSource = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSource(event.target.value as string);
  };

  const handleChangePopUp = (event: SelectChangeEvent) => {
    setPopUp(event.target.value as string);
  };

  const handleChangeCampaigName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCampaigName(event.target.value as string);
  };
  const handleChangeCampaigMedium = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCampaigMedium(event.target.value as string);
  };

  const getImage = (e: any) => {
    let url = URL.createObjectURL(e.target.files[0]);
    setImageUpload(e.target.files[0]);
    setPreViewImage(url);
    setFileName(e.target.files[0].name);
  };

  const saveBanner = (event: any) => {
    event.preventDefault();
    if (type === '') {
      window.confirm('Bạn chưa chọn loại cho banner');
      return;
    }
    if (imageUpload == null) {
      window.confirm('Ảnh banner chưa được tải lên !');
      return;
    } else {
      const imageRef = ref(storage, `images/${fileName}`);
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          let bannerItem = {
            code: code,
            title: title,
            type: type,
            popUp: popUp === 'Không' ? 0 : 1,
            imgUrl: url,
            url:
              webUrl +
              '?' +
              'utm_source=' +
              source +
              '&utm_medium=' +
              campaignMedium +
              '&utm_campaign=' +
              campaignName,
            width: widthImg,
            height: heightImg,
            createdBy: 'Minh Luong',
          };
          axios.post('/api/banners', bannerItem).then(() => {
            setOpen(true);
            history.push('/banner');
          });
        });
      });
    }
  };

  return (
    <div>
      <Toolbar variant="dense" sx={ToolbarStyle}>
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
          Quay lại danh sách các banner
        </Button>
        <Box sx={{ justifyContent: 'space-between', display: 'inline-flex', gap: 2 }}>
          <Button
            sx={{ minWidth: '100px' }}
            variant="outlined"
            onClick={() => {
              history.push('/banner');
            }}
          >
            Thoát
          </Button>
          <Button
            sx={{ minWidth: '100px' }}
            variant="contained"
            onClick={(e) => saveBanner(e)}
          >
            Lưu
          </Button>
        </Box>
      </Toolbar>
      <Box sx={{ m: 5 }}>
        <Typography variant="h4" mb={2}>
          Thêm banner mới
        </Typography>
        <Grid container spacing={2}>
          <Grid item sm={12} md={6} sx={{ pr: 3, pb: 3 }}>
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
                label="Nhập mã banner"
                autoComplete="off"
                required
                inputProps={{ minLength: 6, maxLength: 50 }}
                type="text"
                error={Boolean(errorCode)}
                helperText={errorCode}
                value={code || ''}
                onChange={handleChangeCode}
              />
              <TextField
                label="Nhập chủ đề banner"
                type="text"
                required
                error={Boolean(errorTitle)}
                helperText={errorTitle}
                value={title || ''}
                onChange={handleChangeTitle}
              />
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id="demo-simple-select-label" required>
                  Chọn loại banner
                </InputLabel>
                <Select
                  value={type}
                  onChange={handleChangeType}
                  label="Chọn loại banner *"
                >
                  <MenuItem value={'Khac'}>
                    <em>Khác</em>
                  </MenuItem>
                  <MenuItem value={'Liên kết tới một link mới'}>
                    Liên kết tới một link mới
                  </MenuItem>
                  <MenuItem value={'Liên kết tới một iframe'}>
                    Liên kết tới một iframe
                  </MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ display: display }}>
                <Box
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
                    label="URl Trang Web"
                    required
                    type="text"
                    value={webUrl || ''}
                    fullWidth
                    onChange={handleChangewebsiteURL}
                  />
                  <TextField
                    label="Nguồn chiến dịch"
                    required
                    type="text"
                    value={source || ''}
                    fullWidth
                    onChange={handleChangeSource}
                  />
                  <TextField
                    label="Phương tiện chiến dịch"
                    required
                    type="text"
                    value={campaignMedium || ''}
                    fullWidth
                    onChange={handleChangeCampaigMedium}
                  />
                  <TextField
                    label="Tên chiến dịch"
                    required
                    type="text"
                    value={campaignName || ''}
                    fullWidth
                    onChange={handleChangeCampaigName}
                  />
                </Box>
              </Box>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel required>Chọn trạng thái popup</InputLabel>
                <Select
                  value={popUp}
                  onChange={handleChangePopUp}
                  label="Chọn trạng thái popup *"
                >
                  <MenuItem value={'Không'}>Không</MenuItem>
                  <MenuItem value={'Có'}>Có</MenuItem>
                </Select>
              </FormControl>
              <Stack direction="row" spacing={2}>
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={getImage}
                  />
                  <Button variant="contained" component="span">
                    Upload
                  </Button>
                </label>
                <label>
                  <TextField
                    disabled
                    type="text"
                    value={fileName || ''}
                    fullWidth
                    variant="standard"
                  />
                </label>
              </Stack>
            </Box>
          </Grid>
          <Grid item sm={12} md={6} display="flex">
            <Card
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
              style={BoxStyle}
            >
              <CardMedia
                component="img"
                id="imgUpload"
                onLoad={onLoadImg}
                image={preViewImage || ''}
                sx={{ objectFit: 'contain' }}
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Xóa thành công
        </Alert>
      </Snackbar>
      <Snackbar open={errOpen} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Xóa không thành công
        </Alert>
      </Snackbar>
    </div>
  );
};
export default CreateBanner;
