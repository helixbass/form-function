import React from 'react'
import {UnchangedProps, addWrapper} from 'ad-hok'

type AddContextProviderType = <
  TContextValue,
  TPropName extends string,
  TProps extends {[propName in TPropName]: TContextValue}
>(
  Context: React.Context<TContextValue>,
  propName: TPropName,
) => UnchangedProps<TProps>

const addContextProvider: AddContextProviderType = (Context, propName) =>
  addWrapper((render, props) => (
    <Context.Provider value={props[propName]}>{render()}</Context.Provider>
  ))

export default addContextProvider
