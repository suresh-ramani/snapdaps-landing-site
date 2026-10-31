<?php
/*
 * Keep the WordPress front end out of search — the Next.js site is the public site.
 * Done with a header instead of Settings → Reading → "Discourage search engines", because that
 * setting makes Yoast report every post as noindex over GraphQL, and the Next.js blog honours it.
 * Source of truth: landing-site repo → wordpress/mu-plugins/.
 */
add_action('send_headers', function () {
  if (is_admin() || (defined('REST_REQUEST') && REST_REQUEST)) return;
  if (function_exists('is_graphql_http_request') && is_graphql_http_request()) return;
  header('X-Robots-Tag: noindex, nofollow', true);
});
