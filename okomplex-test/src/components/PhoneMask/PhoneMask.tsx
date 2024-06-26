import { ChangeEvent } from 'react';
import InputMask from 'react-input-mask';

type TPhoneMaskProps = {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    className: string;
};

export const PhoneMask = ({ value, onChange, className }: TPhoneMaskProps) => {
    return (
        <InputMask
            mask="+7(999)999-99-99"
            placeholder="Enter phone number"
            value={value}
            onChange={onChange}
            className={className}
        />
    );
};
