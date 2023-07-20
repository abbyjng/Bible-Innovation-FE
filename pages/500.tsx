/* 500 internal server error page */

import Link from "next/link";

export default function ServerError() {
  return (
    <div>
      <div className="p-2 pb-20 flex flex-col h-screen justify-center text-center">
        <div>500</div>
        <div>
          We encountered an internal server error. Please{" "}
          <a href="TODO link">contact us</a> if you encounter this error.
        </div>
        <Link href="/" className="text-blue-500 underline">
          Back to home
        </Link>
      </div>
    </div>
  );
}
