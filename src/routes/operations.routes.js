const express = require("express");
const router = express.Router();

// Comprueba si el numero es negativo
const isNegative = (num) => {
    if (Math.sign(num) === -1) {
        return true;
    }
    return false;
}

// Comprueba si el numero es primo
const isPrime = (num) => {
    if (num <= 1) {
        return false;
    }
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

// Números primos que se encuentran en el rango entre initialNumber y finalNumber.(tomando en cuenta InitialNumber y finalNumber)
const primeNumbers = (initialNumber, finalNumber) => {
    const primes = [];
    for (let i = initialNumber; i <= finalNumber; i++) {
        if (isPrime(i)) {
            primes.push(i);
        }
    }
    return primes;
}

// Obtener serie fibonacci
const fibonacciF = (initialNumber, finalNumber) => {
    // Inicializamos el array con los primeros dos términos de la sucesión de Fibonacci
    let arrFibonacci = [0, 1];

    // Empezamos a calcular los términos de la sucesión hasta alcanzar el límite superior
    while (arrFibonacci[arrFibonacci.length - 1] < finalNumber) {
        let lastTerm = arrFibonacci[arrFibonacci.length - 1];
        let secondToLastTerm = arrFibonacci[arrFibonacci.length - 2];
        arrFibonacci.push(lastTerm + secondToLastTerm);
    }

    // Obtener arreglo de terminos desde la variable initialNumber y recorrer el arreglo para determinar
    // si la suma de los primeros 10 términos sea igual al séptimo término multiplicado por 11.
    arrFibonacci = arrFibonacci.slice(initialNumber);
    let countTerm = 0;
    let sevenTerm = 0;
    let sevenTermTemp = 0;
    let sumTenTerm = 0;
    let arrFinal = {};

    for (let i=0; i<arrFibonacci.length; i++) {
        countTerm = i+1;
        sumTenTerm += arrFibonacci[i];

        if(countTerm==7){
            sevenTermTemp = arrFibonacci[i];
            sevenTerm = sevenTermTemp*11;
        }

        if(countTerm==10){
            if(sumTenTerm == sevenTerm){
                return arrFinal = {
                    "sevenValue": sevenTermTemp,
                    "totalSeven": sevenTerm,
                    "sumTenTerm": sumTenTerm,
                    "msg": "Proceso terminado ya que la suma de los primeros 10 términos es igual al séptimo término multiplicado por 11 "
                }
            }
        }
    }

    return arrFinal = {
        "sevenValue": sevenTermTemp,
        "totalSeven": sevenTerm,
        "sumTenTerm": sumTenTerm,
        "msg": "Fue recorrido todos los terminos pero no hubo coincidencia de los primeros 10 términos que sean igual al séptimo término multiplicado por 11"
    };
}


// Ruta que recibe las variables initialNumber y finalNumber
router.get("/test/:initialNumber/:finalNumber", (req, res) => {
    const initialNumber = parseInt(req.params.initialNumber);
    const finalNumber = parseInt(req.params.finalNumber);

    // Revisa que sea enteros positivos
    if (!Number(initialNumber) || isNegative(initialNumber) === true || !Number(finalNumber) || isNegative(finalNumber) === true) {
        return res.status(400).send('InitialNumber y finalNumber deben ser números enteros positivos');
    }

    if (initialNumber > finalNumber) {
        return res.status(400).send('InitialNumber no debe ser mayor a finalNumber');
    }

    // Obtener numeros primos
    let pNumbers = primeNumbers(initialNumber, finalNumber);

    // Cantidad de números que se encuentran entre initialNumber y finalNumber (sin tomar en cuenta estos últimos).
    const arrNumbers = [];
    for (let i = initialNumber + 1; i < finalNumber; i++) {
        arrNumbers.push(i);
    }

    // Suma de todos los números consecutivos que se encuentran dentro de initialNumber y finalNumber (sin tomar en cuenta estos últimos).
    const sumConsecutiveNumbers = arrNumbers.reduce((sum, item) => sum + item, 0);

    // Utilizando initialNumber y finalNumber como puntos iniciales crear una sucesión de Fibonacci
    // que termine en el momento en el que la suma de los primeros 10 términos sea igual al séptimo término multiplicado por 11.
    const respFibonacci = fibonacciF(initialNumber, finalNumber);

    res.json({
        status: true,
        data: {
            initialNumber,
            finalNumber,
            primeNumbers: pNumbers,
            totalNumbers: arrNumbers.length,
            sumConsecutiveNumbers,
            respFibonacci
        }
    })
});

module.exports = router;