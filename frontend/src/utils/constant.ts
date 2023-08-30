export const urlDev = 'http://localhost:3001';

export interface OptionSelectElem {
  gender: string;
  label: string;
}
export const optionsGender: OptionSelectElem[] = [
  {
    gender: 'male',
    label: 'Муж.',
  },
  {
    gender: 'famale',
    label: 'Жен.',
  },
];

export const patternDate = /^\d{2}\.\d{2}\.\d{4}$/;
export const patternCustomText = /^[а-яА-ЯёЁ\s]+$/;
export const patternLogin = /^[a-zA-Z0-9]+$/;
export const patternPassword = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*()_+{}[\]:;<>,.?~\/\\\-]+$/;
