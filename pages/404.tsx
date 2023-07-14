/* 404 error page */

import MenuBarTop from "@/components/MenuBar";
import { Page } from "@/utils/types";

export default function PageError() {
  return (
    <div>
      <MenuBarTop currentPage={Page.FEED} />
      <div className="p-2 pb-20 flex flex-col h-screen justify-center">
        <div>404</div>
        <div>We couldn&apos;t find that page. Please try again.</div>
      </div>
    </div>
  );
}
