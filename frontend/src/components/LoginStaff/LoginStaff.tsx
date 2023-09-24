import type { FC } from 'react';
import FormAuthStaff from '../FormAuthStaff/FormAuthStaff';

interface LoginStaffProps {}

const LoginStaff: FC<LoginStaffProps> = () => {
    return (
        <>
            <FormAuthStaff></FormAuthStaff>
        </>
    );
}

export default LoginStaff;
