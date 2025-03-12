import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas-player',
  templateUrl: './canvas-player.component.html',
  styleUrls: ['./canvas-player.component.scss']
})
export class CanvasPlayerComponent implements AfterViewInit {

  constructor() { }

  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private img: HTMLImageElement = new Image();

  // Definir los botones en coordenadas específicas
  private buttons = [
    { x: 653, y: 1439, width: 145, height: 28, audioId: "tonas" },
    { x: 588, y: 1206, width: 128, height: 28, audioId: "seguiriya" },
    { x: 642, y: 996, width: 135, height: 24, audioId: "laSolea" },
    { x: 681, y: 879, width: 130, height: 24, audioId: "malagueñas" },
    { x: 693, y: 678, width: 130, height: 28, audioId: "bulerias" },
    { x: 654, y: 503, width: 157, height: 28, audioId: "granainas" },
    { x: 713, y: 383, width: 212, height: 30, audioId: "mediasGranainas" },
    { x: 471, y: 1420, width: 98, height: 15, audioId: "fandangos" },
    { x: 446, y: 1355, width: 90, height: 18, audioId: "saeta" },
    { x: 853, y: 1388, width: 85, height: 22, audioId: "debla" },
    { x: 885, y: 1328, width: 93, height: 22, audioId: "carcelera" },
    { x: 839, y: 1289, width: 103, height: 22, audioId: "martinete" },
    { x: 406, y: 1288, width: 103, height: 22, audioId: "cañas" },
    { x: 260, y: 1346, width: 80, height: 22, audioId: "elPolo" },
    { x: 235, y: 1248, width: 135, height: 22, audioId: "alegrias" },
    { x: 883, y: 1173, width: 100, height: 45, audioId: "estilosCamperos" },
    { x: 1108, y: 1098, width: 100, height: 26, audioId: "bamberas" },
    { x: 1008 , y: 1002, width: 75, height: 26, audioId: "roas" },
    { x: 1159, y: 1003, width: 105, height: 26, audioId: "peteneras" },
    { x: 774, y: 1157, width: 95, height: 26, audioId: "temporera" },
    { x: 452, y: 1173, width: 85, height: 24, audioId: "liviana" },
    { x: 881, y: 1080, width: 140, height: 26, audioId: "campanilleros" },
    { x: 773, y: 1065, width: 95, height: 26, audioId: "arrieras" },
    { x: 432, y: 1110, width: 90, height: 26, audioId: "serana" },
    { x: 467, y: 1060, width: 90, height: 24, audioId: "trilleras" },
    { x: 523, y: 975, width: 98, height: 26, audioId: "sevillanas" },
    { x: 126, y: 1211, width: 83, height: 26, audioId: "tientos" },
    { x: 305, y: 1195, width: 125, height: 24, audioId: "caracoles" },
    { x: 90, y: 1095, width: 130, height: 26, audioId: "cantiñas" },
    { x: 266, y: 1108, width: 105, height: 26, audioId: "tangos" },
    { x: 303, y: 1054, width: 134, height: 26, audioId: "tanguillos" },
    { x: 211, y: 1024, width: 93, height: 26, audioId: "romeras" },
    { x: 106, y: 894, width: 98, height: 26, audioId: "mirabras" },
    { x: 372, y: 1001, width: 110, height: 26, audioId: "elGarrotin" },
    { x: 202, y: 957, width: 82, height: 26, audioId: "piyayo" },
    { x: 837, y: 951, width: 134, height: 26, audioId: "fandanguillos" },
    { x: 909, y: 909, width: 100, height: 26, audioId: "jabegote" },
    { x: 531, y: 895, width: 90, height: 26, audioId: "huelva" },
    { x: 215, y: 848, width: 110, height: 26, audioId: "praviana" },
    { x: 405, y: 856, width: 90, height: 26, audioId: "rumbas" },
    { x: 155, y: 785, width: 100, height: 26, audioId: "farrucas" },
    { x: 369, y: 790, width: 100, height: 26, audioId: "milongas" },
    { x: 174, y: 691, width: 130, height: 26, audioId: "colombianas" },
    { x: 412, y: 693, width: 100, height: 26, audioId: "vidalitas" },
    { x: 257, y: 614, width: 105, height: 26, audioId: "guajiras" },
    { x: 553, y: 826, width: 95, height: 26, audioId: "tarantos" },
    { x: 478, y: 763, width: 93, height: 26, audioId: "tarantas" },
    { x: 573, y: 717, width: 85, height: 26, audioId: "jaberas" },
    { x: 526, y: 628, width: 95, height: 26, audioId: "mineras" },
    { x: 435, y: 565, width: 95, height: 26, audioId: "zambra" },
    { x: 510, y: 504, width: 98, height: 26, audioId: "zorongo" },
    { x: 497, y: 412, width: 95, height: 34, audioId: "alborea" },
    { x: 1038, y: 857, width: 110, height: 26, audioId: "bandola" },
    { x: 1098, y: 787, width: 110, height: 26, audioId: "marianas" },
    { x: 884, y: 772, width: 95, height: 26, audioId: "ferreña" },
    { x: 1152, y: 722, width: 105, height: 26, audioId: "verdiales" },
    { x: 871, y: 689, width: 95, height: 26, audioId: "rondeñas" },
    { x: 1031, y: 673, width: 140, height: 26, audioId: "cartageneras" },
    { x: 978, y: 608, width: 140, height: 26, audioId: "canasteras" },
    { x: 847, y: 587, width: 75, height: 26, audioId: "fiesta" },
    { x: 876, y: 534, width: 95, height: 26, audioId: "romance" },
    { x: 922, y: 480, width: 75, height: 26, audioId: "nana" },
  ];

  // Variable para almacenar el audio actualmente en reproducción
  private currentAudio: HTMLAudioElement | null = null;

  // Variable para almacenar el botón activo (el que tiene la canción reproduciéndose)
  private activeButton: { x: number; y: number; width: number; height: number; audioId: string } | null = null;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    // Cargar la imagen
    this.img.src = "./../../assets/images/arbol.jpg";  // 📌 Asegúrate de que la ruta sea correcta
    this.img.onload = () => {
      canvas.width = this.img.width;
      canvas.height = this.img.height;
      this.drawCanvas(); // Dibujar el canvas una vez que la imagen se haya cargado
    };

    // Detectar clics en el canvas
    canvas.addEventListener('click', this.handleCanvasClick.bind(this));
    // Cambiar el cursor al pasar sobre los botones
    canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
  }

  private drawCanvas(): void {
    const canvas = this.canvasRef.nativeElement;

    // Limpiar el canvas antes de redibujar
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar la imagen
    this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height);

    // Dibujar los botones (solo para debug, puedes comentar esto si no los necesitas)
    this.buttons.forEach(btn => {
      this.ctx.fillStyle = "transparent";
     // this.ctx.fillRect(btn.x, btn.y, btn.width, btn.height);
      //this.ctx.strokeStyle = "black";
      //this.ctx.strokeRect(btn.x, btn.y, btn.width, btn.height);
    });

    // Dibujar la elipse amarilla con borde rojo sobre el botón activo (si existe)
    if (this.activeButton) {
      const centerX = this.activeButton.x + this.activeButton.width / 2;
      const centerY = this.activeButton.y + this.activeButton.height / 2;
      const radiusX = this.activeButton.width * 0.75; // Ancho de la elipse
      const radiusY = this.activeButton.height * 1.5; // Alto de la elipse

      // Dibujar el fondo amarillo
      this.ctx.beginPath();
      this.ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
      this.ctx.fill();

      // Dibujar el borde rojo
      this.ctx.strokeStyle = "red";
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
    }
  }

  private handleCanvasClick(event: MouseEvent): void {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Verificar si el clic está dentro de algún botón
    this.buttons.forEach(btn => {
      if (x >= btn.x && x <= btn.x + btn.width && y >= btn.y && y <= btn.y + btn.height) {
        this.toggleAudio(btn);
      }
    });
  }

  private handleMouseMove(event: MouseEvent): void {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    let isHovering = false;

    this.buttons.forEach(btn => {
      if (x >= btn.x && x <= btn.x + btn.width && y >= btn.y && y <= btn.y + btn.height) {
        isHovering = true;
      }
    });

    // Cambiar el cursor
    canvas.style.cursor = isHovering ? "pointer" : "default";
  }

  private toggleAudio(button: { x: number; y: number; width: number; height: number; audioId: string }): void {
    const audio = document.getElementById(button.audioId) as HTMLAudioElement;

    // Si hay un audio reproduciéndose y no es el mismo que el que se quiere reproducir, detenerlo
    if (this.currentAudio && this.currentAudio !== audio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0; // Reiniciar el audio
    }

    // Reproducir o pausar el audio seleccionado
    if (audio.paused) {
      audio.play();
      this.currentAudio = audio; // Actualizar el audio actual
      this.activeButton = button; // Actualizar el botón activo
    } else {
      audio.pause();
      this.currentAudio = null; // No hay audio en reproducción
      this.activeButton = null; // No hay botón activo
    }

    // Redibujar el canvas para mostrar la elipse
    this.drawCanvas();
  }
}
