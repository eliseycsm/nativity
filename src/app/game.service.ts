import { Injectable } from "@angular/core";
import { Game } from 'phaser'
import { CardScene } from "./scenes/card.scene";
@Injectable() //<-- inside this bracket can put {providedIn: 'root} to make it global <-> same fn as providers: [GameService] in module.ts
export class GameService{

    created = false //to avoid creating the game multiple times
    game: Game
    message: string
    constructor(){}

    createGame(width = 1280, height = 720){//takes in width and height of screen
        if (this.created)
            return
        //create the game
        this.game = new Game({
            width, height,  //webgl, canvas - drawing primitives
            type: Phaser.AUTO, //type of canvas to use for drawing - let phaser decide
            parent: 'card', //this must coincide with the div id that it displays in <div id="card"></div>
            scene: [CardScene] //loading page for game // CardScene will be our first scene to be displayed
        })
    } 
}