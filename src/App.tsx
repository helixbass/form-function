import React, {FC} from 'react'
import {flowMax, addDisplayName, addEffect, addStateHandlers} from 'ad-hok'
import gsap from 'gsap'
import {suppressUnlessProp} from 'ad-hok-utils'
import {Transition} from 'react-transition-group'

import {makeStyles} from 'utils/style'
import colors from 'utils/colors'
import {DrawSVGPlugin} from 'utils/gsap/DrawSVGPlugin'
import {addRefs} from 'utils/refs'
import addLocation from 'utils/addLocation'
import typedAs from 'utils/typedAs'
import Shapes from 'components/Shapes'
import {addRefsContextProvider} from 'utils/refsContext'
import {PageName, addCurrentPageContextProvider} from 'utils/routing'
import ButtonLink from 'components/ButtonLink'
import Function from 'components/Function'

gsap.registerPlugin(DrawSVGPlugin)

const Content: FC = flowMax(
  addDisplayName('Content'),
  addStateHandlers(
    {
      currentDisplayedPage: null as PageName | null,
      currentRoutedPage: null as PageName | null,
    },
    {
      onPageChange: ({currentDisplayedPage}) => (pageName: PageName) => ({
        currentRoutedPage: pageName,
        currentDisplayedPage: currentDisplayedPage ?? pageName,
      }),
      onExited: ({currentRoutedPage}) => () => ({
        currentDisplayedPage: currentRoutedPage,
      }),
    },
  ),
  addLocation,
  // eslint-disable-next-line ad-hok/dependencies
  addEffect(
    ({location: {pathname}, onPageChange}) => () => {
      const pageName = typedAs<PageName>(
        pathname === '/function' ? 'function' : 'form',
      )
      onPageChange(pageName)
    },
    ['location.pathname'],
  ),
  suppressUnlessProp(['currentRoutedPage', 'currentDisplayedPage']),
  addCurrentPageContextProvider,
  ({currentRoutedPage, currentDisplayedPage, onExited}) => (
    <div css={styles.contentContainer}>
      <div css={styles.buttonsContainer}>
        <ButtonLink toPage="form">Form</ButtonLink>
        <ButtonLink toPage="function">Function</ButtonLink>
      </div>
      <div css={styles.mainContainer}>
        <Shapes />
        <Transition
          in={
            currentRoutedPage === 'function' &&
            currentDisplayedPage === 'function'
          }
          addEndListener={() => {}}
          timeout={2000}
          onExited={() => onExited()}
        >
          {(state) => (
            <>
              {['entering', 'entered', 'exiting'].includes(state) && (
                <Function hide={['exiting'].includes(state)} />
              )}
            </>
          )}
        </Transition>
      </div>
    </div>
  ),
)

const App: FC = flowMax(
  addDisplayName('App'),
  addRefs,
  addRefsContextProvider,
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
