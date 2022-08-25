const MAIN = 'main';
const STARTUP = 'startup';
const NEW_LOG = 'new-log'


export const MAIN_TAB = {
  Home: 'main/home' as const,
}

const ROUTE_PATH = {
  MAIN,
  STARTUP,
  NEW_LOG
} as const

export default ROUTE_PATH