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


const updateMedia = async (req = request, res = response) => {

    try {

        const { id } = req.params;

        const media = await Media.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        res.status(200).json(media);

    } catch (error) {

        console.error("Error al actualizar media:", error);
        res.status(500).json({ msg: "Error al actualizar media" });

    }

};


const deleteMedia = async (req = request, res = response) => {

    try {

        const { id } = req.params;

        await Media.findByIdAndDelete(id);

        res.status(200).json({
            msg: "Media eliminada correctamente"
        });

    } catch (error) {

        console.error("Error al eliminar media:", error);
        res.status(500).json({ msg: "Error al eliminar media" });

    }

};


module.exports = {
    getMedias,
    createMedia,
    updateMedia,
    deleteMedia
};