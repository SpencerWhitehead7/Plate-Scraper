import React from 'react'
import { Link } from 'react-router-dom'

import s from './Tags.scss'

const Tag = ({ name }) => (
  <Link
    className={s.tag}
    to="/"
  // TODO add "to" for search page for that tag
  >
    {name}
  </Link>
)

const Tags = ({ tags }) => (
  <div>
    Tags:&nbsp;
    {
      tags && tags.length
        ? tags.map(tag => <Tag key={tag.id} {...tag} />)
        : `none`
    }
  </div>
)

export default Tags
