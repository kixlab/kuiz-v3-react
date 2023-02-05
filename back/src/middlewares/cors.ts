import node_cors, { CorsOptionsDelegate } from 'cors'

export function cors(whiteList: string[] = []) {
  const corsOptionsDelegate: CorsOptionsDelegate = (req, callback) => {
    const { origin } = req.headers
    if (whiteList.length === 0) {
      callback(null, { origin: true })
    } else if (origin && whiteList.indexOf(origin) !== -1) {
      callback(null, { origin: true })
    } else {
      callback(new Error(`Not allowed by CORS ${origin}`))
    }
  }
  return node_cors(corsOptionsDelegate)
}
