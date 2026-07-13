import { MODELS } from "../config/models.js";

const getEnabledModels = () => {
    return MODELS.filter(
        (model) => model.enabled && !model.judge
    );
};

const getJudgeModel = () => {
    return MODELS.find(
        (model) => model.enabled && model.judge
    )
};


export { getEnabledModels, getJudgeModel };