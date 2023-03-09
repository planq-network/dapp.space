/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-did-update-set-state */
import React from 'react'
import PropTypes from 'prop-types'
import ReactImageFallback from 'react-image-fallback'
import styles from './Withdraw.module.scss'
import Modal from '../../common/components/Modal'
import CategoriesUtils from '../Categories/Categories.utils'
import Categories from '../../common/utils/categories'
import icon from '../../common/assets/images/icon.svg'
import sntIcon from '../../common/assets/images/PLQ.svg'
import 'rc-slider/assets/index.css'
import 'rc-tooltip/assets/bootstrap.css'
import DappModel from '../../common/data/dapp'

const getCategoryName = category =>
  Categories.find(x => x.key === category).value

class Withdraw extends React.Component {
  constructor(props) {
    super(props)
    this.onWithdraw = this.onWithdraw.bind(this)
    this.handlePLQChange = this.handlePLQChange.bind(this)

    this.state = {
      withdrawAmount: props.withdrawMax || 0,
    }
  }

  componentDidUpdate(prevProps) {
    if (
      (!prevProps.withdrawMax && this.props.withdrawMax) ||
      (this.props.withdrawMax &&
        prevProps.withdrawMax !== this.props.withdrawMax)
    ) {
      this.setState({ withdrawAmount: this.props.withdrawMax })
    }
  }

  onWithdraw() {
    const { dapp, onWithdraw } = this.props
    const { withdrawAmount } = this.state
    onWithdraw(dapp, parseInt(withdrawAmount, 10))
  }

  handlePLQChange(e) {
    const { withdrawMax } = this.props
    const { value } = e.target
    if (value !== '' && /^[1-9][0-9]*$/.test(value) === false) return

    const intValue = value === '' ? 0 : parseInt(value, 10)
    if (intValue > 1571296) return
    if (intValue > withdrawMax) return

    this.setState({ withdrawAmount: value })

    const { onInputSntValue } = this.props
    onInputSntValue(value)
  }

  render() {
    const {
      dappState,
      dapp,
      visible,
      onClickClose,
      sntValue,
      withdrawMax,
    } = this.props

    const { withdrawAmount } = this.state

    if (dapp === null)
      return <Modal visible={false} onClickClose={onClickClose} />

    const currentPLQamount = dapp.sntValue
    const dappsByCategory = dappState.getDappsByCategory(dapp.category)
    const afterVoteRating =
      currentPLQamount - (parseInt(withdrawAmount, 10) || 0)

    let catPosition = dappsByCategory.length
    for (let i = 0; i < dappsByCategory.length; ++i) {
      if (dapp.id === dappsByCategory[i].id) {
        catPosition = i + 1
        break
      }
    }

    let afterVoteCategoryPosition = 1
    for (let i = 0; i < dappsByCategory.length; ++i) {
      if (dappsByCategory[i].id === dapp.id) continue
      if (dappsByCategory[i].sntValue < afterVoteRating) break
      afterVoteCategoryPosition++
    }

    return (
      <Modal
        visible={visible && window.location.hash === '#withdraw'}
        onClickClose={onClickClose}
        windowClassName={styles.modalWindow}
      >
        <div className={styles.title}>Withdraw</div>
        <div className={styles.dapp}>
          <ReactImageFallback
            className={styles.image}
            src={dapp.image}
            fallbackImage={icon}
            alt="App icon"
            width={24}
            height={24}
          />
          {dapp.name}
        </div>
        <div className={styles.items}>
          <div className={styles.itemRow}>
            <span className={styles.item}>
              <img src={sntIcon} alt="PLQ" width="24" height="24" />
              {currentPLQamount.toLocaleString()}
            </span>
            {afterVoteRating !== null && afterVoteRating >= 0 && (
              <span className={styles.redBadge}>
                {`${afterVoteRating.toLocaleString()} ↓`}
              </span>
            )}
          </div>
          <div className={styles.itemRow}>
            <span className={styles.item}>
              <img
                src={CategoriesUtils(dapp.category)}
                alt={getCategoryName(dapp.category)}
                width="24"
                height="24"
              />
              {`${getCategoryName(dapp.category)} №${catPosition}`}
            </span>
            {afterVoteCategoryPosition !== null &&
              afterVoteCategoryPosition !== catPosition && (
                <span className={styles.redBadge}>
                  {`№${afterVoteCategoryPosition} ↓`}
                </span>
              )}
          </div>
        </div>
        <div className={`${styles.inputArea} ${styles.inputAreaBorder}`}>
          <input
            type="text"
            value={withdrawAmount}
            onChange={this.handlePLQChange}
            style={{ width: `${21 * Math.max(1, sntValue.length)}px` }}
          />
        </div>
        <div className={styles.footer}>
          <p className={styles.disclaimer}>
            PLQ you spend to rank your DApp is locked in the store. You can earn
            back through votes, or withdraw, the majority of this PLQ at any
            time.
          </p>
          <button
            type="submit"
            disabled={!sntValue || sntValue === '0'}
            onClick={this.onWithdraw}
          >
            Withdraw
          </button>
        </div>
      </Modal>
    )
  }
}

Withdraw.defaultProps = {
  dapp: null,
}

Withdraw.propTypes = {
  visible: PropTypes.bool.isRequired,
  dapp: PropTypes.instanceOf(DappModel),
  sntValue: PropTypes.string.isRequired,
  withdrawMax: PropTypes.number.isRequired,
  onClickClose: PropTypes.func.isRequired,
  onWithdraw: PropTypes.func.isRequired,
  onInputSntValue: PropTypes.func.isRequired,
}

export default Withdraw
