import React from 'react'
import {SimplePropsAdder, addWrapper, AddWrapperRenderCallback} from 'ad-hok'
import {Location, LocationContext} from '@reach/router'

type AddLocationType = SimplePropsAdder<LocationContext>

// const addLocation: AddLocationType = addProps(() => ({
//   location: useLocation(),
// }))
const addLocation: AddLocationType = addWrapper(
  (render: AddWrapperRenderCallback<LocationContext>) => (
    <Location>{(location) => render(location)}</Location>
  ),
)

export default addLocation
