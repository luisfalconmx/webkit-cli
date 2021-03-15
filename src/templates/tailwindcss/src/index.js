// React
import React from 'react'
import ReactDOM from 'react-dom'

// Components
import App from './containers/App'

// Styles
import './styles/loader.base.pcss'
import './styles/library/tailwind.base.pcss'
import './styles/library/tailwind.components.pcss'
import './styles/loader.components.pcss'
import './styles/library/tailwind.utilities.pcss'

ReactDOM.render(<App />, document.getElementById('app'))
