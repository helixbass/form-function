import React, {FC} from 'react'
import {flowMax, addDisplayName} from 'ad-hok'
import {Link} from '@reach/router'
import gsap from 'gsap'
import {addLayoutEffectOnMount} from 'ad-hok-utils'

import {makeStyles} from 'utils/style'
import colors from 'utils/colors'
import {DrawSVGPlugin} from 'utils/gsap/DrawSVGPlugin'
import {addRefs} from 'utils/refs'

gsap.registerPlugin(DrawSVGPlugin)

const SHAPES_WIDTH = 314
const SHAPES_HEIGHT = 234
const SHAPES_SCALE = 1.84
const Shapes: FC = flowMax(
  addDisplayName('Shapes'),
  addRefs,
  addLayoutEffectOnMount(({refs}) => () => {
    const {circleOutline, circleScribble} = refs
    const timeline = gsap.timeline()
    timeline
      .from(circleOutline, {
        drawSVG: '0%',
        duration: 1,
      })
      .from(circleScribble, {
        drawSVG: '0%',
        duration: 6,
        ease: 'linear',
      })
  }),
  ({setRef}) => (
    <svg
      viewBox={`0 0 ${SHAPES_WIDTH} ${SHAPES_HEIGHT}`}
      height={SHAPES_HEIGHT * SHAPES_SCALE}
      width={SHAPES_WIDTH * SHAPES_SCALE}
    >
      <circle
        ref={setRef('circleOutline')}
        cx="113.2"
        cy="113.2"
        r="111.2"
        css={styles.circleOutline}
      />
      <path
        ref={setRef('circleScribble')}
        d="M27.1,44.5c0.5,0.6,18.2-17.3,18.7-16.8c0.8,0.8-33.6,40.4-32.9,41.2c1.4,1.5,65.9-62.5,67.5-60.7 c2,2.2-68.8,70.4-67.3,72.1C15.4,82.8,93.6,3.9,95.5,6c2.6,2.8-96,93.3-93.4,96.2C4.7,105.1,108.2,0.9,111,4.1 c2.8,3.2-107.6,104.6-105.5,107C8.1,114,124-0.9,126.6,2.1c2.9,3.2-123.6,118.5-121,121.4C8.4,126.5,126,8.3,129.3,12.1 c3,3.3-119.6,114.2-117.1,117c3.1,3.4,125.2-119,128.3-115.5C144,17.3,3,143.5,5.7,146.6C8.7,149.9,148,12.5,151,15.8 c2.9,3.2-141,132.6-138.1,135.8c3,3.3,149.7-142,153.3-138c4,4.4-151,141.3-147.4,145.2c3.5,3.9,147.7-139,150.7-135.7 c3.3,3.7-154.4,143-150.6,147.2C22.8,174.7,179.1,19,182.6,22.9c3.5,3.9-158.2,145.9-154.2,150.4c3,3.3,155.4-148.7,159.8-143.8 c3.2,3.6-160.4,150.9-157.4,154.2C34.9,188.3,188,35.2,191.5,39.1c3.8,4.2-152.7,144-149.8,147.2c4.4,4.9,153-144.2,156.2-140.6 c4.3,4.7-161.9,151-158.5,154.7c3.6,4,165.2-155.4,168.5-151.7c3.4,3.7-165.4,153.9-161.8,158c3.3,3.6,163.4-154.6,167.1-150.5 c3.2,3.5-159,148.3-155.6,152.1c4.2,4.7,156.3-147,159.4-143.5C221,69.3,65.4,206.4,69,210.4C73.1,215,215.2,72.5,218.3,75.9 c3.4,3.8-150.5,139.6-146.4,144.2c4,4.4,147.8-140.3,151.4-136.3c3.3,3.6-142.5,134.6-139.3,138.1 c3.4,3.8,131.4-125.8,135.2-121.7c3,3.3-126.7,120.5-124,123.5c2.3,2.6,126-119.1,128.8-116c3.1,3.5-116.6,111.7-113.8,114.7 c2.2,2.5,110.2-104.3,112.7-101.5c2.2,2.5-99.7,96.5-97,99.5c1.9,2.1,90.5-86.2,92.8-83.6c1.8,2-86.7,85.1-84.3,87.7 c1.8,2,79.7-76,81.8-73.7c1.5,1.7-59,62.9-57.8,64.3c1.1,1.3,55.2-51.9,56.3-50.7"
        css={styles.circleScribble}
      />
    </svg>
  ),
)

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
    <div css={styles.mainContainer}>
      <Shapes />
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
  },
  circleOutline: {
    fill: 'none',
    stroke: colors.white,
    strokeWidth: 4,
    strokeMiterlimit: 10,
  },
  circleScribble: {
    fill: 'none',
    stroke: colors.white,
    strokeWidth: 4,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
})
