const {cursos, listarCursos} = require('./datos');

const fs = require('fs');

const opciones = {
	id: {
		alias: 'i',
		demand : true
	},
	nombre: {
		alias: 'nom',
		demand : true
	},
	cedula: {
		alias: 'doc',
		demand : true
	}
}

const argv = require('yargs')
.command('inscribir', 'Inscribirme en un curso', opciones)
.argv

let crearArchivo = (curso) => {
	texto = 'El estudiante ' + argv.nombre + ' con cedula ' + argv.cedula + ' se ha matriculado en el curso llamado ' + curso.nombre +
	' que tiene una duración de ' + curso.duracion + ' y un costo de ' + curso.valor + ' pesos';
	fs.writeFile('matricula.txt', texto, (err) => {
		if(err) throw (err);
		console.log('se ha creado el archivo')
	});
}

if(argv._.length!=0){
	let curso = cursos.find(function(curso){
		return curso.id == argv.id
	});

	if(curso == undefined){
		console.log('Has ingresado un ID de un curso que no existe, los cursos disponibles son: ');
		for(i=0;i<cursos.length;i++){
			curso = cursos[i];
			console.log("Id del curso: " + curso.id  + ", llamado " + curso.nombre + " con duración de " + curso.duracion + " horas y un valor de " + curso.valor + " pesos.");
		}
	}
	else{
		crearArchivo(curso);
	}
}
else{
	listarCursos(cursos);
}
