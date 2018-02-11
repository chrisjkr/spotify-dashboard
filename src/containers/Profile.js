import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Image from 'react-image'
import Logout from './Logout'
import { fetchUserProfile } from '../actions/profile'

const Section = styled.section`

`

const ProfileImage = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`

const Name = styled.span`
  color: #16e176;
  font-weight: 700;
`

class Profile extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    if (dispatch) {
      dispatch(fetchUserProfile())
    }
  }

  render() {
    const { profile } = this.props

    return (
      <Section>
        <h3>
          Hello, <ProfileImage src={profile.imageUrl}/> <Name>{profile.name}</Name> | <Logout>Logout</Logout>
        </h3>
      </Section>
    )
  }
}

const mapStateToProps = (state) => ({ profile: state.profile })

export default connect(
  mapStateToProps
)(Profile)