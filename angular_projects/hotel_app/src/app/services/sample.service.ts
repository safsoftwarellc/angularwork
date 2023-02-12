import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class SampleService {

    myData!: string;

    updateData(myData:string){
        this.myData = myData;
    }
    getData(){
        return this.myData;
    }
}