<template>
  <router-view />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
:root {
  --RobotoText: 'Roboto', sans-serif;
}

html,
body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow-y: hidden;
  font-family: var(--RobotoText);
}
button {
  font-family: var(--RobotoText);
  font-size: 14px;
  font-weight: 200;
}

#app {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow-y: hidden;
  font-family: var(--RobotoText);
}
</style>
