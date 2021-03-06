
import api from './baseURL';
const contributorApi = `${api}/api/contributor`;
const contributorSignUpApi = `${contributorApi}/create`;
const contributorSignInApi = `${contributorApi}/login`;
const contributorUploadApi = `${contributorApi}/contribute`;

export {
    contributorSignInApi, contributorSignUpApi, contributorUploadApi
}