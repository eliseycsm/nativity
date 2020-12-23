//helper tool to draw grid lines on scene; making img positioning easier

import { Scene } from 'phaser'

export interface SceneMapperConfig{
    scene: Scene,
    columns: number,
    rows: number
}

export class ScreenMapper{ //split game screen into columns and rows, position image in the center of square
    
    private gridWidth = 0
    private gridHeight = 0
    private scrnWidth = 0
    private scrnHeight = 0
    private halfGridWidth = 0 //for the center of the grid to position our image
    private halfGridHeight = 0
    
    constructor(private config: SceneMapperConfig){
        this.scrnWidth = this.config.scene.game.config.width as number
        this.scrnHeight = this.config.scene.game.config.height as number
        this.gridWidth = this.scrnWidth / this.config.columns
        this.gridHeight = this.scrnHeight / this.config.rows
        this.halfGridWidth = Math.floor(this.gridWidth / 2)
        this.halfGridHeight = Math.floor(this.gridHeight / 2)
    }

    placeObjectAt(x, y, obj: any){ //create method to position obj for us
        //set position of obj
        obj.x = (x * this.gridWidth) + this.halfGridWidth
        obj.y = (y * this.gridHeight) + this.halfGridHeight
    }
    
    placeImageAt(x, y, key: string, options: any = {}){
        //options used for scaling
        const img = this.config.scene.add.image(0,0, key) //add image to phaser
        if ('scaleX' in options){
            img.scaleX = options['scaleX']
        }
        if ('scaleY' in options){
            img.scaleY = options['scaleY']
        }

        //sometimes hard to scale image by itself, so we wanna scale relative to scrn instead
        if('scaleToWidth' in options) {
            img.displayWidth = Math.floor(this.scrnWidth * options['scaleToWidth'])
            //maintain aspect ratio
            img.scaleY = img.scaleX //since we alr adjusted the width
        }

        if('scaleToHeight' in options) {
            img.displayHeight = Math.floor(this.scrnHeight * options['scaleToHeight'])
            //maintain aspect ratio
            img.scaleX = img.scaleY //since we alr adjusted the height
        }
        this.placeObjectAt(x, y, img)
        return img
    }

    //helping with obj placement & debugging
    drawGrids(){
        //get a copy of graphics context
        const gc = this.config.scene.add.graphics()

        //set color of drawing pen for the grid
        gc.lineStyle(2, 0xff0000, 0.5)//2px, rgb color, with/w.o alpha

        //draw columns
        for (let i = 0; i < this.config.columns; i++){
            //move the pen to the first location
            gc.moveTo( i * this.gridWidth, 0) //going to top of grid to draw vertical line down
            gc.lineTo(i * this.gridWidth, this.scrnHeight) //draw line to bottom of screen
        }

        //draw rows
        for (let i = 0; i < this.config.rows; i++){
            //move the pen to the first location
            gc.moveTo( 0, i * this.gridHeight) //going to top of grid to draw vertical line down
            gc.lineTo(this.scrnWidth, i * this.gridHeight) //draw line to bottom of screen
        }

        gc.strokePath()

    }

    //refactor
    scaleObject(obj: any, options: any = {}){
        if ('scaleX' in options){
            obj.scaleX = options['scaleX']
        }
        if ('scaleY' in options){
            obj.scaleY = options['scaleY']
        }

        //sometimes hard to scale image by itself, so we wanna scale relative to scrn instead
        if('scaleToWidth' in options) {
            obj.displayWidth = Math.floor(this.scrnWidth * options['scaleToWidth'])
            //maintain aspect ratio
            obj.scaleY = obj.scaleX //since we alr adjusted the width
        }

        if('scaleToHeight' in options) {
            obj.displayHeight = Math.floor(this.scrnHeight * options['scaleToHeight'])
            //maintain aspect ratio
            obj.scaleX = obj.scaleY //since we alr adjusted the height
        }
    }
    placeSpriteAt(x, y, key: string, options: any = {}){
        const sprite = this.config.scene.add.sprite(0,0, key)
        this.scaleObject(sprite, options)
        this.placeObjectAt(x,y, sprite)
        return sprite

    }

    placeTextAt(x, y, msg: string, options: any = {}){
        const text = this.config.scene.add.text(0, 0 ,msg,
            {
                fontFamily: 'Mountains of Christmas',
                fontSize: '5em',
                color: '#187219'
            }
            )
        this.placeObjectAt(x, y, text)
        return text
    }
}

