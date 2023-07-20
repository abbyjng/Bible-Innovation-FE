/* 404 error page */

import Link from "next/link";

export default function PageError() {
  return (
    <div>
      <div className="p-2 pb-20 flex flex-col h-screen justify-center text-center ">
        <div>404</div>
        <div>We couldn&apos;t find that page. Please try again.</div>
        <Link href="/" className="text-blue-500 underline">
          Back to home
        </Link>
      </div>
    </div>
  );
}
