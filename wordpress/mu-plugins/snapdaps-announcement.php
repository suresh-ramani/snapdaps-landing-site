<?php
/*
 * Plugin Name: Snapdaps announcement bar
 * Description: Settings → Announcement. The bar shown above the header on snapdaps.ai (and, for
 *   launches and offers, as a pill on the home hero). Exposed to the Next.js site over WPGraphQL as
 *   `announcement`. Source of truth: landing-site repo → wordpress/mu-plugins/.
 */

const SNAPDAPS_ANNOUNCEMENT_OPTION = 'snapdaps_announcement';

function snapdaps_announcement_defaults() {
  return [
    'enabled'    => false,
    'message'    => '',
    'link_label' => '',
    'link_url'   => '',
    'style'      => 'info', // info | offer | launch
    'starts_at'  => '',     // site-local "Y-m-d\TH:i" (datetime-local input)
    'ends_at'    => '',
    'on_hero'    => false,
  ];
}

function snapdaps_announcement() {
  return wp_parse_args(get_option(SNAPDAPS_ANNOUNCEMENT_OPTION, []), snapdaps_announcement_defaults());
}

/* ---------- Settings → Announcement ---------- */

add_action('admin_init', function () {
  register_setting('snapdaps_announcement', SNAPDAPS_ANNOUNCEMENT_OPTION, [
    'type'              => 'array',
    'sanitize_callback' => function ($in) {
      $in = is_array($in) ? $in : [];
      $date = fn($v) => preg_match('/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/', $v ?? '') ? $v : '';
      return [
        'enabled'    => !empty($in['enabled']),
        'message'    => sanitize_text_field($in['message'] ?? ''),
        'link_label' => sanitize_text_field($in['link_label'] ?? ''),
        'link_url'   => esc_url_raw(trim($in['link_url'] ?? '')), // keeps site paths like /pricing
        'style'      => in_array($in['style'] ?? '', ['info', 'offer', 'launch'], true) ? $in['style'] : 'info',
        'starts_at'  => $date($in['starts_at'] ?? ''),
        'ends_at'    => $date($in['ends_at'] ?? ''),
        'on_hero'    => !empty($in['on_hero']),
      ];
    },
    'default' => snapdaps_announcement_defaults(),
  ]);
});

add_action('admin_menu', function () {
  add_options_page('Announcement', 'Announcement', 'manage_options', 'snapdaps-announcement', 'snapdaps_announcement_page');
});

function snapdaps_announcement_page() {
  $a = snapdaps_announcement();
  $name = fn($k) => esc_attr(SNAPDAPS_ANNOUNCEMENT_OPTION . "[$k]");
  ?>
  <div class="wrap">
    <h1>Announcement</h1>
    <p>The bar above the header on every page of snapdaps.ai. Saving updates the site within seconds.
      Times use this site's timezone (<?php echo esc_html(wp_timezone_string()); ?>).</p>
    <form method="post" action="options.php">
      <?php settings_fields('snapdaps_announcement'); ?>
      <table class="form-table" role="presentation">
        <tr><th scope="row">Show announcement</th>
          <td><label><input type="checkbox" name="<?php echo $name('enabled'); ?>" value="1" <?php checked($a['enabled']); ?>> On</label></td></tr>
        <tr><th scope="row"><label for="sa-message">Message</label></th>
          <td><input id="sa-message" class="large-text" maxlength="140" name="<?php echo $name('message'); ?>" value="<?php echo esc_attr($a['message']); ?>" placeholder="Diwali offer: 20% off yearly plans">
            <p class="description">One short sentence, up to 140 characters.</p></td></tr>
        <tr><th scope="row"><label for="sa-label">Button text</label></th>
          <td><input id="sa-label" class="regular-text" maxlength="30" name="<?php echo $name('link_label'); ?>" value="<?php echo esc_attr($a['link_label']); ?>" placeholder="See pricing"></td></tr>
        <tr><th scope="row"><label for="sa-url">Button link</label></th>
          <td><input id="sa-url" class="regular-text" name="<?php echo $name('link_url'); ?>" value="<?php echo esc_attr($a['link_url']); ?>" placeholder="/pricing">
            <p class="description">A page on the site (<code>/pricing</code>) or a full URL. Leave empty for no button.</p></td></tr>
        <tr><th scope="row"><label for="sa-style">Style</label></th>
          <td><select id="sa-style" name="<?php echo $name('style'); ?>">
            <?php foreach (['info' => 'Info', 'offer' => 'Offer', 'launch' => 'Launch'] as $v => $l) : ?>
              <option value="<?php echo esc_attr($v); ?>" <?php selected($a['style'], $v); ?>><?php echo esc_html($l); ?></option>
            <?php endforeach; ?>
          </select></td></tr>
        <tr><th scope="row"><label for="sa-start">Start</label></th>
          <td><input id="sa-start" type="datetime-local" name="<?php echo $name('starts_at'); ?>" value="<?php echo esc_attr($a['starts_at']); ?>">
            <p class="description">Optional. Leave empty to show it straight away.</p></td></tr>
        <tr><th scope="row"><label for="sa-end">End</label></th>
          <td><input id="sa-end" type="datetime-local" name="<?php echo $name('ends_at'); ?>" value="<?php echo esc_attr($a['ends_at']); ?>">
            <p class="description">Optional. It disappears on its own after this time.</p></td></tr>
        <tr><th scope="row">Home page hero</th>
          <td><label><input type="checkbox" name="<?php echo $name('on_hero'); ?>" value="1" <?php checked($a['on_hero']); ?>> Also show as a small pill above the home page headline</label>
            <p class="description">For launches and offers (Style: Launch or Offer) — needs a button link. Not shown for Info.</p></td></tr>
      </table>
      <?php submit_button(); ?>
    </form>
  </div>
  <?php
}

/* ---------- WPGraphQL: { announcement { … } } ---------- */

add_action('graphql_register_types', function () {
  register_graphql_object_type('SnapdapsAnnouncement', [
    'description' => 'Announcement bar for the Next.js site (Settings → Announcement).',
    'fields' => [
      'enabled'   => ['type' => 'Boolean'],
      'message'   => ['type' => 'String'],
      'linkLabel' => ['type' => 'String'],
      'linkUrl'   => ['type' => 'String'],
      'style'     => ['type' => 'String'],
      'startsAt'  => ['type' => 'String', 'description' => 'ISO 8601 with offset, or null'],
      'endsAt'    => ['type' => 'String', 'description' => 'ISO 8601 with offset, or null'],
      'onHero'    => ['type' => 'Boolean'],
    ],
  ]);
  register_graphql_field('RootQuery', 'announcement', [
    'type'    => 'SnapdapsAnnouncement',
    'resolve' => function () {
      $a = snapdaps_announcement();
      $iso = function ($local) {
        if (!$local) return null;
        $d = date_create_immutable($local, wp_timezone());
        return $d ? $d->format(DATE_ATOM) : null;
      };
      return [
        'enabled'   => (bool) $a['enabled'],
        'message'   => $a['message'],
        'linkLabel' => $a['link_label'],
        'linkUrl'   => $a['link_url'],
        'style'     => $a['style'],
        'startsAt'  => $iso($a['starts_at']),
        'endsAt'    => $iso($a['ends_at']),
        'onHero'    => (bool) $a['on_hero'],
      ];
    },
  ]);
});

/* ---------- Refresh the site when it's saved (uses snapdaps-revalidate.php when installed) ---------- */

add_action('update_option_' . SNAPDAPS_ANNOUNCEMENT_OPTION, function () {
  if (function_exists('snapdaps_revalidate')) snapdaps_revalidate(['type' => 'announcement']);
});
add_action('add_option_' . SNAPDAPS_ANNOUNCEMENT_OPTION, function () {
  if (function_exists('snapdaps_revalidate')) snapdaps_revalidate(['type' => 'announcement']);
});
