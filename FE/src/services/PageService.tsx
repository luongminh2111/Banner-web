import axios from 'axios';
import React from 'react';

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

class PageService {
  getPageInfoById = (pageId: number) => {
    return axios.get(`/api/pages/${pageId}`);
  };

  getAllPage = () => {
    return axios.get(`/api/pages/all`);
  };

  getAllPagePagination = (pageNumber: number) => {
    return axios.get(`/api/pages//pagination/${pageNumber}` + pageNumber);
  };

  getPageByWebsiteId = (websiteId: number) => {
    return axios.get(`/api/pages/websiteId/${websiteId}`);
  };

  countPageByWebsiteId = (websiteId: number) => {
    return axios.get(`/api/pages/count/${websiteId}` + websiteId);
  };

  savePage = (
    pageInfo: PageInfo,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    return axios.post(`/api/pages/add`, pageInfo).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    });
  };

  updatePage = (pageInfo: PageInfo) => {
    return axios.put(`/api/pages/update`, pageInfo).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    });
  };

  deletePage = (pageId: number) => {
    return axios.delete(`/api/pages/delete/${pageId}`).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    });
  };
}

export default new PageService();
