import { GameObjects, Scene } from 'phaser'
import { IMG_BABY_JESUS, IMG_BACKGROUND, IMG_JOSEPH, SCENE_CARD, IMG_ANGEL_GABRIEL, IMG_BW_GAB, IMG_MERRY_XMAS, IMG_MARY, IMG_BONFIRE, ANIMS_BONFIRE, AUDIO_AWAY_IN_A_MANGER } from '../constants'
import { GameService } from '../game.service'
import { ScreenMapper } from './scene-mapper'
import {Globals} from '../constants'

export class CardScene extends Scene{
//phaser uses alot of keys, so we create a file constants.ts to keep the keys & names there and refer from there
    //keep reference of gabriel
    private gabrielBW: GameObjects.Image
    private gameSvc: GameService

    constructor(){
        super(SCENE_CARD)
        //lookup GameService
        this.gameSvc = Globals.injector.get(GameService)
        console.info(">>> in scene: ", this.gameSvc.message)
    }
    //there are always 3 phases in a scene:
    //preload(load rss in), create and update(rendering process) (we are overwritting methods so make sure naming is correct)
    
    //load rss
    preload(){
        //load background
        //there is z order: the first imge to be loaded will become the background
        this.load.image(IMG_BACKGROUND, 'assets/background.png') //this image is now associated with this key
        this.load.image(IMG_JOSEPH, 'assets/joseph.png')
        this.load.image(IMG_BABY_JESUS, 'assets/baby_jesus.png')
        this.load.image(IMG_ANGEL_GABRIEL, 'assets/angel_gabriel.png')
        this.load.image(IMG_BW_GAB, 'assets/angel_gabriel_bw.png')
        this.load.image(IMG_MERRY_XMAS, 'assets/merry_christmas.png')
        this.load.image(IMG_MARY, 'assets/mary.png')
        
        //load sprite sheet
        //sprite sheet has all the images in one, need to set size of one frame for phaser to cut it up
        this.load.spritesheet(IMG_BONFIRE, 'assets/bonfire.png', 
        {frameWidth: 230, frameHeight: 312}) //in px

        //load audio
        this.load.audio(AUDIO_AWAY_IN_A_MANGER, [ //give an array and specify the multiple versions of ur song
            'assets/audio/away_in_a_manger.mp3',
            'assets/audio/away_in_a_manger.ogg',
        ])
    }

    //create game objects
    create(){
        //create screenMapper
        const mapper = new ScreenMapper({
            scene: this,
            columns: 11,
            rows: 11
        })

        let img = mapper.placeImageAt(5,5, IMG_BACKGROUND, {scaleToWidth:0.9})
        //return img to do adjustments to it eg. rotation
        //this.game is the game instance, any props can be accessed via .config
        //mapper is doing whatever is done by below code + scaling
        /* const centerX = (this.game.config.width as number) /2 //because config.width is both a string and a number so need to declare
        const centerY = (this.game.config.height as number) /2 

        const bkg = this.add.image(centerX, centerY, IMG_BACKGROUND) */
        //this.add.image(centerX, centerY, IMG_JOSEPH)
        //bkg.rotation = Phaser.Math.DegToRad(45)

        //add gridlines to screen for easier positioning
        //mapper.drawGrids()

        mapper.placeImageAt(4, 7, IMG_MARY, {scaleX: 0.5, scaleY: 0.5})
        mapper.placeImageAt(5, 8, IMG_BABY_JESUS, {scaleX: 0.3, scaleY: 0.3})
        
        let angel = mapper.placeImageAt(1,2, IMG_ANGEL_GABRIEL, {scaleX: 0.5, scaleY: 0.5})
        this.gabrielBW = mapper.placeImageAt(1,2, IMG_BW_GAB, {scaleX: 0.5, scaleY: 0.5})//bw gab


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

        //place sprite animation and play animations
        let sprite = mapper.placeSpriteAt(8,7, IMG_BONFIRE, {scaleToWidth: 0.2})
        sprite.y += 20
        sprite.play(ANIMS_BONFIRE)

        angel.rotation = Phaser.Math.DegToRad(20)
        this.gabrielBW.rotation = Phaser.Math.DegToRad(20)

        this.gabrielBW.setInteractive()
        this.gabrielBW.on('pointerover', ()=>{
            //this.gabrielBW.alpha = 0 //set transparency to 100%
            

            //create tween to do gradual transition to pointer out
            this.add.tween({
                targets: this.gabrielBW,
                duration: 500, //in ms
                //attributes to change
                alpha: 0,
                rotation: Phaser.Math.DegToRad(0)
            })
        })

        this.gabrielBW.on('pointerout', ()=>{
            //this.gabrielBW.alpha = 1
            this.add.tween({
                targets: this.gabrielBW,
                duration: 500, //in ms
                //attributes to change
                alpha: 1,
                rotation: Phaser.Math.DegToRad(20)
            })
        })
        mapper.placeImageAt(6, 7, IMG_JOSEPH, {scaleX: 0.6, scaleY: 0.6})
        
        mapper.placeImageAt(8, 1, IMG_MERRY_XMAS, {scaleToWidth: 0.45})

        //load sound
        const music = this.sound.add(AUDIO_AWAY_IN_A_MANGER, 
            { volume: 0.6, loop: true })
        music.play() //.pause() .stop() methods available


        //place text
        let text = mapper.placeTextAt(0,9, this.gameSvc.message)
        text.x -= 20
    }
    //game loop
    update(){//the longer u update the slower the game
        //60fps means update is executed 60 times per sec

    }

    //if u have multiple msgs or content:
    // - store in mongo, use key in mongo and append that to url
    // use key to retrieve content

}