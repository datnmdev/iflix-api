import { ClientSession, Types, UpdateQuery } from 'mongoose'

import Movie from '../models/Movie'
import IMovie from '../interfaces/entities/IMovie'

const movieService = {
  findAll() {
    return Movie.find().populate([ 'genres', 'directors', 'casts', 'country' ])
  },
  findById(id: Types.ObjectId) {
    return Movie.findById(id)
  },
  create(movie: IMovie) {
    const movieDoc = new Movie(movie)
    return movieDoc.save()
  },
  findByIdAndUpdate(id: Types.ObjectId, infoWilBeApplied: UpdateQuery<IMovie> | undefined, session: ClientSession | null = null) {
    return Movie.findByIdAndUpdate(id, infoWilBeApplied, { session })
  },
  findByIdAndDelete(id: Types.ObjectId, session: ClientSession | null = null) {
    return Movie.findOneAndDelete({ _id: id }, { session })
  },
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
  },
  async findAndDeleteDirector(directorId: Types.ObjectId, session: ClientSession | null = null) {
    const filteredMovies = (await Movie.find()).filter(movie => {
      const index = movie.directors.findIndex(id => id.toString() == directorId.toString())

      if (index != -1) {
        movie.directors.splice(index, 1)
      }

      return index != -1
    })

    for (let i = 0; i < filteredMovies.length; ++i) {
      await filteredMovies[i].save({ session })
    }
  },
  async findAndDeleteCast(castId: Types.ObjectId, session: ClientSession | null = null) {
    const filteredMovies = (await Movie.find()).filter(movie => {
      const index = movie.casts.findIndex(id => id.toString() == castId.toString())

      if (index != -1) {
        movie.casts.splice(index, 1)
      }

      return index != -1
    })

    for (let i = 0; i < filteredMovies.length; ++i) {
      await filteredMovies[i].save({ session })
    }
  },
  async findAndDeleteCountry(countryId: Types.ObjectId, session: ClientSession | null = null) {
    const filteredMovies = (await Movie.find()).filter(movie => movie?.country?.toString() === countryId.toString())
    console.log(1)

    for (let i = 0; i < filteredMovies.length; ++i) {
      await filteredMovies[i].updateOne({ $unset: { country: 1 } }, { session })
    }
  }
}

export default movieService