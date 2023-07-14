<template>
   <table class="table table-bordered">
        <thead>
            <tr>
            <th></th>
            <th>Fisrt name</th>
            <th>Last name</th>
            <th>Participation</th>
            <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(participation, index) in participations" :key="participation.id">
            <td>{{ index + 1 }}</td>
            <td>{{ participation.firstname }}</td>
            <td>{{ participation.lastname }}</td>
            <td align="center">{{ participation.part }}</td>
            <td align="center"><a href="#" title="Excluir" @click.prevent="handleDelete(participation.id, index)">
                <font-awesome-icon :icon="['fas', 'trash-can']" /></a></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {

    name: 'TableList',

    props: {

        participations: {
            type: Array,
            default: () => ([]),

        },

    },

    methods: {
        handleDelete(id, index){
            this.$emit('delete', {
                id,
                index,
            });
        }


    }

};
</script>

<style>

</style>