import React, { useEffect, useState, useRef } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useHistory } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  GridColumns,
  GridActionsCellItem,
  GridRowId,
  GridRenderCellParams,
} from '@mui/x-data-grid-pro';
import '../../styles/banner/bannerList.css';
import SectionService from '../../services/SectionService';
import '../../styles/App.css';
import { LinkStyle } from '../../styles/style';
import { Typography } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SectionList: React.FC = () => {
  const mapPageToNextCursor = useRef<{ [page: number]: GridRowId }>({});
  const [pageSize, setPageSize] = useState(5);
  const [totalRow, setTotalRow] = useState(0);
  const [page, setPage] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [errOpen, setErrOpen] = React.useState(false);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setErrOpen(false);
  };

  const history = useHistory();
  const [data, setData] = useState([] as any);

  const handleDeleteClick = (id: GridRowId) => () => {
    var choice = window.confirm('Xác nhận Xóa section?');
    if (choice === true) {
      setData(data.filter((row: { id: GridRowId }) => row.id !== id));
      SectionService.delete(Number(id));
      /// Thêm hàm setOpen(true) - thông báo thành công, setErrOpen(true) - thông báo lỗi
      /// ở đây - kiểm tra điều kiện
      setOpen(true);
    }
  };

  const handleViewDetailClick = (id: GridRowId) => () => {
    const sectionInfo = data.find((item: { id: GridRowId }) => item.id === id);
    history.push({
      pathname: '/section/detail/' + id,
      state: { detail: sectionInfo },
    });
  };

  const handleUpdateClick = (id: GridRowId) => () => {
    const sectionInfo = data.find((item: { id: GridRowId }) => item.id === id);
    history.push({
      pathname: '/section/update/' + id,
      state: { detail: sectionInfo },
    });
  };

  const columns: GridColumns = [
    {
      field: 'divId',
      headerName: 'Id thẻ div',
      width: 150,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Typography onClick={handleViewDetailClick(params.id)} sx={LinkStyle}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'code',
      headerName: 'Mã khu vực',
      width: 150,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Typography onClick={handleViewDetailClick(params.id)} sx={LinkStyle}>
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
      field: 'mode',
      headerName: 'Trạng thái hiển thị',
      width: 200,
      headerClassName: 'super-app-theme--header',
      renderCell: (params: any) =>
        params.row.mode === 0 ? (
          <Typography>Ngẫu nhiên</Typography>
        ) : (
          <Typography>Tỉ trọng</Typography>
        ),
    },
    {
      field: 'width',
      headerName: 'Chiều rộng',
      width: 125,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'height',
      headerName: 'Chiều dài',
      width: 125,
      headerClassName: 'super-app-theme--header',
    },
    // {
    //   field: 'actions',
    //   type: 'actions',
    //   headerClassName: 'super-app-theme--header',
    //   headerName: 'Xem',
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
      width: 150,
      headerClassName: 'super-app-theme--header',
      headerName: 'Tùy chỉnh',
      getActions: ({ id }) => [
        // <GridActionsCellItem
        //   icon={<VisibilityIcon />}
        //   color="primary"
        //   label="View"
        //   onClick={handleViewDetailClick(id)}
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

  useEffect(() => {
    fetchData(page);
  }, []);
  const fetchData = (page: number) => {
    fetch('/api/sections/' + page + '/' + pageSize)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTotalRow(data.totalSections);
        setData(data.sections);
      });
  };
  const handlePageChange = (newPage: number) => {
    if (newPage === 0 || mapPageToNextCursor.current[newPage - 1]) {
      setPage(newPage);
    }
    fetchData(newPage);
  };

  return (
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
        components={{ Toolbar: GridToolbar }}
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

export default SectionList;
