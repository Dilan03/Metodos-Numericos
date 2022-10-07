const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')
const result = document.getElementById('result')
const result2 = document.getElementById('resultNR')

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault()
  FalsaPosicion()
  result.classList.add('show')
})

document.getElementById('formNR').addEventListener('submit', (e) => {
  e.preventDefault()
  NewtonRaphson()
  result2.classList.add('show')
})


tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTarget)
    tabContents.forEach(tabContent => {
      tabContent.classList.remove('active')
    })
    tabs.forEach(tab => {
      tab.classList.remove('active')
    })
    tab.classList.add('active')
    target.classList.add('active')
  })
})

const FalsaPosicion = () => {
  const funcion = document.getElementById('fx')
  const Tabla = document.getElementById('iterFP')
  Tabla.innerHTML = '<thead><tr><td>Iteración</td><td>f(x)</td><td>Xn</td></tr></thead>'

  let Xa = document.getElementById('a').value
  let Xb = document.getElementById('b').value  
  let fa = eval(funcion.value.replaceAll('x',Xa))
  let fb = eval(funcion.value.replaceAll('x',Xb))
  let cont = 1;
  
  if((fa < 0 && fb < 0) || (fa > 0 && fb > 0)) {
    document.getElementById('result').textContent ="No se puede resolver por este método"
  }else {
    let Xr, funcionXR, fxr = 1;
    while(Math.abs(fxr) > 0.01){

      Xr = Xa - ((fa*(Xb-Xa))/(fb-fa))
      funcionXR = funcion.value.replaceAll('x', Xr)
      fxr = eval(funcionXR)
    
      if((fxr < 0 && fa < 0) || (fxr > 0 && fa > 0)) {
        fa = fxr
        Xa = Xr
      } else if ((fxr > 0 && fb > 0) || (fxr < 0 && fb < 0) ) {
        fb = fxr
        Xb = Xr
      }
      Tabla.innerHTML += `<tr><td>X${cont++}</td><td>${fxr}</td><td>${Xr}</td></tr>`
    }
    result.textContent = "Resultado: la raiz o solucion es "+Xr+" con un error de "+fxr
  }
}

const NewtonRaphson = () => {
  const funcion = document.getElementById('fxn')
  const funcionD = document.getElementById('fxd')
  const Tabla2 = document.getElementById('iterNR')

  Tabla2.innerHTML =`<thead><tr><td>Iteración</td><td>Xr</td><td>f(x)</td><td>f '(x)</td></tr></thead>`
  
  let Xo = document.getElementById('Xo').value  
  let fxn = eval(funcion.value.replaceAll('x', Xo))
  let fxd = eval(funcionD.value.replaceAll('x', Xo))

  let Xr = Xo - (fxn/fxd)
  let fxr = eval(funcion.value.replaceAll('x', Xr))
  let fxrd = eval(funcionD.value.replaceAll('x', Xr))
  let cont = 1

  Tabla2.innerHTML +=`<tr><td>X${cont++}</td><td>${Xr}</td><td>${fxr}</td><td>${fxrd}</td></tr>`
  
  while(fxr > 0.01){
    Xo = Xr
    Xr = Xo - (fxr/fxrd)
    fxr = eval(funcion.value.replaceAll('x', Xr))
    fxrd = eval(funcionD.value.replaceAll('x', Xr))
    Tabla2.innerHTML +=`<tr><td>X${cont++}</td><td>${Xr}</td><td>${fxr}</td><td>${fxrd}</td></tr>`
  }

  if(fxr < 0.01){
    result2.textContent = "Resultado: la raiz o solucion es "+Xr+" con un error de "+fxr
  }

}