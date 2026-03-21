export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('No code provided');
  }

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = await tokenRes.json();

  if (data.error || !data.access_token) {
    const msg = data.error_description || data.error || 'Authentication failed';
    return res.send(postMessagePage('error', msg));
  }

  return res.send(postMessagePage('success', data.access_token));
}

function postMessagePage(status, content) {
  const message =
    status === 'success'
      ? `authorization:github:success:${JSON.stringify({ token: content, provider: 'github' })}`
      : `authorization:github:error:${content}`;

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Authenticating...</title></head>
<body>
<script>
(function () {
  var msg = ${JSON.stringify(message)};
  function send() {
    window.opener.postMessage(msg, '*');
    setTimeout(function () { window.close(); }, 500);
  }
  if (document.readyState === 'complete') {
    send();
  } else {
    window.addEventListener('load', send);
  }
})();
</script>
<p>Authenticating, please wait…</p>
</body>
</html>`;
}
