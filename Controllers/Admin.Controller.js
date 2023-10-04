import { response, request } from 'express';
import User from '../models/User.js';
import Device from '../models/Device.js';
import bcrypt from 'bcryptjs';
import { sendEmail } from '../helpers/sendEmail.js';

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

    console.log("[ADMIN] Verificando Usuario (Email)")

    let verify = true
    let msg = ''
    const { email } = req.body

    try {

        const user = await User.findOne({ email: email })

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

    console.log("[ADMIN] Verificando Dueño (Device)")

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
    console.log("[ADMIN] Obteniendo coordenadas de una dirección")

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

    console.log("[ADMIN] Autocompletando direcciones")

    const { address } = req.body

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${process.env.GOOGLE_API_KEY}&components=country:co&input=${address}`

    const result = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())

    return res.status(200).json(result)
}

/**
 * 
 * Manejo de dispositivos
 * 
 */

adminController.getDeviceList = async (req = request, res = response) => {
    console.log("[ADMIN] Obteniendo lista de dispositivos")

    const devices = await Device.find().select("id owner")
    res.json(devices)
}

adminController.deleteDevice = async (req = request, res = response) => {

    console.log("[ADMIN] Eliminando dispositivo")

    const { id } = req.body
    let result = false

    try {

        console.log(id)

        const device = await Device.findByIdAndDelete(id)

        console.log('[ADMIN] Se ha eliminado el dispositivo: ' + device)

    } catch (error) {

        console.log('[ADMIN] Error eliminando un dispositivo: ' + error)
        result = false

    }

    res.json({
        result
    })

}

/**
 * 
 * CRUD DE USUARIOS
 * 
 */

adminController.getAllUsers = async (req = request, res = response) => {

    console.log("[ADMIN] Obteniendo información de todos los usuarios")
    const users = await User.find().select("id name email role device")
    res.status(200).json(users)
    console.log('[ADMIN] Se ha enviado información de todos los usuarios')

}

adminController.getOneUser = async (req = request, res = response) => {

    console.log("[ADMIN] Obteniendo información de un usuario")

    const { id } = req.body
    const user = await User.find({ id: id })

    res.status(200).json(user)
    console.log('[ADMIN] Se ha enviado información de un usuario')

}

adminController.createUser = async (req = request, res = response) => {

    console.log("[ADMIN] Creando un usuario")

    const { name, email, password, role, device, address } = req.body
    let result = false
    let msg = ''

    const salt = bcrypt.genSaltSync()
    try {

        if (!role === USER_TYPES.USR) {
            if (address === undefined) return res.json({ result: false, msg: 'El usuario debe tener dirección' })
            if (device === undefined) return res.json({ result: false, msg: 'El usuario debe tener dispositivo' })
            const userAdd = new User({ name, email: email.toString().toLowerCase(), password: bcrypt.hashSync(password, salt), role, device, address })

            result = true
            msg = 'Usuario creado correctamente'

            await userAdd.save()

            sendEmail(email, 'Bienvenido a AirQ', `<h1>Bienvenido a AirQ</h1><p>Gracias por registrarte en AirQ, tu usuario es: ${email} y tu contraseña es: ${password}</p>`)
            return res.status(200).json({
                result,
                msg
            })
        } else {

            const userAdd = new User({ name, email: email.toString().toLowerCase(), password: bcrypt.hashSync(password, salt), role, device })

            sendEmail(email, 'Bienvenido a AirQuality',
                `<h1>Bienvenido a AirQuality App ☁️</h1>

                <h3>¡Tu registro fue Exitoso!</h3>

                <hr/>
                <p>Ahora, a continuación te entregamos tu usuario y contraseña</p>
                <hr/>
                <p>⏩ Usuario es: ${email}</p>
                <p>⏩ Contraseña es: ${password}</p>
                <hr/>
                <p><b>Se recomienda cambiar la contraseña al entrar</b></p>
            `)

            const { lat, lng } = req.body

            await Device.findByIdAndUpdate(device, {
                owner: email.toString().toLowerCase(),
                lat: lat,
                lng: lng
            })
            await userAdd.save()

            result = true
            msg = 'Usuario creado correctamente'

            return res.status(200).json({
                result,
                msg
            })
        }



    } catch (error) {

        console.log('[ADMIN] Error creando un usuario: ' + error)
        msg = 'Hubo un error creando el usuario'
        result = false
        return res.status(401).json({
            result,
            msg
        })

    }

}

adminController.updateUser = async (req = request, res = response) => {

    console.log("[ADMIN] Actualizando un usuario")

    const { id, name, email, password, role, device } = req.body

    try {

        User.updateOne({ id: id }, { name: name, email: email, password: password, role: role, device: device })

    } catch (error) {

        console.log('[ADMIN] Error actualizando un usuario: ' + error)

    }

}

adminController.deleteUser = async (req = request, res = response) => {

    console.log("[ADMIN] Eliminando usuario")

    const { id } = req.body
    let result = false

    try {

        const { name, device } = await User.findByIdAndDelete(id)
        console.log(name)
        await Device.findByIdAndUpdate(device, { owner: '' })

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
