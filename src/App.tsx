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
import Shapes, {SHAPES_HIDE_DURATION} from 'components/Shapes'
import {addRefsContextProvider} from 'utils/refsContext'
import {PageName, addCurrentPageContextProvider} from 'utils/routing'
import ButtonLink from 'components/ButtonLink'

gsap.registerPlugin(DrawSVGPlugin)

interface FunctionProps {
  hide: boolean
}

const Function: FC<FunctionProps> = flowMax(addDisplayName('Function'), () => (
  <div css={styles.shapesContainer}>
    <svg>
      <path
        d="M39,113.3l0.7,1.6l1.5,1.3l2,4.2c0.4,0.9,0,1.6,0.5,2.5c0.4,0.4,0.7,1.1,0.7,1.6v1.3c0.2,0.9,0.5,1.8,0.5,2.7 c0.2,0.9,0.2,2,0.2,3.1l0.5,3.4v2.5c0,0.4-0.2,0.7-0.2,1.3l-0.2,3.6c-0.9,13-5.3,25-8.2,30.6c0,0-0.2,0.4-0.4,0.5 c0,0.5-0.5,1.1-0.5,1.8l-0.7,0.5c-0.7,0.7-1.5,2.9-2.2,4l-3.4,4.3c-0.4,0.5-0.7,0.9-1.6,0.9L25,187c-0.9,0.5-1.5,0.7-2.4,0.7h-0.9 c-1.6,0-3.1-0.4-4.7-0.5c-1.1-0.2-5.3-2.2-6.5-2.7c-1.5-0.9-4.4-2.5-5.6-4.5l-2.2-4.7c-0.4-0.7,0-1.6-0.7-2v-0.7 c0-0.4-0.2-0.7-0.2-1.1c-0.4-0.9-0.5-2.4-1.3-3.3c-0.2,0-0.2-0.4-0.2-0.5v-1.4c0-0.2,0-0.4,0.2-0.7l-0.2-1.8c0-0.5-0.4-1.1-0.4-1.6 c0-0.4,0.2-0.5,0.2-0.7V159c0-2.4,0-4.5,0.4-6.5v-5.8c0-0.9,0.4-2.2,0.4-3.3c0.4-2.4,0.7-4.9,0.9-7.4c0.4-3.3,0.7-6.3,1.5-9.4 c1.5-8.5,3.1-15.6,4.5-21.6c-0.2-0.4-0.2-0.7-0.2-1.1c0-1.3,0.5-2,1.3-2.7l2.2-8.2c3.3-12.5,4.7-17.9,6.3-23L22.8,54 c3.4-10.5,8.2-21,13-30.8c1.4-3.6,9.8-18.1,14-18.1c0.7,0,8,4.5,8.5,5.1c1.1,0.7,2.4,1.3,3.4,2.4c1.3,1.1,2,2.9,2,4.7v0.7 c0,3.1-0.7,6-1.5,8.7c-0.5,2.9-1.4,5.6-2.2,8.5c-0.5,2.2-1.4,4.5-2.2,6.7l-7.4,19c-1.8,3.1-3.3,6.3-5.3,9.8 c-3.1,7.1-7.6,14-11.8,20.5l-4,6.3c12-3.6,26.3-12.3,37.3-23.4c0.2-0.2-0.7,1.6-0.7,2.5c0,0.2,0.2,0.5,0.2,0.5v1.3 c0.2,0-0.7,1.3-0.7,1.3V81c0,0.7,0,1.4-0.2,1.6l-0.9,1.5c-8,9.1-20.7,17.2-33,21.4c2.7,1.8,4.4,3.4,6,4.9c-0.2,0.2-0.4,0.5-0.4,0.7 c0,0.4,0.5,0.7,0.9,0.7c1.3,0.5,2.2,2,2.9,3.6l-1.4-1.8C39.3,113.5,39.1,113.3,39,113.3z M15.6,171.5c0.2,0.4,0.2,0.9,0.2,1.3 c0.4,2.2,0.5,4.3,1.8,6.3c0.4,0.9,1.3,1.6,2.2,1.8c1.1,0,2.2-0.4,2.9-1.3c1.3-1.1,2.2-2.5,3.4-4c1.1-1.4,1.4-2.7,2.4-4.2 c0.7-1.1,0.7-2,1.5-2.9c0.4-1.1,0.9-1.8,1.3-2.5l1.3-3.4c0.9-2.2,2.4-8.3,2.9-10.7c0.5-1.1,0.5-2.4,0.7-3.4c0-0.5,0.4-1.3,0.5-2 c0-0.4,0.2-0.7,0.2-1.1v-0.7c0-0.5,0-1.5,0.5-3.3v-0.7c0-0.9,0.2-2,0.2-3.1l-0.4-5.6c-0.2-2-0.4-3.8-0.9-5.4 c-0.4-2.2-0.7-4.2-1.8-5.8c-0.5-0.9-1.3-1.8-1.6-2.7c-0.7-2.2-2.5-3.1-4-4.9c-0.4-0.4-5.8-2.9-5.8-2.9c-0.4,0.2-0.5,0.2-0.5,0.7 c-1.6,8-4,15-6.5,37.7c-0.4,4-0.7,8-0.7,11.8v6.2C15.2,168.2,15.4,169.8,15.6,171.5z M15.4,81c0.2,0.2,0.9-1.1,0.9-1.1 s0.4,0,0.4-1.1c0.2,0-0.4-0.5-0.4-0.4C16.3,78.8,15.6,80.7,15.4,81z M24.5,80.1l-0.4,2.2c0,0.2,0.7-0.7,0.7-0.7 c0.2,0,0.4-1.1,0.4-1.3C24.8,80.3,24.5,80.1,24.5,80.1z M28.5,79l0.5-1.1c0-0.4,0.4-0.7,0.4-0.9c0,0-1.1,0.2-1.1,0.4 C28.3,78.1,28.5,78.5,28.5,79z M30.1,65.4v-1.1c-0.5,0-0.9,0-0.9,0.7C29.2,65.1,29.5,65.2,30.1,65.4z M31.4,70.9 c-0.2-0.4-1.1,2-1.1,2.2c-0.2,0.2-0.2,0.5-0.2,0.7l0.5-0.9C31,72.3,31,71.8,31.4,70.9z M50.4,26.8l-2.7,4.7c0,0.2-0.2,0.4-0.2,0.7 c-0.2,0.2-0.2,0.5-0.2,0.7l-4.5,9.6c-1.3,2.4-2.2,5.1-3.3,7.8c-0.2,0.7-0.5,1.5-1.1,2c0,0.7-0.5,1.3-0.5,2.4 c0.2,0.2,0.2,0.4,0.2,0.5l-0.5,0.9c0,1.5-1.5,2.5-1.8,4.2c0,0.9-0.5,1.3-0.5,1.6c0,0.2-0.2,0.2-1.6,4.9l-0.9,2.5 c-0.4,0.5-0.5,1.6-0.5,2.4l-0.9,2C31,75,30.3,77,30.3,77c2.7-3.8,5.8-10.3,7.8-14.3l5.1-10.5c1.6-3.6,3.3-7.2,4.7-11.2 c2-4.9,3.4-9.6,5.3-14.5l0.9-4.4c-1.5,0-2.2,2.2-2.7,3.1C50.7,25.7,50.7,26.5,50.4,26.8z M30.4,89.4c1.1-0.5,2-2.7,2-3.1 c0.2,0,0.2-0.2,0.5-0.7C31.7,86.1,30.8,87.2,30.4,89.4z M34.6,80.3c0.7-0.7,2.2-2.9,2-2.9c-0.2,0.2-0.4-0.4-0.4-0.4 C35.3,77.9,34.6,79,34.6,80.3z M36.4,170.6c0.4-0.7,0.9-1.5,0.9-1.8c0,0-0.9,0.7-1.1,1.3C36.2,170.4,36.4,170.4,36.4,170.6z M43.1,126.1c0-0.4-0.4-1.8-0.5-2c0-0.5-0.2-0.9-0.4-1.1c0,0.4,0.2,0.9,0.4,1.3c0,0.2,0.2,0.4,0.2,0.5c-0.2,0.2-0.4,0.5-0.4,0.7 c0,0.5,0.4,1.3,0.9,1.3L43.1,126.1z M43,137.2v-3.1c-0.2-0.2-0.2-0.9-0.2-0.9c-0.2,0-0.4,0.7-0.4,0.9l0.2,3.1 c-0.2,0.4-0.2,0.5-0.2,0.7s0,0.5,0.4,0.7c0,0-0.2-0.4-0.2-0.5C42.6,137.7,42.8,137.6,43,137.2z M43.1,130.9c0,0.2,0.4,0.2,0.5,0.2 l-0.2-1.3c0-0.4,0.2-0.7,0.4-1.1c0-0.2-0.2-0.4-0.2-0.5c-0.4,0.2-0.5,1.3-0.5,1.6V130.9z M44,144.5l0.4-1.4 c-0.2-0.2-0.5,0.7-0.5,0.9C43.9,144.1,44,144.3,44,144.5c-0.2,0.2-0.5,0.4-0.5,0.4s0.2,0.7,0.2,1.3C44,145.7,43.9,145,44,144.5z M62.5,84.1c0.7-0.4,1.3-0.9,1.3-1.5c0-0.2-0.2-0.9-0.2-0.9C63.4,81.7,63.1,83.7,62.5,84.1z"
        css={styles.functionPath}
      />
      <path
        d="M73,71.4c0-2,1.1-4.7,1.6-6.7c6.3-22.1,15.6-44.9,31-62.5c1.6-1.6,3.6-2.2,5.8-2.2h1.8c0.9,0,4.3,0.2,5.1,1.3 c0.4,0.4,0.4,0.5,0.4,0.9c0,0.7-0.5,1.5-0.5,2.9c-0.2,1.4-1.1,2.2-1.8,3.3c-17.2,25-30.8,63.8-30.8,94.6c0,14,3.4,27.5,13.6,36.6 c0.2,0.4,0.7,0.5,0.9,0.9c0,0-0.7,0.4-0.9,0.5c-0.5,0.2-1.1,0.4-1.6,0.4c-0.4,0.2-0.7,0.2-1.1,0.2c-0.7,0-3.8,0-4.2,0.2l-3.1,0.2 c-0.4,0.2,1.1,0.5,0.7,0.5h-1.5c-1.5,0-4.9-1.6-6.3-3.1c-1.3-1.1-2.2-2-3.3-3.4c-0.4-0.4-0.4-1.6-0.9-1.6c0,0,0.2,0.4,0.2,0.5 c0-0.2-1.1-1.5-1.3-1.6l-0.5-1.3c-0.7-1.1-0.9-2-1.5-2.9l-0.7-1.1c-0.5-2.4-0.9-2.5-0.9-2.4c0-0.5-0.4-3.4-1.1-3.6 c0,0-0.4-1.5-0.7-2l-1.3-11.6v-4.2c0-2.2,0.4-4.9,0.5-7.4c0-0.9,0.2-1.6,0.2-2.5c0,0.5-0.9,1.5-1.1,1.3c0-3.3,1.8-15.2,2.4-16.1 v-1.3c0-0.5,0.2-1.8,1.3-5.3l1.8-6.3c0.2-1.3,0.7-2.7,0.9-4L73,71.4z M71.4,108.2c0-0.2,0.2-0.4,0.2-0.5v-3.8 c-0.2,0-0.4,3.3-0.4,3.8C71.2,107.8,71.4,108,71.4,108.2z M73.9,122.7c0-0.4,0.2-0.7,0.2-0.9l-1.6-9.4c0,1.8,0.4,3.6,0.5,5.6 c-0.4-0.4-0.4-1.6-0.5-2l-0.7-5.4c0,0.9,0.2,6.2,0.5,7.1c0,0.2,0.4,2.7,0.5,2.7c0.2,1.6,1.1,3.8,1.4,5.3c0,0.2,0.4,1.3,0.4,1.3 s0-0.9,0-2.4L73.9,122.7z M73.9,118.4c0,0.4,0.2,1.8,0.5,1.6c-0.2-0.4-0.5-4.7-1.1-4.5L73.9,118.4z M75.9,128 c0-0.7-0.2-1.8-0.5-2.4C75.4,126.9,75.8,127.8,75.9,128z M80.7,136.7c0-1.3-2-3.3-2-3.1c0,0.4,0.4,1.1,1.5,2.7L80.7,136.7z M83.2,137.9l-0.2-0.5c-0.2-0.7-1.3-1.3-1.6-1.5c0,0.4,0.7,1.1,1.1,1.3C82.5,137.6,83.2,138.1,83.2,137.9z M84.5,139.4 c-0.2,0.4-0.4,0.4-0.4,0.5c0.4,0.4,0.9,0.9,1.3,1.1L84.5,139.4z"
        css={styles.functionPath}
      />
      <path
        d="M148.4,58c2.4,0,3.8,1.1,5.1,3.1c0.7,1.3,5.4,17.6,5.4,17.6l4.9-6.3c4-4.9,12.5-15,18.1-17.8 c0.9-0.5,1.6-1.6,2.7-1.6c0.9,0,1.8-0.5,2.7-0.5c0.4,0,0.7,0,1.3,0.2c0.2,0.5,0.7,1.8,0.7,2.4s-1.6,1.1-2,1.1 c-0.4,0.2-0.5,0.2-0.7,0.2c0.2,0.7,0.4,0.7,0.5,0.7h0.7c-0.4,0.4-0.4,0.5-0.5,0.5l-1.5,1.1c-4.9,4.5-24.3,27.7-24.3,30.6 c2,8.7,4.5,19.2,10.5,26.8c0.2,0.2,0.9,0.5,0.9,0.9c0,0.2-0.2,0.4-0.5,0.7c-0.2,0.4-0.4,0.5-0.7,0.5c-0.4,0-0.7,0-1.1,0 c0.2,0.2,0.5,0.2,0.5,0.2v0.9c0,0-0.7-0.2-1.1-0.5c0-0.2-0.4-0.2-0.5-0.2c0,0.5-0.4,0.7-0.9,0.7c-0.7,0-1.3,0.2-2.2,0.5 c-0.4,0.2-0.7,0.2-1.1,0.2c-0.7,0-3.1,1.6-4.2,1.6c-1.8,0-2.5-0.9-3.3-2c-2-2.2-5.4-9.8-7.4-16.3c-2.9,4.3-9.8,14.1-11.6,15.2 l-1.6,1.1c-0.4,0-0.5,0-0.7-0.2c0,0-0.2-0.7-0.2-0.9c-0.2,0-0.7,0.2-1.1,0.2s-1.1-1.8-1.3-1.8c0,0-0.5,1.1-1.6,1.1 c-0.2,0-0.4,0-0.5-0.2c-1.5,0-2-0.7-2.7-1.5c0-0.2,0.2-0.9,0.4-1.1c2.7-0.2,4.3-2.7,5.6-4.7c3.6-5.4,6-8.3,9.8-13.8l2.4-3.6v-0.7 c0-0.2,0-0.4-0.2-0.5l-5.1-19.2c-0.5-2.4-3.4-8-3.4-10.1c0-0.7,1.5-1.6,1.6-1.6c0.4,0,0.7,0.4,0.9,0.4 C142.8,59.8,146.1,58,148.4,58z M160.2,120l-0.5-0.4l-2.5-4l0.9,2c0,0.9,1.1,2.7,1.5,2.9c0.5,0.5,0.7,0.5,0.7,0.5 c0.2,0,0.4,0,0.5-0.2C160.8,120.5,160.2,120.2,160.2,120z M163.3,82.3c-0.2,0.2-0.4,0.4-0.4,0.7c-0.2,0.2-0.4,0.2-0.4,0.7 c-0.2,0.2-0.2,0.4-0.2,0.5V85c0,0.4,0,0.5-0.2,0.5l-1.1,1.1l0.4,1.1l1.3-2c0.4-0.4,0.4-1.3,0.5-1.3l0.9-0.2 c0.2-0.2,0.2-0.4,0.2-0.5c-0.2,0-0.5-0.2-0.7-0.4l1.1-0.4l0.9-1.3l-1.1,0.7c0.4-0.7,0.7-0.9,0.9-1.1l1.8-1.8 c0.4-0.4,0.4-0.7,0.5-1.1c-0.5,0.5-0.5,0.7-0.5,0.7l-0.7,0.4l-1.1,1.1c-0.2,0.5-0.5,0.9-1.5,1.1C164,81.9,163.7,81.9,163.3,82.3z M164.6,82.5l-1.8,1.3l0.2-0.7C163.5,82.6,164.4,82.5,164.6,82.5z M168,112.4l-1.6-1.1l-0.5,0.4l0.5,0.4c0.2,0.2,0.4,0.2,1.1,0.2 C167.6,112.2,168,112.4,168,112.4z M168,112.9h-0.9c-0.2,0.2-0.2,0.4-0.2,0.7l0.4,1.1c0,0.5,0.4,0.9,0.5,1.3c0-0.2-0.2-0.4-0.2-0.5 c0-0.2,0.2-0.4,0.4-0.4c0.2,0.2,0.2,0.4,0.2,0.7c0-0.4,0-0.5,0.5-1.1l-0.9,0.2c0.2-0.2,0.2-0.5,0.2-0.7 C168,113.6,168,113.5,168,112.9z M168.9,76.7l-0.2,1.1c0.4-0.7,1.8-2.7,2.9-3.6l3.4-4.2C172.7,72,169.6,76.1,168.9,76.7z M179.1,65.1c0-0.2,0.4-0.7,0.5-0.9c-0.4,0.2-1.1,0.5-1.1,0.7C178.5,64.9,178.9,65.1,179.1,65.1z"
        css={styles.functionPath}
      />
      <path
        d="M237.1,37.5c0.2,0.5,0.2,1.1,0.2,1.6c1.1,6.9,1.3,13.8,1.3,20.3c0,40.4-16.1,71.8-26.5,83.4l-0.5,0.4 c0-0.2,0-0.4,0.2-0.7c0-0.2,0.2-0.5,0.4-0.7h-0.7c-0.2,0-0.7,1.1-0.9,1.3l-0.4-0.7c-0.2,0.2-0.2,0.5-0.5,0.5c0-0.2,0.2-0.4,0.2-0.7 c0-0.2-0.2-0.4-0.4-0.4c-0.5,0-4.4,0.9-4.9,0.9c-0.9,0.4-1.1,0.9-1.3,1.3h-0.9c0-0.5,0.4-1.5,0.4-1.6c-0.4,0-0.9,0.2-1.1,0.2 s-0.5,0.2-0.7,0.2c0,0.4,0,0.5-0.2,0.7c-0.5,0-1.6,0.7-1.8,0.7c-0.4,0-0.5-0.4-0.7-0.4c-0.7,0-1.3,0.2-1.6,0.2 c-0.5,0-0.9-0.4-0.9-1.6c0-1.1,3.1-3.4,3.6-4.2c14.7-18.7,23.7-56.2,23.7-81c0-16.3-2.9-32.6-10-47.8c-0.4-0.4-0.5-0.7-0.7-1.3 c-0.4-0.2-0.5-0.2-0.7-0.2c0-0.2-0.4-0.5-0.4-0.7c0-0.9-2-1.5-2-2.2c0-0.7,0.2-1.4,1.5-2c1.6-1.1,6.3-1.1,8-1.1 C230.9,1.8,235.6,27.5,237.1,37.5z"
        css={styles.functionPath}
      />
    </svg>
  </div>
))

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
        <Transition
          in={currentRoutedPage === 'form' && currentDisplayedPage === 'form'}
          addEndListener={() => {}}
          timeout={SHAPES_HIDE_DURATION}
          onExited={() => onExited()}
        >
          {(state) => (
            <>
              {['entering', 'entered', 'exiting'].includes(state) && (
                <Shapes
                  hide={['exiting'].includes(state)}
                  transitionState={state}
                />
              )}
            </>
          )}
        </Transition>
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
  shapesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  functionPath: {
    fill: colors.white,
  },
})
