import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
    selector: 'view-button',
    template: `
    <button type="button" style="margin-top:-4px;" class="btn btn-primary mr-4 mb-3  mb-sm-0" [routerLink]="['/manage-users/view-user', params.value]"><i
    class="uil-boombox mr-1"></i> View </button>
    `,
})
export class ViewActionButtonCellTemplate implements ICellRendererAngularComp {

    constructor(private router: Router) { }

    refresh(params: any): boolean {
        throw new Error('Method not implemented.');
    }
    afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
        throw new Error('Method not implemented.');
    }
    
    params: any;

    agInit(params: any): void {
        this.params = params;
    }
}