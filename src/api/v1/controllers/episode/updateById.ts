import { Request, Response } from 'express'
import lodash from 'lodash'
import { Types } from 'mongoose'
import fs from 'fs'
import dotenv from 'dotenv'
import path from 'path'

import episodeService from '../../services/episode'

dotenv.config()

const UPLOADS_VIDEO_PATH = process.env.UPLOADS_VIDEO_PATH as string

const updateById = async (req: Request, res: Response) => {
  try {
    const infoWillBeApplied = lodash.pick(req.body, [ 'name', 'ordinalNumber' ])

    const updatedEpisode = await episodeService.findByIdAndUpdate(new Types.ObjectId(req.params.id), infoWillBeApplied)
    
    if (updatedEpisode) {
      if (req.file) {
        updatedEpisode.videoUrl = path.join(UPLOADS_VIDEO_PATH, updatedEpisode.movie.toString(), updatedEpisode._id.toString() + '.' + req.file.mimetype.split('/')[1])
        await updatedEpisode.save()
        req.body.videoUrl = updatedEpisode.videoUrl
        await fs.promises.rename(req.file.path, path.join('public', updatedEpisode.videoUrl))
      }
    } else {
      if (req.file) {
        const videoUrl = path.join(process.cwd(), req.file.path)
        try {
          await fs.promises.access(videoUrl, fs.constants.F_OK)
          await fs.promises.unlink(videoUrl)
        } catch (error) {
          // console.log(error)
        }
      }
    }

    return res.status(200).json({
      status: 'OK',
      message: 'The episode has been updated successfully'
    })
  } catch (error) {
    // Delete the successfully uploaded file (if any) previously
    if (req.body.videoUrl) {
      const videoUrl = path.join(process.cwd(), 'public', req.body.videoUrl)
      try {
        await fs.promises.access(videoUrl, fs.constants.F_OK)
        await fs.promises.unlink(videoUrl)
      } catch (error) {
        // console.log(error)
      }
    } else if (req.file) {
      const videoUrl = path.join(process.cwd(), req.file.path)
      try {
        await fs.promises.access(videoUrl, fs.constants.F_OK)
        await fs.promises.unlink(videoUrl)
      } catch (error) {
        // console.log(error)
      }
    }

    return res.status(500).json({
      status: 'Internal Server Error',
      message: 'The episode wasn\'t updated successfully'
    })
  }
}

export default updateById