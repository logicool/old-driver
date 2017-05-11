import axios from 'axios';
import qs from 'qs';
import lodash from 'lodash';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import baseUrl from './config';

axios.defaults.baseURL = baseUrl;

const fetch = (options) => {
  let {
    method = 'get',
    data,
    url,
  } = options;

  const cloneData = lodash.cloneDeep(data)

  try {
    let domin = ''
    if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
      domin = url.match(/[a-zA-z]+:\/\/[^/]*/)[0]
      url = url.slice(domin.length);
    }
    const match = pathToRegexp.parse(url)
    url = pathToRegexp.compile(url)(data)
    for (let item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name];
      }
    }
    url = domin + url;
  } catch (e) {
    message.error(e.message);
  }

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: cloneData,
      });
    case 'delete':
      return axios.delete(url, {
        data: cloneData,
      });
    case 'post':
      return axios.post(url, cloneData);
    case 'put':
      return axios.put(url, cloneData);
    case 'patch':
      return axios.patch(url, cloneData);
    default:
      return axios(options);
  }
};

export default function request(options) {

  return fetch(options).then((response) => {
    const { message, status } = response;
    const data = response.data;
    return {
      success: true,
      message,
      status,
      ...data,
    };
  }).catch((error) => {
    const { response } = error;
    let msg;
    let status;
    let otherData = {};
    if (response) {
      const { data, message } = response;
      otherData = data;
      status = response.status;
      msg = message;
    } else {
      status = 600;
      msg = 'Network Error';
    }
    return { success: false, status, message: msg, ...otherData };
  });
}
