

const campos = [
    'nombre',
    'apellido',
    'email',
    'edad',
    'fechaNacimiento',
    'genero',
    'pais',
    'descripcion',
    'terminos'
];

const barra = document.getElementById('barra');

const form = document.getElementById('formulario');
const descripcion = document.getElementById('descripcion');
const contador = document.getElementById('contador');
const btnEnviar = document.getElementById('btnEnviar');
const btnBorrar = document.getElementById('btnBorrar');

// Contador de caracteres
descripcion.addEventListener('input', () => {
    contador.textContent = descripcion.value.length;
});

// Botón Enviar
btnEnviar.addEventListener('click', validarDescargar);

// Botón Borrar
btnBorrar.addEventListener('click', () => {
    form.reset();
    contador.textContent = '0';
    document.querySelectorAll('.error').forEach((elemento) => (elemento.textContent = ''));
});

function validarDescargar(e) {
    e.preventDefault();
    let valido = true;

    // Limpiar mensajes anteriores
    document.querySelectorAll('.error').forEach((elemento) => (elemento.textContent = ''));

    // ======== VALIDACIONES ========

    if (document.getElementById('nombre').value.trim() === '') {
        document.getElementById('error-nombre').textContent = 'El nombre es obligatorio.';
        valido = false;
    }

    if (document.getElementById('apellido').value.trim() === '') {
        document.getElementById('error-apellido').textContent = 'El apellido es obligatorio.';
        valido = false;
    }

    const email = document.getElementById('email').value.trim();
    if (email === '' || !email.includes('@')) {
        document.getElementById('error-email').textContent = 'Ingrese un correo válido.';
        valido = false;
    }

    const edad = document.getElementById('edad').value.trim();
    if (edad === '' || edad < 1 || edad > 115) {
        document.getElementById('error-edad').textContent = 'Ingrese una edad válida (1-115).';
        valido = false;
    }

    if (document.getElementById('fechaNacimiento').value.trim() === '') {
        document.getElementById('error-fechaNacimiento').textContent = 'La fecha de nacimiento es obligatoria.';
        valido = false;
    }

    const genero = document.getElementById('genero').value.trim();
    if (genero === '') {
        document.getElementById('error-genero').textContent = 'Seleccione su género.';
        valido = false;
    }

    const pais = document.getElementById('pais').value.trim();
    if (pais === '') {
        document.getElementById('error-pais').textContent = 'El país es obligatorio.';
        valido = false;
    }

    const desc = descripcion.value.trim();
    if (desc === '' || desc.length < 10) {
        document.getElementById('error-descripcion').textContent = 'La descripción debe tener al menos 10 caracteres.';
        valido = false;
    }

    if (!document.getElementById('terminos').checked) {
        document.getElementById('error-terminos').textContent = 'Debe aceptar los términos y condiciones.';
        valido = false;
    }

    // ======== SI ES VÁLIDO, DESCARGAR JSON ========
    if (valido) {
        const datos = {
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            email: document.getElementById('email').value,
            edad: document.getElementById('edad').value,
            fechaNacimiento: document.getElementById('fechaNacimiento').value,
            genero: document.getElementById('genero').value,
            pais: document.getElementById('pais').value,
            descripcion: document.getElementById('descripcion').value
        };

        // Convertir a JSON
        const datosJSON = JSON.stringify(datos, null, 2);

        // Crear archivo descargable
        const blob = new Blob([datosJSON], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const enlace = document.createElement('a');
        enlace.href = url;
        enlace.download = 'registro_usuario.json';
        enlace.click();

        URL.revokeObjectURL(url);
        form.reset();
        contador.textContent = '0';
        alert('✅ Formulario válido. Se descargó el archivo JSON con tus datos.');
    }
}

function actualizarProgreso () {
    let completados = 0;
    const total = campos.length - 1;

    campos.forEach((id) => {
        const campo = document.getElementById(id);

        if(campo.type !== 'checkbox') {
            if(campo.value && campo.value.trim() !== '') {
                completados ++;
            }
        }
    });
}

