<template>
<div>
    <h2>UV index {{ data.U }}</h2>
</div>
</template>

<script>
export default {
    props: ["data"],
    name: "uv",
};
</script>
