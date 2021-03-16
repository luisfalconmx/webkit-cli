import React from 'react'
import '@styles/components/Hello.pcss'
import Logo from '@images/logo.png'

const Hello = () => (
  <div className="Hello">
    <img className="Hello__logo" src={Logo} alt="" />
    <h1 className="Hello__title">Webkit CLI</h1>
    <p className="Hello__subtitle">React + Tailwindcss + Postcss + Webpack</p>
    <a className="Hello__link" href="https://github.com/luisfalconmx">
      by luisfalconmx
    </a>
  </div>
)

export default Hello
