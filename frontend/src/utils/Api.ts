import { urlDev } from './constant';
import { RegisterProps, AuthData, AuthDataStaff } from '../app/types';

export class Api {
  private _baseUrl: string;
  private _headers: object;

  constructor(baseUrl: string, headers: object) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  async _request({ url, options }: { url: string; options: object }) {
    const response = await fetch(this._baseUrl + url, options);
    return await response.json();
  }

  loginPatient(data: AuthData) {
    return this._request({
      url: '/patient/signin',
      options: {
        method: 'POST',
        credential: 'include',
        headers: this._headers,
        body: JSON.stringify(data),
      },
    });
  }

  registerPatient(data: RegisterProps) {
    return this._request({
      url: '/patient/register',
      options: {
        method: 'POST',
        credential: 'include',
        headers: this._headers,
        body: JSON.stringify(data),
      },
    });
  }

  loginStaff(data: AuthDataStaff) {
    const url = '/staff/signin'
    return this._request({
      url: url,
      options: {
        method: 'POST',
        credential: 'include',
        headers: this._headers,
        body: JSON.stringify(data),
      },
    });
  }

  registerStaff(data: RegisterProps) {
    const url = '/staff/register'
    return this._request({
      url: url,
      options: {
        method: 'POST',
        credential: 'include',
        headers: this._headers,
        body: JSON.stringify(data),
      },
    });
  }
}

const MainApi = new Api(urlDev, {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Origin: urlDev,
});

export default MainApi;
