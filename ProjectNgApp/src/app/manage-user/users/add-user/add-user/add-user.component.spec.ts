import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserComponent } from './add-user.component';
import { UserService } from 'src/app/core/services/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from  } from 'rxjs';

const input: any = [
  { name: 'Polska', uname: 'polska', parent: ''},
  { name: 'Dolnośląskie', uname: 'dolnoslaskie', parent: 'polska'},
  { name: 'Wrocław', uname: 'wroclaw', parent: 'dolnoslaskie'}
];

const data = from(input);

const collectionStub = {
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
}

const angularFiresotreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
}

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserComponent,
        AngularFirestore
      ],
      providers: [UserService,
        {provide: AngularFirestore, useValue: angularFiresotreStub}
      ]
    })
    .compileComponents();


  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should have as title 'Add New User...'", async(() => {
    const AddUser = fixture.nativeElement;
    expect(AddUser.querySelector('.mb-1')).toEqual('Add New User...');
   }));

});
