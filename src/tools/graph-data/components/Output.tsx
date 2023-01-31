import { Code, Pre } from "nextra/components";
import { useState } from "react";
import Downloader from "./Downloader";

export function Output({currentRound, projects, votes}) {
  const [dataPreview, setDataPreview] = useState(undefined);

  return (
    <div className="nx-py-2">
      <div className="nx-flex nx-flex-col">
        {currentRound ? (
          <div className="nx-flex nx-flex-row nx-items-center nx-w-full nx-justify-end dark:nx-bg-primary-500/10 nx-mb-2 nx-p-2 nx-rounded-md">
            <div className="nx-grow">Round information</div>
            <button
              className={[
                "nextra-button nx-transition-all active:nx-opacity-50",
                "nx-bg-primary-700/5 nx-border nx-border-black/5 nx-text-gray-600 hover:nx-text-gray-900 nx-rounded-md nx-p-1.5",
                "dark:nx-bg-primary-300/10 dark:nx-border-white/10 dark:nx-text-gray-400 dark:hover:nx-text-gray-50",
              ].join(" ")}
              onClick={() => setDataPreview(currentRound)}
            >
              Preview
            </button>

            <Downloader
              content={currentRound}
              filename={"round-info"}
              ext={"json"}
            >
              json
            </Downloader>
          </div>
        ) : null}
        {projects ? (
          <div className="nx-flex nx-flex-row nx-items-center nx-w-full nx-justify-end dark:nx-bg-primary-500/10 nx-mb-2 nx-p-2 nx-rounded-md">
            <div className="nx-grow">Project Applications</div>
            <button
              className={[
                "nextra-button nx-transition-all active:nx-opacity-50",
                "nx-bg-primary-700/5 nx-border nx-border-black/5 nx-text-gray-600 hover:nx-text-gray-900 nx-rounded-md nx-p-1.5",
                "dark:nx-bg-primary-300/10 dark:nx-border-white/10 dark:nx-text-gray-400 dark:hover:nx-text-gray-50",
              ].join(" ")}
              onClick={() => setDataPreview(projects)}
            >
              Preview
            </button>
            <Downloader
              content={projects}
              filename={"round-projects"}
              ext={"json"}
            >
              json
            </Downloader>
            <Downloader
              content={projects}
              filename={"round-projects"}
              ext={"csv"}
              keys={[
                { label: "id", value: "id" },
                { label: "createdAt", value: "createdAt" },
                { label: "updatedAt", value: "updatedAt" },
                { label: "status", value: "status" },
                { label: "payoutAddress", value: "payoutAddress" },
                { label: "recipient", value: "recipient" },
                { label: "project_lastUpdated", value: "project.lastUpdated" },
                { label: "project_id", value: "project.id" },
                { label: "title", value: "project.title" },
                { label: "description", value: "project.description" },
                { label: "website", value: "project.website" },
                { label: "bannerImg", value: "project.bannerImg" },
                { label: "logoImg", value: "project.logoImg" },
                { label: "userGithub", value: "project.userGithub" },
                { label: "projectGithub", value: "project.projectGithub" },
                { label: "projectTwitter", value: "project.projectTwitter" },
                { label: "credentials", value: "project.credentials" },
                { label: "answers", value: "answers" },
              ]}
            >
              csv
            </Downloader>
          </div>
        ) : null}
        {votes ? (
          <div className="nx-flex nx-flex-row nx-items-center nx-w-full nx-justify-end dark:nx-bg-primary-500/10 nx-mb-2 nx-p-2 nx-rounded-md">
            <div className="nx-grow">Round votes</div>
            <button
              className={[
                "nextra-button nx-transition-all active:nx-opacity-50",
                "nx-bg-primary-700/5 nx-border nx-border-black/5 nx-text-gray-600 hover:nx-text-gray-900 nx-rounded-md nx-p-1.5",
                "dark:nx-bg-primary-300/10 dark:nx-border-white/10 dark:nx-text-gray-400 dark:hover:nx-text-gray-50",
              ].join(" ")}
              onClick={() => setDataPreview(votes)}
            >
              Preview
            </button>
            <Downloader content={votes} filename={"round-votes"} ext={"json"}>
              json
            </Downloader>
            <Downloader content={votes} filename={"round-votes"} ext={"csv"}>
              csv
            </Downloader>
          </div>
        ) : null}
      </div>
      {dataPreview && (
        <Pre
          style={{ marginTop: "1.5rem", padding: "1rem", maxHeight: "80vh" }}
        >
          <Code>{JSON.stringify(dataPreview, null, 2)}</Code>
        </Pre>
      )}
    </div>
  );
}
