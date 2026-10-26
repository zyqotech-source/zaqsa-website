// Last-resort server error page. It is plain HTML with inline styles so it still renders
// when the app bundle or stylesheet could not be served.
export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load | ZYQO</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <style>
      * { box-sizing: border-box; }
      body { font: 16px/1.6 system-ui, -apple-system, "Segoe UI", sans-serif; background: linear-gradient(180deg, #f7f9ff, #eef2ff); color: #162640; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 30rem; width: 100%; text-align: center; padding: 2rem; }
      .badge { width: 4.5rem; height: 4.5rem; margin: 0 auto 1.5rem; border-radius: 1.3rem; background: linear-gradient(135deg, #6366f1, #06b6d4); color: #fff; display: grid; place-items: center; font-size: 2rem; font-weight: 700; box-shadow: 0 22px 44px -22px rgba(79, 70, 229, 0.8); }
      .brand { font-weight: 700; letter-spacing: 0.22em; color: #4f46e5; font-size: 0.8rem; margin-bottom: 0.4rem; }
      h1 { font-size: 1.7rem; line-height: 1.15; margin: 0 0 0.6rem; letter-spacing: -0.03em; }
      p { color: #5c697a; margin: 0 0 1.6rem; }
      .actions { display: flex; gap: 0.6rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.7rem 1.4rem; border-radius: 999px; font: inherit; font-weight: 700; font-size: 0.9rem; cursor: pointer; text-decoration: none; border: 1px solid #4f46e5; }
      .primary { background: #4f46e5; color: #fff; }
      .secondary { background: #fff; color: #4f46e5; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="badge" aria-hidden="true">!</div>
      <div class="brand">ZYQO</div>
      <h1>This page didn't load.</h1>
      <p>Something went wrong on our side, or your connection dropped. Please try again in a moment.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
