import { CSSTransition } from 'react-transition-group'
import React, { useState, useEffect} from 'react';
const Animation = (props) => {
  const {isShow,children,className,transitionStyles} = props;
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    setShow(isShow);
  }, [show]);

  return (<CSSTransition in={isShow} timeout={2}>
    {state => (
      <div
        onMouseOver={(e)=>{
          setShow(true);
        }}
        onMouseOut={(e)=>{
          setShow(false);
        }}
        className={className +' animation-content'}
        style={{
          ...transitionStyles[state] }}
      >
        {children}
      </div>
    )}
  </CSSTransition>)
} 
export default Animation;