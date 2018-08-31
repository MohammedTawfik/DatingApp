import { IPhoto } from './IPhoto';

export interface IUser {
    id: number;
    username: string;
    knownAs: string;
    age: number;
    gender: string;
    creationDate: Date;
    lastActive: Date;
    photoUrl: string;
    city: string;
    country: string;
    interests?: string;
    introduction?: string;
    lookingFor?: string;
    photos?: IPhoto[];
}
