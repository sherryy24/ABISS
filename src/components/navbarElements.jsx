import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  background: #000;
  height: 80px;
  display: flex;
  padding: 0.2rem;
  sticky:true;
  z-index: -10;

  @media screen and (max-width: 768px) {
    height: 180px;
   
  }
`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  font-size: 1.5rem;
  align-items: center;
  text-decoration: none;
  padding: 0 0.5rem;
  height: 100%;
  cursor: pointer;

  &.active {
    color: #3dfffc;
  }
  
`;


export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;


  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;