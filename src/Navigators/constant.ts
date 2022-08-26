const MAIN = 'main';
const STARTUP = 'startup';
const NEW_TRANSACTION = 'new-transaction'


export const MAIN_TAB = {
  Home: 'main/home' as const,
}

const ROUTE_PATH = {
  MAIN,
  STARTUP,
  NEW_TRANSACTION
} as const

export default ROUTE_PATH