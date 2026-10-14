<!-- ABOUTME: Records asset replacement decisions and verification for the p5 pages. -->
<!-- ABOUTME: Tracks verification limits and follow-up work for subsequent sessions. -->

# CodePen image assets

- [decision] The color and form articles serve their 25 illustrations from `public/assets/images`; image bytes, filenames, captions, and attribution are preserved.
- [technique] The matching images were supplied in the sibling `p5.incode.cc` repository under `colors/assets/images` and `form/assets/images`.
- [decision] Ordinary CodePen sketch links and sketch-cloning functionality are outside the image-hosting task.
- [technique] `npm run build` succeeds, `git diff --check` passes, all 25 built images match the supplied originals byte-for-byte, and source/public/build scans contain no CodePen asset URLs.
- [risk] Baseline build diagnostics and dependency vulnerabilities require separate follow-up; they are tracked in git-bug.
- [blocked] Browser verification awaits the operator's visible/headless preference. A tmux preview attempt failed with `uv_cwd` EPERM; the failed preview window was cleaned up. `nono why --self` reports this agent is not sandboxed.
