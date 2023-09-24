import React, { Component, FC, useCallback, useEffect, useState } from 'react';
import { FloatingLabel } from 'react-bootstrap'
import { PatchQuestion, EyeFill } from 'react-bootstrap-icons'
import TooltipItem from '../TooltipItem/TooltipItem';
import {selectOptions} from '../../app/types'

interface InputProps {
  type: string;
  name: string;
  label: string;
  passwordShowOn?: boolean;
}

interface InputSelectProps extends InputProps {
  currentSelect?: number;
  optionsSelect: selectOptions[];
  onChangeSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface InputTooltipsProps extends InputProps {
  tooltipValidate: {
    text: string;
    pattern: RegExp;
  }[];
  results: (results:boolean[]) => void;
}

interface TooltipItemData {
  text: string;
  pattern: RegExp;
}

const Input: FC<InputTooltipsProps> = React.memo(
  ({
    type,
    name,
    label,
    tooltipValidate,
    results,
    passwordShowOn = false,
  }) => {
    const [value, setValue] = useState('')
    const [isHelpMessage, setIsHelpMessage] = useState(false);
    const [validationResults, setValidationResults] = useState<boolean[]>(new Array(tooltipValidate.length).fill(false));
    const [onFocus, setOnFocus] = useState(false)
    const [passwordShow, setPasswordShow] = useState(false)
    const [isReadOnly, setIsReadOnly] = useState(true);
  
  
    const handleResults = useCallback(() => {
      results(validationResults);
    }, [results, validationResults]);

    useEffect(() => {
      handleResults();
    }, [handleResults]);
  
    const checkPattern = (value: string, pattern: RegExp): Promise<boolean> => {
      return new Promise((resolve) => {
        const isMatch = pattern.test(value);
        resolve(isMatch);
      });
    };
  
    const validateAllTooltipItems = useCallback(async (value: string, tooltipData: TooltipItemData[]): Promise<void> => {
      const promises = tooltipData.map((item) => checkPattern(value, item.pattern));
      const results = await Promise.all(promises);
      setValidationResults(results)
    },[]);
  
    const handleHelpMessageShow = useCallback(() => {
        setIsHelpMessage(true)
      }, []);
    
    const handleHelpMessageHide = useCallback(() => {
        setIsHelpMessage(false);
      }, []);
  
    const handleOnChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
  
      setValue(e.target.value)
      await validateAllTooltipItems(newValue, tooltipValidate);
    },[tooltipValidate, validateAllTooltipItems])
  
    const handleTooltipShow = useCallback(() => {
      setIsReadOnly(false)
      setOnFocus(true)
      setIsHelpMessage(true)
    },[])
    const handleTooltipHide = useCallback(() => {
      setIsReadOnly(true)
      setOnFocus(false)
      setIsHelpMessage(false)
    },[])
    const handleShowPassword = useCallback(() => {
      setPasswordShow(true)
    },[])
    const handleHidePassword = useCallback(() => {
      setPasswordShow(false)
    },[])
  
    
    return (
      <FloatingLabel label={label} className='mb-3 input__label'>
        <input
          type={passwordShow ? 'text' : type}
          name={name}
          placeholder={label}
          className='form-control'
          onChange={handleOnChange}
          onFocus={handleTooltipShow}
          onBlur={handleTooltipHide}
          readOnly={isReadOnly}
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
                        value={value}
                        pattern={item.pattern}
                        text={item.text}
                        isValid={validationResults[index]}
                        checkPattern={checkPattern}
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

const InputSelect: FC<InputSelectProps> = ({ type, name, label, onChangeSelect, currentSelect=0, optionsSelect }) => {
  const [select, setSelect] = useState(currentSelect);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(optionsSelect[currentSelect].label)

  useEffect(() => {
    const event = {
      target: { name: name, value: optionsSelect[select].value },
    } as React.ChangeEvent<HTMLInputElement>;
    onChangeSelect(event);
  },[name, onChangeSelect, optionsSelect, select])

  useEffect(() => {
    setValue(optionsSelect[select].label)
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
