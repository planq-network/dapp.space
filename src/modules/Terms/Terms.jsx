import React from 'react'
import styles from './Terms.module.scss'

const DEFAULT_HEIGHT = '108px'

class Terms extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      termsAndConditionsHeight: DEFAULT_HEIGHT,
      responsibilitiesHeight: DEFAULT_HEIGHT,
      limitationsHeight: DEFAULT_HEIGHT,
    }
    this.nodes = {
      termsAndCoditions: React.createRef(),
      responsibilities: React.createRef(),
      limitations: React.createRef(),
    }
    this.onReadMoreTermsAndConditions = this.onReadMore.bind(
      this,
      this.nodes.termsAndCoditions,
      'termsAndConditionsHeight',
    )
    this.onReadMoreResponsibilities = this.onReadMore.bind(
      this,
      this.nodes.responsibilities,
      'responsibilitiesHeight',
    )
    this.onReadMoreLimitations = this.onReadMore.bind(
      this,
      this.nodes.limitations,
      'limitationsHeight',
    )
  }

  onReadMore(ref, propName) {
    const state = {}
    state[propName] = `${ref.current.offsetHeight + 16}px`

    this.setState(state, () => {
      setTimeout(() => {
        state[propName] = 'none'
        this.setState(state)
      }, 400)
    })
  }

  render() {
    const {
      termsAndConditionsHeight,
      responsibilitiesHeight,
      limitationsHeight,
    } = this.state

    return (
      <div className={styles.cnt}>
        <div className={styles.title}>Terms and conditions</div>
        <div className={styles.frame}>
          <div className={styles.frameTitle}>Terms and conditions</div>
          <div className={styles.frameImportant}>
            <p>
              You must be over 13, agree that using our service is legal in your
              jurisdiction, and that you won't do anything illegal with what we
              provide.
            </p>
            <p>
              We are not lawyers or financial advisors, and you use this
              software at your own risk.
            </p>
          </div>

          <div
            className={styles.frameContent}
            style={{ maxHeight: termsAndConditionsHeight }}
          >
            <div ref={this.nodes.termsAndCoditions}>
              <p>
                You accept the Terms by either (1) clicking to agree or accept
                where these options are presented to you, or (2) actually using
                Dapp.Space (“Dapp.Space”) at https://dapp.space
              </p>
              <p>
                In order to use Dapp.Space you must be 13 years of age or older.
                If you are between 13 and 18 years of age, you must have your
                parent or legal guardian’s permission to use Dapp.Space.
              </p>
              <p>
                By accessing Dapp.Space you accept the terms of use as set out
                herein. All information is provided of a mere general nature for
                informational purposes only. By accessing Dapp.Space you warrant
                to the operators, contributors and the host thereof that you may
                freely, without limitation, access the DApp store and all of its
                contents in your jurisdiction and shall not use Dapp.Space and its
                contents in any way that infringes on laws or the rights of
                others including those of the aforementioned persons (including
                the entities they may represent).
              </p>
              <p>
                Neither Dapp.Space nor any of the persons or entities involved in
                any way in respect of Dapp.Space, including its host and its
                contributors, provide for specific legal, fiscal, economical
                and/or any other kind of advice or recommendation that may be
                relied upon. A visitor to Dapp.Space will therefore act at their
                own risk in accessing or in any way relying on the content of
                the Dapp.Space and the visitor is therefore solely responsible for
                any consequences thereof.
              </p>
            </div>
            {termsAndConditionsHeight === DEFAULT_HEIGHT && (
              <div className={styles.readMoreCnt}>
                <div
                  className={styles.readMore}
                  onClick={this.onReadMoreTermsAndConditions}
                >
                  Read more
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.frame}>
          <div className={styles.frameTitle}>Your Responsibilities</div>
          <div className={styles.frameImportant}>
            <p>You will protect your users' information, no matter what. </p>
            <p>
              You will not use information you do not have permission to use,
              and you may not hack anyone by submitting malicious code or
              otherwise manipulating our service.
            </p>
          </div>

          <div
            className={styles.frameContent}
            style={{ maxHeight: responsibilitiesHeight }}
          >
            <div ref={this.nodes.responsibilities}>
              <p>
                You agree that if You make Your DApp available through Dapp.Space,
                You will protect the privacy and legal rights of users. If the
                users provide You with, or Your DApp accesses or uses,
                usernames, passwords, or other login information or personal
                information, You agree to make the users aware that the
                information will be available to Your DApp, and You agree to
                provide legally adequate privacy notice and protection for those
                users. Further, Your Dapp may only use that information for the
                limited purposes for which the user has given You permission to
                do so.
              </p>
              <p>
                If Your DApp stores personal or sensitive information provided
                by users, You agree to do so securely and only for as long as it
                is needed. However, if the user has opted into a separate
                agreement with You that allows You or Your DApp to store or use
                personal or sensitive information directly related to Your DApp
                (not including other products or applications), then the terms
                of that separate agreement will govern Your use of such
                information.
              </p>
              <p>
                You will not engage in any activity with Dapp.Space, including
                making Your Dapp available via Dapp.Space, that interferes with,
                disrupts, damages, or accesses in an unauthorized manner the
                devices, servers, networks, or other properties or services of
                any third party including, but not limited to, Planq or any
                Authorized Provider. You may not use user information obtained
                via Dapp.Space to sell or distribute DApp outside of Dapp.Space.
              </p>
            </div>
            {responsibilitiesHeight === DEFAULT_HEIGHT && (
              <div className={styles.readMoreCnt}>
                <div
                  className={styles.readMore}
                  onClick={this.onReadMoreResponsibilities}
                >
                  Read more
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.frame}>
          <div className={styles.frameTitle}>Limitation of liability</div>
          <div className={styles.frameImportant}>
            <p>
              The people responsible for Dapp.Space are not liable for your
              mistakes.
            </p>
          </div>

          <div
            className={styles.frameContent}
            style={{ maxHeight: limitationsHeight }}
          >
            <div ref={this.nodes.limitations}>
              <p>
                The content, data, materials and/or other services on Dapp.Space
                are provided without any warranties of any kind regarding its
                title, ownership, accuracy, completeness and correctness.
              </p>
              <p>
                Specifically, unless otherwise required by law, in no event
                shall the operators, contributors to or hosts of Dapp.Space be
                liable for any damages of any kind, including, but not limited
                to, loss of use, loss of assets or rights or privileges, loss of
                profits, or loss of data arising out of or in any way connected
                with the use of the DApps and the information thereon from time
                to time.
              </p>
              <p>
                In no way are the operators, contributors to or host of Dapp.Space
                responsible for the actions, decisions, transactions, or other
                behavior taken or not taken by You or person relying on You in
                reliance upon Dapp.Space and its contents from time to time.
              </p>
            </div>
            {limitationsHeight === DEFAULT_HEIGHT && (
              <div className={styles.readMoreCnt}>
                <div
                  className={styles.readMore}
                  onClick={this.onReadMoreLimitations}
                >
                  Read more
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.frame}>
          <div className={styles.frameTitle}>Limitation of liability</div>
          <div className={styles.frameContent}>
            <div ref={this.nodes.responsibilities}>
              <p>
                The law of the Netherlands exclusively applies to the use of
                content, data, materials and/or other services provided
                for/on Dapp.Space. The court of the District of Limburg,
                location Maastricht, the Netherlands, will be the sole and
                exclusive competent court regarding any dispute relating to or
                stemming from the use of Dapp.Space including, without limitation,
                in respect of any breach of or dispute in respect as referred
                above, irrespective of the jurisdiction applicable thereto.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.frame}>
          <div className={styles.frameTitle}>Last Amendment</div>

          <div className={styles.frameContent}>
            <div ref={this.nodes.responsibilities}>
              <p>
                These terms of use were amended for the last time on 3rd April
                2023 and may be altered at any time without prior notice.
              </p>
              <p>
                <strong>Good luck reaching the top of the rankings!</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Terms
