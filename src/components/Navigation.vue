<template>
  <div class="nav">
    <router-link to="/" exact>Home </router-link>
    <router-link to="/features">Features </router-link>
    <router-link to="/commands">Commands </router-link>
    <a target="_blank" href="https://github.com/TopiSenpai/KittyBot"
      >Source Code
    </a>
    <router-link to="/about">About </router-link>
    <router-link to="/guilds">Dashboard </router-link>
  </div>
</template>

<script>
export default {
  name: "Navigation"
};
</script>
