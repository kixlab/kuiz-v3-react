import express from 'express'
import { addDownVote } from '../../controllers/question/addDownVote'
import { addKeyWords } from '../../controllers/question/addKeyWords'
import { addUpVote } from '../../controllers/question/addUpVote'
import { loadCluster } from '../../controllers/question/cluster/loadCluster'
import { loadOptionInCluster } from '../../controllers/question/cluster/loadOptionInCluster'
import { createFullQuestion } from '../../controllers/question/createFullQuestion'
import { createQStem } from '../../controllers/question/createQStem'
import { getQstemByOption } from '../../controllers/question/getQstemByOption'
import { loadCreatedStemData } from '../../controllers/question/loadCreatedStemData'
import { loadProblemDetail } from '../../controllers/question/loadProblemDetail'
import { loadProblemList } from '../../controllers/question/loadProblemList'
import { loadCreatedOption } from '../../controllers/question/option/loadCreatedOption'
import { loadOptionDetail } from '../../controllers/question/option/loadOptionDetail'
import { loadOptions } from '../../controllers/question/option/loadOptions'
import { optionCreate } from '../../controllers/question/option/optionCreate'
import { makeOptionSet } from '../../controllers/question/option/makeOptionSet'
import { setOptionDependency } from '../../controllers/question/option/setOptionDependency'
import { removeDownVote } from '../../controllers/question/removeDownVote'
import { removeUpVote } from '../../controllers/question/removeUpVote'
import { solveQuestion } from '../../controllers/question/solveQuestion'
import { submitReport } from '../../controllers/question/submitReport'
import { updateExplantion } from '../../controllers/question/updateExplanation'

const router = express.Router()

router.get('/option/load', loadOptions)
router.get('/optiondetail/load', loadOptionDetail)
router.post('/option/create', optionCreate)
router.post('/optionset/create', makeOptionSet)
router.post('/option/dependency', setOptionDependency)
router.post('/qstem/create', createQStem)
router.get('/detail/load', loadProblemDetail)
router.get('/list/load', loadProblemList)
router.post('/made/stem', loadCreatedStemData)
router.post('/made/option', loadCreatedOption)
router.get('/load/cluster', loadCluster)
router.post('/load/options', loadOptionInCluster)
router.post('/organic/question/create', createFullQuestion)

router.post('/submitReport', submitReport)
router.post('/solve', solveQuestion)
router.post('/addUpVote', addUpVote)
router.post('/removeUpVote', removeUpVote)
router.post('/addDownVote', addDownVote)
router.post('/removeDownVote', removeDownVote)
router.post('/qstembyoption', getQstemByOption)
router.post('/addKeyWords', addKeyWords)
router.post('/updateExplanation', updateExplantion)

export default router
