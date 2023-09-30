import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';


interface TooltipItemProps {
    text: string;
}

interface TooltipItemData extends TooltipItemProps {
    isValid?: boolean;
  }

const TooltipItem: FC<TooltipItemData> = ({text, isValid}) => {
    const [styleClass, setStyleClass] = useState('input__help-message-item')
    useEffect(() => {
      console.log(isValid,'isValid')
        if (isValid) {
          setStyleClass('input__help-message-item_verify');
        } else {
          setStyleClass('input__help-message-item_error');
        }
      }, [isValid, setStyleClass]);

    return (<li className={styleClass}>{text}</li>);
}

export default TooltipItem;
