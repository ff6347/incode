<!-- ABOUTME: Stores durable project conventions and asset-hosting knowledge. -->
<!-- ABOUTME: Provides verification context for work on the static Astro site. -->

# Memory

## Images

- [decision] Serve p5 article illustrations from `public/assets/images` using `/assets/images/` URLs, independently of CodePen asset hosting.
- [technique] The sibling `p5.incode.cc` repository contains matching source illustrations under `colors/assets/images` and `form/assets/images`.

## Verification

- [technique] `npm run build` runs Astro checks and generates the static site; compare copied images with their source files and scan the generated site for asset-host URLs.
- [risk] The baseline build emits hints and static-output warnings; dependency security advisories and build diagnostics are tracked separately in git-bug.
