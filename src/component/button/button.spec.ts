import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { NbButtonModule } from './button.module';

@Component({
    template: '<button nb-button #button> OK </button>'
})
class NbButtonTestComponent {
    @ViewChild('button') button;
}

describe('nb-button', () => {

    let fixture: ComponentFixture<NbButtonTestComponent>;
    let component: NbButtonTestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ NbButtonTestComponent ],
            imports: [ NbButtonModule ]
        }).compileComponents();

        fixture = TestBed.createComponent(NbButtonTestComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should have default theme and default size', () => {
        const theme = component.button.theme;
        const size = component.button.size;
        expect(theme).toBe('primary');
        expect(size).toBe('default');
    });
});
