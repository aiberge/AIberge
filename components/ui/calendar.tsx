"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export type CalendarProps = {
  className?: string;
}

function Calendar({ className }: CalendarProps) {
  React.useEffect(() => {
    // Load cal.com script
    const script = document.createElement('script');
    script.innerHTML = `
      (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
      Cal("init", "30min", {origin:"https://cal.com"});
      Cal.ns["30min"]("ui", {"styles":{"branding":{"brandColor":"#000000"}},"hideEventTypeDetails":false,"layout":"month_view"});
    `;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={cn("flex justify-center items-center h-full", className)}>
      <Button
        data-cal-link="imad-meddach-3slpkj/30min"
        data-cal-namespace="30min"
        data-cal-config='{"layout":"month_view"}'
        className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded text-lg"
      >
        Book a meeting
      </Button>
    </div>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }