import { Schema, model } from 'mongoose';

const DeviceSchema = new Schema({

    device_id: { type: 'number', required: true },
    pressure: { type: 'number', required: true },
    pm25: { type: 'number', required: true },
    pm10: { type: 'number', required: true },
    temp: { type: 'number', required: true },
    rh: { type: 'number', required: true },
    date: { type: 'string', required: true },

})

export default model('Device', DeviceSchema)