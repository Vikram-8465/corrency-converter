import { LightningElement } from 'lwc';
import {countryCodeList} from 'c/countryCodeList';
import currencyConverterAssets from '@salesforce/resourceUrl/currencyConverterAssets';
export default class CurrencyConverter extends LightningElement {
   currencyImage = currencyConverterAssets + '/currencyConverterAssets/currency.svg';
   countryList = countryCodeList;
   amount = '';
   from = 'USD';
   to = 'AED';
   result = '';
   error ;
   loading = false;

   handleChange(event) {
     const {name, value} = event.target;
     if(name == 'amount'){
        this[name] = value;
     }
     else if(name == 'from'){
        this[name] = value;
     }
     else if(name == 'to'){
        this[name] = value;
     }
     this.result = '';
     this.template.querySelector('button').style.cursor = 'pointer';
     this.template.querySelector('button').style.opacity = '1';
   }

   submitHanlder(event){
     event.preventDefault();
     this.loading = true;
     this.convert();
   }

   async convert(){
    try{

        const data = await fetch(`https://v6.exchangerate-api.com/v6/5e8566b39018a99be77157f0/latest/${this.from}`);
        const result = await data.json();
        console.log(result);
        this.loading = false;
        this.result = Number((this.amount * result.conversion_rates[this.to]).toFixed(2));
        if(this.result){
          this.template.querySelector('button').style.cursor = 'not-allowed';
          this.template.querySelector('button').style.opacity = '0.8';
        }

    }
    catch(error){
     console.error(error);
     this.error= 'something went wrong. please try again..!'
    }
  }
}