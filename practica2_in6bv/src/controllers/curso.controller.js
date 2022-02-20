const Curso = require('../models/curso.model');

function agregarCurso(req, res) {
    var parametros = req.body;
    var modeloCurso = new Curso();

    if (req.user.rol == "MAESTRO") {
        modeloCurso.nombreCurso = parametros.nombreCurso;
        modeloCurso.idMaestro = parametros.idMaestro;

        modeloCurso.save((err, cursoGuardado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!cursoGuardado) return res.status(500).send({ mensaje: 'Error al agregar la Encuesta' })

            return res.status(200).send({ curso: cursoGuardado });
        })

    } else {
        return res.status(500).send({ mensaje: 'Debe ingresar los parametros obligatorios' });
    }
}

function editarCurso(req, res) {
    var idCurso = req.params.idCurso;
    var parametros = req.body;

    if (req.user.rol == "MAESTRO") {
        Curso.findByIdAndUpdate(idCurso, parametros, { new: true }, (err, cursoEditado) => {
            if (err) return res.status(500).send({ mensjae: 'Error en la peticion' });
            if (!cursoEditado) return res.status(404).send({ mensaje: 'Error al editar el curso' });
            return res.status(200).send({ curso: cursoEditado });
        })
    } else {
        return res.status(500).send({ mensaje: 'No tiene permisos suficientes o debe enviar los parametros obligatorios' })
    }
}

function eliminarCurso(req, res) {
    var idCurso = req.params.idCurso;
    if(req.user.rol == "MAESTRO") {
        Curso.findByIdAndDelete(idCurso, (err, cursoEliminado)=>{
            if(err) return res.status(500).send({mensaje:'Error en la peticion'});
            if(!cursoEliminado) return res.status(500).send({mensaje: 'Error al eliminarel producto'})
            return res.status(200).send({ curso: cursoEliminado});
        })
    } else {
        return res.status(500).send({ mensaje: 'No tiene permisos suficientes'});
    }
}


function obtenerCurso(req, res) {

    Curso.find({}, (err, cursoEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la Peticion' });
        if (!cursoEncontrado) return res.status(500).send({ mensaje: 'Error al obtener las encuestas' });

        return res.status(200).send({ cursos: cursoEncontrado })
    }).populate('idMaestro', 'nombre')
}


module.exports = {
    agregarCurso,
    editarCurso,
    obtenerCurso,
    eliminarCurso
}