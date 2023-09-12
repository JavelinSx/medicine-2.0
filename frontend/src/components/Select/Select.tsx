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
    console.log(select)
    const event = {
      target: { name: 'gender', value: select.toString() },
    } as React.ChangeEvent<HTMLInputElement>;
    onChangeSelect(event);
  },[onChangeSelect, select])


  const renderOptionsElem = () => {
    return (
      <div className='form-select__container-list'>
        {optionsSelect.map((item, index) => (
          <span key={index} className='select-span-item' onClick={() => setSelect(index)}>
            {item.label}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className='mb-3 form-select' onClick={() => setOpen(!open)}>
      <label className='select-label'>{labelTitle}</label>
      <InputSelect classInputSelect='select-value' type='text' label='' name={name} value={optionsSelect[select].label} onChange={onChangeSelect}/>
      {/* <input className='select-value' value={optionsSelect[select].label} /> */}
      {open ? renderOptionsElem() : null}
    </div>
  );
};

export default Select;
