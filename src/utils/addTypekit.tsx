import React from 'react'
import {SimpleUnchangedProps, addWrapper} from 'ad-hok'

type AddTypekitType = (kitId: string) => SimpleUnchangedProps

const addTypekit: AddTypekitType = (kitId) =>
  addWrapper((render) => (
    <>
      <link rel="stylesheet" href={`https://use.typekit.net/${kitId}.css`} />
      {render()}
    </>
  ))

export default addTypekit
