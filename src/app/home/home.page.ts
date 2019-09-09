import { AfterContentInit, Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MapserviceService } from './../services/mapservice.service';
import { Observable } from 'rxjs';
import { Socket } from 'ng-socket-io';


declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterContentInit{
  results: Observable<any>;
  map:any;

  latitude: any;
  longitude: any;
  @ViewChild('mapElement',{static: true}) mapElement:ElementRef;
  
  //constructor(private mapService: MapserviceService) {}
  constructor(public socket: Socket) {}

  
  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    // // Call our service function which returns an Observable
    // this.mapService.getLocation(1)
    // .subscribe((res)=>{
    //   console.log(res['latitude']);
    //   console.log(res['longitude']);
       this.map = new google.maps.Map(
         this.mapElement.nativeElement,
         {
           center: {lat: -34.397, lng: 150.644},
           zoom: 8
         });
        //  const infoWindow = new google.maps.InfoWindow;
        //  const pos = {
        //    lat: this.latitude,
        //    lng: this.longitude
        //  };
        //  infoWindow.setPosition(pos);
        //  infoWindow.setContent('Location found.');
        //  infoWindow.open(this.map);
        //  this.map.setCenter(pos);
     //});
    this.socket.connect();
    this.getMessages().subscribe(message => {
      //this.messages.push(message);
      console.log(message['latitude']);
      console.log(typeof(message['longitude']));
      this.latitude=message['latitude'];
      this.longitude=message['longitude'];
      const infoWindow = new google.maps.InfoWindow;
      const pos = {
        lat:  this.latitude,
        lng:  this.longitude
      };
      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(this.map);
      this.map.setCenter(pos);
      
        
      var marker = new google.maps.Marker({ position: pos, title: "GPPPS" });
      marker.setMap(this.map);
  // });
    });
  }

  // ngAfterContentInit(): void {
  //   console.log("ngAfterContentInit");
    
  //   this.socket.connect();
  //   this.getMessages().subscribe(message => {
  //     console.log(message);
  //     console.log(message['latitude']);
  //     console.log(message['longitude']);
        
  //   });
    
  // }

  getMessages() {
    console.log("getMessages");
    
    let observable = new Observable(observer => {
      console.log("observing....");
      
      this.socket.on('message', (data) => {
        console.log("message socket---");
        console.log(data);
        observer.next(data);
      });
    })
    return observable;
  }
}

