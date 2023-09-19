import { response } from 'express';
import Device from '../models/Device.js';

const deviceController = {};

deviceController.reginfo = async (req, res) => {

    console.log('################################################################')
    console.log('NUEVO REGISTRO')
    let device = await Device.findOne({ id: req.body.device });
    const date = new Date();
    const colDate = date.toLocaleString('es-CO', { timeZone: 'America/Bogota' });
    console.log(`Fecha: ${colDate}`)

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
                date: colDate

            }]
            const device = new Device({

                id,
                measures

            });
            device.id = id;
            device.lat = 0
            device.lng = 0
            device.lastUpdated = colDate
            await device.save();
            console.log('Dispositivo registrado')
            return res.status(200).json({
                result: true,
            })
        } catch (error) {
            console.log('ERR');
            console.log(error);
            return res.status(500).json({
                result: false,
            })
        }
    } else if (device !== null) {

        console.log(req.body)

        try {

            const newMeasures = {

                pressure: req.body.pressure,
                pm25: req.body.pm25,
                pm10: req.body.pm10,
                temp: req.body.temp,
                rh: req.body.rh,
                date: colDate

            }

            const oldMeasures = device.measures;

            if (oldMeasures.length > 19) {

                oldMeasures.shift();

            }

            oldMeasures.push(newMeasures);
            device.measures = oldMeasures;
            device.lastUpdated = colDate;
            device.lat = 0
            device.lng = 0
            await device.save();
            return res.status(200).json({
                result: true,
            })
        } catch (error) {

            console.log(error)
            return res.status(500).json({
                result: false,
            })

        }

    }
}

deviceController.getAllDevicesList = async (req, res) => {

    let devices = await Device.find().select("id lastUpdated lat lng _id owner")
    console.log('Getting all devices')
    res.json(devices)


}

deviceController.getAllDevices = async (req, res) => {

    let devices = await Device.find()
    res.json(devices)


}

deviceController.getOneDevice = async (req, res) => {

    try {
        let device = await Device.findById(req.body.id)
        if (device === null) return res.status(400).json('No se ha encontrado el dispositivo')
        res.status(200).json(device)
    } catch (error) {
        res.status(400).json('Whoops!')
    }

}

deviceController.giveIdDevice = async (req, res) => {

    //Metodo para otorgar un id al dispositivo

}

export default deviceController;
