import React, {Ref, forwardRef, FC} from 'react'
import {
  flowMax,
  addDisplayName,
  addProps,
  addState,
  addEffect,
  addHandlers,
} from 'ad-hok'
import gsap from 'gsap'
import {addLayoutEffectOnMount} from 'ad-hok-utils'
import {Link} from '@reach/router'

import colors from 'utils/colors'
import {PageName, addCurrentPageContext} from 'utils/routing'
import {addRefsContext} from 'utils/refsContext'
import {ElementRef} from 'utils/refs'
import {makeStyles} from 'utils/style'

interface StarProps {
  left?: boolean
  forwardedRef: Ref<SVGSVGElement>
}

const StarWithForwardedRef: FC<StarProps> = flowMax(
  addDisplayName('Star'),
  ({left, forwardedRef}) => (
    <svg
      viewBox="0 0 108 110"
      width={21}
      css={[styles.star, left ? styles.starLeft : styles.starRight]}
      ref={forwardedRef}
    >
      <path d="M54,5 86,105 1,43H107L22,105" fill={colors.white} />
    </svg>
  ),
)

const Star = forwardRef<SVGSVGElement, Omit<StarProps, 'forwardedRef'>>(
  (props, forwardedRef) => (
    <StarWithForwardedRef {...props} forwardedRef={forwardedRef} />
  ),
)

interface ButtonLinkProps {
  toPage: PageName
}

const ButtonLink: FC<ButtonLinkProps> = flowMax(
  addDisplayName('ButtonLink'),
  addCurrentPageContext,
  addProps(({toPage, currentRoutedPage}) => ({
    isCurrentRoutedPage: toPage === currentRoutedPage,
  })),
  addState('starsTimeline', 'setStarsTimeline', () =>
    gsap.timeline({paused: true}),
  ),
  addRefsContext,
  addLayoutEffectOnMount(({starsTimeline, refs, toPage}) => () => {
    const stars = (refs.stars as any)[toPage] as ElementRef[]

    starsTimeline.from(stars, {
      opacity: 0,
      duration: 1.4,
    })
  }),
  // eslint-disable-next-line ad-hok/dependencies
  addEffect(
    ({isCurrentRoutedPage, starsTimeline}) => () => {
      if (!isCurrentRoutedPage) {
        starsTimeline.reverse()
        return
      }

      starsTimeline.progress(1)
    },
    ['isCurrentRoutedPage'],
  ),
  addHandlers({
    onMouseEnter: ({starsTimeline}) => () => {
      starsTimeline.play()
    },
    onMouseLeave: ({starsTimeline, isCurrentRoutedPage}) => () => {
      if (isCurrentRoutedPage) return
      starsTimeline.reverse()
    },
  }),
  ({
    toPage,
    isCurrentRoutedPage,
    setRef,
    onMouseEnter,
    onMouseLeave,
    children,
  }) => (
    <Link
      to={`/${toPage}`}
      css={[styles.button, isCurrentRoutedPage && styles.buttonCurrentRouted]}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span css={styles.buttonText}>
        <Star left ref={setRef(`stars.${toPage}[0]`)} />
        {children}
        <Star ref={setRef(`stars.${toPage}[1]`)} />
      </span>
    </Link>
  ),
)

export default ButtonLink

const styles = makeStyles({
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
    textTransform: 'uppercase',
  },
  buttonCurrentRouted: {
    backgroundColor: colors.blue,
  },
  buttonText: {
    position: 'relative',
  },
  star: {
    position: 'absolute',
    top: 4,
  },
  starLeft: {
    left: -39,
  },
  starRight: {
    right: -21,
  },
})
