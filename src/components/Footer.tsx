const Footer = () => {
  return(
    <footer>
      <div className="social-media">
        <a href="https://twitter.com/" aria-label="Go to My Market's Twitter">
          <img src="src/assets/icons/twitter.svg" alt="twitter icon"/>
        </a>
        <a href="https://instagram.com/" aria-label="Go to My Market's Instagram">
          <img src="src/assets/icons/instagram.svg" alt="instagram icon"/>
        </a>
        <a href="https://tiktok.com/" aria-label="Go to My Market's Tiktok">
          <img src="src/assets/icons/tiktok.svg" alt="tiktok icon"/>
        </a>
      </div>
      <p>My Market. All rights reserved.</p>
      <ul className="legal-links">
        <li><a href="#">Privacy Policy</a></li> 
        <li>|</li> 
        <li><a href="#">Terms of Service</a></li>
        <li>|</li> 
        <li><a href="#">Contact Us</a></li>
      </ul>
    </footer>
  )
}

export default Footer;