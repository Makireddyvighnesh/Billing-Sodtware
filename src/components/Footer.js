// src/components/Footer.js
import styles from '../styles/Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Billing Software. All rights reserved.</p>
      <div className={styles.links}>
        <a href="/terms">Terms of Service</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/contact">Contact Us</a>
      </div>
    </footer>
  )
}

export default Footer
