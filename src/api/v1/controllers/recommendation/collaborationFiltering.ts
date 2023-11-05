import { NextFunction, Request, Response } from 'express'
import { PythonShell } from 'python-shell'
import dotenv from 'dotenv'
import path from 'path'
import { Types } from 'mongoose'

import IRequestUser from '../../interfaces/orthers/IRequestUser'
import movieService from '../../services/movie'

dotenv.config()

const SCRIPT_PATH = path.join(process.cwd(), 'python', 'CF', 'run.py')
const TRAINING_SET_PATH = path.join(process.cwd(), 'python', 'CF', 'dataset', 'training_set.xlsx')

const collaborationFiltering = async (req: Request, res: Response, next: NextFunction) => {
  const args: string[] = [ (req.user as IRequestUser).id.toString(), TRAINING_SET_PATH ]
  
  try {
    const results = JSON.parse((await PythonShell.run(SCRIPT_PATH, { args }))[0])
    const movies: any[] = []
    for (const id of results) {
      console.log(id)
      movies.push((await movieService.findById(new Types.ObjectId(id))))
    }
    console.log(movies)
    return res.json(movies)
  } catch (error) {
    return next(error)
  }
}

export default collaborationFiltering