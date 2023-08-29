import { response, request } from 'express';
import User from '../models/User.js';
import Device from '../models/Device.js';
import bcrypt from 'bcryptjs';

const USER_TYPES = {

    INV: 'Investigador',
    ADM: 'Admin',
    USR: 'User'

}

const adminController = {};

/*

    Verificacion de usuarios y dispositivos

*/

adminController.verifyUser = async (req = request, res = response) => {

    let verify = true
    let msg = ''
    const { email } = req.body

    try {

        const user = await User.findOne({ email: email })
        console.log(user)

        if (user !== null) {

            verify = false
            msg = 'El usuario ya existe'

        } else {
            msg = 'El usuario se puede agregar'
        }

    } catch (error) {

        console.log("Error verificando el usuario")
        msg = 'Hubo un error verificando el usuario'

    }

    res.json({
        result: verify,
        msg
    })

}

adminController.verifyOwner = async (req = request, res = response) => {

    let verify = false
    let owner = ""
    let msg = ''
    const { id } = req.body

    try {

        const device = await Device.findOne({ id: id }).select("owner")
        owner = device.owner
        if (owner === undefined) {

            verify = true
            msg = 'El dispositivo no tiene dueño'

        } else {
            msg = 'El dispositivo ya tiene dueño'
        }

    } catch (error) {

        console.log("Error verificando el owner")

    }
    res.json({
        result: verify,
        owner,
        msg
    })

}

/* 

    MAPS API
    Consumo de direcciones y coordenadas

*/

adminController.getLongLat = async (req = request, res = response) => {

    const { placeId } = req.body


    const url = `https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.GOOGLE_API_KEY}&place_id=${placeId}`

    const result = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())

    res.json(result)
}

adminController.autocomplete = async (req = request, res = response) => {

    const { address } = req.body

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${process.env.GOOGLE_API_KEY}&components=country:co&input=${address}`

    const result = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())

    return res.status().json(result)
}

/**
 * 
 * Manejo de dispositivos
 * 
 */

adminController.getDeviceList = async (req = request, res = response) => {
    const devices = await Device.find().select("id")
    res.json(devices)
}

adminController.deleteDevice = async (req = request, res = response) => {

}

/**
 * 
 * CRUD DE USUARIOS
 * 
 */

adminController.getAllUsers = async (req = request, res = response) => {

    const users = await User.find().select("id name email role device")
    res.json(users)
    console.log('[ADMIN] Se ha enviado información de todos los usuarios')

}

adminController.getOneUser = async (req = request, res = response) => {

    const { id } = req.body
    const user = await User.find({ id: id })

    res.json(user)
    console.log('[ADMIN] Se ha enviado información de un usuario')

}

adminController.createUser = async (req = request, res = response) => {

    const { name, email, password, role, device } = req.body
    let result = false
    let msg = ''
    const user = email
    const salt = bcrypt.genSaltSync()

    try {

        const emails = await User.findOne({ email: email })
        const devices = await User.findOne({ device: device })

        if (emails !== null) msg = 'El usuario ya existe'
        if (devices !== null) msg += 'El dispositivo ya tiene dueño'

        if (msg === '') {
            const userAdd = new User({ name, user, email, password, role, device })
            userAdd.password = bcrypt.hashSync(password, salt)
            await userAdd.save()

            result = true
            console.log('[ADMIN] Se ha creado un usuario')
            msg = 'El usuario se ha creado correctamente'

            return res.status(201).json({
                msg,
                result
            })
        } else {
            result = false
            return res.status(400).json({
                result,
                msg
            })

        }

    } catch (error) {

        console.log('[ADMIN] Error creando un usuario: ' + error)
        result = false

    }

}

/**
 * 
 * TODO: Actualizar un usuario
 * 
 */

adminController.updateUser = async (req = request, res = response) => {



}

adminController.deleteUser = async (req = request, res = response) => {

    const { id } = req.body
    let result = false

    try {

        console.log(id)

        const { name } = await User.findByIdAndDelete(id)

        console.log('[ADMIN] Se ha eliminado el usuario: ' + name)

    } catch (error) {

        console.log('[ADMIN] Error eliminando un usuario: ' + error)
        result = false

    }

    res.json({
        result
    })

}

export default adminController
