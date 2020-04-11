import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import Modal from './Modal'

import { logout } from '../../redux'

import s from './Navbar.scss'

const Navbar = ({ logout, user }) => {
  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => { setShowModal(!showModal) }

  return (
    <>

      <nav className={s.navbar}>
        <div className={s.dropdown}>
          <NavLink exact to="/">
            <img src="" className={s.logo} />
          </NavLink>
          <NavLink exact to="/" className={s.link}>
            Add&nbsp;Recipe
          </NavLink>
          <div className={s.dropdownContent}>
            <NavLink exact to="/" className={s.link}>
              Scrape
            </NavLink>
            <NavLink exact to="/upload" className={s.link}>
              Upload
            </NavLink>
          </div>
        </div>

        <NavLink exact to="/search" className={s.link}>
          Search
        </NavLink>

        {user.id ? (
          <div className={s.dropdown}>
            <NavLink exact to={`/user/${user.id}`} className={s.link}>
              My&nbsp;Account
            </NavLink>
            <div className={s.dropdownContent}>
              <div
                className={s.link}
                onClick={logout}
                // maybe logout should also redirect you if you're on a private page
              >
                Logout
              </div>
            </div>
          </div>
        )
          : (
            <div
              className={s.link}
              onClick={toggleModal}
            >
              Signup&nbsp;/&nbsp;Login
            </div>
          )}
      </nav>

      {showModal && <Modal toggleModal={toggleModal} />}

    </>
  )
}

const mstp = state => ({
  user: state.user,
})

const mdtp = dispatch => ({
  logout: () => dispatch(logout()),
})

export default connect(mstp, mdtp)(Navbar)
