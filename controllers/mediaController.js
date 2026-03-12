const Media = require('../models/Media');
const { request, response } = require('express');

const getMedias = async (req = request, res = response) => {

    try {

        const medias = await Media.find()
            .populate('genero')
            .populate('director')
            .populate('productora')
            .populate('tipo');

        res.status(200).json(medias);

    } catch (error) {

        console.error("Error al obtener medias:", error);
        res.status(500).json({ msg: "Error al obtener medias" });

    }

};


const createMedia = async (req = request, res = response) => {

    try {

        const { serial } = req.body;

        const mediaDB = await Media.findOne({ serial });

        if (mediaDB) {

            return res.status(400).json({
                msg: `El serial ${serial} ya existe`
            });

        }

        const media = new Media(req.body);

        await media.save();

        res.status(201).json(media);

    } catch (error) {

        console.error("Error al crear media:", error);
        res.status(500).json({ msg: "Error al crear media" });

    }

};

module.exports = {
    getMedias,
    createMedia
};