import {Injectable} from '@angular/core';
import {Http} from "@angular/http";

export interface Location {
  country: string;
  code: string;
  city: string;
  ip: string;
  latitude: string;
  longitude: string;
  timezone: string;
}


@Injectable()
export class LocationService {
  private apiUrl = 'http://freegeoip.net/json';
  // alternative:
  // private apiUrl = 'http://www.geoplugin.net/json.gp';

  constructor(private http: Http) {
    console.log('Hello LocationService Provider');
    // this.location$.take(1).subscribe(console.log)
  }

  get location$() {
    return this.http.get(this.apiUrl)
      .map((res) => res.json())
      .map(data => this.dataToLocation(data))
      // .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  get country$() {
    return this.location$
      .map(data => data.country)
  }

  get locationString$() {
    return this.location$
      .map(data => `${data.city}, ${data.country}`)
  }

  private dataToLocation(data) {
    const location = {
      country: data.country_name,
      code: data.country_code,
      city: data.city,
      ip: data.ip,
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
    };
    return location
  }
}
