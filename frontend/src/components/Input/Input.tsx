import React, { Component, FC, useCallback, useEffect, useState, useMemo } from 'react';
import { FloatingLabel } from 'react-bootstrap'
import { PatchQuestion, EyeFill } from 'react-bootstrap-icons'
import TooltipItem from '../TooltipItem/TooltipItem';
import {selectOptions,PatternProps,ValidTooltipResult} from '../../app/types'
import {searchByLabel, searchByValue} from '../../utils/utils'
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { validatePatterns } from '../../features/handlers/toolTip';
interface InputProps {
  type: string;
  name: string;
  label: string;
  passwordShowOn?: boolean;
  availableValue?: string;
}

interface InputSelectProps extends InputProps {
  currentSelect?: number;
  optionsSelect: selectOptions[];
  onChangeSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface InputTooltipsProps extends InputProps {
  tooltipValidate: PatternProps[];
}

const Input: FC<InputTooltipsProps> = React.memo(
  ({
    type,
    name,
    label,
    tooltipValidate,
    passwordShowOn = false,
    availableValue=""
  }) => {
    const dispatch = useAppDispatch()
    const isValid = useAppSelector((state) => state.toolTipReducer.results)
    const [isHelpMessage, setIsHelpMessage] = useState(false);
    const [onFocus, setOnFocus] = useState(false)
    const [passwordShow, setPasswordShow] = useState(false)
  
    useMemo(() => {
      if (availableValue !== "") {
        dispatch(validatePatterns({value: availableValue, patterns: tooltipValidate, inputName: name}));
      }
    }, [availableValue]);

    const handleHelpMessageShow = useCallback(() => {
        setIsHelpMessage(true)
      }, []);
    
    const handleHelpMessageHide = useCallback(() => {
        setIsHelpMessage(false);
      }, []);
  
      const handleOnChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(validatePatterns({value: value, patterns: tooltipValidate, inputName: name}));
      }, [dispatch, name, tooltipValidate]);
  
    const handleTooltipShow = useCallback(() => {

      setOnFocus(true)
      setIsHelpMessage(true)
    },[])
    const handleTooltipHide = useCallback(() => {
      setOnFocus(false)
      setIsHelpMessage(false)
    },[])
    const handleShowPassword = useCallback(() => {
      setPasswordShow(true)
    },[])
    const handleHidePassword = useCallback(() => {
      setPasswordShow(false)
    },[])
    const getValidState = (index:number) => {
      const findNameInput = isValid.find((item) => item.inputName === name)?.valid[index];
      return  findNameInput
    }
    
    return (
      <FloatingLabel label={label} className='mb-3 input__label'>
        <input
          defaultValue={availableValue}
          type={passwordShow ? 'text' : type}
          name={name}
          placeholder={label}
          className='form-control'
          onChange={handleOnChange}
          onFocus={handleTooltipShow}
          onBlur={handleTooltipHide}
          autoComplete='off'
        />
          {
            passwordShowOn && 
            <div
              className='input__password-show-button'
              onMouseDown={handleShowPassword}
              onMouseUp={handleHidePassword}
            >
            <EyeFill />
          </div>
          }
          {
            tooltipValidate.length!==0 ? (
              <>
                <div
                  className='input__help-button'
                  onMouseEnter={onFocus ? ()=>{} : handleHelpMessageShow}
                  onMouseLeave={onFocus ? ()=>{} : handleHelpMessageHide}
                >
                  <PatchQuestion />
                </div>
                <ul className={isHelpMessage ?'input__help-message':'input__help-message-hide'}>
                  {
                    tooltipValidate.map((item, index) => (
                      <TooltipItem
                        key={index}
                        text={item.text}
                        isValid={getValidState(index)}
                      />
                    ))
                  }
                </ul>
              </>
  
            ) : null
          }
            
        <div className='input__error'></div>
      </FloatingLabel>
    );
  }
);

const InputSelect: FC<InputSelectProps> = ({ type, name, label, onChangeSelect, currentSelect=1, optionsSelect, availableValue }) => {
  const [select, setSelect] = useState(currentSelect);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(optionsSelect[currentSelect].label)

  useEffect(() => {
    setValue(optionsSelect[select].label)
    const event = {
      target: { name: name, value: optionsSelect[select].value },
    } as React.ChangeEvent<HTMLInputElement>;
    onChangeSelect(event);
  },[name, onChangeSelect, optionsSelect, select])

  useEffect(() => {
    setOpen(false)
  },[onChangeSelect, optionsSelect, select])

  const handleOpenSelect = () => {
    setOpen(!open)
  }
  return (
    <FloatingLabel label={label} className='mb-3 input__label'>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={label}
        className='form-control'
        onChange={onChangeSelect}
        onClick={handleOpenSelect}
        readOnly
      />
      <ul className={open? 'form-select__container-list form-select__container-list-show' : 'form-select__container-list'}>
        {optionsSelect.map((item, index) => (
          <li key={index} className='select-span-item' onClick={() => setSelect(index)}>
            {item.label}
          </li>
        ))}
      </ul>
    </FloatingLabel>
  );
}

export { Input, InputSelect };
