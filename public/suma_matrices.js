let tensorMatriz1;
let tensorMatriz2;
let filasTotales = 0;
let columnasTotales = 0;

function generarMatrices() {
    filasTotales = parseInt(document.getElementById("filas").value);
    columnasTotales = parseInt(document.getElementById("columnas").value);
    let matricesDiv = document.getElementById("matrices");
    matricesDiv.innerHTML = '';

    if (filasTotales <= 0 || columnasTotales <= 0) {
        alert("Ingrese valores válidos para filas y columnas");
        return;
    }


    tensorMatriz1 = tf.randomUniform([filasTotales, columnasTotales], 0, 10, 'int32');
    tensorMatriz2 = tf.randomUniform([filasTotales, columnasTotales], 0, 10, 'int32');


    const matriz1Array = tensorMatriz1.arraySync();
    const matriz2Array = tensorMatriz2.arraySync();


    let matrizDiv1 = document.createElement("div");
    matrizDiv1.className = "matriz";
    matrizDiv1.innerHTML = "<h3>Matriz 1</h3>";
    
    let tabla1 = crearTablaDesdeMatriz(matriz1Array);
    matrizDiv1.appendChild(tabla1);
    matricesDiv.appendChild(matrizDiv1);


    let matrizDiv2 = document.createElement("div");
    matrizDiv2.className = "matriz";
    matrizDiv2.innerHTML = "<h3>Matriz 2</h3>";
    
    let tabla2 = crearTablaDesdeMatriz(matriz2Array);
    matrizDiv2.appendChild(tabla2);
    matricesDiv.appendChild(matrizDiv2);
    
    sumarMatrices();
}


function crearTablaDesdeMatriz(matriz) {
    const tabla = document.createElement('table');
    
    for (let i = 0; i < matriz.length; i++) {
        const fila = document.createElement('tr');
        
        for (let j = 0; j < matriz[i].length; j++) {
            const celda = document.createElement('td');
            celda.textContent = matriz[i][j];
            fila.appendChild(celda);
        }
        
        tabla.appendChild(fila);
    }
    
    return tabla;
}


function sumarMatrices() {
    if (!tensorMatriz1 || !tensorMatriz2) {
        alert("Primero debe generar las matrices");
        return;
    }

    try {
        const tensorResultado = tf.add(tensorMatriz1, tensorMatriz2);
        const resultadoArray = tensorResultado.arraySync();

        let resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = '<h3>Resultado de la suma </h3>';
        
        let tablaResultado = crearTablaDesdeMatriz(resultadoArray);
        resultadoDiv.appendChild(tablaResultado);

        console.log("Operación completada con TensorFlow");
        console.log("Forma de la matriz 1:", tensorMatriz1.shape);
        console.log("Forma de la matriz 2:", tensorMatriz2.shape);
        console.log("Forma del resultado:", tensorResultado.shape);
    } catch (error) {
        alert("Error al realizar la suma: " + error.message);
        console.error(error);
    }
}