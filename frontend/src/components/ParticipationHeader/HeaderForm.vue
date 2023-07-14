<template>
  <div class="row">
    <div class="form-group col-md-3 ">
        <input type="text" class="form-control square-input" placeholder="First name" v-model="form.firstname" />
    </div>
    <div class="form-group col-md-3">
        <input type="text" class="form-control square-input" placeholder="Last name" v-model="form.lastname" />
    </div>
    <div class="form-group col-md-3">
        <input type="number" class="form-control square-input" placeholder="Participation" v-model="form.part" />
    </div>
    <div class="form-group col-md-1">
        <input type="color" class="form-control form-control-color h-100" title="Choose your color" v-model="form.color">
    </div>
    <div class="form-group col-md-2">
        <button @click="addParticipation" type="submit" class="btn h-100 btn-primary"><span class="p-5">SEND</span></button>
    </div>
    </div>
</template>

<script>
const FORM_DEFAULT_VALUES = {
    firstname: '',
    lastname: '',
    part: '',
    color: '#008000',
};

export default {
    name: 'HeaderForm',

    data: () => ({
        form: { ...FORM_DEFAULT_VALUES },
    }),

    methods: {
        addParticipation(){
            this.$emit('create', {
                data: this.form,
                onSuccess: this.resetForm,
            });
        },
        resetForm() {
            this.form = { ...FORM_DEFAULT_VALUES };
        },
    },
}
</script>
