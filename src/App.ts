
import  * as PIXI from 'pixi.js';
import  DragAndDrop from "./DragAndDrop";


export class App{

    private _app: PIXI.Application;
    private _loader: PIXI.loaders.Loader;
    private _icon: PIXI.Sprite;
    private _dropZone: PIXI.Graphics;

    private _dragAndDrop: DragAndDrop;


    constructor(){
        this.initPixi();
    }


    private initPixi() : void {

        this._app = new PIXI.Application({
            width: 800,
            height: 600,
            backgroundColor: 0x0C3065 // light blue
          });

          this._app.renderer.view.style.position = "absolute";
          this._app.renderer.view.style.display = "block";

    
        document.body.appendChild(this._app.view);
   

       this._loader  =  new PIXI.loaders.Loader();
       this._loader.add('icon_star' , 'assets/icon_star.png');
       this._loader.addListener("progress" , () => this.progressHandler);
       this._loader.load(() => this.setDragAndDrop());

    
    }

    private progressHandler(e: any): void {   
        console.log(e.progress);
        console.log(e instanceof (Object)); 
    }



    private setDragAndDrop(): void {

        this._dropZone = new PIXI.Graphics();
        this._dropZone.beginFill(0x000000);
        this._dropZone.drawRect(0, 0, 64, 64);
        this._app.stage.addChild(this._dropZone);

        this._dropZone.x = 300;
        this._dropZone.y = 200;
        
        this._icon = PIXI.Sprite.fromImage("icon_star");
        this._icon.x = 20;
        this._icon.y = 50;
        this._icon.interactive = true;
        console.log(this._icon.alpha);
        this._app.stage.addChild(this._icon);


        this._dragAndDrop = new DragAndDrop(this._icon);
        this._dragAndDrop.endPosition = new PIXI.Point(this._dropZone.x , this._dropZone.y);



        this._app.start();
    }





}

