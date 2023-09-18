import React, { FC, useEffect, useState } from 'react';
import { OptionSelectElem } from '../../utils/constant';
import {InputSelect} from '../Input/Input';

interface SelectProps {
  name: string;
  labelTitle: string;
  currentSelect?: number;
  optionsSelect: OptionSelectElem[];
  onChangeSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Select: FC<SelectProps> = ({name, labelTitle, optionsSelect, currentSelect=1, onChangeSelect }) => {
  const [select, setSelect] = useState(currentSelect);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const event = {
      target: { name: 'gender', value: select.toString() },
    } as React.ChangeEvent<HTMLInputElement>;
    onChangeSelect(event);
  },[onChangeSelect, select])

  const handleOpenSelect = () => {
    setOpen(!open)
  }

  return (
    <div className='mb-3 form-select' onClick={handleOpenSelect}>
      <label className='select-label'>{labelTitle}</label>
      <InputSelect classInputSelect='select-value' type='text' label='' name={name} value={optionsSelect[select].label} onChange={onChangeSelect}/>
      {/* <input className='select-value' value={optionsSelect[select].label} /> */}
      <ul className={open? 'form-select__container-list form-select__container-list-show' : 'form-select__container-list'}>
        {optionsSelect.map((item, index) => (
          <li key={index} className='select-span-item' onClick={() => setSelect(index)}>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
