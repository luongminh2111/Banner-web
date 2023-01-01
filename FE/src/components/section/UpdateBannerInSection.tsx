import * as React from 'react';
import { Toolbar } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import BannerService from '../../services/BannerService';
import BannerStatus from '../banners/BannerStatus';
type SectionInfo = {
  id: number;
  code: string;
  desc: string;
  mode: number;
  divId: string;
  width: number;
  height: number;
};
interface CustomState {
  detail: SectionInfo;
}
interface Banner {
  id: number;
  code: string;
  title: string;
  imgUrl: string;
  bannerMappingId: number;
  percentage: number;
}
interface BannerMapping {
  id: number;
  percentage: number;
  checked: boolean;
}
const UpdateBannerOnSection = () => {
  const location = useLocation();
  const state = location.state as CustomState;
  const [bannerEnabled, setBannerEnabled] = useState<Banner[]>([]);
  const [bannerArray, setBannerArray] = useState<BannerMapping[]>([]);
  const displayUtil = state.detail.mode;
  const id = state.detail.id;
  let history = useHistory();
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    BannerService.getListBannerHasPercentageBySectionId(id).then((response) => {
      setBannerEnabled(response.data);
    });
  };
  const saveToBannerMapping = () => {
    if (displayUtil === 0) {
      bannerArray.map((item) => {
        if (item.checked === true) {
          BannerService.deleteOnBannerMapping(item.id, id);
        }
        history.push('/section');
      });
    } else {
      bannerArray.map((item) => {
        if (item.checked === true) {
          BannerService.deleteOnBannerMapping(item.id, id);
        } else {
          bannerEnabled.map((temp) => {
            if (temp.id === item.id && temp.percentage !== item.percentage) {
              let newItem = {
                id: temp.bannerMappingId,
                bannerId: item.id,
                sectionId: id,
                pageId: 0,
                percentage: item.percentage,
                position: '0',
                positionValue: '0',
                lastModifiedBy: 'Luong Minh',
              };
              BannerService.updateBannerMapping(newItem);
            }
          });
        }
      });
      history.push('/section');
    }
  };

  return (
    <div>
      <Toolbar
        variant="dense"
        sx={{
          justifyContent: 'space-between',
          backgroundColor: 'white',
          borderBottom: '1px solid white',
        }}
      >
        <h5>Chỉnh sửa banner trong khu vực</h5>
        <div>
          <Button
            sx={{ mt: 1, mr: 2, width: '150px' }}
            variant="outlined"
            color="error"
            onClick={() => history.goBack()}
          >
            Quay lại
          </Button>
          <Button
            sx={{ mt: 1, mr: 2, width: '150px' }}
            variant="contained"
            onClick={() => saveToBannerMapping()}
          >
            Lưu thông tin
          </Button>
        </div>
      </Toolbar>

      {bannerEnabled.length === 0 ? (
        <div className="mt-5">
          <h6 className="text-center">Không còn banner nào phù hợp</h6>
        </div>
      ) : (
        <div className="container mt-5">
          <table className="table">
            {displayUtil === 0 ? (
              <thead>
                <tr className=" col-12 bg-info">
                  <th className="col-2  text-center">Mã </th>
                  <th className="col-3  text-center">Chủ đề</th>
                  <th className="col-5  text-center">Ảnh banner</th>
                  <th></th>
                  <th className="col-2  text-center">Xóa</th>
                </tr>
              </thead>
            ) : (
              <thead>
                <tr className=" col-12 bg-info">
                  <th className="col-2  text-center">Mã </th>
                  <th className="col-2  text-center">Chủ đề</th>
                  <th className="col-4  text-center">Ảnh banner</th>
                  <th className="col-2  text-center">Tỉ trọng(%)</th>
                  <th className="col-2  text-center">Xóa</th>
                  <th></th>
                </tr>
              </thead>
            )}
            <tbody>
              {bannerEnabled.map((temp, index) => (
                <BannerStatus
                  key={index}
                  item={temp}
                  displayUtil={displayUtil}
                  bannerArray={bannerArray}
                  setBannerArray={setBannerArray}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default UpdateBannerOnSection;
