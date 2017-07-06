import {Injectable} from '@angular/core';
import {ApiService} from "../api/api";

@Injectable()
export class MessageService {

  constructor(private apiService: ApiService) {
    console.log('Hello MessageService Provider');
  }

}
