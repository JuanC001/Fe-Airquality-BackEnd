import { Schema, model } from 'mongoose';

const DeviceSchema = new Schema({

    id: { type: 'number', required: true },
    measures: [{

        pressure: { type: 'number', required: true },
        pm25: { type: 'number', required: true },
        pm10: { type: 'number', required: true },
        temp: { type: 'number', required: true },
        rh: { type: 'number', required: true },
        date: { type: 'string', required: true },

    }],
    lastUpdated: { type: 'string', required: true},
    lat : {type: 'number', required: true},
    lng : {type: 'number', required: true},
    owner: {type: 'string', required: false},

})

export default model('Device', DeviceSchema)