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
      newChars.push( f(c, index) )
      index++
    }

    return TypingWord.from(newChars)
  }

  toString(): string {
    return this.innerChars.map((c) => c.c).join('')
  }
}

export class TestWords {
  private words: TypingWord[] = []
  constructor() {
    this.words = [
      new TypingWord('advertising'),
      new TypingWord('conversation'),
      new TypingWord('introduction'),
      new TypingWord('measurement'),
      new TypingWord('maintenance'),
      new TypingWord('information'),
      new TypingWord('relationship'),
      new TypingWord('construction'),
      new TypingWord('engineering'),
      new TypingWord('possibility'),
      new TypingWord('administration'),
      new TypingWord('communication'),
      new TypingWord('requirement'),
      new TypingWord('significance'),
      new TypingWord('perspective'),
      new TypingWord('improvement'),
      new TypingWord('replacement'),
      new TypingWord('negotiation'),
      new TypingWord('presentation'),
      new TypingWord('examination'),
      new TypingWord('requirement'),
      new TypingWord('explanation'),
      new TypingWord('refrigerator'),
      new TypingWord('measurement'),
      new TypingWord('imagination'),
      new TypingWord('entertainment'),
      new TypingWord('possibility'),
      new TypingWord('information'),
      new TypingWord('recommendation'),
      new TypingWord('replacement'),
      new TypingWord('improvement'),
      new TypingWord('temperature'),
      new TypingWord('environment'),
      new TypingWord('performance'),
      new TypingWord('maintenance'),
      new TypingWord('negotiation'),
      new TypingWord('organization'),
      new TypingWord('satisfaction'),
      new TypingWord('perspective'),
      new TypingWord('opportunity'),
    ]
  }
  nextWord(): TypingWord {
    const randIndex = Math.floor(Math.random() * this.words.length)

    return this.words[randIndex]
  }
}
