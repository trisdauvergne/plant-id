import React from 'react';
import './footer.scss'

const Footer = () => {
  return (
    <footer>
      <a href="https://github.com/Plant-id/Plant-id-API/wiki">Go to Plant ID Docs</a>
      <p>Environment:  {process.env.NODE_ENV}</p>
      <p>Testing the .env: {process.env.REACT_APP_TEST}</p>
    </footer>
  )
}

export default Footer
