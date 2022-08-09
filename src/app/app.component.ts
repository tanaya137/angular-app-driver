import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { AppService } from './service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public instrumentForm: FormGroup;
  public showMessage = false;
  public message = ''
  public dataInterval: Subscription;
  constructor(public formBuilder: FormBuilder, public appService: AppService) {
    this.instrumentForm = this.formBuilder.group({
      instrument: ['', [Validators.required]],
    });
    this.dataInterval = new Subscription();
  }
  ngOnInit(): void {

  }

  public processValue(): void {
    if (this.instrumentForm.value.instrument.toLowerCase() === 'sir') {
      console.log(this.instrumentForm.value.instrument);
      this.dataInterval = interval(1000).subscribe((x => {
        this.submitValue(this.instrumentForm.value.instrument);
      }))
    } else  if (this.instrumentForm.value.instrument.toLowerCase() === 's') {
      this.dataInterval.unsubscribe();
      this.submitValue(this.instrumentForm.value.instrument);
    }else  if (this.instrumentForm.value.instrument.toLowerCase() === 'd') {
      this.dataInterval.unsubscribe();
      this.submitValue(this.instrumentForm.value.instrument);
    }
    this.instrumentForm.reset();
  }

  public submitValue(value?: any): void {
    this.appService.submitInstrumentValue(value).subscribe((res: any) => {
      this.message = this.message + "<br/>" + res.result;
    }, error => {
      this.message = '';
    })
  }

  public ngOnDestroy(): void {
    if (this.dataInterval) {
      this.dataInterval.unsubscribe();
    }
  }

  public stopUpcomingValues(){
    this.ngOnDestroy()
  }

}

