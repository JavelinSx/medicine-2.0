import React, { FC, useCallback, useEffect, useState } from 'react';


interface TooltipItemProps {
    value: string;
    pattern: RegExp;
    text: string;
}

interface TooltipItemData extends TooltipItemProps {
    isValid: boolean;
    checkPattern: (value: string, pattern: RegExp) => Promise<boolean>;
  }

const TooltipItem: FC<TooltipItemData> = ({value, pattern, text, isValid, checkPattern}) => {
    const [isVerify, setIsVerify] = useState(false)
    const [styleClass, setStyleClass] = useState('input__help-message-item')


    const genereteStyleClass = useCallback(() => {
        if (isValid) {
            setStyleClass('input__help-message-item_verify');
        } else {
            setStyleClass('input__help-message-item_error');
        }
    }, [isValid]);

    useEffect(() => {
        const checkValuePattern = async () => {
            if (value.length > 0) {
                const isPatternValid = await checkPattern(value, pattern);
                if (isPatternValid) {
                    genereteStyleClass();
                } else {
                    genereteStyleClass();
                }
            } else {
                setStyleClass('input__help-message-item');
            }
        };
    
        checkValuePattern();
    }, [checkPattern, genereteStyleClass, pattern, value]);

    return (<li className={styleClass}>{text}</li>);
}

export default TooltipItem;
