import React from 'react'
import PropTypes from 'prop-types'

const Hero = (props) => {
  const { title, image, imageAlt } = props

  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-col justify-center items-center">
      <img src={image} alt={imageAlt} />
      <h1 className="text-white text-5xl font-bold">{title}</h1>
    </div>
  )
}

Hero.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  imageAlt: PropTypes.string
}

export default Hero
