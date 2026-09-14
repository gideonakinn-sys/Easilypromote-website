/**
 * Content for /developers. Kept apart from the page so the examples and tables
 * can be checked against the API without reading layout code.
 *
 * The test vector below was computed with the same HMAC the API verifies; if the
 * signing scheme ever changes, regenerate it rather than editing by hand.
 */

export const WEBHOOK_URL = 'https://api.easilypromote.com/api/webhooks/conversions'
export const APP_SETTINGS_URL = 'https://app.easilypromote.com/dashboard/brand/settings/referral'

export const FLOW_STEPS = [
  {
    who: 'Easily Promote',
    title: 'A creator joins your campaign and gets a code',
    body: 'Each creator gets one code, like ACME-TUNDE. You can also supply codes from your own referral system instead.',
  },
  {
    who: 'Your team',
    title: 'You add the code to your app',
    body: 'Load the codes into your referral or promo system, by CSV or one at a time, so your app accepts them at sign-up.',
  },
  {
    who: 'Creator',
    title: 'The creator shares the code with their audience',
    body: 'Viewers see the content and enter the code when they sign up, install, deposit or buy. They never interact with Easily Promote.',
  },
  {
    who: 'Your server',
    title: 'Your server tells us about the conversion',
    body: 'When your definition of a conversion happens, send one signed POST with the code, the event type and a unique event ID.',
  },
  {
    who: 'Easily Promote',
    title: 'We credit the creator',
    body: 'We verify the signature, match the code to its creator and update your campaign and the creator’s dashboard in real time.',
  },
]

export const QUICKSTART = [
  'In the Easily Promote app, open Referral tracking settings and generate a signing key.',
  'Store the key ID and secret on your server as EP_KEY_ID and EP_WEBHOOK_SECRET. Never ship them in an app or website.',
  'Send a test event (add "test": true) and confirm you show as Connected. Nothing is counted.',
  'Turn on referral tracking for a campaign and load the creators’ codes into your app.',
  'Send a real event every time someone converts with one of those codes.',
]

export type FieldRow = {
  name: string
  type: string
  required: boolean
  description: string
  example: string
}

export const FIELDS: FieldRow[] = [
  {
    name: 'event_id',
    type: 'string, 1–128 chars',
    required: true,
    description:
      'Your own unique ID for this conversion, such as the new user’s internal ID or a signup record ID. Sending the same event_id again is safe and is never counted twice.',
    example: '"signup-10482"',
  },
  {
    name: 'code',
    type: 'string, 1–64 chars',
    required: true,
    description: 'The referral code the user entered. Case-insensitive.',
    example: '"ACME-TUNDE"',
  },
  {
    name: 'event',
    type: 'enum',
    required: true,
    description:
      'One of install, signup, purchase, deposit or custom. Every event is stored, but only the event type chosen on the campaign counts toward its conversions.',
    example: '"signup"',
  },
  {
    name: 'timestamp',
    type: 'ISO 8601 string',
    required: true,
    description: 'When the conversion happened, with a timezone offset or Z.',
    example: '"2026-09-14T18:00:00Z"',
  },
  {
    name: 'test',
    type: 'boolean',
    required: false,
    description:
      'Set true to verify your key and signature without recording anything. The code does not need to exist; the response tells you whether it would match.',
    example: 'true',
  },
]

export type ResponseRow = {
  status: string
  body: string
  meaning: string
  retry: string
}

export const RESPONSES: ResponseRow[] = [
  {
    status: '200',
    body: '{"status":"recorded","counted":true}',
    meaning: 'Saved and credited. counted is false when the event type differs from the campaign’s.',
    retry: 'No',
  },
  {
    status: '200',
    body: '{"status":"ignored","reason":"event_id already recorded"}',
    meaning: 'A duplicate of an event you already sent. Treat as success.',
    retry: 'No',
  },
  {
    status: '200',
    body: '{"status":"test_ok","code":{"value":"ACME-TUNDE","found":true,…}}',
    meaning: 'Test event verified. Nothing was recorded.',
    retry: 'No',
  },
  {
    status: '400',
    body: '{"error":"Invalid payload","details":["event: …"]}',
    meaning: 'Missing or invalid field, or the body is not JSON. details says which field.',
    retry: 'Fix the request',
  },
  {
    status: '401',
    body: '{"error":"Signature does not match"}',
    meaning:
      'Missing, unknown, revoked or expired key; a signature that does not match; or a timestamp more than 5 minutes from our clock.',
    retry: 'Fix the request',
  },
  {
    status: '404',
    body: '{"error":"Unknown referral code"}',
    meaning: 'No creator in your account has that code.',
    retry: 'No',
  },
  {
    status: '409',
    body: '{"error":"Campaign is not accepting conversions"}',
    meaning: 'The code is disabled, or its campaign ended more than 7 days ago or was cancelled.',
    retry: 'No',
  },
  {
    status: '413',
    body: '{"error":"…"}',
    meaning: 'Body larger than 16 KB.',
    retry: 'Fix the request',
  },
  {
    status: '429',
    body: '{"error":"Too many requests for this key. Slow down and retry."}',
    meaning: 'More than 50 requests per second for one key.',
    retry: 'Yes, with backoff',
  },
  {
    status: '5xx',
    body: '—',
    meaning: 'Something went wrong on our side.',
    retry: 'Yes, with backoff',
  },
]

export const TEST_VECTOR = {
  secret: 'whsec_example_do_not_use_4f9a2c81d0e3',
  timestamp: '1789408800',
  body: '{"event_id":"signup-10482","code":"ACME-TUNDE","event":"signup","timestamp":"2026-09-14T18:00:00Z"}',
  signedString:
    '1789408800.{"event_id":"signup-10482","code":"ACME-TUNDE","event":"signup","timestamp":"2026-09-14T18:00:00Z"}',
  signature: 'd92d13806363429d72242ce2c94acbc5629dba5631e101f773842c9ea6016203',
}

export type CodeLanguage = 'node' | 'python' | 'php' | 'curl'

export const CODE_LABELS: Record<CodeLanguage, string> = {
  node: 'Node.js',
  python: 'Python',
  php: 'PHP',
  curl: 'cURL',
}

export const CODE_SAMPLES: Record<CodeLanguage, string> = {
  node: [
    'const crypto = require("crypto");',
    '',
    'async function sendConversion({ code, eventId, event = "signup", test = false }) {',
    '  const body = JSON.stringify({',
    '    event_id: eventId,',
    '    code,',
    '    event,',
    '    timestamp: new Date().toISOString(),',
    '    ...(test ? { test: true } : {}),',
    '  });',
    '  const t = Math.floor(Date.now() / 1000);',
    '  const v1 = crypto',
    '    .createHmac("sha256", process.env.EP_WEBHOOK_SECRET)',
    '    .update(`${t}.${body}`)',
    '    .digest("hex");',
    '',
    `  const res = await fetch("${WEBHOOK_URL}", {`,
    '    method: "POST",',
    '    headers: {',
    '      "Content-Type": "application/json",',
    '      "X-EP-Key-Id": process.env.EP_KEY_ID,',
    '      "X-EP-Signature": `t=${t},v1=${v1}`,',
    '    },',
    '    body, // send exactly the string you signed',
    '  });',
    '  return { status: res.status, body: await res.json() };',
    '}',
  ].join('\n'),
  python: [
    'import hashlib, hmac, json, os, time',
    'from datetime import datetime, timezone',
    'import requests',
    '',
    'def send_conversion(code, event_id, event="signup", test=False):',
    '    payload = {',
    '        "event_id": event_id,',
    '        "code": code,',
    '        "event": event,',
    '        "timestamp": datetime.now(timezone.utc).isoformat(),',
    '    }',
    '    if test:',
    '        payload["test"] = True',
    '    body = json.dumps(payload, separators=(",", ":"))',
    '    t = str(int(time.time()))',
    '    v1 = hmac.new(',
    '        os.environ["EP_WEBHOOK_SECRET"].encode(),',
    '        f"{t}.{body}".encode(),',
    '        hashlib.sha256,',
    '    ).hexdigest()',
    '',
    '    res = requests.post(',
    `        "${WEBHOOK_URL}",`,
    '        data=body,  # send exactly the string you signed',
    '        headers={',
    '            "Content-Type": "application/json",',
    '            "X-EP-Key-Id": os.environ["EP_KEY_ID"],',
    '            "X-EP-Signature": f"t={t},v1={v1}",',
    '        },',
    '        timeout=10,',
    '    )',
    '    return res.status_code, res.json()',
  ].join('\n'),
  php: [
    '<?php',
    "function send_conversion(string $code, string $eventId, string $event = 'signup', bool $test = false): array {",
    '    $payload = [',
    "        'event_id' => $eventId,",
    "        'code' => $code,",
    "        'event' => $event,",
    "        'timestamp' => gmdate('Y-m-d\\TH:i:s\\Z'),",
    '    ];',
    '    if ($test) {',
    "        $payload['test'] = true;",
    '    }',
    '    $body = json_encode($payload);',
    '    $t = time();',
    "    $v1 = hash_hmac('sha256', $t . '.' . $body, getenv('EP_WEBHOOK_SECRET'));",
    '',
    `    $ch = curl_init('${WEBHOOK_URL}');`,
    '    curl_setopt_array($ch, [',
    '        CURLOPT_POST => true,',
    '        CURLOPT_POSTFIELDS => $body, // send exactly the string you signed',
    '        CURLOPT_RETURNTRANSFER => true,',
    '        CURLOPT_TIMEOUT => 10,',
    '        CURLOPT_HTTPHEADER => [',
    "            'Content-Type: application/json',",
    "            'X-EP-Key-Id: ' . getenv('EP_KEY_ID'),",
    '            "X-EP-Signature: t={$t},v1={$v1}",',
    '        ],',
    '    ]);',
    '    $response = curl_exec($ch);',
    '    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);',
    '    curl_close($ch);',
    "    return ['status' => $status, 'body' => json_decode($response, true)];",
    '}',
  ].join('\n'),
  curl: [
    `BODY='{"event_id":"signup-10482","code":"ACME-TUNDE","event":"signup","timestamp":"2026-09-14T18:00:00Z","test":true}'`,
    'T=$(date +%s)',
    `SIG=$(printf '%s' "$T.$BODY" | openssl dgst -sha256 -hmac "$EP_WEBHOOK_SECRET" | sed 's/^.* //')`,
    '',
    `curl -X POST ${WEBHOOK_URL} \\`,
    '  -H "Content-Type: application/json" \\',
    '  -H "X-EP-Key-Id: $EP_KEY_ID" \\',
    '  -H "X-EP-Signature: t=$T,v1=$SIG" \\',
    '  -d "$BODY"',
  ].join('\n'),
}

export const SAMPLE_REQUEST = [
  `POST ${WEBHOOK_URL}`,
  'Content-Type: application/json',
  'X-EP-Key-Id: key_4f9a2c81d0e3',
  'X-EP-Signature: t=1789408800,v1=d92d1380…6016203',
  '',
  '{',
  '  "event_id": "signup-10482",',
  '  "code": "ACME-TUNDE",',
  '  "event": "signup",',
  '  "timestamp": "2026-09-14T18:00:00Z"',
  '}',
].join('\n')

export const FAQ = [
  {
    q: 'Do creators need an account on our platform?',
    a: 'No. Codes move between you and Easily Promote only. Creators just share the code; your users enter it the way they normally would.',
  },
  {
    q: 'We already have our own referral codes. Can we use them?',
    a: 'Yes. Choose “We’ll use our own codes” on the campaign, then set a code per creator or import a CSV with creator_username and code columns. The webhook works the same way.',
  },
  {
    q: 'What personal data should we send?',
    a: 'None. Send only the code, the event type, your event ID and the time. Do not put names, emails or phone numbers in event_id either.',
  },
  {
    q: 'Which events count as conversions?',
    a: 'Each campaign picks one event type, such as signup. We store every event you send, but only that type moves the campaign’s conversion count.',
  },
  {
    q: 'What happens when a campaign ends?',
    a: 'Completed campaigns keep accepting conversions for 7 days so late events are not lost. After that, and for cancelled campaigns, you get a 409.',
  },
  {
    q: 'How do we rotate a key without downtime?',
    a: 'Click Rotate in the app. The old key keeps working for 24 hours while you deploy the new one, then stops. Revoke a key immediately if it leaks.',
  },
  {
    q: 'Can several servers send events?',
    a: 'Yes. You can have up to three active keys, for example one per service, and every server can send to the same URL.',
  },
]
