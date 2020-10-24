<template>
  <div class="view-privacy">
    <p>
      KittyBot stores/caches your data for the following commands and services:
    </p>
    <ul>
      <li>snipe</li>
      <li>editsnipe</li>
      <li>logs for debugging</li>
    </ul>
    <br />
    <p>KittyBot stores/caches following data:</p>
    <ul>
      <li>commands you run(anonymized)</li>
      <li>messages you write/edit/delete for 5 minutes</li>
    </ul>
    <br />
    <p>KittyBot stores/caches your data in:</p>
    <ul>
      <li>commands you run(anonymized) in a database &amp; logs</li>
      <li>messages you write/edit/delete in memory</li>
    </ul>
    <br />
    <p>KittyBot does not share your data with anyone besides you</p>
    <p>
      To delete your data from KittyBot message me on our
      <a href="https://discord.gg/sD3ABd5" taget="_blank">Discord</a> my tag is
      <span style="color: #5c5fea">toπ#3141</span>
    </p>
    <br />
    <p>
      To get more information on how the bot works/saves your data feel free to
      ask me on my Discord or take a look at the source code at
      <a href="https://github.com/KittyBot-Org/KittyBot" target="_blank">GitHub</a>
    </p>
  </div>
</template>

<script>
export default {
  name: "ViewPrivacy",
};
</script>
<style lang="less" scoped>
.view-privacy {
  padding: 16px;
}
</style>
