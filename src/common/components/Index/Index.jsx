import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './Index.module.scss'

const Index = props => {
  const { size } = props

  return (
    <Link className={[styles.url, styles[size]].join(' ')} to="/">
      Home&nbsp;
    </Link>
  )
}

Index.propTypes = {
  size: PropTypes.string.isRequired,
}

export default Index
