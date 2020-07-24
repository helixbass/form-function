import React, {FC} from 'react'
import {flowMax, addDisplayName} from 'ad-hok'
import gsap from 'gsap'

import {makeStyles} from 'utils/style'
import colors from 'utils/colors'
import {DrawSVGPlugin} from 'utils/gsap/DrawSVGPlugin'
import {addRefs} from 'utils/refs'
import Shapes from 'components/Shapes'
import {addRefsContextProvider} from 'utils/refsContext'
import ButtonLink from 'components/ButtonLink'
import Function from 'components/Function'
import {addRouting} from 'utils/routing'

gsap.registerPlugin(DrawSVGPlugin)

const Content: FC = flowMax(addDisplayName('Content'), () => (
  <div css={styles.contentContainer}>
    <div css={styles.buttonsContainer}>
      <ButtonLink toPage="form">Form</ButtonLink>
      <ButtonLink toPage="function">Function</ButtonLink>
    </div>
    <div css={styles.mainContainer}>
      <Shapes />
      <Function />
    </div>
  </div>
))

const App: FC = flowMax(
  addDisplayName('App'),
  addRefs,
  addRefsContextProvider,
  addRouting,
  () => (
    <>
      <link rel="stylesheet" href="https://use.typekit.net/wkh0yki.css" />
      <div css={styles.container}>
        <Content />
      </div>
    </>
  ),
)

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
    height: 786,
    display: 'flex',
    flexDirection: 'column',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 65,
  },
  mainContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.white,
    borderWidth: 5.5,
    borderStyle: 'solid',
    backgroundColor: colors.peachLight,
    position: 'relative',
  },
})
