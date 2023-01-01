import { Box, Toolbar, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { BoxStyle, ToolbarStyle } from '../../styles/style';

type BannerInfo = {
  id: number;
  code: string;
  title: string;
  imgUrl: string;
  url: string;
  type: string;
  popUp: number;
  width: number;
  height: number;
  createdBy: string;
  lastModifiedBy: string;
  createdDate?: Date;
  lastModifiedDate?: Date;
};
interface CustomState {
  detail: BannerInfo;
}
const BannerDetail: React.FC = () => {
  let history = useHistory();
  const location = useLocation();
  const state = location.state as CustomState;

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
          Quay lại danh sách banner
        </Button>
        <Box sx={{ justifyContent: 'space-between', display: 'inline-flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => {
              history.push('/banner');
            }}
          >
            Thoát
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              history.push({
                pathname: '/banner/update/' + state.detail.id,
                state: { detail: state.detail },
              });
            }}
          >
            Sửa banner
          </Button>
        </Box>
      </Toolbar>
      <Box sx={{ m: 5 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Chi tiết thông tin banner
        </Typography>
        <Grid container sx={{ mx: 0 }}>
          <Grid item xs={12} md={6} sx={{ pr: 3, pb: 3 }}>
            <Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
              style={BoxStyle}
            >
              <TextField
                label="Mã banner"
                type="text"
                value={state.detail.code}
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Chủ đề banner"
                type="text"
                value={state.detail.title}
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Loại banner"
                type="text"
                value={state.detail.title}
                InputProps={{ readOnly: true }}
              />
              <TextField
                InputProps={{ readOnly: true }}
                label="Liên kết tới banner"
                type="text"
                value={state.detail.url}
              />
              <TextField
                label="Trạng thái popup"
                type="text"
                value={state.detail.popUp === 0 ? 'Không' : 'Có'}
                InputProps={{ readOnly: true }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ pr: 3 }}>
            <Card
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                maxHeight: '344px',
              }}
              style={BoxStyle}
            >
              <CardMedia
                component="img"
                id="imgUpload"
                image={state.detail.imgUrl}
                sx={{ objectFit: 'contain' }}
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
export default BannerDetail;
