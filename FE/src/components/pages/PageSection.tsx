import { useEffect, useState, useRef } from 'react';
import { DataGrid, GridActionsCellItem, GridColumns, GridRowId } from '@mui/x-data-grid';
import {
  Button,
  Toolbar,
  Typography,
  Box,
  Divider,
  Icon,
  Tabs,
  Tab,
} from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import PageService from '../../services/PageService';
import SectionService from '../../services/SectionService';
import BannerService from '../../services/BannerService';
import '../../styles/App.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { BoxStyle, ToolbarStyle } from '../../styles/style';
import { LinkStyle, Url } from '../../styles/style';

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
  pageId: number;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const PageSection: React.FC = () => {
  const location = useLocation();
  const pageId = location.state as CustomState;
  const history = useHistory();

  const mapPageToNextCursor = useRef<{ [page: number]: GridRowId }>({});
  const [pageSize, setPageSize] = useState(5);
  const [totalRow, setTotalRow] = useState(0);
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState({} as PageInfo);
  const [bannerList, setBannerList] = useState([] as any[]);
  const [value, setValue] = useState(0);
  let checkLength = bannerList.length;
  useEffect(() => {
    fetchData(page);
    fetchDataBanner();
  }, [checkLength]);

  const fetchDataBanner = () => {
    BannerService.getListBannerPopUpByPage(pageId.pageId).then((res) => {
      setBannerList(res.data);
    });
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const fetchData = (page: number) => {
    fetch('/api/sections/' + page + '/' + pageSize)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTotalRow(data.totalSections);
      });

    PageService.getPageInfoById(pageId.pageId).then((response) => {
      setPageInfo(response.data);
    });
    SectionService.getSectionByPageId(pageId.pageId).then((response) => {
      setData(response.data.sections);
    });
  };
  const openInNewTab = (url: any) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  const handleGoToAddBaner = () => {
    history.push({
      pathname: '/page/add-banner/' + pageId.pageId,
      state: { detail: pageId.pageId },
    });
  };
  const changeDateFormat = (date: Date | undefined) => {
    const temp = date?.toString().replace('T', ' ');
    const dotPosition = temp?.lastIndexOf('.');

    return temp?.slice(0, dotPosition);
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    var choice = window.confirm('Xác nhận Xóa section?');
    if (choice === true) {
      setData(data.filter((row: { id: GridRowId }) => row.id !== id));
      SectionService.deleteSectionMapping(Number(id), pageId.pageId);
    }
  };
  const handleDeleteBannerPopUp = (id: GridRowId) => () => {
    var choice = window.confirm('Xác nhận Xóa banner popup?');
    if (choice === true) {
      setData(data.filter((row: { id: GridRowId }) => row.id !== id));
      BannerService.deleteOnBannerMappingByBannerIdAndPageId(Number(id), pageId.pageId);
    }
  };

  const handleViewDetailSectionClick = (id: GridRowId) => () => {
    const sectionInfo = data.find((item: { id: GridRowId }) => item.id === id);
    history.push({
      pathname: '/section/detail/' + id,
      state: { detail: sectionInfo },
    });
  };
  const handleViewDetailBannerClick = (id: GridRowId) => () => {
    const bannerInfo = bannerList.find((item: { id: GridRowId }) => item.id === id);
    history.push({
      pathname: '/banner/detail/' + id,
      state: { detail: bannerInfo },
    });
  };

  const handleGoToUpdateSectionInPage = () => {
    history.push({
      pathname: '/page/update-section/' + pageId.pageId,
      state: { detail: pageId.pageId },
    });
  };

  const columns: GridColumns = [
    {
      field: 'code',
      headerName: 'Mã khu vực',
      width: 150,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'divId',
      headerName: 'Id thẻ div',
      width: 150,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Typography onClick={handleViewDetailSectionClick(params.id)} sx={LinkStyle}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'desc',
      headerName: 'Mô tả',
      width: 300,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'width',
      headerName: 'Chiều rộng',
      width: 150,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'height',
      headerName: 'Chiều dài',
      width: 150,
      headerClassName: 'super-app-theme--header',
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

  const BannerColumns: GridColumns = [
    {
      field: 'code',
      headerName: 'Code',
      width: 150,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Typography onClick={handleViewDetailBannerClick(params.id)} sx={LinkStyle}>
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
        <Typography onClick={handleViewDetailBannerClick(params.id)} sx={Url}>
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
          onClick={handleDeleteBannerPopUp(id)}
        />,
      ],
    },
  ];
  const handlePageChange = (newPage: number) => {
    if (newPage === 0 || mapPageToNextCursor.current[newPage - 1]) {
      setPage(newPage);
    }
    fetchData(newPage);
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
          Quay lại danh sách các trang
        </Button>
      </Toolbar>
      <Box sx={{ m: 3 }}>
        <Typography variant="h4"> Thông tin trang </Typography>
        <Box sx={{ mt: 2 }} style={BoxStyle}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h5" sx={{ color: '#747C87' }}>
              Thông tin chi tiết
            </Typography>
            <Button
              variant="contained"
              onClick={() =>
                history.push({
                  pathname: '/page/add-section/' + pageInfo.id,
                  state: { detail: pageInfo },
                })
              }
            >
              Thêm khu vực mới
            </Button>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
            <Typography>
              Tên page: &nbsp; <b>{pageInfo.pageName}</b>
            </Typography>
            <Typography>
              Url của page: &nbsp; <b>{pageInfo.pageUrl}</b>
            </Typography>
            <Typography>
              Thời gian tạo: &nbsp; <b>{changeDateFormat(pageInfo.createdDate)}</b>
            </Typography>
            <Typography>
              Thời gian chỉnh sửa gần nhất: &nbsp;{' '}
              <b>{changeDateFormat(pageInfo.lastModifiedDate)}</b>
            </Typography>
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
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Các khu vực" {...a11yProps(0)} />
            <Tab label="Các banner popup" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={1}>
          <Box
            sx={{
              display: 'inline-flex',
              flexWrap: 'nowrap',
              justifyContent: 'end',
              width: '100%',
            }}
          >
            <Button
              variant="contained"
              sx={{ minWidth: '150px' }}
              onClick={() => handleGoToAddBaner()}
            >
              Thêm
            </Button>
          </Box>
          <Box sx={{ mt: 2 }} style={BoxStyle}>
            <div className="list">
              <DataGrid
                rows={bannerList}
                columns={BannerColumns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
              />
            </div>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={0}>
          <Box
            sx={{
              display: 'inline-flex',
              flexWrap: 'nowrap',
              justifyContent: 'end',
              width: '100%',
            }}
          >
            <Button
              variant="contained"
              sx={{ minWidth: '150px' }}
              onClick={() => handleGoToUpdateSectionInPage()}
            >
              Chỉnh sửa
            </Button>
          </Box>

          <Box sx={{ mt: 2, width: '100%' }} style={BoxStyle}>
            <div className="list">
              <DataGrid
                rows={data}
                columns={columns}
                pagination
                paginationMode="server"
                pageSize={pageSize}
                rowsPerPageOptions={[pageSize]}
                onPageChange={handlePageChange}
                rowCount={totalRow}
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
        </TabPanel>
      </Box>
    </div>
  );
};

export default PageSection;
