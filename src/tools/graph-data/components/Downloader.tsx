import { useRef, useState } from "react";
import { Parser } from "@json2csv/plainjs";

function create_blob_url(content, mimetype) {
  const blob = new Blob(content, {
    type: mimetype,
  });

  return window.URL.createObjectURL(blob);
}

async function download(content, ext, keys = null) {
  if (ext === "csv") {
    const parser = new Parser({ fields: keys });
    const csv = parser.parse(content);
    return create_blob_url([csv], "text/csv");
  }
  return create_blob_url([JSON.stringify(content)], "application/json");
}

export default function Downloader({
  content,
  filename,
  ext,
  children,
  keys = null,
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);

  const timestamp = new Date()
    .toISOString()
    .replaceAll(/[-:]/gi, "")
    .replace("T", "-")
    .split(".")[0];

  return (
    <button
      className={[
        "nextra-button nx-transition-all active:nx-opacity-50 nx-ml-2",
        "nx-bg-primary-700/5 nx-border nx-border-black/5 nx-text-gray-600 hover:nx-text-gray-900 nx-rounded-md nx-p-1.5",
        "dark:nx-bg-primary-300/10 dark:nx-border-white/10 dark:nx-text-gray-400 dark:hover:nx-text-gray-50",
      ].join(" ")}
      onClick={() => {
        if (loading) return;
        setLoading(true);
        download(content, ext, keys)
          .then((fileUrl) => {
            setFile(fileUrl);
          })
          .then(() => {
            ref.current?.click();
          })
          .finally(() => setLoading(false));
      }}
    >
      {children}
      <a
        href={file}
        download={`${timestamp}_${filename}.${ext}`}
        style={{ display: "none" }}
        ref={ref}
      />
    </button>
  );
}
