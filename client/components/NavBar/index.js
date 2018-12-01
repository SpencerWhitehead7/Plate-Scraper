import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'

import Modal from './Modal'

import urls from '../../urls'
import s from './NavBar.css'

const Navbar = () => {
  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => {setShowModal(!showModal)}

  return (
    <React.Fragment>
      <nav className={s.navbar}>
        <div className={s.dropdown}>
          <NavLink exact to="/">
            <img src={urls.logo} className={s.logo}/>
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

        {/* display conditionally based on logged-in state */}
        <div className={s.dropdown}>
          <NavLink exact to="/account" className={s.link}>
        My&nbsp;Account
          </NavLink>
          <div className={s.dropdownContent}>
            <NavLink exact to="/account" className={s.link}>
          Recipes
            </NavLink>
            <NavLink exact to="/settings" className={s.link}>
          Settings
            </NavLink>
            {/* log you out on click; maybe redirect you */}
            <div className={s.link}>Logout</div>
          </div>
        </div>

        {/* open a "log you in" modal, */}
        <div
          className={s.link}
          onClick={toggleModal}
        >
      Signup&nbsp;/&nbsp;Login
        </div>
      </nav>
      {showModal && <Modal
        toggleModal={toggleModal}
      />}
    </React.Fragment>

  )
}

export default Navbar