let table;
let numpreguntas;
let listadoPreguntas = [];
let Preguntas = [];
let conocimiento = 0;
let ruleta;
let seccion = 0;
let intro;
let preguntasPorPartida = 5;
let logoPEI;
let logoITM;
let personajePEI = [];
let imgTeclaR;

function preload() {
  cargarPreguntas();
  imgTeclaR=loadImage("/imagenes/teclaR.png")
  logoPEI = loadImage("/imagenes/LOGOPEI.png");
  logoITM = loadImage("/imagenes/itm 80 2.png");
  personajePEI[0] = loadImage("/imagenes/personaje pei.png");
  personajePEI[1] = loadImage("/imagenes/personaje feliz.png");
  personajePEI[2] = loadImage("/imagenes/personaje triste.png");
}
function setup() {
  //createCanvas(windowWidth, windowHeight);
  createCanvas(1380, 720);
  intro = new Intro();
  intro.start(5);
  for (let i = 0; i < Preguntas.length; i++) {
    listadoPreguntas[i] = new Pregunta(i, Preguntas[i][0], Preguntas[i][2]);
    for (let j = 0; j < 4; j++) {
      listadoPreguntas[i].respuestas[j] = Preguntas[i][1][j];
    }
    shuffle(listadoPreguntas[i].respuestas, true);
  }
  ruleta = new Ruleta(width / 2, height * 0.52, 10);
}

function draw() {
  switch (seccion) {
    case 0:
      background(154, 115, 110);
      intro.show();
      if (intro.seccion == 2 && intro.dt >= intro.tiempo) seccion = 1;
      break;

    case 1:
      background(154, 0, 110);

      ruleta.show();
      mostrarConocimiento();

      break;

    case 2:
      intro.show();
      break;
  }
}
//*********************************salida
function mostrarLogos(mod) {
  imageMode(CENTER);
  rectMode(CENTER);
  switch (mod) {
    case 1:
      push();
      translate(width / 2, height / 2);
      image(
        logoPEI,
        -width * 0.35,
        0,
        logoPEI.width * 0.1,
        logoPEI.height * 0.1
      );
      image(
        logoITM,
        width * 0.36,
        0,
        logoITM.width * 0.9,
        logoITM.height * 0.9
      );
      pop();

      break;
    case 2:
      push();
      translate(width / 2, height / 2);
      image(
        logoPEI,
        -width * 0.35,
        0,
        logoPEI.width * 0.1,
        logoPEI.height * 0.1
      );
      image(
        logoITM,
        width * 0.35,
        0,
        logoITM.width * 1,
        logoITM.height * 1
      );
      pop();
      break;
  }
}
function mostrarConocimiento() {
  noStroke();
  fill(255, 200);
  rectMode(CENTER);
  rect(width * 0.5, height * 0.04, width * 0.3, height * 0.06, 20);
  textSize(40);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  stroke(0);
  fill(0);
  text("Conocimiento: " + conocimiento, width * 0.5, height * 0.04);
}
function reiniciar() {
  conocimiento = 0;
  seccion = 0; //**********************************************************************************
  ruleta.jugar = false;
  ruleta.pregunta;
  ruleta.seccion = 0;
  ruleta.preguntasHechas = [];
  ruleta.contPreguntas = 0;
  ruleta.busqueda = false;
  intro.to = 0;
  intro.t = 0;
  intro.dt = 0;
  intro.isActive = false;
  intro.tFade = 0;
  intro.tiempo = 0;
  intro.alp = 0;
  intro.seccion = 0;
  intro.start(5);
  shuffle(listadoPreguntas, true);
}
//***********************************************
class Intro {
  constructor() {
    this.imagenFondo = loadImage("/imagenes/FondoPEI.png");
    this.logo = loadImage("/imagenes/LOGOPEI.png");
    this.logoITM = loadImage("/imagenes/itm 80 2.png");
    this.instrucciones = loadImage("/imagenes/instrucciones.png");
    this.imagen = null;
    this.to = 0;
    this.t = 0;
    this.dt = 0;
    this.isActive = false;
    this.tFade = 0;
    this.tiempo = 0;
    this.alp = 0;
    this.seccion = 0;
  }
  show() {
    switch (this.seccion) {
      case 0:
        this.upDate();
        imageMode(CENTER);
        image(this.imagenFondo, width / 2, height / 2, width, height);
        noStroke();
        push();
        translate(width / 2, height / 2);
        scale(0.8);
        noStroke();
        //fill(255, 200);
        //rect(0, 0, width * 1, height * 0.5, 50);
        image(
          this.logo,
          -width * 0.25,
          0,
          this.logo.width * 0.25,
          this.logo.height * 0.25
        );
        image(
          this.logoITM,
          width * 0.25,
          0,
          this.logoITM.width * 1.8,
          this.logoITM.height * 1.8
        );

        pop();
        fill(0, this.alp);
        rectMode(CENTER);
        rect(width / 2, height / 2, width, height);
        if (this.dt >= this.tiempo) {
          this.seccion = 1;
          this.isActive = false;
          this.dt = 0;
          this.start(3);
        }
        break;
      case 1:
        this.upDate();
        imageMode(CENTER);
        image(this.imagenFondo, width / 2, height / 2, width, height);
        noStroke();
        image(
          this.instrucciones,
          width / 2,
          height / 2,
          width * 0.8,
          height * 0.8
        );
        fill(0, this.alp);
        rectMode(CENTER);
        rect(width / 2, height / 2, width, height);
        if (keyIsPressed && key == " ") {
          this.seccion = 2;
          this.isActive = false;
          this.dt = 0;
          this.start(3);
        }
        break;
      case 2:
        this.upDate();
        imageMode(CENTER);
        image(this.imagenFondo, width / 2, height / 2, width, height);
        noStroke();
        image(
          this.instrucciones,
          width / 2,
          height / 2,
          width * 0.8,
          height * 0.8
        );
        fill(0, this.alp);
        rectMode(CENTER);
        rect(width / 2, height / 2, width, height);
        break;
      case 3:
        this.upDate();
        this.start(10);
        imageMode(CENTER);
        image(this.imagenFondo, width / 2, height / 2, width, height);
        noStroke();
        fill(255, 100);
        rectMode(CENTER);
        rect(width * 0.5, height * 0.2, width * 0.4, height * 0.3, 20);
        mostrarLogos(2);
        textSize(60);
        textAlign(CENTER, CENTER);
        fill(0);
        stroke(0);
        text("Conocimiento: " + conocimiento, width / 2, height*0.2);
        image(personajePEI[0],width/2,height*0.7,personajePEI[0].width*0.15,personajePEI[0].height*0.15);
        image(imgTeclaR,width/2,height*0.95);
        noStroke();
        fill(0, this.alp);
        rectMode(CENTER);
        rect(width / 2, height / 2, width, height);
        if (this.dt >= this.tiempo) {
          if (keyIsPressed && (key == "r" || key == "R")) {
            reiniciar();
          }
        }
        break;
    }
  }
  start(t) {
    this.tiempo = t * 1000;
    if (!this.isActive && this.dt == 0) {
      this.to = millis();
      this.isActive = true;
    }
  }
  upDate() {
    this.t = millis();
    this.dt = this.t - this.to;
    if (this.seccion == 0 || this.seccion == 2)
      this.alp = map(this.dt, 0, this.tiempo, 0, 255);
    if (this.seccion == 1 || this.seccion == 3)
      this.alp = map(this.dt, 0, this.tiempo, 255, 0);
  }
}

//**************************************RULETA

class Ruleta {
  constructor(posX, posY, nPreguntas) {
    this.imagen = loadImage("/imagenes/ruletafondoazul.png");
    this.imgRul = loadImage("/imagenes/ruleta.png");
    this.posX = posX;
    this.posY = posY;
    this.preguntas = nPreguntas;
    this.jugar = false;
    this.angulo = 45;
    this.velRot = 50;
    this.acelRot = 0.01;
    this.escala = 1;
    this.tam = (width + height) * 0.5 * 0.3;
    this.angMin;
    this.angMax;
    this.mostrarAngulos = false;
    this.pregunta;
    this.colores = ["#b2cba3", "#e0df9f", "#e7a83e", "#9a736e", "#ea525f"];
    this.seccion = 0;
    this.preguntasHechas = [];
    this.contPreguntas = 0;
    this.busqueda = false;
    this.txtnuevamente = "Tira de la ruleta nuevamente";
    this.txtcelebrar = "¡Muy bien! Has ganados dos puntos";
    this.txtcastigar = "¡Oh no! Has perdido un punto";

    this.respuestaJugador;
    this.to;
    this.t;
    this.dt;
    this.final = false;
  }
  show() {
    imageMode(CENTER);
    image(this.imagen, width / 2, height / 2, width * 1.2, height * 1.2);
    mostrarLogos(1);
    switch (this.seccion) {
      case 0:
        push();
        translate(this.posX, this.posY);
        rotate(radians(this.angulo));
        scale(this.escala);
        this.disco();

        pop();
        push();
        translate(this.posX, this.posY);
        translate(this.tam, 0);
        fill(255);
        triangle(-30, 0, 10, -10, 10, 10);
        pop();

        if (this.jugar && this.velRot > 0) {
          this.velRot -= this.acelRot;
          this.angulo += this.velRot;
        } else if (this.velRot <= 0) {
          this.jugar = false;
          this.anguloco = this.angulo % 360;
          if (!this.mostrarAngulos) {
            this.mostrarAngulos = true;
            for (let i = 0; i < this.preguntas; i++) {
              this.angMin = (360 / this.preguntas) * i;
              this.angMax = (360 / this.preguntas) * (i + 1);

              if (this.anguloco > this.angMin && this.anguloco <= this.angMax) {
                this.pregunta =
                  (this.preguntas - (i - 1)) % (this.preguntas + 1);
                //print("pregunta: " + this.pregunta);
                if (this.conPreguntas == 0) {
                  this.preguntasHechas[0] = this.pregunta;
                  this.contPreguntas++;
                  this.seccion = 2;
                } else {
                  this.buscar();
                  if (!this.busqueda) {
                    this.preguntasHechas[this.contPreguntas] = this.pregunta;
                    this.contPreguntas++;
                    this.seccion = 2;
                  } else {
                    this.seccion = 1;
                  }
                }
                print(this.contPreguntas);
              }
            }
          }
        }
        if (keyIsPressed) {
          if (key == " ") {
            this.jugar = true;
            this.velRot = random(0, 10);
            this.mostrarAngulos = false;
            for (let i = 0; i < numpreguntas; i++) {
              shuffle(listadoPreguntas[i].respuestas, true);
            }
          }
        }
        break;
      case 1:
        this.preguntaRepetida();
        if (keyIsPressed) {
          if (key == " ") {
            this.seccion = 0;
          }
        }
        break;
      case 2:
        this.hacerPregunta();
        break;
      case 3:
        this.celebrar();
        image(
          personajePEI[1],
          width * 0.35,
          height * 0.5,
          personajePEI[1].width * 1.5,
          personajePEI[1].height * 1.5
        );
        this.tf = millis();
        this.dt = this.tf - this.to;
        if (keyIsPressed && this.dt > 2000) {
          if (key == " ") {
            this.seccion = 0;
            this.finalizar();
          }
        }

        break;
      case 4:
        this.castigar();
        image(
          personajePEI[2],
          width * 0.35,
          height * 0.5,
          personajePEI[2].width * 1.5,
          personajePEI[2].height * 1.5);
        this.tf = millis();
        this.dt = this.tf - this.to;
        if (keyIsPressed && this.dt > 2000) {
          if (key == " ") {
            this.seccion = 0;
            this.finalizar();
          }
        }
        break;
    }
  }
  finalizar() {
    if (this.contPreguntas == preguntasPorPartida) {
      seccion = 2;
      intro.seccion = 3;
      intro.start(8);
    }
  }
  buscar() {
    this.busqueda = false;
    for (let i = 0; i < this.preguntasHechas.length; i++) {
      //print(this.preguntasHechas[i]);
      if (this.preguntasHechas[i] == this.pregunta) this.busqueda = true;
    }
    //print(this.busqueda);
    return this.busqueda;
  }
  disco() {
    fill(200);
    //circle(0, 0, 2 * this.tam);
    imageMode(CENTER);
    push();
    scale(2.1);
    rotate(radians(-45));
    image(
      this.imgRul,
      0,
      0,
      this.imgRul.width * 0.68,
      this.imgRul.height * 0.68
    );
    pop();
    /*for (let i = 0; i < this.preguntas; i++) {
      push();
      rotate(radians((360 / this.preguntas) * i));
      stroke(0);
      line(0, 0, this.tam, 0);
      if (i == 0) line(0, 0, this.tam + 20, 0);
      text(i + 1, this.tam - 10, 0);
      pop();
    }*/
  }
  preguntaRepetida() {
    rectMode(CENTER);
    imageMode(CENTER);
    push();
    translate(width / 2, height / 2);
    noStroke();
    fill(255, 200);
    rect(0, 0, width * 0.8, height * 0.8, 10);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(36);
    text(this.txtnuevamente, 0, 0);
    pop();
  }
  hacerPregunta() {
    listadoPreguntas[this.pregunta].mostrar(); ///////////////////////////////
    /*print(
      listadoPreguntas[this.preguntasHechas[this.contPreguntas - 1]]
        .respuestaCorrecta
    );*/
    if (keyIsPressed) {
      if (key == "a" || key == "A") {
        if (
          listadoPreguntas[this.preguntasHechas[this.contPreguntas - 1]]
            .respuestaCorrecta ==
          listadoPreguntas[this.preguntasHechas[this.contPreguntas - 1]]
            .respuestas[0]
        ) {
          conocimiento += 2;
          this.seccion = 3;
        } else {
          conocimiento -= 1;
          this.seccion = 4;
        }
      } else if (key == "b" || key == "B") {
        if (
          listadoPreguntas[this.preguntasHechas[this.contPreguntas - 1]]
            .respuestaCorrecta ==
          listadoPreguntas[this.preguntasHechas[this.contPreguntas - 1]]
            .respuestas[1]
        ) {
          conocimiento += 2;
          this.seccion = 3;
        } else {
          conocimiento -= 1;
          this.seccion = 4;
        }
      } else if (key == "c" || key == "C") {
        if (
          listadoPreguntas[this.preguntasHechas[this.contPreguntas - 1]]
            .respuestaCorrecta ==
          listadoPreguntas[this.preguntasHechas[this.contPreguntas - 1]]
            .respuestas[2]
        ) {
          conocimiento += 2;
          this.seccion = 3;
        } else {
          conocimiento -= 1;
          this.seccion = 4;
        }
      } else if (key == "d" || key == "D") {
        if (
          listadoPreguntas[this.preguntasHechas[this.contPreguntas - 1]]
            .respuestaCorrecta ==
          listadoPreguntas[this.preguntasHechas[this.contPreguntas - 1]]
            .respuestas[3]
        ) {
          conocimiento += 2;
          this.seccion = 3;
        } else {
          conocimiento -= 1;
          this.seccion = 4;
        }
      }
      this.to = millis();
    }
    conocimiento = constrain(conocimiento, 0, 20);
  }

  celebrar() {
    rectMode(CENTER);
    imageMode(CENTER);
    push();
    translate(width / 2, height / 2);
    noStroke();
    fill(255, 250);
    rect(0, 0, width * 0.8, height * 0.8, 10);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(36);
    text(this.txtcelebrar, width*0.1, 0,width*0.2,height*0.5);
    pop();
  }

  castigar() {
    rectMode(CENTER);
    imageMode(CENTER);
    push();
    translate(width / 2, height / 2);
    noStroke();
    fill(255, 250);
    rect(0, 0, width * 0.8, height * 0.8, 10);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(36);
    text(this.txtcastigar, width*0.1, 0,width*0.2,height*0.5);
    pop();
  }
}
//*************************************PREGUNTA

class Pregunta {
  constructor(n, pres, resp) {
    this.imagen = null;
    this.pregunta = pres;
    this.respuestaCorrecta = resp;
    this.respuestas = [];
    this.colores = ["#AA0000", "#00AA00", "#0000AA", "#AAAA00"];
    this.letras = ["A", "B", "C", "D"];
    this.n = n;
    this.sected;
  }
  mostrar() {
    this.selected = false;
    rectMode(CENTER);
    imageMode(CENTER);
    push();
    translate(width / 2, height / 2);
    noStroke();
    fill(0, 200);
    rect(0, 0, width * 0.9, height * 0.8, 10);
    fill(255);
    textAlign(LEFT, CENTER);
    textSize(36);
    imageMode(CENTER);
    text(this.pregunta, 0, (-height / 2) * 0.6, width * 0.8, height * 0.2);
    for (let j = 0; j < 4; j++) {
      stroke(0);
      fill(this.colores[j]);
      push();
      translate(-width * 0.5, -height * 0.5);
      circle(
        width * 0.115,
        (height / 2) * 0.2 * j + height * 0.43,
        width * 0.02
      );
      pop();

      if (
        dist(
          mouseX - width / 2,
          mouseY - height / 2,
          (-width / 2) * 0.72,
          (height / 2) * 0.1 * j + 0.1 * width
        ) <
          width * 0.02 &&
        mouseIsPressed
      ) {
        this.selected = j;
        print("seleccionado" + j);
      }
      fill(255);
      stroke(0);
      textAlign(CENTER, CENTER);
      textSize(20);
      text(
        this.letras[j],
        (-width / 2) * 0.771,
        (height / 2) * 0.201 * j - 0.07 * height
      );
      textAlign(LEFT, TOP);
      text(
        this.respuestas[j],
        width * 0.0058,
        (height / 2) * 0.2 * j + width * 0.01,
        width * 0.75,
        height * 0.2
      );
    }
    pop();
  }
}

function keyPressed() {
  if (key == "r" || key == "R") reiniciar();
  if (key == "p" || key == "P") {
    print(listadoPreguntas);
    print(Preguntas);
  }
}

function cargarPreguntas() {
  Preguntas[0] = [
    "¿ Cuál es el enfoque principal de la Institución de Educación Superior ITM ?",
    [0, 0, 0, 0],
    "El ITM se enfoca en ofrecer una educación de alta calidad con igualdad de oportunidades, promoviendo el desarrollo humano integral a través de la vocación tecnológica, científica, artística y humanística.",
  ];
  Preguntas[1] = [
    "¿ Cuáles son las áreas clave en las que el ITM busca destacar para el año 2034 según su visión ?",
    [0, 0, 0, 0],
    "El ITM busca destacar como una comunidad académica investigativa e innovadora, enfocada en los ámbitos tecnológico, científico, artístico y humanista para educar con excelencia y consolidar una sociedad en equidad con la naturaleza.",
  ];
  Preguntas[2] = [
    "¿ Cómo describe el ITM su posición en el contexto nacional e internacional para el año 2034 ?",
    [0, 0, 0, 0],
    "Para el año 2034, el ITM aspira a posicionarse como una entidad académica reconocida a nivel nacional e internacional por su diversidad, transparencia, eficiencia y flexibilidad en la educación con excelencia.",
  ];
  Preguntas[3] = [
    "¿ Cuáles son los pilares que sustentan las acciones del ITM, según su misión institucional ?",
    [0, 0, 0, 0],
    "Las acciones del ITM se sustentan en la docencia, la investigación, la extensión, la internacionalización, el bienestar institucional y la proyección social.",
  ];
  Preguntas[4] = [
    "¿ Qué objetivo fundamental busca alcanzar el ITM a largo plazo, según su visión para 2034 ?",
    [0, 0, 0, 0],
    "El ITM busca consolidar una sociedad de seres humanos capaces de convivir en paz y equidad con la naturaleza, educando con excelencia en diversos ámbitos para fomentar esta convivencia armónica.",
  ];
  Preguntas[5] = [
    " ¿ Qué valor institucional del ITM enfatiza la importancia de promover la igualdad de oportunidades para todos los individuos, independientemente de sus diferencias ?",
    [0, 0, 0, 0],
    "Equidad e igualdad son valores centrales en el ITM, buscando garantizar oportunidades justas para todos.",
  ];
  Preguntas[6] = [
    "¿ Cuál es el valor que destaca el compromiso del ITM hacia la integridad, la sinceridad y el comportamiento ético ?",
    [0, 0, 0, 0],
    "Honestidad es un valor fundamental que guía las acciones del ITM hacia la transparencia y la ética.",
  ];
  Preguntas[7] = [
    "¿ Qué principio del ITM se enfoca en la aceptación y respeto hacia las diferencias individuales, culturales y sociales ?",
    [0, 0, 0, 0],
    "Diversidad y vida son valores que promueven la aceptación y valoración de las diferencias entre individuos y culturas.",
  ];
  Preguntas[8] = [
    "¿ Cuál es el valor que refleja el compromiso del ITM hacia la formación integral de sus estudiantes, más allá del ámbito académico ?",
    [0, 0, 0, 0],
    "Formación integral es un valor que destaca la preocupación del ITM por el desarrollo completo de sus estudiantes, no solo en lo académico, sino también en lo personal y social.",
  ];
  Preguntas[9] = [
    "¿ Qué valor del ITM se alinea con la promoción de un entorno de colaboración, solidaridad y armonía entre los miembros de la comunidad educativa ?",
    [0, 0, 0, 0],
    "Convivencia y cohesión social se centra en la importancia de fomentar la colaboración y la armonía entre todos los miembros de la comunidad educativa del ITM.",
  ];
  Preguntas[10] = [
    "¿ Cuál es uno de los objetivos del ITM relacionado con la capacitación de los individuos para desempeñar roles profesionales, de investigación y servicio social ?",
    [0, 0, 0, 0],
    "Profundizar en la formación integral de los colombianos dentro de las modalidades y calidades de la Educación Superior.",
  ];
  Preguntas[11] = [
    "¿ Qué objetivo del ITM busca ser un factor de desarrollo en múltiples esferas a nivel nacional y regional ?",
    [0, 0, 0, 0],
    "Ser factor de desarrollo científico, cultural, económico, político y ético a nivel nacional y regional.",
  ];
  Preguntas[12] = [
    "¿ Cuál es uno de los objetivos del ITM que hace referencia a prestar servicios de calidad, considerando tanto resultados académicos como condiciones institucionales ?",
    [0, 0, 0, 0],
    "Prestar a la comunidad un servicio con calidad.",
  ];
  Preguntas[13] = [
    "¿ Qué objetivo del ITM está orientado a contribuir al desarrollo de niveles educativos anteriores para facilitar la consecución de sus metas ?",
    [0, 0, 0, 0],
    "Contribuir al desarrollo de los niveles educativos que le preceden.",
  ];
  Preguntas[14] = [
    "¿ Cuál es uno de los objetivos del ITM relacionado con la preservación del medio ambiente y la promoción de la educación ecológica ?",
    [0, 0, 0, 0],
    "Promover la preservación de un medio ambiente sano y fomentar la educación y cultura ecológica.",
  ];
  Preguntas[15] = [
    "¿ Cómo se describe al estudiante en el enfoque educativo del ITM ?",
    [0, 0, 0, 0],
    "Como una persona en proceso de cambio, con habilidades únicas y influenciado por su entorno.",
  ];
  Preguntas[16] = [
    "¿ Qué habilidades se fomentan en el estudiante según el modelo pedagógico del ITM ?",
    [0, 0, 0, 0],
    "Mejora del pensamiento crítico y sistémico, capacidad de aprendizaje autónomo y toma de decisiones para lograr objetivos personales, académicos e institucionales.",
  ];
  Preguntas[17] = [
    "¿ Cuál es el enfoque de la Institución respecto a la formación de los estudiantes en el ITM ?",
    [0, 0, 0, 0],
    "Promover una formación autónoma y autorregulada centrada en la capacidad de aprender, pensamiento crítico, educación continua y responsabilidad ciudadana.",
  ];
  Preguntas[18] = [
    "¿ Qué rol fundamental desempeña el docente del ITM en el proceso educativo ?",
    [0, 0, 0, 0],
    "Facilitador y mediador que guía el aprendizaje y la construcción de conocimiento de los estudiantes.",
  ];
  Preguntas[19] = [
    "¿ Cuál es una característica esencial de los docentes del ITM según su formación integral ?",
    [0, 0, 0, 0],
    "Experto en su área de conocimiento con habilidades pedagógicas y didácticas, así como capacidades sociales, emocionales y éticas para interactuar con los estudiantes.",
  ];
  Preguntas[20] = [
    "¿ Cómo se describen los distintos tipos de docentes según la relación establecida con la Institución en el ITM ?",
    [0, 0, 0, 0],
    "Aspirantes a carrera, vinculados, ocasionales, de cátedra, visitantes o ad-honórem, cada uno con funciones y periodos específicos según las necesidades de la institución.",
  ];
  Preguntas[21] = [
    "¿ Cuál es uno de los roles fundamentales atribuidos a los egresados del ITM en la sociedad ?",
    [0, 0, 0, 0],
    "Generar crecimiento institucional y contribuir a resolver problemas y satisfacer necesidades sociales.",
  ];
  Preguntas[22] = [
    "¿ Qué características definen al egresado del ITM en términos de su preparación para el mundo laboral y su impacto en la comunidad ?",
    [0, 0, 0, 0],
    "Está preparado para enfrentar retos laborales, adaptarse a cambios, ser agente de cambio en su comunidad y proponer soluciones desde su área de conocimiento.",
  ];
  Preguntas[23] = [
    "¿ Cuál es una habilidad importante que se destaca en el perfil del egresado del ITM en relación con su interacción a nivel global ?",
    [0, 0, 0, 0],
    "Posee habilidades comunicativas, de negociación y una formación interdisciplinaria que le permite interactuar efectivamente en un entorno globalizado.",
  ];
  //Preguntas[24]=["¿ Qué se valora principalmente en la contribución de los empleados del ITM al funcionamiento de la institución ?",[0,0,0,0], "Compromiso, responsabilidad y excelencia en su trabajo."];
  //Preguntas[25]=["¿ Cuál es una de las responsabilidades del personal directivo y administrativo en el ITM ?",[0,0,0,0], "Tareas relacionadas con la gestión institucional, como administración financiera, recursos humanos y servicios generales."];
  //Preguntas[26]=["¿ Qué función desempeña el personal de servicios generales en el ITM ?",[0,0,0,0], "Se encargan del mantenimiento general, la limpieza, la seguridad y el funcionamiento de las instalaciones para garantizar la comodidad de estudiantes y empleados."];
  Preguntas[24] = [
    "¿ Cuál es uno de los objetivos principales de la colaboración entre el ITM y el sector productivo ?",
    [0, 0, 0, 0],
    "Discutir temas sobre desarrollo económico, problemas tecnológicos, formular proyectos comunes y facilitar experiencias de aprendizaje para los estudiantes.",
  ];
  Preguntas[25] = [
    "¿ Qué papel desempeña el sector productivo en la promoción de ambientes propicios para la innovación y el emprendimiento según el enfoque del ITM ?",
    [0, 0, 0, 0],
    "Motivar la creación de ambientes creativos, críticos y de innovación para promover empresas y fortalecer la cultura emprendedora en diversas áreas del conocimiento.",
  ];
  Preguntas[26] = [
    "¿ Qué tipo de colaboración se busca entre el ITM y el sector productivo para el desarrollo y la innovación según el enunciado ?",
    [0, 0, 0, 0],
    "Colaboración en proyectos de investigación, desarrollo e innovación, así como en experiencias de aprendizaje para los estudiantes de la institución.",
  ];
  Preguntas[27] = [
    "¿ Cómo se define la docencia en el ITM ?",
    [0, 0, 0, 0],
    "La docencia se orienta al fomento del aprendizaje significativo, crítico y reflexivo de los estudiantes para aplicar lo aprendido en su desempeño profesional y vida cotidiana.",
  ];
  Preguntas[28] = [
    "¿ Cuál es el papel fundamental de los docentes según el PEI ?",
    [0, 0, 0, 0],
    "Construir conocimientos, habilidades, actitudes y valores en profesionales competentes y ciudadanos comprometidos con su entorno.",
  ];
  Preguntas[29] = [
    "¿ Qué implica la formación integral desde la perspectiva del ITM ?",
    [0, 0, 0, 0],
    "Va más allá de adquirir conocimientos y habilidades, contribuyendo a la transformación personal del individuo para intervenir en su realidad con una perspectiva crítica y comprometida.",
  ];
  Preguntas[30] = [
    "¿ Cómo define la Institución la relación entre tecnología y desarrollo humano ?",
    [0, 0, 0, 0],
    "Existe una estrecha relación entre tecnología y desarrollo humano, influenciando aspectos sociales, económicos, políticos, ambientales y culturales.",
  ];
  Preguntas[31] = [
    "¿ Qué estrategias didácticas se promueven en el ITM ?",
    [0, 0, 0, 0],
    "Se fomentan estrategias como el aprendizaje basado en problemas, el aprendizaje cooperativo, el aprendizaje colaborativo, entre otros, para impulsar un aprendizaje activo y participativo.",
  ];
  Preguntas[32] = [
    " ¿ Qué tipos de evaluación se destacan en el enfoque educativo del ITM ?",
    [0, 0, 0, 0],
    "La evaluación puede ser diagnóstica, formativa o sumativa, realizada en momentos iniciales, procesales o finales, e involucra la autoevaluación, coevaluación y heteroevaluación para brindar retroalimentación.",
  ];
  Preguntas[33] = [
    "¿ Qué criterios transversales al currículo se consideran esenciales en el ITM ?",
    [0, 0, 0, 0],
    "Flexibilidad, interdisciplinariedad, transdisciplinariedad, interculturalidad y otros inherentes a la identidad institucional.",
  ];
  Preguntas[34] = [
    "¿ Qué significa la interdisciplinariedad en el contexto del ITM ?",
    [0, 0, 0, 0],
    "Implica un diálogo entre saberes y métodos de diferentes disciplinas para abordar problemas complejos y generar soluciones innovadoras.",
  ];
  Preguntas[35] = [
    "¿ Cómo financia el ITM su sistema de Ciencia, Tecnología e Innovación (CTI) ?",
    [0, 0, 0, 0],
    "El ITM financia su sistema de CTI con recursos del presupuesto institucional, incluyendo recursos propios, transferencias para inversión, rentas por transferencia y comercialización de tecnologías, además de recursos de regalías y otras fuentes externas, priorizando el beneficio público y el progreso del territorio.",
  ];
  Preguntas[36] = [
    "¿ Qué importancia tiene la investigación básica para el ITM en relación con la investigación aplicada y la investigación-creación ?",
    [0, 0, 0, 0],
    "La investigación básica es fundamental para generar conocimientos fundamentales. El enfoque principal del ITM está en la investigación aplicada y la investigación-creación, que se relacionan directamente con procesos de diseño y producción, cruciales para generar nuevo conocimiento y desarrollo tecnológico transferible en ámbitos sociales y productivos.",
  ];
  Preguntas[37] = [
    "¿ Cuál es la visión del ITM respecto a la investigación formativa y la formación en investigación ?",
    [0, 0, 0, 0],
    "El ITM considera la investigación formativa como una oportunidad para fomentar vocaciones científicas y el relevo generacional en CTI, enfocándose en el desarrollo de competencias desde los programas de estudio y a través de programas que incluyen semilleros de investigación y formación en habilidades técnicas y metodológicas.",
  ];
  Preguntas[38] = [
    "¿ Cómo se lleva a cabo la investigación de alto nivel en el ITM y cuál es su enfoque ?",
    [0, 0, 0, 0],
    "El ITM se enfoca en actividades de investigación para generar conocimiento científico, tecnológico, humanístico, artístico y cultural que contribuya al desarrollo social, económico, ambiental y sostenible del territorio. Esta investigación se realiza a través de proyectos formales de diferentes tipos, desde investigación básica hasta innovación, con un impacto que trasciende lo local.",
  ];
  Preguntas[39] = [
    "¿ Cómo se vinculan las actividades de investigación con los programas académicos en el ITM ?",
    [0, 0, 0, 0],
    "Las actividades de investigación están articuladas con los programas académicos, asegurando la actualización de estos programas en consonancia con los nuevos descubrimientos, métodos y su aplicación en el ámbito profesional.",
  ];
  Preguntas[40] = [
    "¿ Cómo define el ITM la extensión académica y cuáles son sus modalidades ?",
    [0, 0, 0, 0],
    "La extensión académica se define como una función misional que ofrece servicios de formación integral, consultorías, formación continua, interventorías, articulación con la media técnica, proyectos especiales y gestión de laboratorios, todo enfocado en adquirir conocimientos, habilidades y técnicas.",
  ];
  Preguntas[41] = [
    "¿ Cuál es el propósito de la proyección social en el ITM y qué modalidades se destacan en esta área ?",
    [0, 0, 0, 0],
    "La proyección social busca fortalecer la interacción con el entorno, siendo un aliado estratégico para solucionar problemáticas del entorno. Las modalidades incluyen asesorías, talleres, voluntariado y proyectos especiales orientados a abordar necesidades sociales y productivas.",
  ];
  Preguntas[42] = [
    "¿ Cómo contribuye la extensión del ITM a la apropiación social del conocimiento ?",
    [0, 0, 0, 0],
    "La extensión contribuye a la apropiación social del conocimiento implementando programas y proyectos transversales que permiten a las comunidades conocer, comprender y adaptar tecnologías para satisfacer sus necesidades, fortaleciendo el conocimiento y uso del patrimonio natural y cultural.",
  ];
  Preguntas[43] = [
    "¿ Cuál es la relación entre la extensión académica y la docencia en el ITM ?",
    [0, 0, 0, 0],
    "La extensión académica se articula con la docencia ofreciendo servicios de formación integral que complementan la enseñanza, con programas y proyectos de alta relevancia en Ciencia, Tecnología e Innovación (CTI), así como asesorías y consultorías especializadas.",
  ];
  Preguntas[44] = [
    "¿ En qué se fundamenta la extensión y la proyección social según la visión del ITM ?",
    [0, 0, 0, 0],
    "La extensión y proyección social se fundamentan en la transferencia y apropiación del conocimiento y los resultados generados a través de actividades de investigación, innovación y experiencia académica, con el objetivo de abordar problemas y desafíos sociales, económicos y tecnológicos, mejorando la calidad de vida de las personas en diferentes contextos.",
  ];
  Preguntas[45] = [
    "¿ Cuál es el impacto de la cultura de la internacionalización en las funciones esenciales del ITM ?",
    [0, 0, 0, 0],
    "La cultura de la internacionalización contribuye a fortalecer las funciones sustantivas de la docencia, investigación y extensión al promover una educación inclusiva, equitativa y de calidad, además de garantizar la pertinencia de la enseñanza y la investigación al servicio de las necesidades de los territorios.",
  ];
  Preguntas[46] = [
    "¿ Cómo se benefician los estudiantes, profesores, investigadores y personal administrativo del ITM mediante la internacionalización ?",
    [0, 0, 0, 0],
    "La internacionalización les permite cultivar capacidades internacionales, dialogar críticamente con otras culturas, generar buenas prácticas, adquirir nuevas habilidades, metodologías de trabajo, competencia comunicativa en lenguas extranjeras y visiones del mundo, enriqueciendo así sus experiencias y aprendizajes pertinentes.",
  ];
  Preguntas[47] = [
    "¿ Qué estrategias utiliza el ITM para la internacionalización de sus procesos formativos, investigativos y de extensión ?",
    [0, 0, 0, 0],
    "Se enfoca en la diplomacia científica para establecer estrategias de cooperación científica con redes, grupos científicos y actores gubernamentales a nivel nacional e internacional. Esto implica fomentar intercambios académicos, desarrollar proyectos de cooperación internacional, innovar en métodos pedagógicos y promover competencias comunicativas en lenguas extranjeras.",
  ];
  Preguntas[48] = [
    "¿ Cuál es el propósito de la diplomacia científica en el contexto de la internacionalización del ITM ?",
    [0, 0, 0, 0],
    "La diplomacia científica busca generar formas de colaboración entre grupos científicos y actores estatales para abordar retos comunes y problemáticas locales y globales, promoviendo la resolución de desafíos a través de la colaboración internacional.",
  ];
  Preguntas[49] = [
    "¿ Cómo impacta la cultura de la internacionalización en la comunidad del ITM y en la sociedad en general ?",
    [0, 0, 0, 0],
    "La internacionalización orientada por esta cultura impulsa a la comunidad del ITM a participar en un contexto global, entendiendo sus diversos mundos locales y globales (glocales), generando oportunidades para transformar la vida de la comunidad y contribuir al desarrollo de una sociedad equitativa, sostenible e inteligente.",
  ];
  Preguntas[50] = [
    "¿ Cómo se define y cómo se integra el bienestar institucional en la misión y propósitos del ITM ?",
    [0, 0, 0, 0],
    "El bienestar institucional se concibe como una función, proceso, ecosistema, cultura y comunidad. Es una responsabilidad compartida que se integra en la misión y propósitos de la Institución, colocando a las personas en el centro de dichos propósitos.",
  ];
  Preguntas[51] = [
    "¿ Cuáles son los elementos clave que componen la visión dinámica y compleja del bienestar en la institución ?",
    [0, 0, 0, 0],
    "El bienestar se conforma como un proceso dinámico que abarca las relaciones consigo mismo, con los otros y con lo otro, así como la preocupación genuina por los demás y la prevención en el actuar para no afectar el bienestar en sus diversas dimensiones. Esta visión incluye también la ecología humana y una cultura de cuidado y solidaridad.",
  ];
  Preguntas[52] = [
    "¿ Qué papel desempeñan las diferentes dependencias y actores institucionales en la construcción del bienestar en el ITM ?",
    [0, 0, 0, 0],
    "Las dependencias y los actores institucionales se articulan para diseñar, ejecutar y participar en proyectos, programas y actividades que satisfacen las necesidades, intereses y capacidades de la comunidad ITM. A través de esta colaboración, se promueve un entorno de bienestar que trasciende a la sociedad.",
  ];
  Preguntas[53] = [
    "¿ Cuáles son las estrategias y programas específicos que implementa la institución para promover el bienestar en su comunidad académica ?",
    [0, 0, 0, 0],
    "Va más allá de adquirir conocimientos y habilidades, contribuyendo a la transformación personal del individuo para intervenir en su realidad con una perspectiva crítica y comprometida.",
  ];
  Preguntas[54] = [
    "¿ Cómo se relaciona el concepto de bienestar en el ITM con la transmisión de valores, el desarrollo humano y la búsqueda de la felicidad tanto a nivel individual como colectivo en la sociedad ?",
    [0, 0, 0, 0],
    "El bienestar en el ITM busca transmitir valores y filosofía institucional, promoviendo una comunidad armónica donde se reconozca la dignidad humana y se propicie la satisfacción, el desarrollo personal y relaciones armoniosas. Esta búsqueda se expande hacia la sociedad, facilitando el camino hacia una búsqueda responsable y reflexiva de la felicidad.",
  ];
  for (let j = 0; j < Preguntas.length; j++) {
    Preguntas[j][1][0] = Preguntas[j][2];
    if (j > Preguntas.length - 4) {
      Preguntas[j][1][1] = Preguntas[0][2];
      Preguntas[j][1][2] = Preguntas[1][2];
      Preguntas[j][1][3] = Preguntas[2][2];
    } else {
      Preguntas[j][1][1] = Preguntas[j + 1][2];
      Preguntas[j][1][2] = Preguntas[j + 2][2];
      Preguntas[j][1][3] = Preguntas[j + 3][2];
    }
  }
}
