import React from 'react'
import {Header} from './Header'
import {Content} from './Content'
import {Total} from './Total'

export const Course = (props) =>  (<div>
    {console.log('Course: ', props)}
    <Header header={props.course.name} />
    <Content parts={props.course.parts} />
    <Total parts={props.course.parts} />
  </div>)