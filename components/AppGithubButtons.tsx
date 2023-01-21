import dynamic from "next/dynamic";

const GitHubButton = dynamic<any>(
  () => import("react-github-btn").then((mod) => mod.default),
  { ssr: false }
);

export const AppGithubButtons: React.FC = () => {
  return (
    <div className="flex gap-4">
      <GitHubButton
        href="https://github.com/amimaro/smart-contract-downloader"
        data-show-count="true"
        aria-label="Star amimaro/smart-contract-downloader on GitHub"
      >
        Star
      </GitHubButton>
      <GitHubButton
        href="https://github.com/amimaro/smart-contract-downloader/fork"
        aria-label="Fork amimaro/smart-contract-downloader on GitHub"
      >
        Fork
      </GitHubButton>
      <GitHubButton
        href="https://github.com/amimaro"
        aria-label="Follow @amimaro on GitHub"
      >
        Follow @amimaro
      </GitHubButton>
    </div>
  );
};
