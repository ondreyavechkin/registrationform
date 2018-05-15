import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
//import {LocalStorageService} from 'ngx-webstorage';
  
@Component({
  selector: 'reg-form',
  templateUrl: './reg-form.component.html',
  styles: [`
  input.ng-touched.ng-invalid {border:solid red 2px;}
  input.ng-touched.ng-valid {border:solid green 2px;}
`],
})
export class RegFormComponent implements OnInit {

  
  regForm : FormGroup;
  
  checklogin=true;
  constructor() { 
    this.regForm=new FormGroup({
      firstname: new FormControl("",[Validators.required,Validators.pattern("[a-zA-Zа-яА-я]*")] ),
      lastname: new FormControl("",[Validators.required,Validators.pattern("[a-zA-Zа-яА-я]*")] ),
      fathername: new FormControl("",[Validators.required,Validators.pattern("[a-zA-Zа-яА-я]*")] ),
      pasport: new FormControl("",[Validators.required,Validators.pattern("[0-9]{10}")] ),
      year: new FormControl( "", [Validators.required,this.birthValidator]),
      login: new FormControl("",[Validators.required,Validators.pattern("[a-z]*")]),
      password: new FormControl("",[Validators.required,Validators.minLength(10)])
    })
  }
  setLocalstorage(data:string)
  {
  
    var stringobj=JSON.stringify(this.regForm.value)
    var s=data;
    if(localStorage.getItem(s)==null)
    {
    localStorage.setItem(s,stringobj);
    this.regForm.reset();
    this.checklogin=true;
    }
    else this.checklogin=false;
  }
  birthValidator(control: FormControl): {[s:string]:boolean}{
    var maxdate= new Date(Date.now())
  var maxyear =maxdate.getFullYear();
  var maxmonth =maxdate.getMonth();
  var maxday= maxdate.getDate();
      var dd=new Date(control.value);
      var y=dd.getFullYear();  
      var month=dd.getMonth();
      var day = dd.getDate();
    if(y>maxyear||(y==maxyear && month >maxmonth)||(y==maxyear && month ==maxmonth&& day>maxday)|| y<1900){
        return {"year": true};
        
    }
    return null;
}
  ngOnInit() {
    
  }

}
