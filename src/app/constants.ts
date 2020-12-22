import { Injector } from "@angular/core";

//name ur keys/var names st. its easy to call from editor
export const SCENE_CARD='card'; 
export const IMG_BACKGROUND = 'background'

export const IMG_JOSEPH = 'joseph'
export const IMG_MARY = 'mary'
export const IMG_BABY_JESUS = 'baby_jesus'
export const IMG_DONKEY = 'donkey'

export const IMG_ANGEL_GABRIEL = 'angel_gab'
export const IMG_BW_GAB = 'bw_angel_gab'

export const IMG_MERRY_XMAS = 'merry_xmas'


//animation
export const IMG_BONFIRE = 'bonfire'
export const ANIMS_BONFIRE = 'bonfire'

//audio
export const AUDIO_AWAY_IN_A_MANGER = 'away_in_a_manger'

//or use  export let NG_INJECTOR: Injector = null
export class Globals {
    static injector: Injector = null //static means there's only 1 copy of injector
}