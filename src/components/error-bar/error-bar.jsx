import React from 'react'
import './error-bar.css'
import PropTypes from 'prop-types'


const ErrorBar = ({ errorMessage, ...props }) => {
  let status1
  if (errorMessage == '') {
    status1 = 'error-bar--none'
  } else {
    status1 = 'error-bar--error'
  }
  
  return (
    <>
      <div className={ status1 } >
        { errorMessage }
      </div >
    </>
  )
}
ErrorBar.propTypes = {
  errorMessage: PropTypes.string,
}

ErrorBar.defaultProps = {
  errorMessage: ''
};

export default ErrorBar