import React from 'react'

const Footer = () => {
  return (
    <footer>
      <a href="https://github.com/Plant-id/Plant-id-API/wiki">Go to Plant ID Docs</a>
      <p>Environment:  {process.env.NODE_ENV}</p>
      <p>{process.env.REACT_APP_TEST}</p>
    </footer>
  )
}

export default Footer
