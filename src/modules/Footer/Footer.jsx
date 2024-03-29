import React from 'react'
import PropTypes from 'prop-types'
import styles from './Footer.module.scss'
import communityIcon from '../../common/assets/images/community.svg'
import addDappIcon from '../../common/assets/images/add-dapp.svg'
import supportIcon from '../../common/assets/images/support.svg'

const Footer = props => {
  const { onClickSubmit } = props

  return (
    <div className={styles.footer}>
      <a
        href="https://discord.gg/planq-network"
        target="_blank"
        className={styles.footerItem}
      >
        <div className={styles.iconWrap}>
          <img src={communityIcon} alt="Join the Planq community chat" />
        </div>
        <div>
          <h2>Join the DApp community chat</h2>
          <p>
            Planq is a worldwide community committed to web3. Come discuss your
            new favourite DApp with us.
          </p>
        </div>
      </a>
      <div className={styles.footerItem} onClick={onClickSubmit}>
        <div className={styles.iconWrap}>
          <img src={addDappIcon} alt="Submit a DApp" />
        </div>
        <div>
          <h2>Submit a DApp</h2>
          <p>Submit your favourite DApp now! No permission required.</p>
        </div>
      </div>
    </div>
  )
}

Footer.propTypes = {
  onClickSubmit: PropTypes.func.isRequired,
}

export default Footer
