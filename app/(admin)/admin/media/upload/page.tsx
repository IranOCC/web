"use client";

import PanelCard from "@/components/@panel/Card";
import MediaHandler from "@/components/Uploader/MediaHandler";

export default function Page() {
  return (
    <>
      <div className="p-4 pt-0">
        <PanelCard>
          <MediaHandler
            //
            fromLibrary={false}
            // onChange={(value: StorageFile[]) => setSelected((selected) => [...selected, ...value])}
            uploadPath="main"
            noSpace
            showFilesList={false}
            showUploadList
          />
        </PanelCard>
      </div>
    </>
  );
}
