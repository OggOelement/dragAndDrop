import { Point, Sprite } from "pixi.js";
import {TweenMax} from "gsap"

export default class DragAndDrop {


    private _startPosition: Point = new Point();
    private _endPosition: Point;
    private _draggableObject : Sprite;
    private _isDragging: boolean = false;
    private _isDrop: boolean = false;

    private _distance: number;

    private _distanceToDrop: number = 60;
    
    constructor(draggableObject : Sprite){

        this._draggableObject = draggableObject;
        this._startPosition.x = this._draggableObject.x;
        this._startPosition.y = this._draggableObject.y;
        
        this._draggableObject.interactive = true;
        this._draggableObject.on("pointerdown", this.pointerDownHandler.bind(this));
        this._draggableObject.on("pointerup", this.pointerUpHandler.bind(this));
        this._draggableObject.on("pointermove", this.pointerMoveHandler.bind(this));
        
    }


    private pointerDownHandler (): void {

        this._isDragging = true;
    }

    private pointerUpHandler (): void {

        this._distance = Math.sqrt(Math.pow(this._endPosition.x - this._draggableObject.x ,2) + Math.pow(this._endPosition.y - this._draggableObject.y ,2));

        if(this._distance < this._distanceToDrop) {
            TweenMax.to(this._draggableObject, 0.1, {x: this._endPosition.x , y: this._endPosition.y});
        }else {
            TweenMax.to(this._draggableObject, 0.3, {x: this._startPosition.x , y: this._startPosition.y});
        }

        this._isDragging = false;
    }


    
    private pointerMoveHandler (event: PIXI.interaction.InteractionEvent): void {
        if(this._isDragging){
            this._draggableObject.x = event.data.global.x - this._draggableObject.getBounds().width / 2;
            this._draggableObject.y = event.data.global.y - this._draggableObject.getBounds().height / 2;   
        }
    }

    
    public set endPosition(v : Point) {
        this._endPosition = v;
    }
    

}