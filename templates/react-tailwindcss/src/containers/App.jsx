import React from 'react'
import Hero from '@components/Hero'
import Logo from '@images/tailwindcss.png'

const App = () => (
  <>
    <Hero
      title="React + Tailwindcss"
      image={Logo}
      imageAlt="Tailwindcss Logo"
    />
  </>
)

export default App
