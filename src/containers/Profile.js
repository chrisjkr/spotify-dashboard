import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Image from 'react-image'
import { fetchUserProfile } from '../actions'

const Section = styled.section`

`

const ProfileImage = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
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
        <h3>Hello, <ProfileImage src={profile.imageUrl}/> {profile.name}</h3>
      </Section>
    )
  }
}

const mapStateToProps = (state) => ({ profile: state.profile })

export default connect(
  mapStateToProps
)(Profile)