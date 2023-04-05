import React from 'react'
import PropTypes from 'prop-types'
import CategoryIcon from '../../common/components/CategoryIcon'
import ViewAll from '../../common/components/ViewAll'
import categories from '../../common/utils/categories'
import humanise from '../../common/utils/humanise'
import dropdownArrows from '../../common/assets/images/dropdown-arrows.svg'
import styles from './CategorySelector.module.scss'
import Index from '../../common/components/Index'

class CategorySelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
    this.toggle = this.toggle.bind(this)
    this.updateCategory = this.updateCategory.bind(this)
    this.container = React.createRef()
    this.onClickSubmit = this.onClickSubmit.bind(this)
    this.onClickHighestRanked = this.onClickHighestRanked.bind(this)
    this.onClickRecentlyAdded = this.onClickRecentlyAdded.bind(this)
  }

  componentDidMount() {
    this.closeOnBackgroundClick = this.closeOnBackgroundClick.bind(this)
    document.addEventListener('click', this.closeOnBackgroundClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeOnBackgroundClick)
  }

  onClickSubmit(e) {
    const { onClickSubmit, onClickCloseDesktopMenu } = this.props
    onClickCloseDesktopMenu()
    onClickSubmit()
    e.stopPropagation()
  }

  closeOnBackgroundClick(event) {
    if (this.container.current.contains(event.target)) {
      return
    }

    this.setState({ open: false })
  }

  onClickHighestRanked(e) {
    const { onClickCloseDesktopMenu } = this.props
    onClickCloseDesktopMenu()
    e.stopPropagation()
    window.location.hash = 'highest-ranked'
  }

  onClickRecentlyAdded(e) {
    const { onClickCloseDesktopMenu } = this.props
    onClickCloseDesktopMenu()
    e.stopPropagation()
    window.location.hash = 'recently-added'
  }

  updateCategory(event) {
    const { select } = this.props
    select(event.target.value)
    this.setState({ open: false })
  }

  toggle() {
    const { open } = this.state
    this.setState({ open: !open })
  }

  render() {
    const {
      category,
      alwaysOpen,
      className,
      showLists,
      showSubmitDApp,
    } = this.props
    let { open } = this.state
    if (alwaysOpen === true) open = true

    return (
      <div ref={this.container} className={className}>
        <div
          style={open ? { visible: 'block' } : { display: 'none' }}
          className={styles.open}
        >
          <div className={styles.openHeader}>
            <Index size="small" />
            <ViewAll size="small" />
          </div>
          <div className={styles.categories}>
            {categories.map(c => (
              <button
                className={
                  c.key === category
                    ? [styles.openButton, styles.selected].join(' ')
                    : styles.openButton
                }
                key={c.key}
                type="button"
                value={c.key}
                onClick={this.updateCategory}
              >
                <CategoryIcon category={c.key} />
                {c.value}
              </button>
            ))}
          </div>

          {showLists && (
            <div className={styles.categories}>
              <div className={`${styles.openHeader} ${styles.spacing}`}>
                <h2>Lists</h2>
              </div>
              <button
                className={styles.openButton}
                type="button"
                onClick={this.onClickHighestRanked}
              >
                <svg
                  id="cat_highest_rated"
                  enable-background="new 0 0 512 512"
                  height="24"
                  viewBox="0 0 512 512"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path d="m234.143 45.858-40-40c-7.811-7.811-20.475-7.811-28.285 0s-7.811 20.474 0 28.284l5.857 5.858h-51.715v-20c0-11.046-8.954-20-20-20h-80c-11.046 0-20 8.954-20 20v80c0 11.046 8.954 20 20 20h80c11.046 0 20-8.954 20-20v-20h51.715l-5.858 5.858c-7.811 7.811-7.811 20.474 0 28.284 7.81 7.81 20.475 7.81 28.285 0l40-40c7.717-7.676 7.848-20.461.001-28.284zm-154.143 34.142h-40v-40h40z" />
                    <path d="m234.143 241.858-40-40c-7.811-7.811-20.475-7.811-28.285 0s-7.811 20.474 0 28.284l5.858 5.858h-51.716v-20c0-11.046-8.954-20-20-20h-80c-11.046 0-20 8.954-20 20v80c0 11.046 8.954 20 20 20h80c11.046 0 20-8.954 20-20v-20h51.715l-5.858 5.858c-7.811 7.811-7.811 20.474 0 28.284 7.81 7.81 20.475 7.81 28.285 0l40-40c7.706-7.665 7.868-20.44.001-28.284zm-154.143 34.142h-40v-40h40z" />
                    <path d="m234.143 437.858-40-40c-7.811-7.811-20.475-7.811-28.285 0s-7.811 20.474 0 28.284l5.858 5.858h-51.716v-20c0-11.046-8.954-20-20-20h-80c-11.046 0-20 8.954-20 20v80c0 11.046 8.954 20 20 20h80c11.046 0 20-8.954 20-20v-20h51.715l-5.858 5.858c-7.811 7.811-7.811 20.474 0 28.284 7.81 7.81 20.475 7.81 28.285 0l40-40c7.656-7.616 7.914-20.37.001-28.284zm-154.143 34.142h-40v-40h40z" />
                    <path d="m492 0h-192c-11.046 0-20 8.954-20 20v80c0 11.046 8.954 20 20 20h192c11.046 0 20-8.954 20-20v-80c0-11.046-8.954-20-20-20zm-20 80h-152v-40h152z" />
                    <path d="m492 196h-192c-11.046 0-20 8.954-20 20v80c0 11.046 8.954 20 20 20h192c11.046 0 20-8.954 20-20v-80c0-11.046-8.954-20-20-20zm-20 80h-152v-40h152z" />
                    <path d="m492 392h-192c-11.046 0-20 8.954-20 20v80c0 11.046 8.954 20 20 20h192c11.046 0 20-8.954 20-20v-80c0-11.046-8.954-20-20-20zm-20 80h-152v-40h152z" />
                  </g>
                </svg>
                {'Highest rated'}
              </button>
              <button
                className={styles.openButton}
                type="button"
                onClick={this.onClickRecentlyAdded}
              >
                <svg
                  id="cat_recently_added"
                  enable-background="new 0 0 512 512"
                  height="24"
                  viewBox="0 0 512 512"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path d="m256 0c-99.252 0-180 80.748-180 180s80.748 180 180 180 180-80.748 180-180-80.748-180-180-180zm20 318.565v-18.565c0-11.046-8.954-20-20-20s-20 8.954-20 20v18.565c-61.221-8.796-109.769-57.344-118.565-118.565h18.565c11.046 0 20-8.954 20-20s-8.954-20-20-20h-18.565c8.796-61.221 57.344-109.769 118.565-118.565v18.565c0 11.046 8.954 20 20 20s20-8.954 20-20v-18.565c61.221 8.796 109.769 57.344 118.565 118.565h-18.565c-11.046 0-20 8.954-20 20s8.954 20 20 20h18.565c-8.796 61.221-57.344 109.769-118.565 118.565z" />
                    <path d="m100 392h-80c-11.046 0-20 8.954-20 20v80c0 11.046 8.954 20 20 20h80c11.046 0 20-8.954 20-20v-80c0-11.046-8.954-20-20-20zm-20 80h-40v-40h40z" />
                    <path d="m492 392h-80c-11.046 0-20 8.954-20 20v80c0 11.046 8.954 20 20 20h80c11.046 0 20-8.954 20-20v-80c0-11.046-8.954-20-20-20zm-20 80h-40v-40h40z" />
                    <path d="m346.143 437.858-40-40c-7.811-7.811-20.475-7.811-28.285 0s-7.81 20.474 0 28.284l5.858 5.858h-103.716c-11.046 0-20 8.954-20 20s8.954 20 20 20h103.715l-5.858 5.858c-7.81 7.811-7.81 20.474 0 28.284s20.475 7.81 28.285 0l40-40c7.723-7.722 7.839-20.446.001-28.284z" />
                    <path d="m296 160h-20v-20c0-11.046-8.954-20-20-20s-20 8.954-20 20v40c0 11.046 8.954 20 20 20h40c11.046 0 20-8.954 20-20s-8.954-20-20-20z" />
                  </g>
                </svg>
                {'Recently added'}
              </button>
            </div>
          )}

          {showSubmitDApp && (
            <button
              className={`${styles.openButton} ${styles.submitDapp}`}
              type="button"
              onClick={this.onClickSubmit}
            >
              <svg
                id="cat_submit_dapp"
                enable-background="new 0 0 512 512"
                height="24"
                viewBox="0 0 512 512"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path d="m200 276h51.716l-5.858 5.858c-7.811 7.811-7.811 20.474 0 28.284 7.811 7.811 20.474 7.811 28.284 0l39.997-39.998c7.649-7.643 7.929-20.366 0-28.289l-39.997-39.998c-7.811-7.811-20.474-7.811-28.284 0s-7.811 20.474 0 28.284l5.858 5.858h-51.716v-60c0-11.046-8.954-20-20-20h-160c-11.046 0-20 8.954-20 20v160c0 11.046 8.954 20 20 20h160c11.046 0 20-8.954 20-20zm-40 40h-120v-120h120z" />
                  <path d="m492 0h-160c-11.046 0-20 8.954-20 20v160c0 11.046 8.954 20 20 20h160c11.046 0 20-8.954 20-20v-160c0-11.046-8.954-20-20-20zm-20 160h-120v-120h120z" />
                  <path d="m492 312h-160c-11.046 0-20 8.954-20 20v160c0 11.046 8.954 20 20 20h160c11.046 0 20-8.954 20-20v-160c0-11.046-8.954-20-20-20zm-20 160h-120v-120h120z" />
                  <circle cx="100" cy="256" r="20" />
                  <circle cx="412" cy="100.002" r="20" />
                  <circle cx="412" cy="412" r="20" />
                  <path d="m241.858 150.142c7.811 7.811 20.474 7.811 28.284 0 7.811-7.811 7.811-20.474 0-28.284l-40-40c-7.811-7.811-20.474-7.811-28.284 0s-7.811 20.474 0 28.284z" />
                  <path d="m241.858 361.858-40 40c-7.811 7.811-7.811 20.474 0 28.284 7.811 7.811 20.474 7.811 28.284 0l40-40c7.811-7.811 7.811-20.474 0-28.284s-20.474-7.811-28.284 0z" />
                </g>
              </svg>
              {'Submit a ÐApp'}
            </button>
          )}
        </div>

        <button
          style={open ? { visibility: 'hidden' } : { visibility: 'visible' }}
          className={[styles.closed, styles[category]].join(' ')}
          type="button"
          onClick={this.toggle}
        >
          <div className={styles.closedText}>
            {category && <CategoryIcon category={category} />}
            {category ? humanise(category) : 'Choose category'}
          </div>
          <img src={dropdownArrows} alt="Toggle category selector" />
        </button>
      </div>
    )
  }
}

CategorySelector.propTypes = {
  category: PropTypes.string,
  select: PropTypes.func.isRequired,
  alwaysOpen: PropTypes.bool,
  className: PropTypes.string,
  showLists: PropTypes.bool,
  showSubmitDApp: PropTypes.bool,
  onClickSubmit: PropTypes.func,
  onClickCloseDesktopMenu: PropTypes.func,
}

CategorySelector.defaultProps = {
  category: null,
  className: '',
  alwaysOpen: false,
  showLists: false,
  showSubmitDApp: false,
  onClickSubmit: null,
  onClickCloseDesktopMenu: null,
}

export default CategorySelector
