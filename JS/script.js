
let selecciones = []
let numerrores = 0
let complete = 0
var errores = document.getElementById('errores'),
    aciertos = document.getElementById('aciertos'),
    overlay = document.getElementById('overlay'),
    popup = document.getElementById('popup'),
    cerrarpopup = document.getElementById('btn-cerrar-popup'),
    imagen = document.getElementById('imagen'),
    label = document.getElementById('label');
function cargarimagenes(){
    let imagenes = [
    '<img src="Img/jake.jpg" alt="">',
    '<img src="Img/po.jpg" alt="">',
    '<img src="Img/cheems.jpg" alt="">',
    '<img src="Img/harley.jpg" alt="">',
    '<img src="Img/mario.png" alt="">',
    '<img src="Img/shrek.jpg" alt="">',
    '<img src="Img/yoda.jpg" alt="">',
    '<img src="Img/deadpool.jpg" alt="">',
   ]
   return imagenes
}
function generartablero(){
    let imagenes = cargarimagenes()
    let tablero = document.getElementById("tablero")
    let tarjetas = []
    numerrores= 0
    complete = 0
    for (let i = 0; i < 16; i++) {
        tarjetas.push(`
        <div class="area-tarjeta" onclick="seleccionarimagen(${i})">
            <div class="tarjeta" id="tarjeta${i}"> 
                <div class="cara trasera" id="trasera${i}">
                     ${imagenes[0]}             
                </div>
                <div class="cara superior">
                     <img src="Img/question.png" alt="">
                </div>
            </div>
        </div>`
        )               
        if(i%2==1){
            imagenes.splice(0,1)
        }
        tarjetas.sort(()=>Math.random()-0.5)
    }
    tablero.innerHTML = tarjetas.join(" ")
    errores.innerHTML = numerrores 
    aciertos.innerHTML = complete
}
function seleccionarimagen(i){
     let tarjeta = document.getElementById("tarjeta"+i)
     if(tarjeta.style.transform != "rotateY(180deg)"){
        tarjeta.style.transform = "rotateY(180deg)"
        selecciones.push(i)
     }
     if(selecciones.length == 2){
         deseleccionar(selecciones)
         selecciones=[]
     }
}

function deseleccionar(selecciones){
       setTimeout(()=>{
           let trasera1 = document.getElementById("trasera"+selecciones[0])
           let trasera2 = document.getElementById("trasera"+selecciones[1])
           if(trasera1.innerHTML != trasera2.innerHTML ){
            let t1 = document.getElementById("tarjeta"+selecciones[0])
            let t2 = document.getElementById("tarjeta"+selecciones[1])
               t1.style.transform = "rotateY(0deg)"
               t2.style.transform = "rotateY(0deg)"
               numerrores++
               errores.innerHTML = numerrores 
            if(numerrores == 10 )
             {
                generartablero()
                overlay.classList.add('active');
                popup.classList.add('active');
                label.innerHTML = "Perdiste, intentalo nuevamente"
                imagen.src = "Img/fail.png"
            }
           }
           else{
               complete++
               aciertos.innerHTML = complete
               if(complete == 8)
               {
                   overlay.classList.add('active');
                   popup.classList.add('active');
                   label.innerHTML = "¡Felicidades has ganado!"
                   imagen.src = "Img/winner.png"
                   generartablero() 
               }
           }
       },1000);
       
}

cerrarpopup.addEventListener('click', function(){
    overlay.classList.remove('active');
    popup.classList.remove('active');
});

