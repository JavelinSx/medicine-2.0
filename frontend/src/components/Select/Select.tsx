import React, { FC, useEffect, useState } from 'react';
import { OptionSelectElem } from '../../utils/constant';

interface SelectProps {
  labelTitle: string;
  defaultSelect: number;
  optionsSelect: OptionSelectElem[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Select: FC<SelectProps> = ({ labelTitle, optionsSelect, defaultSelect, onChange }) => {
  const [select, setSelect] = useState(defaultSelect);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const event = {
      target: { name: 'gender', value: optionsSelect[select].gender },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
  }, [select]);

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
      <span className='select-label'>{labelTitle}</span>
      <span className='select-value'>{optionsSelect[select].label}</span>
      {open ? renderOptionsElem() : null}
    </div>
  );
};

export default Select;
