import Axios from "axios";
import { TOKEN } from "./../const/const";

const postData = async (url, params = {}) => {
  let _data = null;
  await Axios.post(
    url,
    {
      ...params,
    },
    {
      headers: {
        accept: "application/json",
      },
    }
  )
    .then((e) => {
      _data = e.data;
    })
    .catch((err) => {});
  return _data;
};

const getData = async (url) => {
  let _data = null;
  await Axios.get(url, {
    headers: {
      accept: "application/json",
    },
  })
    .then((e) => {
      _data = e.data;
    })
    .catch((err) => {});
  return _data;
};

export { getData, postData };
