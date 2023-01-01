import React from 'react';
export interface SectionMapping {
  id: number;
  divId: string;
  sectionCode: string;
  modeHide: number;
  numberHide: number;
  checked: boolean;
}
const SectionStatus = ({ item, sectionArray, setSectionArray }: any) => {
  const [code, setCode] = React.useState<string>(item.code);
  const [modeHide, setModeHide] = React.useState<number>(item.modeHide);
  const [numberHide, setNumberHide] = React.useState<number>(item.numberHide);
  const [disable, setDisable] = React.useState<boolean>(false);
  const [disableHideInput, setDisableHideInput] = React.useState<boolean>(true);

  console.log(' check aray : ', sectionArray);
  console.log(' check item : ', item.code);
  const handleChangeModeHide = (e: any) => {
    setModeHide(e.target.value);
    if (e.target.value === '0') {
      setDisableHideInput(true);
    } else {
      setDisableHideInput(false);
    }
  };
  const handleChangeNumberHide = (e: any) => {
    setNumberHide(e.target.value);
  };

  const handleAddArr = (e: any, item: SectionMapping) => {
    if (e.target.checked === true) {
      setDisable(true);
      setDisableHideInput(true);
    } else {
      setDisable(false);
      if (modeHide === 1) {
        setDisableHideInput(false);
      } else {
        setDisableHideInput(true);
      }
    }
    let itemArr: SectionMapping = {
      id: item.id,
      divId: item.divId,
      sectionCode: code,
      modeHide: modeHide,
      numberHide: numberHide,
      checked: e.target.checked,
    };
    console.log(' o day :', itemArr);
    const avaiSection = sectionArray.find(
      (section: SectionMapping) => section.id === item.id
    );
    if (typeof avaiSection === 'undefined') {
      setSectionArray([...sectionArray, itemArr]);
    } else {
      updateSetionArray(itemArr);
    }
  };
  const updateSetionArray = (itemArr: SectionMapping) => {
    const tempArr = sectionArray.map((section: SectionMapping) =>
      section.id === itemArr.id ? { ...section, checked: itemArr.checked } : section
    );
    setSectionArray(tempArr);
  };

  return (
    <tr className="item" key={item.id}>
      <th
        className="text-center"
        style={{
          lineHeight: '100px',
        }}
      >
        {item.code}
      </th>
      <td
        className="text-center"
        style={{
          lineHeight: '100px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {item.divId}
      </td>
      <td
        className="text-center"
        style={{
          lineHeight: '100px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {item.desc}
      </td>
      <td className="text-center" style={{ lineHeight: '100px' }}>
        {item.width + 'x' + item.height}
      </td>
      <td className="text-center ">
        <select
          value={modeHide || 0}
          className="form-select text-center"
          disabled={disable}
          style={{ margin: '5px auto', width: '90%' }}
          onChange={handleChangeModeHide}
        >
          <option value="0">Không</option>
          <option value="1">Có</option>
        </select>
      </td>
      <td className="text-center">
        <input
          disabled={disableHideInput}
          type="number"
          className="form-control"
          style={{ width: '70%', margin: '5px auto' }}
          value={numberHide || 0}
          onChange={handleChangeNumberHide}
        />
      </td>
      <td className="text-center checkbox" style={{ lineHeight: '100px' }}>
        <input
          type="checkbox"
          style={{ transform: 'scale(1.5)' }}
          id={item.id}
          onClick={(e) => handleAddArr(e, item)}
        />
      </td>
    </tr>
  );
};

export default SectionStatus;
