import { Outlet } from 'react-router-dom';
import { MusicPlayer } from '../music_player/MusicPlayer';
import './Body.css'
import { Copyright } from './Copyright';

export function Body(){
    return (
    <div className='body-main'>
        <Outlet/>
        <Copyright/>
        <MusicPlayer className="music-player"/>
    </div>);
}

