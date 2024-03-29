import { response } from 'express';
import Device from '../models/Device.js';

const deviceController = {};

deviceController.reginfo = async (req, res) => {

    console.log("[DEVICE] Registrando informacion")
    let device = await Device.findOne({ id: req.body.device });
    const date = new Date();
    const colDate = date.toLocaleString('en', { timeZone: 'America/Bogota', formatMatcher: 'best fit', hour12: true });
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

            if (oldMeasures.length > 479) {

                oldMeasures.shift();

            }

            oldMeasures.push(newMeasures);
            device.measures = oldMeasures;
            device.lastUpdated = colDate;
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

    console.log("[DEVICE] Obteniendo todos los dispositivos (Lista)")

    let devices = await Device.find().select("id lastUpdated lat lng _id owner")
    console.log('Getting all devices')
    res.json(devices)


}

deviceController.getAllDevices = async (req, res) => {

    console.log("[DEVICE] Obteniendo todos los dispositivos (CON INFORMACION)")

    let devices = await Device.find()
    res.json(devices)


}

deviceController.getOneDevice = async (req, res) => {

    console.log("[DEVICE] Obteniendo un dispositivo")

    try {
        let device = await Device.findById(req.body.id)
        if (device === null) return res.status(400).json('No se ha encontrado el dispositivo')
        res.status(200).json(device)
    } catch (error) {
        res.json({
            msg: "hubo un error al obtener el dispositivo"
        })

        console.log("[ADMIN] " + error)

    }

}

deviceController.giveIdDevice = async (req, res) => {

    //Metodo para otorgar un id al dispositivo

}

deviceController.deleteDevice = async (req, res) => {

    console.log("[DEVICE] Eliminando dispositivo")

    try {
        await Device.findByIdAndDelete(req.body.id)
        res.status(200).json({
            msg: "Dispositivo eliminado"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error al eliminar el dispositivo"
        })
        console.log("[ADMIN] " + error)
    }

}

export default deviceController;
