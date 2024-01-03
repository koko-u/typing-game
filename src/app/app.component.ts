import { Component, OnInit, computed, signal } from '@angular/core'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { TestWords, TypingWord } from './typing-word'
import { CommonModule } from '@angular/common'
import { bootstrapStars } from '@ng-icons/bootstrap-icons'

@Component({
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  viewProviders: [provideIcons({ bootstrapStars})],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ``,
})
export class AppComponent implements OnInit {
  private testWords = new TestWords()

  testText = signal<TypingWord>(new TypingWord(''))
  inputText = signal('')

  isSuccess = computed(() => this.testText().toString() === this.inputText())

  ngOnInit(): void {
    this.testText.set(this.testWords.nextWord())
  }

  onChangeInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value
    this.inputText.set(inputValue)
    this.testText.update((testText) =>
      testText.map((c, idx) => {
        if (idx < inputValue.length) {
          return c.match(inputValue[idx])
        } else {
          return c.match(null)
        }
      }),
    )
  }

  gotoNextTest() {
    this.testText.set(this.testWords.nextWord())
    this.inputText.set('')
  }
}
