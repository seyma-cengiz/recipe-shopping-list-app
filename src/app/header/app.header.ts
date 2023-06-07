import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './app.header.html',
    styleUrls: ['./app.header.css']
})
export class HeaderComponent {
    @Output() featureSelected = new EventEmitter<string>();

    onSelect(feature: string) {
        this.featureSelected.emit(feature);
    }
}