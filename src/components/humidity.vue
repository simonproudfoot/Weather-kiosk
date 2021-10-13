<template>
  <div>
    <h2>Humidity {{ data.H }}%</h2>
  </div>
</template>

<script>
export default {
  props: ["data"],
  name: "humidity",
};
</script>