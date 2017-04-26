import { Component, OnInit } from '@angular/core';
import browser from 'detect-browser';


declare const MediaElementPlayer: any;

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

   private player;

   // HLS
  // private song = 'http://media.crave.fm:1935/vod/mp3:TIAr0000000196Al0000000001So0000006243.mp3/playlist.m3u8';
  // private song = 'http://db3.indexcom.com/bucket/ram/00/05/64k/05.m3u8'; // Working on FireFox

  // DASH
  // private song = 'http://media.crave.fm:1935/vod/TIAr0000000196Al0000000001So0000006243.mp3/manifest.mpd';
  // private song = 'http://www.bok.net/dash/tears_of_steel/cleartext/stream.mpd';

  // RTMP
  // private song = 'rtmp://media.crave.fm:1935/vod/mp3:TIAr0000000196Al0000000001So0000006243.mp3';
  // private song = 'rtsp://media.crave.fm:1935/vod/sample.mp4'

  private song;
  private play = {
    type: 'audio/mp3',
    features: ['playpause', 'progress', 'current', 'duration', 'tracks', 'volume'],
    pluginPath: '/assets/mejs/swf/',
    success: function(mediaElement, originalNode) {
      console.log('Initialized');
    }
  };

  constructor() { }

  ngOnInit() {
    switch (browser && browser.name) {
      case 'firefox':
      case 'chrome':

          // RTMP
        this.song = 'rtmp://media.crave.fm:1935/vod/mp3:TIAr0000000196Al0000000001So0000006243.mp3';

        console.log('Chrome and Firefox - Player');
        break;

      case 'edge':
      case 'safari':

        // HLS
        this.song = 'http://media.crave.fm:1935/vod/mp3:TIAr0000000196Al0000000001So0000006243.mp3/playlist.m3u8';

        console.log('Edge and Safari - Player');
        break;


      default:
        console.log('BROWSER UNDEFINED');
        break;
    }
    this.player = new MediaElementPlayer('player', this.play);
    this.player.setSrc(this.song);
    this.player.load();
  }

}
