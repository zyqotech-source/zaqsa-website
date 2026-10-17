<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Site copy and service lists live in src/lib/content.ts; pages render from it so services can be added without layout changes.
- The homepage 3D globe is procedural and asset-free so it remains fast, reliable, and adjustable through code.
- Keep the globe canvas square and bounded by its hero column so perspective framing preserves the entire sphere and orbit at every screen width.
