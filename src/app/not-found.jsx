import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>404 - Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link href="/">
        <button style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Return Home
        </button>
      </Link>
    </div>
  );
}