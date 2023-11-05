import Evaluation from '../models/Evaluation'
import IEvaluation from '../interfaces/entities/IEvaluation'

const evaluationService = {
  create(evaluation: IEvaluation) {
    const evaluationDoc = new Evaluation(evaluation)
    return evaluationDoc.save()
  }
}

export default evaluationService