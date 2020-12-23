import { GameObjects, Scene } from 'phaser'
import { ANIMS_PADORU, SCENE_CARD, IMG_ANGEL_GABRIEL, IMG_BW_GAB, IMG_MERRY_XMAS, IMG_MARY, IMG_BONFIRE, ANIMS_BONFIRE, AUDIO_AWAY_IN_A_MANGER, SNOW_BG, IMG_PIXEL_KLEE, AUDIO_KLEE, ANIMS_PIXEL_KLEE, IMG_PADORU } from '../constants'
import { GameService } from '../game.service'
import { ScreenMapper } from './scene-mapper'
import {Globals} from '../constants'

export class CardScene extends Scene{
//phaser uses alot of keys, so we create a file constants.ts to keep the keys & names there and refer from there
    private gameSvc: GameService
    private padoru: GameObjects.Sprite
    private moveRight: boolean = true

    constructor(){
        super(SCENE_CARD)
        //lookup GameService
        this.gameSvc = Globals.injector.get(GameService)
        console.info(">>> in scene: ", this.gameSvc.message)
    }
    
    //load rss
    preload(){
        //load background
        //there is z order: the first imge to be loaded will become the background
               
        //load sprite sheet
        //sprite sheet has all the images in one, need to set size of one frame for phaser to cut it up
        this.load.spritesheet(IMG_BONFIRE, 'assets/bonfire.png', 
        {frameWidth: 230, frameHeight: 312}) //in px 

        //#klee
        this.load.image(SNOW_BG, 'assets/snow_background.jpg')
        this.load.spritesheet(IMG_PIXEL_KLEE, 'assets/klee_sprite.png', 
            {frameWidth: 320, frameHeight: 450 })
        this.load.spritesheet(IMG_PADORU, 'assets/padoru.png', 
            {frameWidth: 250, frameHeight: 250})
        this.load.audio(AUDIO_KLEE, [
            'assets/audio/klee_cut.mp3'
        ])
    }

    //create game objects
    create(){
        //create screenMapper
        const mapper = new ScreenMapper({
            scene: this,
            columns: 15,
            rows: 7
        })

        //return img to do adjustments to it eg. rotation
        //this.game is the game instance, any props can be accessed via .config
        //mapper is doing whatever is done by below code + scaling
        const centerX = (this.game.config.width as number) /2 //because config.width is both a string and a number so need to declare
        const centerY = (this.game.config.height as number) /2 

        //const bkg = this.add.image(centerX, centerY, IMG_BACKGROUND)
        //this.add.image(centerX, centerY, IMG_JOSEPH)
        //bkg.rotation = Phaser.Math.DegToRad(45)

        //klee
        mapper.placeImageAt(7,3, SNOW_BG)

        //add gridlines to screen for easier positioning
        //mapper.drawGrids()
        this.anims.create({
            key: ANIMS_PIXEL_KLEE,
            //generate frame numbers for the sprite sheet
            //if u have different motions in one sprite sheet u can define the start and end of the frames
            //for the exact motion set u want eg start: 0, end: 5
            frames: this.anims.generateFrameNumbers(IMG_PIXEL_KLEE, {start: 0}),
            frameRate: 4, //framerate/sec
            repeat: -1
        })
        this.anims.create({
            key: ANIMS_PADORU,
            frames: this.anims.generateFrameNumbers(IMG_PADORU, {start: 0}),
            frameRate: 16,
            repeat: -1
        })

        //place sprite animation and play animations
        let sprite = mapper.placeSpriteAt(14,6, IMG_PIXEL_KLEE, {scaleToHeight: 0.2})
        sprite.play(ANIMS_PIXEL_KLEE)
        sprite.y -= 20  

        this.padoru = mapper.placeSpriteAt(1,5, IMG_PADORU, {scaleToHeight: 0.25})
        this.padoru.y += 20
        this.padoru.play(ANIMS_PADORU)

        const music = this.sound.add(AUDIO_KLEE, 
            { volume: 0.6, loop: true })
        music.play()

        //create an animation
        this.anims.create({
            key: ANIMS_BONFIRE,
            //generate frame numbers for the sprite sheet
            //if u have different motions in one sprite sheet u can define the start and end of the frames
            //for the exact motion set u want eg start: 0, end: 5
            frames: this.anims.generateFrameNumbers(IMG_BONFIRE, {start: 0}),
            frameRate: 10, //framerate/sec
            repeat: -1
        })

        //place text
        let text = mapper.placeTextAt(3,3, this.gameSvc.message.toUpperCase())
        text.x -= 50
        text.y += 10

        
    }
    //game loop
    update(){//the longer u update the slower the game
        //60fps means update is executed 60 times per secs
        const dist = 10
        if (this.moveRight && this.padoru.x <= 1050 ){
            this.padoru.x += dist
        }else{
            this.padoru.x -= dist
            this.moveRight = this.padoru.x <= 250

        }

        
    }

    //if u have multiple msgs or content:
    // - store in mongo, use key in mongo and append that to url
    // use key to retrieve content

}