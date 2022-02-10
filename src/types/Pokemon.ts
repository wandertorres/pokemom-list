export type Pokemon = {
    attack: number;
    defense: number;
    evolution: null | {
        name: string;
    }
    hp: number;
    name: string;
    national_number: number;
    sp_atk: number;
    sp_def: number;
    speed: number;
    sprites: {
       normal: string;
       large: string;
       animated: string; 
    }
    total: number;
    type: string[];
}