import React, {FC} from 'react'
import {flowMax, addDisplayName} from 'ad-hok'
import {Link} from '@reach/router'

import {makeStyles} from 'utils/style'
import colors from 'utils/colors'

const Content: FC = flowMax(addDisplayName('Content'), () => (
  <div css={styles.contentContainer}>
    <div css={styles.buttonsContainer}>
      <Link to="/form" css={styles.button}>
        FORM
      </Link>
      <Link to="/function" css={styles.button}>
        FUNCTION
      </Link>
    </div>
  </div>
))

const App: FC = flowMax(addDisplayName('App'), () => (
  <>
    <link rel="stylesheet" href="https://use.typekit.net/wkh0yki.css" />
    <div css={styles.container}>
      <Content />
    </div>
  </>
))

export default App

const styles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.peach,
    color: colors.white,
    minHeight: '100vh',
    fontFamily: 'futura-pt-bold, sans-serif',
    fontWeight: 700,
  },
  contentContainer: {
    width: 800,
    height: 600,
    display: 'flex',
    flexDirection: 'column',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    height: 78,
    fontSize: 32,
    letterSpacing: 17,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.white,
    borderWidth: 5.5,
    borderStyle: 'solid',
    paddingLeft: '1.8em',
    paddingRight: '1.3em',
  },
})
