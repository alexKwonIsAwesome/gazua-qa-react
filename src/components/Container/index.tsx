import * as React from 'react';
import styled from '../../styled-components';

const Container: React.SFC = ({ children, ...props }) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

const Wrapper = styled.div`
  max-width: 1004px;
  margin: 0 auto;
`;

export default Container;