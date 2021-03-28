import querystring from 'querystring';

function get(path, {params = {}}) {
  const fetchURL = `${path}${path.indexOf('?') > -1 ? `&${querystring.stringify(params)}` : `?${querystring.stringify(params)}`}`;
  return fetch(fetchURL).then((res) => res.json()).catch((err) => err);
}

function post(path, { params = {}, data}) {
  const fetchConfig = {};
  if (data) {
    fetchConfig.body = JSON.stringify(data);
    fetchConfig.method = 'post';
    
    const fetchHeaders = {};
    fetchHeaders.Authorization = 'Bearer fe522e464a9868092f3c17ffcbe394d60c46ab34';
    fetchHeaders['Content-Type'] = 'application/json';

    // myHeaders.append('Access-Control-Allow-Origin', '*');
    fetchConfig.headers = new Headers(fetchHeaders);
    fetchConfig.redirect =  'follow';
  }
  const fetchURL = path;
  return fetch(fetchURL, fetchConfig).then((res) => res.json()).catch((err) => err);
}

const api = { get, post };

export default api;