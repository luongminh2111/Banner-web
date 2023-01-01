import React, { useState, ChangeEvent, MouseEvent, useEffect } from 'react';
import Button from '@mui/material/Button';
import {
  TextField,
  Box,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
  InputLabel,
  FormControl,
  Toolbar,
} from '@mui/material';
import { useLocation, useHistory } from 'react-router-dom';
import PageService from '../../services/PageService';
import WebsiteService from '../../services/WebsiteService';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { BoxStyle, ToolbarStyle } from '../../styles/style';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type PageInfo = {
  id: number;
  websiteId: number;
  pageName: string;
  pageUrl: string;
  createdDate?: Date;
  lastModifiedDate?: Date;
  createdBy?: string;
  lastModifiedBy?: string;
};

interface CustomState {
  detail: PageInfo;
}

const UpdatePage: React.FC = () => {
  const location = useLocation();
  const state = location.state as CustomState;
  const history = useHistory();

  const [pageName, setPageName] = useState(state.detail.pageName);
  const [websiteId, setWebsiteId] = useState(String(state.detail.websiteId));
  const [pageUrl, setPageUrl] = useState(state.detail.pageUrl);
  const [websiteList, setWebsiteList] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [errOpen, setErrOpen] = useState(false);
  const [errorName, setErrorName] = React.useState<String>();
  const [errorTitle, setErrorTitle] = React.useState<String>();

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setErrOpen(false);
  };

  const handleValidateNameAndUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  useEffect(() => {
    WebsiteService.getAllWebsite().then((response) => {
      setWebsiteList(response.data);
    });
  }, []);

  const changePageName = (event: ChangeEvent<HTMLInputElement>): void => {
    setPageName((event.target as HTMLInputElement).value);
    setErrorName(handleValidateNameAndUrl(event));
  };

  const changePageUrl = (event: ChangeEvent<HTMLInputElement>): void => {
    setPageUrl((event.target as HTMLInputElement).value);
    setErrorTitle(handleValidateNameAndUrl(event));
  };

  const changeWebsiteId = (event: SelectChangeEvent<string>): void => {
    setWebsiteId(event.target.value as string);
  };

  const updatePageInfo = (event: MouseEvent<HTMLElement>): void => {
    const pageInfo = {
      id: state.detail.id,
      websiteId: Number(websiteId),
      pageName: pageName,
      pageUrl: pageUrl,
      createdDate: state.detail.createdDate,
      lastModifiedDate: new Date(),
      createdBy: state.detail.createdBy,
      lastModifiedBy: 'hahah',
    };
    PageService.updatePage(pageInfo).then((response) => {
      if (typeof response === 'undefined') {
        setErrOpen(true);
      } else {
        setOpen(true);
        history.push('/page');
      }
    });
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
          Quay lại
        </Button>
        <Box sx={{ justifyContent: 'space-between', display: 'inline-flex', gap: 1 }}>
          <Button
            variant="outlined"
            onClick={() => {
              history.push('/page');
            }}
          >
            Hủy
          </Button>
          <Button variant="contained" onClick={(e) => updatePageInfo(e)}>
            Lưu
          </Button>
        </Box>
      </Toolbar>
      <Box sx={{ m: 5 }}>
        <Typography variant="h4" mb={2}>
          Chỉnh sửa thông tin trang
        </Typography>
        <Box sx={{ my: 5, mx: 'auto', width: '80%' }} style={BoxStyle}>
          <FormControl sx={{ gap: 3, width: '100%' }}>
            <InputLabel id="domain-select-label">Domain</InputLabel>
            <Select
              labelId="domain-select-label"
              id="domain-select"
              value={
                typeof websiteId === 'undefined'
                  ? String(state.detail.websiteId)
                  : websiteId
              }
              label="Domain"
              onChange={changeWebsiteId}
            >
              {websiteList.map((item) => {
                return (
                  <MenuItem
                    autoFocus={item['id'] === state.detail.websiteId}
                    value={item['id']}
                  >
                    {item['domain']}
                  </MenuItem>
                );
              })}
            </Select>
            <TextField
              fullWidth
              label="Tên trang"
              value={pageName || state.detail.pageName}
              error={Boolean(errorName)}
              helperText={errorName}
              onChange={changePageName}
            />
            <TextField
              fullWidth
              label="Url"
              value={pageUrl || state.detail.pageUrl}
              error={Boolean(errorTitle)}
              helperText={errorTitle}
              onChange={changePageUrl}
            />
          </FormControl>
        </Box>
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Lưu thành công!
          </Alert>
        </Snackbar>
        <Snackbar open={errOpen} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Lưu không thành công
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
};

export default UpdatePage;
