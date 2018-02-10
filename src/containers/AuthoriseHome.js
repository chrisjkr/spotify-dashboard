import { connect } from 'react-redux'

import Home from '../components/Home'

const mapStateToProps = (state) => ({
  isAuthorised: state.credentials.isAuthorised,
})

export default connect(
  mapStateToProps,
)(Home)