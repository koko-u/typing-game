import { faker } from '@faker-js/faker'

export type CharStatus = 'OK' | 'NG' | 'NORMAL'

export class TypingChar {
  private state: CharStatus = 'NORMAL'
  get color(): string {
    switch (this.state) {
      case 'OK':
        return 'green'
      case 'NG':
        return 'deeppink'
      case 'NORMAL':
        return 'inherit'
      default: {
        const _: never = this.state
        return ''
      }
    }
  }

  constructor(public c: string) {}

  match(targetChar: string | null): TypingChar {
    const newChar = new TypingChar(this.c)
    if (targetChar !== null) {
      if (targetChar === this.c) {
        newChar.state = 'OK'
      } else {
        newChar.state = 'NG'
      }
    }
    return newChar
  }
}

export class TypingWord implements Iterable<TypingChar> {
  private innerChars: TypingChar[]
  constructor(word: string) {
    this.innerChars = word.split('').map((c) => new TypingChar(c))
  }

  static from(cs: TypingChar[]): TypingWord {
    const newWord = new TypingWord('')
    newWord.innerChars = cs
    return newWord
  }

  *[Symbol.iterator](): IterableIterator<TypingChar> {
    let index = 0
    while (index < this.innerChars.length) {
      yield this.innerChars[index++]
    }
  }

  map(f: (c: TypingChar, idx: number) => TypingChar): TypingWord {
    const newChars: TypingChar[] = []
    let index = 0
    for (const c of this) {
      newChars.push(f(c, index))
      index++
    }

    return TypingWord.from(newChars)
  }

  toString(): string {
    return this.innerChars.map((c) => c.c).join('')
  }
}

export function getFakeWord(): TypingWord {
  const word = faker.lorem.words({ min: 1, max: 4 })
  return new TypingWord(word)
}
