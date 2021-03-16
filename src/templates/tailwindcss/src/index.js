// React
import React from 'react'
import ReactDOM from 'react-dom'

// Styles
import '@styles/library/tailwind.base.pcss'
import '@styles/loader.base.pcss'
import '@styles/library/tailwind.components.pcss'
import '@styles/library/tailwind.utilities.pcss'

// Components
import App from './containers/App'

ReactDOM.render(<App />, document.getElementById('app'))
