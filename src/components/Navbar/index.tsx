import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from '../../styled-components';
import Container from '../Container';
import Logo from '../Logo';

const Navbar = () => {
  return (
    <Wrapper>
      <StyledContainer>
        <Link to="/">
          <Logo width={85}/>
        </Link>
        <Menu>
          <li>
            <StyledLink
              to="/"
              exact={true}
              activeClassName="active"
            >질문</StyledLink>
          </li>
          <li>
            <StyledLink
              to="/answers"
              activeClassName="active"
            >답하기</StyledLink>
          </li>
          <Separator>|</Separator>
          <li>
            <StyledLink
              to="/auth"
            >로그인/회원가입</StyledLink>
          </li>
        </Menu>
      </StyledContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 15rem;
`;

const StyledContainer = styled(Container)`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Menu = styled.ul`
  display: inline-block;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    float: left;
    text-decoration: none;
    margin-right: 2rem;
  }

  li:last-child {
    margin-right: 0rem;
  }
`;

const Separator = styled.li`
  font-size: 1.4rem;
  color: #999;
  font-weight: 700;
  cursor: default;
`;

const StyledLink = styled(NavLink)`
  font-weight: 700;
  font-size: 1.4rem;
  color: #999;

  &:hover {
    color: #999;
  }

  &.active {
    color: #333;
  }

  &.active:hover {
    color: #333;
  }

`;

// const MenuAnchor = styled<{ active?: boolean }>(Link)`
//   font-weight: 700;
//   font-size: 1.5rem;
//   color: ${props => props.active ? '#333' : '#999'};

//   &:hover {
//     color: ${props => props.active ? '#333' : '#999'};
//   }
// `;

export default Navbar;