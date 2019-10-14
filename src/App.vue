<template>
    <div id="app">
        <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <h1 class="navbar-item">Bath Track</h1>

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </a>
            </div>
        </nav>
        <router-view/>
    </div>
</template>

<script>
import "bulma/css/bulma.css"
export default {
  name: 'App'
}
</script>

<style>
</style>
