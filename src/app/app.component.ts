import { Component } from '@angular/core'
import { NgIconComponent, provideIcons } from '@ng-icons/core'

@Component({
  standalone: true,
  imports: [NgIconComponent],
  viewProviders: [provideIcons({})],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ``,
})
export class AppComponent {
  title = 'typing-game'
}
