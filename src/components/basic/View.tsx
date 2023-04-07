import React, { FC, RefObject } from 'react'

export interface ViewOption<Ref extends HTMLOrSVGElement> {
  margin?: number
  marginLeft?: number
  marginRight?: number
  marginTop?: number
  marginBottom?: number
  marginHorizontal?: number
  marginVertical?: number
  ref?: RefObject<Ref>
}

export function View<T, Ref extends HTMLOrSVGElement | never = never>(
  Component: FC<
    T & {
      style: Pick<ViewOption<Ref>, 'marginLeft' | 'marginRight' | 'marginTop' | 'marginBottom'>
      className?: string
      ref?: RefObject<Ref>
    }
  >
): FC<T & ViewOption<Ref>> {
  return function view(propsWithUIOptions: T & ViewOption<Ref>) {
    const {
      margin,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      marginHorizontal,
      marginVertical,
      ref,
      ...props
    } = propsWithUIOptions

    const style = {
      marginLeft: marginLeft ?? marginHorizontal ?? margin,
      marginRight: marginRight ?? marginHorizontal ?? margin,
      marginTop: marginTop ?? marginVertical ?? margin,
      marginBottom: marginBottom ?? marginVertical ?? margin,
    }

    return <Component style={style} ref={ref} {...(props as T)} />
  }
}
