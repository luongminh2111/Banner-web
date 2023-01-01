import { TableCell, TableRow } from '@mui/material';
import React from 'react';

export interface BannerMapping {
  id: number;
  percentage: number;
  checked: boolean;
}
const BannerStatus = ({ item, displayUtil, bannerArray, setBannerArray }: any) => {
  const [percentage, setPercentage] = React.useState<number>(item.percentage);
  const [disable, setDisable] = React.useState<boolean>(false);
  const handleAddPercentage = (e: any, item: BannerMapping) => {
    setPercentage(e.target.value);
    let itemArrPercentage: BannerMapping = {
      id: item.id,
      percentage: e.target.value,
      checked: false,
    };
    const avaiBanner = bannerArray.find((banner: BannerMapping) => banner.id === item.id);
    if (typeof avaiBanner === 'undefined') {
      setBannerArray([...bannerArray, itemArrPercentage]);
    } else {
      updateBannerArrayPercentage(itemArrPercentage);
    }
  };

  // Update thông tin ở BannerArray
  const updateBannerArrayPercentage = (itemArr: BannerMapping) => {
    const tempArr = bannerArray.map((banner: BannerMapping) =>
      banner.id === itemArr.id ? { ...banner, percentage: itemArr.percentage } : banner
    );
    setBannerArray(tempArr);
  };
  const handleAddArr = (e: any, item: BannerMapping) => {
    let itemArr: BannerMapping = {
      id: item.id,
      percentage: item.percentage,
      checked: e.target.checked,
    };
    const avaiBanner = bannerArray.find((banner: BannerMapping) => banner.id === item.id);
    if (typeof avaiBanner === 'undefined') {
      setBannerArray([...bannerArray, itemArr]);
    } else {
      updateBannerArray(itemArr);
    }
  };
  const updateBannerArray = (itemArr: BannerMapping) => {
    const tempArr = bannerArray.map((banner: BannerMapping) =>
      banner.id === itemArr.id ? { ...banner, checked: itemArr.checked } : banner
    );
    setBannerArray(tempArr);
  };
  const handleHideInput = (e: any, item: BannerMapping) => {
    if (e.target.checked === true) {
      setDisable(true);
    } else {
      setDisable(false);
    }
    let itemArr: BannerMapping = {
      id: item.id,
      percentage: item.percentage,
      checked: e.target.checked,
    };
    const avaiBanner = bannerArray.find((banner: BannerMapping) => banner.id === item.id);
    if (typeof avaiBanner === 'undefined') {
      setBannerArray([...bannerArray, itemArr]);
    } else {
      updateBannerArray(itemArr);
    }
  };

  return (
    <TableRow className="item" key={item.id}>
      <TableCell className="text-center">{item.id}</TableCell>
      <TableCell className="text-center">{item.title}</TableCell>
      <TableCell className="text-center" sx={{ p: 1 }}>
        <img
          src={item.imgUrl}
          style={{ maxHeight: '100px', maxWidth: '200px' }}
          alt="ảnh banner"
        />
      </TableCell>
      {displayUtil === 0 ? (
        <>
          <TableCell></TableCell>
          <TableCell className="text-center checkbox">
            <input
              type="checkbox"
              style={{ transform: 'scale(1.5)' }}
              id={item.id}
              onClick={(e) => handleAddArr(e, item)}
            />
          </TableCell>
        </>
      ) : (
        <>
          <TableCell className="text-center ">
            <select
              className="form-select text-center"
              value={percentage}
              disabled={disable}
              style={{ marginTop: '10px' }}
              onChange={(e) => handleAddPercentage(e, item)}
            >
              <option value="0">0</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="60">60</option>
              <option value="70">70</option>
              <option value="80">80</option>
              <option value="90">90</option>
            </select>
          </TableCell>
          <TableCell className="text-center checkbox">
            <input
              type="checkbox"
              style={{ transform: 'scale(1.5)' }}
              id={item.id}
              onClick={(e) => handleHideInput(e, item)}
            />
          </TableCell>
        </>
      )}
    </TableRow>
  );
};

export default BannerStatus;
