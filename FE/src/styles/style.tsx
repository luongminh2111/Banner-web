import CSS from 'csstype';

export const BoxStyle: CSS.Properties = {
  backgroundColor: ' #fff',
  boxShadow: '0 0 0 1px rgb(63 63 68 / 5%), 0 1px 3px 0 rgb(63 63 68 / 15%)',
  borderRadius: '5px',
  padding: '24px',
};
export const BoxStyle1: CSS.Properties = {
  backgroundColor: ' #fff',
  boxShadow: '0 0 0 1px rgb(63 63 68 / 5%), 0 1px 3px 0 rgb(63 63 68 / 15%)',
  borderRadius: '5px',
  padding: '0px 24px',
};

export const ToolbarStyle = {
  color: '#0F1824',
  justifyContent: 'space-between',
  backgroundColor: '#fff',
  borderBottom: 0,
  boxShadow: '0px 2px 4px rgb(168 168 168 / 25%)',
};

export const LinkStyle = {
  '&:hover': {
    color: 'blue',
    cursor: 'pointer',
  },
  color: '#0088FF',
};

export const Url = {
  '&:hover': {
    color: 'blue',
    cursor: 'pointer',
  },
  color: 'inherit',
};
