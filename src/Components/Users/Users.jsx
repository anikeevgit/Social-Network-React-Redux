import React from 'react'
import s from './Users.module.css'
import default_photo from '../../assets/images/4.png'
import { NavLink } from 'react-router-dom'
import * as axios from 'axios'

const Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
  let pages = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }
  let curP = props.currentPage
  let curPF = curP - 5 < 0 ? 0 : curP - 5
  let curPL = curP + 5
  let slicedPages = pages.slice(curPF, curPL)

  return (
    <div className={s.usersBody}>
      <div>
        {slicedPages.map((p) => {
          return (
            <span
              className={props.currentPage === p ? s.selectedPage : ''}
              onClick={() => {
                props.onPageChanged(p)
              }}
            >
              {p}
            </span>
          )
        })}
      </div>
      {props.users.map((u) => (
        <div key={u.id}>
          <span>
            <div>
              <NavLink to={'/profile/' + u.id}>
                <img
                  className={s.userPhoto}
                  src={u.photos.small != null ? u.photos.small : default_photo}
                  alt='user_avatar'
                />
              </NavLink>
              {/* <img className={s.userPhoto} src={u.photoUrl} alt='user_avatar' /> */}
            </div>
            <div>
              {u.toFollow ? (
                <button
                  onClick={() => {
                    axios
                      .delete(
                        `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                        {
                          withCredentials: true,
                          headers: {
                            'API-KEY': "7cd5013f-2384-47a4-9824-a3fc25e74bbf"
                          }
                        }
                      )
                      .then((response) => {
                        if (response.data.resultCode === 0) {
                          props.unFollow(u.id)
                        }
                      })
                  }}
                >
                  UNFOLLOW
                </button>
              ) : (
                <button
                  onClick={() => {
                    axios
                      .post(
                        `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                        {},
                        {
                          withCredentials: true,
                          headers: {
                            'API-KEY': "7cd5013f-2384-47a4-9824-a3fc25e74bbf"
                          }
                        }
                      )
                      .then((response) => {
                        if (response.data.resultCode === 0) {
                          props.follow(u.id)
                        }
                      })
                  }}
                >
                  FOLLOW
                </button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{u.name}</div>
              {/* <div>{u.fullName}</div> */}
              <div>{u.status}</div>
            </span>
            <span>
              {/* <div>{u.location.country}</div>
              <div>{u.location.city}</div> */}
            </span>
          </span>
        </div>
      ))}
    </div>
  )
}

export default Users
