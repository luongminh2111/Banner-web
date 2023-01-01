import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useHistory } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { GridColumns, GridActionsCellItem, GridRowId } from '@mui/x-data-grid-pro';
import BannerService from '../../services/BannerService';
import '../../styles/App.css';
import { Typography } from '@mui/material';
import { LinkStyle, Url } from '../../styles/style';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BannerList: React.FC = () => {
  const history = useHistory();
  const [data, setData] = useState([] as any);
  const [open, setOpen] = React.useState(false);
  const [errOpen, setErrOpen] = React.useState(false);

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

  const handleDeleteClick = (id: GridRowId) => () => {
    var choice = window.confirm('Xác nhận Xóa banner?');
    if (choice === true) {
      setData(data.filter((row: { id: GridRowId }) => row.id !== id));
      BannerService.delete(Number(id));
      /// Thêm hàm setOpen(true) - thông báo thành công, setErrOpen(true) - thông báo lỗi
      /// ở đây - kiểm tra điều kiện
      setOpen(true);
    }
  };

  const handleViewDetailClick = (id: GridRowId) => () => {
    const bannerInfo = data.find((item: { id: GridRowId }) => item.id === id);
    history.push({
      pathname: '/banner/detail/' + id,
      state: { detail: bannerInfo },
    });
  };
  
  const columns: GridColumns = [
    {
      field: 'code',
      headerName: 'Mã',
      width: 150,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Typography onClick={handleViewDetailClick(params.id)} sx={LinkStyle}>{params.value}</Typography>
      ),
    },
    {
      field: 'title',
      headerName: 'Tên Banner',
      width: 250,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Typography onClick={handleViewDetailClick(params.id)} sx={Url}>{params.value}</Typography>
      ),
    },
    {
      field: 'url',
      headerName: 'URL',
      width: 340,
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
      headerName: 'Image',
      width: 350,
      editable: true,
      renderCell: (params) => <img src={params.value} alt="" />,
      cellClassName: 'img-field-css',
    },
    // {
    //   field: 'actions',
    //   type: 'actions',
    //   headerName: 'Xem',
    //   headerClassName: 'super-app-theme--header',
    //   getActions: ({ id }) => [
    //     <GridActionsCellItem
    //       icon={<VisibilityIcon />}
    //       color="primary"
    //       label="View"
    //       onClick={handleViewDetailClick(id)}
    //     />,
    //   ],
    // },
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

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
   BannerService.getAllBanner()
      .then((response) => {
   
        setData(response.data);
      });
  };
  return (
    <div className="list">
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={20}
        // checkboxSelection
        disableSelectionOnClick
        initialState={{
          sorting: {
            sortModel: [
              {
                field: 'code',
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

export default BannerList;
