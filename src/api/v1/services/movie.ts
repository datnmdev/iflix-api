import { ClientSession, Types } from 'mongoose'

import Movie from '../models/Movie'

const movieService = {
  async findAndDeleteGenre(genreId: Types.ObjectId, session: ClientSession | null = null) {
    const filteredMovies = (await Movie.find()).filter(movie => {
      const index = movie.genres.findIndex(id => id.toString() == genreId.toString())

      if (index != -1) {
        movie.genres.splice(index, 1)
      }

      return index != -1
    })

    for (let i = 0; i < filteredMovies.length; ++i) {
      await filteredMovies[i].save({ session })
    }
  }
}

export default movieService