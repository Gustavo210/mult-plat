import chroma from 'chroma-js'
import React, { ReactNode } from 'react'
import { PixelRatio } from 'react-native'

interface FontFamilyProps {
  name: string
  require: string
}

type FontsLoaded = Record<FontFamilyProps['name'], FontFamilyProps['require']>

export type BrightnessLevel = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950

export type ComponentWithTarget = React.ElementType & {
  target?: React.ElementType
}

export default {
  calculateRemToPx(remSizeSpace: `${number}rem`): string {
    const remValue = parseFloat(remSizeSpace)
    const basePx = 16
    return (remValue * basePx).toString() + 'px'
  },
  calculateFontSize(remFontSize: `${number}rem`): number {
    const pxFontSize = parseFloat(remFontSize) * 16
    const fontScale = PixelRatio.getFontScale()
    const roundedFontSize = Math.round(pxFontSize * fontScale) / fontScale
    const fontSize = Math.round(roundedFontSize * fontScale)

    return fontSize
  },
  mapFamiliesToFonts(families: FontFamilyProps[]): FontsLoaded {
    const familyFonts = families.reduce(
      (object: FontsLoaded, font: FontFamilyProps) => ({ ...object, [font.name]: font.require }),
      {}
    )

    return familyFonts
  },
  calculateImageSize(remSizeSpace: `${number}rem`): number {
    const remValue = parseFloat(remSizeSpace)
    const validSize = remValue / 1.25
    const basePx = 16
    return validSize * basePx
  },
  getColorWithLuminosity(color: string, luminosity: BrightnessLevel): string {
    const colorBrightness: Record<BrightnessLevel, number> = {
      50: 4.5,
      100: 4,
      200: 3,
      300: 2,
      400: 1,
      500: 0,
      600: -1,
      700: -2,
      800: -3,
      900: -4,
      950: -4.5
    }

    const colorWithLuminosity = chroma(color).brighten(colorBrightness[luminosity]).css()
    return colorWithLuminosity
  },
  defineTextColor(backgroundColor: string): string {
    if (chroma(backgroundColor).luminance() < 0.55) {
      return chroma(backgroundColor).brighten(5).css()
    } else {
      return chroma(backgroundColor).darken(5).css()
    }
  },
  validateSpecificChildren(
    children: React.ReactNode,
    validChildrenList: React.ElementType[] | ComponentWithTarget[]
  ): boolean {
    if (!children) return false

    const childrenArray = React.Children.toArray(children)

    return childrenArray.every(child => {
      if (!React.isValidElement(child)) return false

      const componentType = child.type as ComponentWithTarget

      const isValid = validChildrenList.some(
        validComponent => componentType === validComponent || componentType.target === validComponent
      )

      return isValid
    })
  },
  validateJSXTree(element: ReactNode, validChildrenList: React.ElementType[] | ComponentWithTarget[]): boolean {
    if (!React.isValidElement(element)) {
      return typeof element === 'string' || typeof element === 'number'
    }

    if (!this.validateSpecificChildren(element, validChildrenList)) {
      return false
    }

    if (element.props && element.props.children) {
      const children = React.Children.toArray(element.props.children)

      for (const child of children) {
        if (!this.validateJSXTree(child, validChildrenList)) {
          return false
        }
      }
    }

    return true
  }
}
