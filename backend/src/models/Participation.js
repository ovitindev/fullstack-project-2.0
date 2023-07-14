import mongoose from 'mongoose';

const participationSchema = new mongoose.Schema({
    first_name:{
        type: String,
        require: true
    },
    last_name:{
        type: String,
        require: true
    },
    participation:{
        type: Number,
        require: true
    },
    color:{
        type: String,
        require: true
    }
})



export default mongoose.model('Participation', participationSchema)
