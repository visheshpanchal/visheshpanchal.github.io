export default function Footer({ config, personal }) {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" aria-label="Footer">
      <div className="footer__inner">
        <p className="footer__copy">
          &copy; {year}{' '}
          <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
            {personal.name}
          </span>
          . All rights reserved.
        </p>
        {config.text && (
          <p className="footer__text">
            {config.text}
          </p>
        )}
      </div>
    </footer>
  )
}
