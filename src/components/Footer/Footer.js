import React from 'react';
import './footer.scss'

const Footer = () => {
  return (
    <footer>
      <a href="https://github.com/Plant-id/Plant-id-API/wiki" rel="noreferrer">Go to Plant ID Docs</a>
      <p>Environment:  {process.env.NODE_ENV}</p>
    </footer>
  )
}

export default Footer
