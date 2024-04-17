import React from 'react'
import ReactDom from 'react-dom'

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: 'black',
  transform: 'translate(-50%,-56%)',
  zIndex: 1000,
  height:'90%',
  width: '90%',
  color:'white',
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'black', 
  zIndex: 1000,
  color:'white',
}

export default function Modal({ children, onClose }) {
  return ReactDom.createPortal(
    <div>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}> 
      {/* X ka liye only */}
      <button className='btn bg-danger fs-6 text-white mt-2' style={{marginLeft:'96%'}} onClick={onClose}>X</button> 
        {children} 
      </div>
    </div>,
    document.getElementById('cart-root')
  )
} 