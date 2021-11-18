import { CSSTransition } from 'react-transition-group'
import React, { useState, useEffect} from 'react';
const defaultStyle= {
  position:'absolute',
  transition: `500ms ease-in-out`,
  opacity: 0,
  height: 0,
  width:'100%',
  border: '1px solid #eee',
  background: '#fff',
  zIndex:20,
  visibility: 'hidden'
};
const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 , height: '350px',visibility: 'visible'},
}

const Comp = (props) => {
  const {showFlag,children,className} = props;
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    setShow(showFlag);
  }, [showFlag]);

  return (<CSSTransition in={show} timeout={2}>
    {state => (
      <div
        onMouseMove={(e)=>{
          setShow(true);
        }}
        onMouseOut={(e)=>{
          setShow(false);
        }}
        className={className +' header-content'}
        style={{
          ...defaultStyle,
          ...transitionStyles[state] }}
      >
        {children}
      </div>
    )}
  </CSSTransition>)
} 
export default Comp;