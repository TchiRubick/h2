import { theme } from 'antd';

export const antdConfig = {
  token: {
    colorPrimary: '#fd795b',
    colorBorder: '#3C549366',
    colorBorderSecondary: '#16255666',
    colorBgContainer: '#3C549366',
    colorBgElevated: '#3C5493',
    colorBgLayout: '#162556',
    colorBgSpotlight: '#FDB485',
    colorBgMask: '#000',
    borderRadius: 6,
    fontSize: 13,
    colorPrimaryBorder: '#FD795B',
  },
  components: {
    Menu: {
      colorItemText: '#fff',
      controlItemBgActive: '#162556',
      colorPrimary: '#E59984',
    },
    Button: {
      colorPrimary: '#FE8B63',
    },
    Form: {
      controlOutline: '#FE8B63',
      colorPrimary: '#FE8B63',
    },
    Input: {
      controlOutline: '#ffffff66',
      colorErrorOutline: '#ffffff66',
      colorWarningOutline: '#ffffff66',
      controlOutlineWidth: 1,
    },
    InputNumber: {
      controlOutline: '#ffffff66',
      controlOutlineWidth: 1,
    },
    Select: {
      controlOutlineWidth: 1,
      controlOutline: '#ffffff66',
      colorWarningOutline: '#ffffff66',
      controlItemBgActive: '#FD795B',
    },
    Slider: {
      colorPrimaryBorder: '#FD795B',
    },
    Transfer: {
      controlItemBgActive: '#FD795B',
    },
    Table: {
      colorLink: '#FD795B',
      colorLinkActive: '#FD795B',
    },
    Checkbox: {
      colorPrimary: '#FD795B',
    },
  },
  algorithm: theme.darkAlgorithm,
};
