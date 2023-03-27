import { response } from 'express';
import Device from '../models/Device.js';

const deviceController = {};

deviceController.reginfo = async (req, res) => {

    let device = await Device.findOne(req.body.id);

    const id = req.body.device

    if (device === null) {
        try {
            console.log('Dispositivo no encontrado, registrando...');
            const measures = [{

                pressure: req.body.pressure,
                pm25: req.body.pm25,
                pm10: req.body.pm10,
                temp: req.body.temp,
                rh: req.body.rh,
                date: new Date()

            }]
            const device = new Device({

                id,
                measures

            });
            device.id = id;
            device.lat = 0
            device.lng = 0
            device.lastUpdated = new Date()
            await device.save();
            res.json({
                result: true,
            })
        } catch (error) {
            console.log('ERR');
            console.log(error);
            res.json({
                result: true,
            })
        }
    } else if (device !== null) {

        try {

            const newMeasures = {

                pressure: req.body.pressure,
                pm25: req.body.pm25,
                pm10: req.body.pm10,
                temp: req.body.temp,
                rh: req.body.rh,
                date: new Date()

            }

            const oldMeasures = device.measures;

            if (oldMeasures.length > 19) {

                oldMeasures.shift();

            }

            oldMeasures.push(newMeasures);
            device.measures = oldMeasures;
            device.lastUpdated = new Date();
            device.lat = 0
            device.lng = 0
            await device.save();
            res.json({
                result: true,
            })
        } catch (error) {

            console.log(error)
            res.json({
                result: false,
            })

        }

    }

}

deviceController.getAllDevicesList = async (req, res) => {

    let devices = await Device.find().select("id lastUpdated lat lng _id")
    res.json(devices)


}

deviceController.getAllDevices = async (req, res) => {

    let devices = await Device.find()
    res.json(devices)


}

deviceController.getOneDevice = async (req, res) => {

    try {
        let device = await Device.findById(req.body.id)
        res.json(device)
    } catch (error) {
        res.json('Whoops!')
    }


}

export default deviceController;
