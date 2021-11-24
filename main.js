document.addEventListener('keydown', dibujarTeclado);
let teclas ={
    LEFT:   37,
    UP:     38,
    RIGHT:  39,
    DOWN:   40
}

let canvas = document.getElementById('villaJS');
let papel = canvas.getContext('2d');

let vacasArr = [];
let cerdosArr = [];
let pollosArr = [];

let cantidadVacas = aleatorio(1, 5);
let cantidadCerdos = aleatorio(1, 5);
let cantidadPollos = aleatorio(1, 5);


for (let i = 0; i < cantidadVacas; i++) {
    var x = aleatorio(0,6);
    var y = aleatorio(0,6);
        x = x*70;
        y = y*70;
    vacasArr.push( { x: x, y: y } );
}
for (let i = 0; i < cantidadCerdos; i++) {
    var x = aleatorio(0,6);
    var y = aleatorio(0,6);
        x = x*70;
        y = y*70;
    cerdosArr.push( { x: x, y: y } );
}
for (let i = 0; i < cantidadPollos; i++) {
    var x = aleatorio(0,6);
    var y = aleatorio(0,6);
        x = x*70;
        y = y*70;
    pollosArr.push( { x: x, y: y } );
}


let fondo = {
    url: './img/tile.webp',
    cargaOK: false
};

let lobo = {
    url: './img/lobo.png',
    cargaOK: false,
    posicion: {
        x: 420,
        y: 420
    }
};
let vaca = {
    url: './img/vaca.webp',
    cargaOK: false
};


let cerdo = {
    url: './img/cerdo.webp',
    cargaOK: false
};

let pollo = {
    url: './img/pollo.webp',
    cargaOK: false
}


fondo.imagen = new Image();
fondo.imagen.src = fondo.url;
fondo.imagen.addEventListener('load', cargarFondo );

lobo.imagen = new Image();
lobo.imagen.src = lobo.url;
lobo.imagen.addEventListener('load', cargarLobo );

vaca.imagen = new Image();
vaca.imagen.src = vaca.url;
vaca.imagen.addEventListener( 'load', cargarVacas );


cerdo.imagen = new Image();
cerdo.imagen.src = cerdo.url;
cerdo.imagen.addEventListener('load', cargarCerdos);

pollo.imagen = new Image();
pollo.imagen.src = pollo.url;
pollo.imagen.addEventListener('load', cargarPollos);


function cargarFondo(){
    fondo.cargaOK = true;
    dibujar();
}
function cargarLobo(){
    lobo.cargaOK = true;
    dibujar();
}
function cargarVacas(){
    vaca.cargaOK = true;
    dibujar();
}
function cargarCerdos(){
    cerdo.cargaOK = true;
    dibujar();
}
function cargarPollos(){
    pollo.cargaOK = true;
    dibujar();
}

function dibujar() {
    if( fondo.cargaOK ){
        papel.drawImage( fondo.imagen, 0, 0 );
        fondo.cargaOK = false;
    }
    if( lobo.cargaOK ){
        papel.drawImage( lobo.imagen, lobo.posicion.x, lobo.posicion.y );
        lobo.cargaOK = false;
    }
    if( vaca.cargaOK){
        dibujarAnimal(vaca, vacasArr );
        vaca.cargaOK = false;
    }
    if( cerdo.cargaOK){
        dibujarAnimal(cerdo, cerdosArr );
        cerdo.cargaOK = false;
    }
    if( pollo.cargaOK ){
        dibujarAnimal(pollo, pollosArr );
        pollo.cargaOK = false;
    }
}

function dibujarTeclado( $event ){
    let movimiento = 70;

    switch ($event.keyCode) {
        case teclas.LEFT:
            if( lobo.posicion.x > 0 ){
                lobo.posicion.x = lobo.posicion.x - movimiento;
                eliminarAnimal();
                actualizarCanvas();
                papel.drawImage( lobo.imagen, lobo.posicion.x, lobo.posicion.y );
            }

            break;
        case teclas.UP:
            if( lobo.posicion.y > 0 ){
                lobo.posicion.y = lobo.posicion.y - movimiento;
                eliminarAnimal();
                actualizarCanvas();
                papel.drawImage( lobo.imagen, lobo.posicion.x, lobo.posicion.y );
            }
            break;
        case teclas.RIGHT:
            if( lobo.posicion.x < 420 ){
                lobo.posicion.x = lobo.posicion.x + movimiento;
                eliminarAnimal();
                actualizarCanvas();
                papel.drawImage( lobo.imagen, lobo.posicion.x, lobo.posicion.y );
            }
            break;
        case teclas.DOWN:
            if( lobo.posicion.y < 420 ){
                lobo.posicion.y = lobo.posicion.y + movimiento;
                eliminarAnimal();
                actualizarCanvas();
                papel.drawImage( lobo.imagen, lobo.posicion.x, lobo.posicion.y );
            }
            break;
        default:
            console.log('Otra tecla.');
            break;
    }
}

function eliminarAnimal(){
    vacasArr = vacasArr.filter( animal => !(animal.x === lobo.posicion.x && animal.y === lobo.posicion.y) )
    cerdosArr = cerdosArr.filter( animal => !(animal.x === lobo.posicion.x && animal.y === lobo.posicion.y) )
    pollosArr = pollosArr.filter( animal => !(animal.x === lobo.posicion.x && animal.y === lobo.posicion.y) )
}

function actualizarCanvas() {
    papel.clearRect(0, 0, canvas.width, canvas.height);
    cargarFondo();
    cargarVacas();
    cargarCerdos();
    cargarPollos();
}

function dibujarAnimal(animal, animalesArr ){
    eliminarAnimal();
    animalesArr.forEach(item => {
        papel.drawImage( animal.imagen, item.x, item.y );
    });
}

function aleatorio(min, max) {
    let resultado = Math.floor((Math.random() * (max - min + 1))) + min;
    return resultado;
}

