import React from 'react';
import { StyledButton } from './styles';
import { ButtonProps } from './types';

const ButtonUsers = ({ children }: ButtonProps) => {
  return (
    <StyledButton type="primary" shape="round" htmlType="submit">
      {children}
    </StyledButton>
  );
};

export default ButtonUsers;
