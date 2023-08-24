export interface RegisterPatient {
  surName: string;
  name: string;
  middleName: string;
  gender: string;
  dateBirthday: string;
  role: string;
  login: string;
  password: string;
}
export interface Personal {
  surName: string;
  name: string;
  middleName: string;
  role: string;
}
export interface AuthData {
  login: string;
  password: string;
}
