
export interface selectOptions {
  value: string;
  label: string;
}

export interface RegisterProps {
  surName: string;
  name: string;
  middleName: string;
  role: string;
  login: string;
  password: string;
}
export interface RegisterPatient extends RegisterProps {
  gender: string ;
  dateBirthday: string;
  files: string[];
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
export interface AuthDataStaff extends AuthData{
  role: string;
}
export interface FileDoc {
  id: string;
  name: string;
  type: string;
  data: string;
}

export interface PatternProps{
  text: string;
  pattern: RegExp;
}
export interface ValidTooltipResult{
  inputName: string;
  valid: boolean[];
}