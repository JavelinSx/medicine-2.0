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


export const inputBioHelp = [
  'Минимально количество символов - 2',
  'Максимальное количество симковолов - 36',
  'Символы должны быть кирилицей'
]
export const inputLoginHelp = [
  'Минимально количество символов - 4',
  'Максимальное количество симковолов - 16',
  'Символы должны быть латиницей',
  'Регистр букв не учитывается'
]
export const inputPasswordHelp = [
  'Минимально количество символов - 8',
  'Максимальное количество симковолов - 16',
  'Символы должны быть латиницей',
  'Регистр букв учитывается, будте внимательны'
]

