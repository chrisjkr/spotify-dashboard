import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { clearUserData } from '../actions'

const StyledLink = styled.span`
  text-decoration: none;
  color: #a5a5a5;
  font-size: 14px;
  cursor: pointer;
  
   &:hover {
    color: #e4e4e4;
  }
`

const Logout = ({ dispatch }) => {
  const handleLogout = () => {
    dispatch(clearUserData())
  }

  return <StyledLink onClick={handleLogout}>Logout</StyledLink>
}

export default connect()(Logout)