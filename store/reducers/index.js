import { combineReducers } from 'redux';
import customersReducer from './costumersReducer';
import usersReducer from './usersReducer';
import rolesReducer from './rolesReducer';
import propertiesReducer from './propertiesReducer';
import buildersReducer from './buildersReducer';
import categoriesReducer from './categoriesReducer';
import divisionsReducer from './divisionsReducer';
import buildModelsReducer from './buildModelsReducer';
import templatesReducer from './templatesReducer';
import bankCreditsReducer from './bankCreditsReducer';
import timeLineReducer from './timeLineReducer';
import articlesReducer from './articlesReducer';
import banksReducer from './banksReducer';
const reducerCombined = combineReducers({
    customers: customersReducer,
    users: usersReducer,
    roles: rolesReducer,
    properties: propertiesReducer,
    builders: buildersReducer,
    categories: categoriesReducer,
    divisions: divisionsReducer,
    buildModels: buildModelsReducer,
    templates: templatesReducer,
    bankCredits: bankCreditsReducer,
    timeLine: timeLineReducer,
    articles: articlesReducer,
    banks: banksReducer
})

export default reducerCombined;