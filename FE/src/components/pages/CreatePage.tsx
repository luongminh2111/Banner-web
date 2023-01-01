import React, { FC, useState, ChangeEvent, MouseEvent, useEffect } from 'react';
import Button from '@mui/material/Button';
import {
  Grid,
  TextField,
  Box,
  Select,
  NativeSelect,
  MenuItem,
  SelectChangeEvent,
  Typography,
  InputLabel,
  FormControl,
  Divider,
} from '@mui/material';
import WebsiteService from '../../services/WebsiteService';
import PageService from '../../services/PageService';
import Toolbar from '@mui/material/Toolbar';
import { useHistory, useLocation } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { BoxStyle, ToolbarStyle } from '../../styles/style';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface CustomState {
  webId: number;
}

const CreatePage: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const pageState = location.state as CustomState;
  const webId = typeof pageState === 'undefined' ? undefined : pageState.webId;

  const [pageName, setPageName] = useState('');
  const [pageUrl, setPageUrl] = useState('');
  const [websiteId, setWebsiteId] = useState(
    typeof pageState === 'undefined' ? '' : String(webId)
  );

  const [websiteList, setWebsiteList] = useState([]);
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
      } else if (event.target.value.length < 1 || event.target.value.length > 50) {
        return 'Nội dung tối thiểu 1 kí tự, tối đa 50 kí tự';
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

  const savePageInfo = (event: MouseEvent<HTMLElement>): void => {
    const PageInfo = {
      id: 0,
      websiteId: Number(websiteId),
      pageName: pageName,
      pageUrl: pageUrl,
      createdDate: new Date(),
      createdBy: 'hehe',
    };
    PageService.savePage(PageInfo, setOpen).then((response) => {
      if (typeof response === 'undefined') {
        setErrOpen(true);
      } else {
        setOpen(true);
        if (typeof pageState === 'undefined') {
          history.push('/page');
        } else {
          history.push({
            pathname: '/website/' + websiteId + '/page',
            state: {
              id: websiteId,
            },
          });
        }
      }
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
              history.goBack();
            }}
          >
            Hủy
          </Button>
          <Button
            sx={{ minWidth: '100px' }}
            variant="contained"
            onClick={(e) => savePageInfo(e)}
          >
            Lưu lại
          </Button>
        </Box>
      </Toolbar>
      <Box sx={{ mx: 10, my: 5 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Thêm trang mới
        </Typography>
        <Box sx={{ my: 5 }} style={BoxStyle}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel id="domain-select-label">Mã website</InputLabel>
            <Select
              labelId="domain-select-label"
              id="domain-select"
              value={typeof pageState === 'undefined' ? websiteId : String(webId)}
              label="Mã website"
              onChange={changeWebsiteId}
              sx={{
                minWidth: '300px',
              }}
            >
              {typeof pageState !== 'undefined'
                ? websiteList.map((item) => {
                    return (
                      <MenuItem
                        autoFocus={item['id'] == pageState.webId}
                        value={item['id']}
                        key={item['id']}
                      >
                        {item['code']}
                      </MenuItem>
                    );
                  })
                : websiteList.map((item) => {
                    return (
                      <MenuItem value={item['id']} key={item['id']}>
                        {item['code']}
                      </MenuItem>
                    );
                  })}
            </Select>
            <TextField
              fullWidth
              label="Tên trang"
              defaultValue=""
              error={Boolean(errorName)}
              helperText={errorName}
              margin="dense"
              onChange={changePageName}
            />
            <TextField
              fullWidth
              label="Url"
              margin="dense"
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

export default CreatePage;
