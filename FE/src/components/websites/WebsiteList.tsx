import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
  GridColumns,
  GridRowId,
} from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import '../../styles/App.css';
import { LinkStyle, Url } from '../../styles/style';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import WebsiteService from '../../services/WebsiteService';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const WebsiteList: React.FC = () => {
  const history = useHistory();

  const [websiteList, setWebsiteList] = useState([] as any[]);
  const [websiteListTemp, setWebsiteListTemp] = useState([] as any[]);
  const [open, setOpen] = useState(false);
  const [errOpen, setErrOpen] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setErrOpen(false);
  };

  const openInNewTab = (url: any) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getData = () => {
    WebsiteService.getAllWebsite().then((response) => {
      setWebsiteList(response.data);
      let websiteListInfo = response.data;
      websiteListInfo = websiteListInfo.map((item) => {
        return {
          ...item,
          createdDate: changeDateFormat(item.createdDate),
          lastModifiedDate: changeDateFormat(item.lastModifiedDate),
        };
      });
      setWebsiteListTemp(websiteListInfo);
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
      setWebsiteList(websiteList.filter((row) => row.id !== id));
      WebsiteService.deleteWebsite(Number(id)).then((response) => {
        if (typeof response === 'undefined') {
          setErrOpen(true);
        } else {
          setOpen(true);
        }
      });
    } else {
    }
  };

  const handleUpdateClick = (id: GridRowId) => () => {
    const websiteInfo = websiteList.find((item) => item.id === id);
    history.push({
      pathname: '/website/update/' + id,
      state: { detail: websiteInfo },
    });
  };

  const handlePageClick = (id: GridRowId) => () => {
    const websiteId = id;
    const websiteInfo = websiteList.find((item) => item.id === id);
    history.push({
      pathname: '/website/' + id + '/page',
      state: { id: websiteId },
    });
  };

  const columns: GridColumns = [
    {
      field: 'code',
      headerName: 'Mã website',
      width: 200,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Typography onClick={handlePageClick(params.id)} sx={LinkStyle}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'domain',
      headerName: 'Tên miền',
      width: 500,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Typography onClick={() => openInNewTab(params.value)} sx={Url}>
          {params.value}
        </Typography>
      ),
    },
    // {
    //   field: 'moreInfo',
    //   type: 'actions',
    //   width: 250,
    //   headerClassName: 'super-app-theme--header',
    //   headerName: 'Các Page của website',
    //   getActions: ({ id }) => [
    //     <Button onClick={handlePageClick(id)} variant="outlined">
    //       Thông tin
    //     </Button>,
    //   ],
    // },
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
      headerClassName: 'super-app-theme--header',
      headerName: 'Thao tác',
      getActions: ({ id }) => [
        // <GridActionsCellItem
        //   icon={<VisibilityIcon />}
        //   label="View"
        //   onClick={handlePageClick(id)}
        // />,
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
    <div className="list">
      <DataGrid
        rows={websiteListTemp}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        initialState={{
          sorting: {
            sortModel: [
              {
                field: 'createdDate',
                sort: 'desc',
              },
            ],
          },
        }}
      />
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

export default WebsiteList;
