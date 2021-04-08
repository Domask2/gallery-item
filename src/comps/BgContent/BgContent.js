import React from 'react'
import Bg from './Bg'
import Loader from './Loader'
import Overlay from './Overlay'

const BgContent = () => {
  return (
    <div>
      <Loader/>
      <Bg/>
      <Overlay/>
    </div>
  )
}

export default BgContent
