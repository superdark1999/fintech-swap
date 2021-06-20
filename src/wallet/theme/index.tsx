// import { transparentize } from 'polished'
import React, { useMemo } from 'react'
import styled, {
  ThemeProvider as StyledComponentsThemeProvider,
  createGlobalStyle,
  css,
  DefaultTheme
} from 'styled-components'
import { useIsDarkMode } from '../state/user/hooks'
import { Text, TextProps } from 'rebass'

export * from './components'

const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    ; (accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `
    return accumulator
  },
  {}
) as any

const white = '#FFFFFF'
const black = '#000000'

export function colors(darkMode: boolean): any {
  return {
    // base
    white,
    black,

    // text
    text1: darkMode ? '#FFFFFF' : '#000000',
    text2: darkMode ? '#C3C5CB' : '#ffffff',
    text3: darkMode ? '#6C7284' : '#888D9B',
    text4: darkMode ? '#565A69' : '#C3C5CB',
    text5: darkMode ? '#2C2F36' : '#EDEEF2',
    text6: darkMode ? '#00182c' : '#cfeef3',
    text7: darkMode ? '#ffffff' : '#ffffff',
    text8: darkMode ? '#ffffff' : '#000000',
    text9: darkMode ? '#ffffff' : '#000000',

    // backgrounds / greys
    bg1: darkMode ? '#ffffff' : '#ffffff',
    bg2: darkMode ? '#2C2F36' : '#F7F8FA',
    bg3: darkMode ? '#2d3038' : '#EDEEF2',
    bg4: darkMode ? '#565A69' : '#CED0D9',
    bg5: darkMode ? '#6C7284' : '#888D9B',
    bg6: darkMode ? '#1c2d4a' : 'linear-gradient(90deg, rgb(15, 236, 229) 0%, rgb(9, 143, 221) 100%) rgba(222, 206, 232, 0.87)',
    bg7: darkMode ? 'rgba(24, 33, 46, 0.75)' : '#FFFFFF',
    bg8: darkMode ? '#0B162C' : '#fff',
    bg9: darkMode ? '#1c2d4a' : '#1c2d4a',

    //specialty colors
    modalBG: darkMode ? 'rgba(0,0,0,.425)' : 'rgba(0,0,0,0.3)',
    advancedBG: darkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.6)',
    borderBG: darkMode ? 'rgb(255 255 255 / 10%)' : 'rgba(0,0,0,0.1)',

    //primary colors
    primary1: darkMode ? '#2172E5' : '#11d03d',
    primary2: darkMode ? '#3680E7' : '#FF8CC3',
    primary3: darkMode ? '#4D8FEA' : '#D1EFF4',
    primary4: darkMode ? '#376bad70' : '#c1eef3',
    primary5: darkMode ? '#161E29' : '#f1f0f0',

    // color text
    primaryText1: darkMode ? '#6da8ff' : '#11d03d',

    // secondary colors
    secondary1: darkMode ? '#2172E5' : '#11d03d',
    secondary2: darkMode ? '#17000b26' : '#F6DDE8',
    secondary3: darkMode ? '#17000b26' : '#f1f0f0',

    // other
    red1: '#c3c3c3',
    red2: '#F82D3A',
    green1: '#27AE60',
    yellow1: '#FFE270',
    yellow2: '#000',
    blue1: '#2172E5',
    gradient: darkMode ? 'linear-gradient(90deg, rgb(15 236 229) 0%, rgb(9 143 221) 100%) rgb(222 206 232 / 87%)' : '#d0d2d8',
    gradient1: darkMode ? 'linear-gradient(90deg,rgb(93 247 242) 0%,rgb(195 229 249) 100%)' : 'linear-gradient(90deg,rgb(93 247 242) 0%,rgb(195 229 249) 100%)',

    // dont wanna forget these blue yet
    // blue4: darkMode ? '#153d6f70' : '#C4D9F8',
    // blue5: darkMode ? '#153d6f70' : '#EBF4FF',
  }
}

export function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

    grids: {
      sm: 8,
      md: 12,
      lg: 24
    },

    //shadows
    shadow1: darkMode ? '#000' : '#2F80ED',

    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useIsDarkMode()

  const themeObject = useMemo(() => theme(darkMode), [darkMode])

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

const TextWrapper = styled(Text) <{ color: keyof any }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`

export const TYPE = {
  main(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text2'} {...props} />
  },
  link(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
  },
  black(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text1'} {...props} />
  },
  white(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'white'} {...props} />
  },
  body(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color={'text1'} {...props} />
  },
  largeHeader(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={24} {...props} />
  },
  mediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={20} {...props} />
  },
  subHeader(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} {...props} />
  },
  small(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={11} {...props} />
  },
  blue(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
  },
  yellow(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'yellow1'} {...props} />
  },
  darkGray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text3'} {...props} />
  },
  gray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'bg3'} {...props} />
  },
  italic(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={12} fontStyle={'italic'} color={'text2'} {...props} />
  },
  error({ error, ...props }: { error: boolean } & TextProps) {
    return <TextWrapper fontWeight={500} color={error ? 'red1' : 'text2'} {...props} />
  }
}

export const FixedGlobalStyle = createGlobalStyle`
html, input, textarea, button {
  font-family: 'Inter', sans-serif;
  font-display: fallback;
}

@supports (font-variation-settings: normal) {
  html, input, textarea, button {
    font-family: 'Inter var', sans-serif;
  }
}

.inner{
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  position: relative;
  padding: 16px 40px;

  @media (min-width: 770px){
    padding: 16px 40px;
  }
}

/* LOGO */
.logo_dark{
  display:none;
}

body.dark-mode .logo_dark{
  display:block;
}


body.dark-mode .logo_light{
  display:none;
}


.boxgray{
  z-index: -1;
  width: 100vw;
  height: 100vh;
  user-select: none;
  position: fixed;
  top: 0vh;
  background-size: cover;
  background-position: center;
  opacity: 0.01;
}
.bgrfix{
  z-index: 0;
  width: 100vw;
  height: 100vh;
  user-select: none;
  position: fixed;
  top: 0vh;
}
.thumfix{
  mix-blend-mode: overlay;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 160px;
  top: 0px;
  background-repeat: no-repeat;
  opacity: 0.05 !important;
  background-size: auto;
  background-position: center;
}
/* DARK MODE */

body.dark-mode .mode_line{
  border: 1px solid rgb(26 54 88);
  background-color: rgb(2 26 45);
  color: #fff;
}

body.dark-mode .menu_mode{
  background:#000;
}

body.dark-mode .link-mode{
  color:#fff;
}

body.dark-mode .modetext{
  color: rgb(125,125,125);
}

body.dark-mode .modeselect{
  color: #fff;
}

body.dark-mode .modepra{
  color:#afb8bd!important;
}

body.dark-mode .bgr-fix{
  display: none;
}

body.dark-mode .modebtn{
  background-color: rgba(21,61,111,0.44);
  color: rgb(109,168,255);
  border: 1px solid rgb(26 54 88);
}

body.dark-mode .ftmode{
  background: #011d31;
}

body.dark-mode .btnout{
  background: #043461;
  color: #fff;
  box-shadow: unset;
}

body .group-dark .mon-sun{
  display: none!important;
}

body .group-dark .moon-dark{
  display: block;
}

body.dark-mode .group-dark .mon-sun{
  display: block!important;
  color: #fff;
}

body.dark-mode .setmode i{
  color: #fff;
}

body.dark-mode .group-dark .mon-sun i{
  color: #fff;
}

body.dark-mode .group-dark .moon-dark{
  display: none;
}

body.dark-mode  .mode-tab .nav-link{
  color: #888;
}

body.dark-mode  .mode-tab .nav-link.active{
  color: #fff;
}

body.dark-mode .modetoken{
  background: rgb(13 35 56);
}

body.dark-mode .modeout{
  background: #0f2337;
  color: #fff;
  border: solid 1px #0272f0;
}

body.dark-mode{
  background: radial-gradient(76.02% 75.41% at 1.84% 0%,rgb(15 25 53) 0%,rgb(24 29 37) 100%);
  background-size: cover;
  background-attachment: fixed;
}

body.dark-mode .link-mode.active{
    color: #fff;
}

body.dark-mode .sub-trade .lhSWqe.active{
  color: rgb(0, 0, 0);
}

body.dark-mode .mode-tab{
  background: rgb(29 39 53 / 75%);
  box-shadow: unset;
  color: #fff;
}

body .mode-tab{
  box-shadow: rgb(0 0 0 / 12%) -6px 4px 10px 0px, rgb(0 0 0 / 23%) -1px 7px 18px 0px;
}

body .mode-tab::after{
  background: transparent!important;
}

body.dark-mode .mode-roup{
  border: 1px solid rgb(26 54 88);
  background-color: rgb(2 26 45);
  color: #fff;
}

body.dark-mode .mode-roup p{
  color: #fff;
}

body.dark-mode .bt-menu svg{
  fill:#fff;
}

body.dark-mode .drep-mode{
  color: #fff;
}

body.dark-mode .thum-fix{
  opacity: 0.3 !important;
}

body.fix .menu-fixed{
  background: #fff;
  box-shadow: 1px 2px 6px 1px #bbaeae;
}

body.dark-mode.fix .menu-fixed{
  box-shadow: 1px 2px 6px 1px #292828;
  background: radial-gradient(circle, rgba(17,17,71,1) 0%, rgba(11,12,69,1) 22%, rgba(11,36,55,1) 100%);
}

body.dark-mode .btn_mode{
  background-color: rgba(21,61,111,0.44);
  color: rgb(109,168,255);
  border: 1px solid rgb(26 54 88);
}

body.dark-mode .btn_mode:focus{
  border: 1px solid rgb(26 117 253)!important;
  outline:none!important;
}

body.dark-mode .btn_mode:hover{
  border: 1px solid rgb(26 117 253)!important;
}

body.dark-mode div.custom,
body.dark-mode div.custom input,
body.dark-mode div.custom button {
  background-color: rgb(32, 45, 63);
  color: #fff;
}

body div.custom {
  svg {
    path {
      stroke: #fff;
    }
  }
}

body.dark-mode div.custom {
  svg {
    path {
      stroke: #fff !important;
    }
  }
}

body.dark-mode #swap-page #swap-button {
  background-color: rgba(21, 61, 111, 0.44);
}

body.dark-mode .mode-tab a.active {
  color: #fff;
}

.icon-setting svg {
  stroke: #fff;
}

.icon-change svg path{
  stroke: #fff;

  + .cls-1 {
    stroke: #fff;
  }
}

.show .menu_mode a {
  color: #6f6f6f;
}

.show .menu_mode a.active {
  color: #2b2828;
}

@media(max-width:770px){
  body.dark-mode .mode_menu{
    background:#122d42;
  }
}

body.dark-mode .bg-mode {
  background-color: #bac1c582;
  box-shadow: rgb(0 0 0 / 19%) -1px 2px 7px 0px, rgb(0 0 0 / 23%) 4px 2px 5px 0px;
}

/* TAB BRIDGE CHILD */
.navbridge{
  margin-top: 25px;
  border-bottom: unset!important;
}
.navbridge .nav-item{
  width: 30%;
  box-shadow: none;
  background: #fff;
}
.navbridge .nav-item a{
  border: none;
}
.navbridge .nav-item a.active{
  background: #f3f3f3;
}
.navbridge .nav-item a.active::after{
  position: unset;
  content: none;
}

@media (max-width:576px){
  
  .navbridge .nav-item{
    width: 33%;
  }
}



/* POPUP BRIDGE */
.ReactModalPortal > div{
  background: rgba(0,0,0,.5)!important;
  backdrop-filter: blur(3px)!important;
  z-index: 99;
}

.md_bridge{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  background: #fff;
  background-size: cover;
  color: #000;
  border-radius: 10px;
  max-width: 600px;
  min-height: 600px;
  width: 100%;
  padding: 35px;
  outline: none!important;
  /* border: 1px solid rgba(85,153,255,0.2); */
}

.md_bridge .nav-tabs{
  border-bottom: unset!important;
  flex-wrap: nowrap;
 
}
.md_bridge .nav-item{
  width: 50%;
  box-shadow: 0 10px 21px rgb(0 173 232 / 13%);
  cursor: pointer;
  
}
.md_bridge .nav-item a{
  position: relative;
  padding: 0;
  border: none;
}
.md_bridge .nav-item a.active::after{
  display: block;
    position: absolute;
    content: "";
    width: 100%;
    height: 4px;
    bottom: 0;
    background-image: linear-gradient(to left top,#0138df,#0082ff,#00b3ff,#00ddda,#3fffac);
}

@media (max-width:770px){
  
  .md_bridge{
    padding: 15px;
    max-width:90vw;
    min-height: 565px;
  }
}


html,
body {
  margin: 0;
  padding: 0;
  background-attachment: fixed;
  background-position:center;
}

* {
  box-sizing: border-box;
}

button {
  user-select: none;
}

html {
  font-size: 16px;
  font-variant: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-feature-settings: 'ss01' on, 'ss02' on, 'cv01' on, 'cv03' on;
  
}
`



export const ThemedGlobalStyle = createGlobalStyle`


body {
  min-height: 100vh;
  background-repeat: no-repeat;

  &.dark-mode {
    &.fix {
      .menu-fix {
        background: #10192f;
        position: fixed;
      }
    }
  }
 

  &.fix {
    .menu-fix {
      background: radial-gradient(76.02% 75.41% at 1.84% 0%, #619dca 0%, #8bc4ef 100%);
      position: fixed;
    }
  }
}
`
