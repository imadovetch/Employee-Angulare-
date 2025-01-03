import { NgModule, Type } from '@angular/core';


export function CustomNgModule(metadata: NgModule) {
  return function (target: Type<any>) {
    console.log('Applying custom logic before @NgModule!');
 
    NgModule(metadata)(target); 
    
    console.log('Custom NgModule applied!');
  };
}
