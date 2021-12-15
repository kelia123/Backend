import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        seatsAvailable: {
            type: String,
            required: true
        },
        dateScheduled: {
            type: Date,
            required: true,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
const tour = mongoose.model('Tour', tourSchema);
export default tour;