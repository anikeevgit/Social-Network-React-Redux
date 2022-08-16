import React from 'react'
import { connect } from 'react-redux'
import Users from './Users'
import {
  follow,
  unFollow,
  setCurrentPage,
  toggleIsFollowing,
  getUsers,
} from '../../redux/usersReducer'
import Preloader from '../Preloader/Preloader'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize)
  }

  onPageChanged = (pageNumber) => {
    this.props.getUsers(pageNumber, this.props.pageSize)
  }

  render() {
    return (
      <>
        {this.props.isFetching ? (
          <Preloader />
        ) : (
          <Users
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            users={this.props.users}
            follow={this.props.follow}
            unFollow={this.props.unFollow}
            followingInProgress={this.props.followingInProgress}
          />
        )}
      </>
    )
  }
}

export const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    count: state.usersPage.count,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
  }
}

export default compose(
  connect(mapStateToProps, {
    follow,
    unFollow,
    setCurrentPage,
    toggleIsFollowing,
    getUsers,
  }),
  withAuthRedirect
)(UsersContainer)
