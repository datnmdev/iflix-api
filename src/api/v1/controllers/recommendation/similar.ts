import { NextFunction, Request, Response } from 'express'
import { PythonShell } from 'python-shell'
import dotenv from 'dotenv'
import path from 'path'

import movieService from '../../services/movie'
import IMovie from '../../interfaces/entities/IMovie'

dotenv.config()

const SCRIPT_PATH = process.env.SCRIPT_PATH as string

const similar = async (req: Request, res: Response, next:NextFunction) => {
  const args: any[] = []
  const movies = await movieService.findAll().populate('genres')
  args.push(movies)

  const similarRecommendationPath = path.join(SCRIPT_PATH, 'similarRecommendation.py')
  const results = await PythonShell.run(similarRecommendationPath, { args })
  return res.json(results)
}

export default similar