/* 500 internal server error page */

import MenuBarTop from "@/components/MenuBar";
import { Page } from "@/utils/types";

export default function ServerError() {
  return (
    <div>
      <MenuBarTop currentPage={Page.FEED} />
      <div className="p-2 pb-20 flex flex-col h-screen justify-center">
        <div>500</div>
        <div>
          We encountered an internal server error. Please{" "}
          <a href="TODO link">contact us</a> if you encounter this error.
        </div>
      </div>
    </div>
  );
}
