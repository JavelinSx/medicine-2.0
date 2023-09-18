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

export interface ValidationRules {
  patternDate: RegExp;
  patternPassword: RegExp;
  patternMinSymbol2: RegExp;
  patternMinSymbol4: RegExp;
  patternMinSymbol8: RegExp;
  patternMaxSymbol16: RegExp;
  patternMaxSymbol36: RegExp;
  patternRUText: RegExp;
  patternENGText: RegExp;
  patternRegistr: RegExp;
};

export const validateRules = {
  patternDate : /^\d{2}\.\d{2}\.\d{4}$/,
  patternPassword : /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*()_+{}[\]:;<>,.?~\/\\\-]+$/,
  patternMinSymbol2 : /^.{3,}$/,
  patternMinSymbol4 : /^.{4,}$/,
  patternMinSymbol8 : /^.{8,}$/,
  patternMaxSymbol16 : /^.{0,16}$/,
  patternMaxSymbol36 : /^.{0,36}$/,
  patternRUText : /^[а-яА-ЯёЁ\s]+$/,
  patternENGText : /^[a-zA-Z0-9]+$/,
  patternRegistr: /^.*[A-Z].*/,
  patternDifferentSymbol: /^(?=.*[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~])/,
}

export const tooltipValidate = {
  min2Symbol: {
    text: 'Минимально количество символов - 2',
    pattern: validateRules.patternMinSymbol2,
  },
  min4Symbol: {
    text: 'Минимально количество символов - 4',
    pattern: validateRules.patternMinSymbol4,
  },
  min8Symbol: {
    text: 'Минимально количество символов - 8',
    pattern: validateRules.patternMinSymbol8,
  },
  max16Symbol: {
    text: 'Максимальное количество симковолов - 16',
    pattern: validateRules.patternMaxSymbol16,
  },
  max36Symbol: {
    text: 'Максимальное количество симковолов - 36',
    pattern: validateRules.patternMaxSymbol36,
  },
  ruSymbol: {
    text: 'Символы должны быть кирилицей',
    pattern: validateRules.patternRUText,
  },
  engSymbol: {
    text: 'Символы должны быть латиницей',
    pattern: validateRules.patternENGText,
  },
  registrSymbol: {
    text: 'Регистр букв не учитывается',
    pattern: validateRules.patternRegistr
  },
  differentSymbol: {
    text: 'Используйте заглавные буквы и символы, для больше безопасности',
    pattern: validateRules.patternDifferentSymbol,
  },
}


