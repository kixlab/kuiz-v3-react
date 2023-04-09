import Filter from 'bad-words'

const filter = new Filter({ placeHolder: 'x' })

class ProfanityFilterService {
  async filter(text: string) {
    return filter.clean(text)
  }
}

export const profanityFilterService = new ProfanityFilterService()
