import Link from "next/link";

export default function Nav() {
  return (
    <nav style={{ marginBottom: "1rem" }}>
      <Link href="/" style={{ marginRight: "1rem" }}>
        Form
      </Link>
      <Link href="/history">
        History
      </Link>
    </nav>
  );
}
