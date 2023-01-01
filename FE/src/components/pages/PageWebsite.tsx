import { useEffect, useState } from 'react';
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
  GridColumns,
  GridRowId,
} from '@mui/x-data-grid';
import {
  Button,
  Box,
  Typography,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PageService from '../../services/PageService';
import WebsiteService from '../../services/WebsiteService';
import '../../styles/App.css';
import { LinkStyle, Url } from '../../styles/style';
import { BoxStyle } from '../../styles/style';

type WebsiteInfo = {
  id: number;
  code: string;
  domain: string;
  createdDate?: Date;
  lastModifiedDate?: Date;
  createdBy?: string;
  lastModifiedBy?: string;
  webKey: string;
};

interface CustomState {
  id: number;
}

const PageListByWebId: React.FC = () => {
  const location = useLocation();
  const websiteId = location.state as CustomState;
  const history = useHistory();

  const [pageList, setPageList] = useState([] as any[]);
  const [websiteInfo, setWebsiteInfo] = useState({} as any);
  const [pageCount, setPageCount] = useState<number>();
  const [open, setOpen] = useState(false);

  const handleOpenScript = () => {
    setOpen(true);
  };

  const handleCloseScript = () => {
    setOpen(false);
  };

  const pageUrl = window.location.href;
  let domain = new URL(pageUrl);
  useEffect(() => {
    getData();
  }, []);

  const openInNewTab = (url: any) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getData = () => {
    PageService.getPageByWebsiteId(websiteId.id).then((response) => {
      let pageListInfo = response.data;
      pageListInfo = pageListInfo.map((item: WebsiteInfo) => {
        return {
          ...item,
          createdDate: changeDateFormat(item.createdDate),
          lastModifiedDate: changeDateFormat(item.lastModifiedDate),
        };
      });
      setPageList(pageListInfo);
    });

    WebsiteService.getWebsiteById(websiteId.id).then((response) => {
      setWebsiteInfo(response.data);
    });
    PageService.countPageByWebsiteId(websiteId.id).then((response) => {
      setPageCount(response.data);
    });
  };

  const changeDateFormat = (date: Date | undefined) => {
    const temp = date?.toString().replace('T', ' ');
    const dotPosition = temp?.lastIndexOf('.');

    return temp?.slice(0, dotPosition);
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    var choice = window.confirm('Xóa page và lưu thay đổi vào database?');
    if (choice === true) {
      setPageList(pageList.filter((row) => row.id !== id));
      PageService.deletePage(Number(id));
    } else {
    }
  };

  const handleUpdateClick = (id: GridRowId) => () => {
    const pageInfo = pageList.find((item) => item.id === id);
    history.push({
      pathname: '/page/update/' + id,
      state: { detail: pageInfo },
    });
  };

  const handleSectionClick = (id: GridRowId) => () => {
    history.push({
      pathname: '/page/' + id + '/section',
      state: {
        pageId: id,
      },
    });
  };

  const columns: GridColumns = [
    {
      field: 'pageName',
      headerName: 'Tên trang',
      width: 150,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Typography onClick={handleSectionClick(params.id)} sx={LinkStyle}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'pageUrl',
      headerName: 'Đường dẫn của trang',
      width: 400,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Typography onClick={() => openInNewTab(params.value)} sx={Url}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'createdDate',
      headerName: 'Thời gian tạo',
      width: 200,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'actions',
      type: 'actions',
      width: 150,
      headerName: 'Thao tác',
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          color="success"
          label="Edit"
          onClick={handleUpdateClick(id)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          color="error"
          label="Delete"
          onClick={handleDeleteClick(id)}
        />,
      ],
    },
  ];

  return (
    <div>
      <Box sx={{ mt: 2 }} style={BoxStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5" sx={{ color: '#747C87' }}>
            Thông tin website{' '}
          </Typography>
          <Button
            variant="contained"
            onClick={() =>
              history.push({
                pathname: '/section/create',
                state: { detail: websiteInfo },
              })
            }
          >
            Thêm khu vực
          </Button>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
          <Typography>
            Tên miền website: <b>{websiteInfo?.domain}</b>
          </Typography>
          <Typography>
            Mã website: <b>{websiteInfo?.code}</b>
          </Typography>
          <Typography>
            Thời gian tạo: <b>{changeDateFormat(websiteInfo?.createdDate)}</b>
          </Typography>
          <Typography>
            Thời gian chỉnh sửa gần nhất:{' '}
            <b>{changeDateFormat(websiteInfo?.lastModifiedDate)}</b>
          </Typography>
          <Typography>
            Người tạo: <b>{websiteInfo?.createdBy}</b>
          </Typography>
          <Typography>
            Người chỉnh sửa: <b>{websiteInfo?.lastModifiedBy}</b>
          </Typography>
          <Typography>
            Số lượng page website có: <b>{pageCount}</b>{' '}
          </Typography>
          <Button variant="outlined" sx={{ width: 0.5 }} onClick={handleOpenScript}>
            Lấy script hiển thị banner
          </Button>
          <Dialog open={open} onClose={handleCloseScript}>
            <DialogTitle>Thông tin script</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Typography
                  sx={{
                    fontFamily: 'Monospace',
                    letterSpacing: 0.7,
                    lineHeight: 1.3,
                    border: 1,
                    padding: 1.5,
                  }}
                  id="script-text-for-banner"
                >
                  {`<script type="text/javascript">`}
                  <br />
                  {`
   
                    var init = {`}
                  <br />
                  {`
                          code: "`}{websiteInfo.domain}{`",`}
                  <br />
                  {`
                          key: "`}{websiteInfo.webKey}{`"`}
                  <br />
                  {`
                        }`}
                  <br />
                  {`
                    start(init)    `}
                  <br />
                  {`
                    }`}

                  {`

                  </script>`}
                  <br />
                  {``}
                </Typography>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseScript}>Thoát</Button>
              <Button
                onClick={() => {
                  var div = document.getElementById('script-text-for-banner');
                  var text = div?.textContent || div?.innerText;
                  navigator.clipboard.writeText(text || '');
                  window.alert('Đã copy script');
                }}
              >
                Copy
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
      <Box
        sx={{
          mt: 2,
          display: 'inline-flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
        style={BoxStyle}
      >
        <Typography variant="h6" color="blue">
          Các trang đã có trong website
        </Typography>
        <Button
          variant="contained"
          onClick={() =>
            history.push({ pathname: '/page/add', state: { webId: websiteInfo.id } })
          }
        >
          Thêm trang mới
        </Button>
      </Box>
      <Box sx={{ mt: 2 }} style={BoxStyle}>
        <div className="list">
          <DataGrid
            rows={pageList}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            initialState={{
              sorting: {
                sortModel: [
                  {
                    field: 'pageName',
                    sort: 'desc',
                  },
                ],
              },
            }}
          />
        </div>
      </Box>
    </div>
  );
};

export default PageListByWebId;
