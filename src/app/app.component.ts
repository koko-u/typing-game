import { Component } from '@angular/core'
import { NxWelcomeComponent } from './nx-welcome.component'

@Component({
  standalone: true,
  imports: [NxWelcomeComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'typing-game'
}
