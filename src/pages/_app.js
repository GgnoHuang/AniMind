import "@fortawesome/fontawesome-svg-core/styles.css" // 導入FontAwesome CSS
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false // 禁用自動添加CSS
// fontawesome

import "../styles/style.css"
import "./rotate.css"
import "../styles/member-input.css"

// import "nes.css/css/nes.min.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
