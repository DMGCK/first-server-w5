import { logger } from "../utils/Logger"
import  BaseController  from "../utils/BaseController"
import { catsService } from "../services/CatsService"



export class CatsController extends BaseController{
  constructor() {
    super('api/cats')
    this.router
      .get('', this.getCats)
      .post('', this.createCat)
      .delete('/:name', this.deleteCat)
  }


  async getCats(request, response, next) {
    try {
      logger.log('getting cats')
      let cats = await catsService.getCats()

      return response.send(cats)
    } catch (error) {
      next(error)
    }
  }

  async createCat(req, res, next) {
    try {
      let cat = await catsService.createCat(req.body)
      logger.log('making a new cat')
      return res.send(cat)
    } catch (error) {
      next(error)
    }
  }

  async deleteCat(req, res, next) {
    try {
      logger.log('Body ',req.body.name, 'Params', req.params)
      let message = await catsService.deleteCat(req.params.name)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}