export enum ImageView {
    FRONT = 'FRONT',
    RIGHT_SIDE = 'RIGHT_SIDE',
    LEFT_SIDE = 'LEFT_SIDE',
    BACK = 'BACK',
    OTHER = 'OTHER',
}
  
  
  
export interface BodyImage {
    uuid: string;
    url: string;
    title: string;
    view: ImageView;
    createdAt: Date;
    updatedAt: Date;
    active: boolean;
}

export interface MeasureEntity {
    date: Date;
    height?: number;
    weight?: number;
    muscle?: number;
    fat?: number;
    water?: number;
    bones?: number;
    visceral?: number;
    shoulder?: number;
    bust?: number;
    waist?: number;
    hips?: number;
    thigh?: number;
    arm?: number;
    contractedArm?: number;
    subscapularFold?: number;
    tricipitalFold?: number;
    bicipitalFold?: number;
    chestFold?: number;
    iliocrestalFold?: number;
    supraespinalFold?: number;
    abdominalFold?: number;
    thighFold?: number;
    legFold?: number;
    observations?: string;
    images?: BodyImage[];
}
