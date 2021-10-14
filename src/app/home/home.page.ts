import { Component } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx'; 
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public pokemons;
  public hayPokemons = false;

  constructor(private iap: InAppBrowser, private correo: EmailComposer, private camara: Camera, 
      private telefono: CallNumber, private social: SocialSharing, private geo: Geolocation, 
      private http: HTTP,
      private nav: NavController) {
  }

  mostrarUrl() {
    //var ref = cordova.InAppBrowser.open('http://apache.org', '_blank', 'location=yes');
    //ref.show()
    const options: InAppBrowserOptions =  {
      location:'no',
      hardwareback: 'yes'
    };

    const browser = this.iap.create('https://ionicframework.com/','_system',options);
    browser.show();
  }

  enviarEmail() {
    
    let email = {
      to: 'max@mustermann.de',
      cc: 'erika@mustermann.de',
      bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        'file://img/logo.png',
        'res://icon.png',
        'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
        'file://README.pdf'
      ],
      subject: 'Cordova Icons',
      body: 'How are you? Nice greetings from Leipzig',
      isHtml: true
    }

    this.correo.open(email);
  }
  
  usarCamara() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camara.DestinationType.FILE_URI,
      encodingType: this.camara.EncodingType.JPEG,
      mediaType: this.camara.MediaType.PICTURE
    }
    
    this.camara.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }

  llamada() {
    this.telefono.callNumber('961924339',false) 
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  localizar() {
    this.geo.getCurrentPosition().then((resp) => {
      alert(resp.coords.latitude+' - '+resp.coords.longitude);
      // resp.coords.latitude
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
    
     let watch = this.geo.watchPosition();
     watch.subscribe((d) => {
      //console.log(data.coords.latitude+' - '+data.coords.longitude);
      //console.log(d.coords.latitude+' / '+d.coords.longitude);
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
     });
  }

  compartir() {
    this.social.share(null,null,null,'Prueba').then(() => {
        alert('Compartiendo');
    }).catch(() => {
        alert('No se puede compartir');
    });
/*    this.social.canShareViaEmail().then(() => {
      // Sharing via email is possible
      // Share via email
      this.social.shareViaEmail('Body', 'Subject', ['recipient@example.org']).then(() => {
        // Success!
      }).catch(() => {
        // Error!
      });
    }).catch(() => {
      // Sharing via email is not possible
      alert('No se puede compartir por correo');
    });*/
  }


  apiRest() {
    this.http.get('https://pokeapi.co/api/v2/pokemon/ditto', {}, {})
    .then(data => {
      this.pokemons = JSON.parse(data.data);
      this.hayPokemons = true;
      console.log(data.status);
      //console.log(data.data.abilities[0].ability.name);
      console.log(data.data); // data received by server
      console.log(data.headers);
      console.log(this.pokemons);
  
    })
    .catch(error => {
  
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
  
    })  
  }

  ciclos() {
    this.nav.navigateForward('ciclos');

  }
}
