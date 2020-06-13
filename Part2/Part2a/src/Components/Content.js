import React from 'react'
import {Part} from './Part'

export const Content = (props) => 
  (<div> {console.log('Parts: ', props)}
    {props.parts.map((part, index) => (<Part part={part} key={index} />))}
  </div>)