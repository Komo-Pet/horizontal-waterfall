(() => {
    //getting canvas and his context
    const cnv = document.querySelector('canvas');
    const ctx = cnv.getContext('2d');

    //if window resize, animation will be reset automatically
    let cw, ch, cx, cy;
    function resizeCanvas() {
      cw = cnv.width  = innerWidth;
      ch = cnv.height = innerHeight;
      cx = cw * .5;
      cy = ch * .5;
    }

    //initial values for Waterfall, you can customize it
    const cfg = {
      dRed: 105,        //delta Red color in RGB
      dGreen: 40,       //delta Green color in RGB
      dBlue: 0,         //delta Blue color in RGB
      minRed: 20,       //min Red color in RGB
      minGreen: 100,    //min Green color in RGB
      minBlue: 153,     //min Blue color in RGB
      orbsCount: 600,   //amount of the orbs
      thick: 400,       //thickness of the waterfall
      minVelocity: 0.5, //minimum Velocity of each orb
    }
    //Definite each orb
    class Orb {
      constructor() {
        this.size = Math.random() * 5 + 2;
        //Position of orbs in x and y coordinates
        this.distX = Math.random() * cw;                                    
        this.distY = (Math.random() * cfg.thick) + (cy - 0.5 * cfg.thick);  
        this.velocity = Math.random() * cfg.minVelocity + 0.5;
        //Calculating color
        this.red = Math.floor(Math.random() * dRed + minRed);
        this.green = Math.floor(Math.random() * dGreen + minGreen);
        this.blue = Math.floor(Math.random() * dBlue + minBlue);
        this.color = `rgb(${this.red}, ${this.green}, ${this.blue})`;
      }

      refresh(){
        let x = this.distX + this.velocity;


        if (x >= cnv.width) {
          this.distX = 0;
        }
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(x, this.distY, this.size, 0, 2 * Math.PI);
        ctx.fill();

        this.distX = this.distX + this.velocity;
      }
    }
    
    let orbsList;
    function createWaterfall() {
      orbsList = [];
      for (i = 0; i < cfg.orbsCount; i++){
        orbsList.push(new Orb());
      }
    }

    function init() {
      resizeCanvas();
      createWaterfall();
    }
    init();
    window.addEventListener(`resize`, init);

    function loop(){
      requestAnimationFrame(loop);
      ctx.fillStyle = 'rgb(22, 22, 22)'
      ctx.fillRect(0, 0, cw, ch)
      orbsList.map(e => e.refresh());
    }
    loop();
})();