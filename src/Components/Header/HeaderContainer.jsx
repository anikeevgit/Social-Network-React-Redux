import React from 'react'
import { connect } from 'react-redux'
import { getAuthMe, logout } from '../../redux/authReducer'
import Header from './Header'

class HeaderContainer extends React.Component {
  componentDidMount() {
    this.props.getAuthMe()
  }
  
  render() {
    return <Header {...this.props} />
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
})

export default connect(mapStateToProps, { getAuthMe, logout })(HeaderContainer)
