import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from '../../styled-components';
import Container from '../../components/Container';
import Logo from '../../components/Logo';

class Auth extends React.Component {
  public render() {
    return (
      <Wrapper>
        <StyledContainer>
          <StyledLink to="/">
            <Logo width={150} />
          </StyledLink>
          <Facebook>Facebook으로 로그인/회원가입</Facebook>
          <Github>Github으로 로그인/회원가입</Github>
        </StyledContainer>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div``;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  margin-bottom: 10rem;
`;

const SocialButton = styled.button`
  border: 0px;
  border-radius: 5px;
  height: 4rem;
  width: 50%;
  margin: 0 auto;
  color: #fff;
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const Facebook = styled(SocialButton)`
  background-color: #4C66A4;
`;
const Github = styled(SocialButton)`
  background-color: #3C4146;
`;

export default Auth;