<template>
  <header>
    <div class="container p-5">
        <HeaderForm @create="$emit('create', $event)"/>
    </div>
  </header>
</template>

<script>
import HeaderForm from './HeaderForm'

export default {
  name: 'ParticipationHeader',
  components: {
      HeaderForm,
  },
};
</script>