import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    background: {
      lunch: '#FF6868' | '#F08888'
      dinner: '#3909C2' | '#4E1AE2'
      primary: '#FFFFFF' | '#343434'
      secondary: '#FAFAFA' | '#1F1F1F'
      keyword: '#F5F5F5' | '#5C5C5C'
      footerButton: '#262626' | '#DBDBDB'
    }
    text: {
      primary: '#000000' | '#DBDBDB'
      secondary: '#757575' | '#A8A8A8'
      unselected: '#A8A8A8' | '#5C5C5C'
      count: '#424242' | '#A8A8A8'
      footerButton: '#F2F3FA' | '#222026'
    }
    icon: {
      primary: '#000000' | '#DBDBDB'
    }
  }
}
